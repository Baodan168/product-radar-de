#!/usr/bin/env python3
"""Amazon Germany data fetcher — 基于 UK 多通道版 + FR 解析适配（2026-10-23）。

实测结论：amazon.de 榜单页 curl_cffi captcha 率高（5/6 被拦），
搜索页必须走预热浏览器（keyword_scanner 已内置）。榜单页由 cron_scan 的
CloakBrowser 预热通道兜底，curl_cffi 仍作快通道。"""
import json, subprocess, re, sys, random, os, time, urllib.parse
from pathlib import Path

BASE = Path(__file__).parent.parent
CONFIG = json.loads((BASE / "config.json").read_text())

# Amazon DE URLs（new_releases + bsr 双渠道对齐 UK 覆盖面）。
# slug 于 2026-08-29 实测（抓 /gp/bestsellers/ 总目录提取，逐一验证 200+有产品）；
# 此前手写的 garden/sports-loisirs 等全部 404 空壳页。
_AMAZON_DE_CATS = {
    "Kitchen": "kitchen",           # Küche, Haushalt & Wohnen
    "Garden": "lawn-garden",        # Garten
    "Sports": "sports",             # Sport & Freizeit
    "Office": "officeproduct",      # Bürobedarf
    "Bathroom": "hpc",              # Drogerie & Körperpflege（禁选词由 is_forbidden 兜底）
    "Pets": "pet-supplies",         # Haustier（食品类由禁选词兜底）
    "Automotive": "automotive",     # Auto & Motorrad
}
AMAZON_DE_URLS = {}
for _cat, _slug in _AMAZON_DE_CATS.items():
    AMAZON_DE_URLS[f"{_cat}|new_releases"] = f"https://www.amazon.de/gp/new-releases/{_slug}/"
    AMAZON_DE_URLS[f"{_cat}|bsr"] = f"https://www.amazon.de/gp/bestsellers/{_slug}/"

DE_EUR_COOKIES = "lc-main=de_DE; i18n-prefs=EUR"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

# Cloudflare Worker 代理（amazon.de 从 WSL 直连被 GFW 阻断）
CLOUDFLARE_WORKER_URL = "https://amazon-uk-proxy.liyuhong66.workers.dev/"

CHANNEL_NAMES = {
    "new_releases": "Amazon新品榜",
    "bsr": "Amazon畅销榜",
}

CATEGORY_VALIDATORS = {
    # 德语类目验证词（2026-10-23 对 amazon.de 榜单实测标题定制）
    "Kitchen": ["küche", "kochen", "kaffe", "geschirr", "besteck", "töpfe", "pfanne",
                "glas", "flasche", "aufbewahrung", "backen", "messer", "kann", "spül"],
    "Garden": ["garten", "pflanze", "blume", "rasen", "grill", "bewässerung", "samen",
               "dünger", "terrasse", "balkon"],
    "Sports": ["fitness", "yoga", "training", "fahrrad", "rad", "camping", "outdoor",
               "lauf", "sport", "widerstandsband", "hantel"],
    "Office": ["büro", "schreib", "notizbuch", "stift", "ordner", "papier", "akten",
               "kalender", "maus", "tastatur", "monitor"],
    "Bathroom": ["dusche", "bad", "zahnbürste", "haarbürste", "shampoo", "seife",
                 "körperpflege", "rasier", "nagel", "zahnpasta", "deo"],
    "Pets": ["hund", "katze", "tier", "aquarium", "katzenklo", "leine", "halsband",
             "napf", "kratzbaum", "pflege", "knochen", "spielzeug", "streu"],
    "Automotive": ["auto", "kfz", "fahrzeug", "reifen", "öl", "motorrad", "lenkrad",
                   "scheibenwischer", "polier", "dachbox"],
}


def _is_valid_response(html):
    """Check if Amazon DE response contains real product data."""
    if not html:
        return False
    low = html.lower()
    if "captcha" in low or "api-services-support@amazon" in low:
        return False
    if "data-asin" not in html:
        return False
    return True


def _fetch_page(url):
    """Fetch an amazon.de page。

    通道优先级（2026-08-29 实测）：curl_cffi（TLS 指纹伪装，唯一稳定
    可过的通道）→ 直连 curl（通常被墙）→ 环境代理 → Cloudflare Worker。
    旧版先跑 curl 再跑 worker，每个 URL 白吃 60s 超时。
    """
    # 1) curl_cffi
    try:
        from curl_cffi import requests as cffi_req
        resp = cffi_req.get(
            url, impersonate="chrome",
            headers={"Accept-Language": "de-DE,de;q=0.9,en;q=0.8"},
            timeout=20)
        if resp.status_code == 200 and _is_valid_response(resp.text):
            print(f"  ✅ curl_cffi OK (len={len(resp.text)})", file=sys.stderr)
            return resp.text
    except ImportError:
        pass
    except Exception as e:
        print(f"  curl_cffi error: {e}", file=sys.stderr)

    # 2) 直连 curl + FR locale
    try:
        result = subprocess.run(
            ["curl", "-s", "-L", "--compressed",
             "--connect-timeout", "8", "--max-time", "20",
             "-H", f"User-Agent: {USER_AGENT}",
             "-H", "Accept-Language: de-DE,de;q=0.9,en;q=0.8",
             "-b", DE_EUR_COOKIES,
             url],
            capture_output=True, text=True, timeout=30
        )
        if _is_valid_response(result.stdout):
            print(f"  ✅ curl OK (len={len(result.stdout)})", file=sys.stderr)
            return result.stdout
    except Exception as e:
        print(f"  ❌ curl error: {e}", file=sys.stderr)

    # 3) 环境代理
    proxy = os.environ.get('http_proxy', '') or os.environ.get('https_proxy', '')
    if proxy:
        try:
            result = subprocess.run(
                ["curl", "-s", "-L", "--compressed",
                 "--connect-timeout", "8", "--max-time", "20",
                 "-x", proxy,
                 "-H", f"User-Agent: {USER_AGENT}",
                 "-H", "Accept-Language: de-DE,de;q=0.9,en;q=0.8",
                 "-b", DE_EUR_COOKIES,
                 url],
                capture_output=True, text=True, timeout=30
            )
            if _is_valid_response(result.stdout):
                print(f"  ✅ curl+proxy OK (len={len(result.stdout)})", file=sys.stderr)
                return result.stdout
        except Exception as e:
            print(f"  ❌ curl+proxy error: {e}", file=sys.stderr)

    # 4) Cloudflare Worker 代理
    try:
        worker_url = f"{CLOUDFLARE_WORKER_URL}?url={urllib.parse.quote(url, safe='')}"
        result = subprocess.run(
            ["curl", "-s", "-L", "--compressed",
             "--connect-timeout", "10", "--max-time", "30",
             "-H", f"User-Agent: {USER_AGENT}",
             worker_url],
            capture_output=True, text=True, timeout=45
        )
        if _is_valid_response(result.stdout):
            print(f"  ✅ Worker proxy OK (len={len(result.stdout)})", file=sys.stderr)
            return result.stdout
    except Exception as e:
        print(f"  ❌ Worker proxy error: {e}", file=sys.stderr)

    return ""


def _parse_de_price(text):
    """解析法语价格文本为 float。

    德国站价格是「9,99 €」逗号小数 + 「1 234,56」空格（含
\\u00a0/narrow nbsp）千分位；也可能出现英文格式「€12.34」。
    返回 0 表示解析失败。
    """
    if not text:
        return 0
    # 抠出数字部分：允许 € 在前或后、逗号或点做小数分隔
    m = re.search(r'([\d\s\u00a0\u202f][\d\s\u00a0\u202f.,]*[\d.,])', text)
    if not m:
        return 0
    num = m.group(1)
    num = re.sub(r'[\s\u00a0\u202f]', '', num)  # 去千分位空格
    # 逗号当小数分隔；若同时有点和逗号，最后一个出现的是小数分隔
    if ',' in num and '.' in num:
        if num.rfind(',') > num.rfind('.'):
            num = num.replace('.', '').replace(',', '.')
        else:
            num = num.replace(',', '')
    else:
        num = num.replace(',', '.')
    # 「9.99」→ 9.99；「1.234」欧陆写法是千分位，但价格 <100 场景点分隔极少见，
    # 按小数处理即可（扫描价格带 6.99-10.99）
    try:
        return float(num)
    except ValueError:
        return 0


def _curl_fetch(url):
    """amazon.de 版 curl_cffi 抓取（detail_verifier 依赖本函数做 DE ASIN 详情验证）。"""
    # 直接 curl（本地直连 amazon.de 常被墙，成功率低但值得先试）
    html = _fetch_page(url)
    if html:
        return html
    # curl_cffi + TLS 指纹伪装（de-DE 语言头，无 cookie 时 Amazon 会给 EU 价）
    try:
        from curl_cffi import requests as cffi_req
        resp = cffi_req.get(
            url, impersonate="chrome",
            headers={"Accept-Language": "de-DE,de;q=0.9,en;q=0.8"},
            timeout=15)
        if resp.status_code == 200 and _is_valid_response(resp.text):
            print(f"  curl_cffi OK (len={len(resp.text)})", file=sys.stderr)
            return resp.text
    except ImportError:
        pass
    except Exception as e:
        print(f"  curl_cffi error: {e}", file=sys.stderr)
    # Cloudflare Worker 代理兜底
    try:
        worker_url = f"{CLOUDFLARE_WORKER_URL}?url={urllib.parse.quote(url, safe='')}"
        result = subprocess.run(
            ["curl", "-s", "-L", "--compressed",
             "--connect-timeout", "10", "--max-time", "30",
             "-H", f"User-Agent: {USER_AGENT}",
             worker_url],
            capture_output=True, text=True, timeout=45)
        if _is_valid_response(result.stdout):
            print(f"  Worker proxy OK (len={len(result.stdout)})", file=sys.stderr)
            return result.stdout
    except Exception as e:
        print(f"  Worker proxy error: {e}", file=sys.stderr)
    # CloakBrowser 预热 context 兜底（2026-10-23 补：DE 详情页 curl 通道 22s 空手而归；
    # thread-local 冷启动 goto 30s 超时也挂——预热首页 + de-DE context 实测 10s/3MB 稳定）
    try:
        from playwright.sync_api import sync_playwright
        from sources.amazon_uk import CLOAKBROWSER_CHROME
        with sync_playwright() as p:
            browser = p.chromium.launch(executable_path=CLOAKBROWSER_CHROME, headless=True)
            ctx = browser.new_context(locale="de-DE", timezone_id="Europe/Berlin")
            page = ctx.new_page()
            try:
                page.goto("https://www.amazon.de/", timeout=30000, wait_until="domcontentloaded")
                page.wait_for_timeout(1500)
            except Exception:
                pass  # 预热失败不阻塞主 goto
            page.goto(url, timeout=45000, wait_until="domcontentloaded")
            page.wait_for_timeout(2500)
            html = page.content()
            if html and _is_valid_response(html):
                print(f"  CloakBrowser warm OK (len={len(html)})", file=sys.stderr)
                return html
            browser.close()
    except Exception as e:
        print(f"  CloakBrowser warm error: {e}", file=sys.stderr)
    return ""


def _parse_amazon_de_page(html, category, channel_type):
    """Parse Amazon DE page HTML for products."""
    products = []
    if not html or len(html) < 1000:
        return products
    
    import html as htmlmod
    
    # Split HTML by data-asin blocks
    blocks = re.split(r'data-asin="([A-Z0-9]{10})"', html)
    
    seen_asins = set()
    for i in range(1, len(blocks) - 1, 2):
        asin = blocks[i]
        block = blocks[i + 1]
        
        if asin in seen_asins or not asin:
            continue
        seen_asins.add(asin)
        
        # Extract title
        title_match = re.search(r'<img[^>]*alt="([^"]{15,300})"', block)
        title = htmlmod.unescape(title_match.group(1)).strip() if title_match else ""
        title = re.sub(r'\s+', ' ', title).strip()
        
        # Extract image URL
        img_url = ""
        img_match = re.search(r'<img[^>]*src="(https?://[^"]*amazon\.(de|fr|com)/images/I/[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"', block, re.I)
        if not img_match:
            img_match = re.search(r'<img[^>]*src="(https?://[^"]*amazon\.(de|fr|com)/images/I/[^"]+_AC_[^"]*)"', block)
        if img_match:
            img_url = img_match.group(1)
        
        # Extract price — 德国站格式「9,99 €」「12,34 €」。
        # 逐个 pattern 尝试（前面的解析出 0 才走下一个）：
        #   1) a-price/a-offscreen 结构（FR 的 class 常带修饰符，如
        #      "a-offscreen a-color-price"，必须用 [^"]* 通配）
        #   2) data-csa-c-price-to-pay 属性
        #   3) 块内任意「28,57 €」文本（FR 榜单页大量使用，兜底主力）
        # 旧版正则 `class="a-offscreen"` 精确匹配 + `$` 锚点 bug 导致
        # 30 个产品块只解析出 2 个、长期 0 产品。
        price = 0
        for _pat in (
            r'class="[^"]*a-offscreen[^"]*"[^>]*>([^<]+)<',
            r'data-csa-c-price-to-pay="([^"]+)"',
            r'class="[^"]*p13n-sc-price[^"]*"[^>]*>([^<]+)',
            r'(\d{1,3}(?:[\s\u00a0\u202f]\d{3})*(?:[.,]\d{2}))\s*[€€]',
            r'[€€]\s*(\d{1,3}(?:[\s\u00a0\u202f]\d{3})*(?:[.,]\d{2}))',
        ):
            _m = re.search(_pat, block)
            if _m:
                price = _parse_de_price(_m.group(1))
                if price > 0:
                    break

        # Extract review count — 德语「26.514 Sternebewertungen」（句点千分位，兼容法式空格）
        review_match = re.search(r'(\d[\d\s\u00a0\u202f.,]*)\s*(?:Sternebewertungen|Bewertungen|Rezensionen|avis|commentaires)', block, re.I)
        if not review_match:
            review_match = re.search(r'>(\d[\d,]*)</span>\s*</a>', block)
        review_count = 0
        if review_match:
            rv = re.sub(r'[\s\u00a0\u202f]', '', review_match.group(1))
            rv = re.sub(r'[\s\u00a0\u202f.]', '', review_match.group(1)).replace(',', '')  # 德式句点千分位+法式空格+欧式逗号小数兜底全剥
            try:
                review_count = int(rv)
            except ValueError:
                review_count = 0

        # Extract rating — 德语「4,5 von 5 Sternen」，兼容法 sur/英 out of
        rating = 0.0
        rating_match = (
            re.search(r'(\d+[.,]?\d?)\s*(?:von|sur|/|out of)\s*5', block, re.I)
        )
        if rating_match:
            try:
                rating = float(rating_match.group(1).replace(',', '.'))
            except ValueError:
                rating = 0
        if rating > 5:
            rating = 0
        
        if title and price > 0:
            # Validate category
            title_lower = title.lower()
            validators = CATEGORY_VALIDATORS.get(category, [])
            if validators and not any(kw in title_lower for kw in validators):
                continue
            
            products.append({
                "asin": asin,
                "name": title[:120],
                "price": price,
                "reviews": review_count,
                "rating": rating,
                "rank": len(products) + 1,
                "category": category,
                "channel": channel_type,
                "channel_name": CHANNEL_NAMES.get(channel_type, channel_type),
                "review_info": f"{review_count} Bewertungen, {rating}★" if rating else f"{review_count} avis",
                "amazon_url": f"https://www.amazon.de/dp/{asin}",
                "image_url": img_url,
                "currency": "EUR",
                "platform": "Amazon-DE",
            })
    
    return products


def fetch(max_per_channel=3):
    """Fetch Amazon DE data from New Releases."""
    all_products = []
    seen_asins = set()
    
    # Rotate categories
    rotation_file = BASE / "data" / "last_categories_fr.json"
    last_cats = {}
    if rotation_file.exists():
        try:
            last_cats = json.loads(rotation_file.read_text())
        except:
            pass
    
    categories = list(AMAZON_DE_URLS.keys())
    # 按「类目|渠道」完整 key 轮换（旧版只记类目名，bsr 渠道永远轮不到）
    covered = set(last_cats.get("picked", []))
    uncovered = [c for c in categories if c not in covered]

    if uncovered:
        picked = random.sample(uncovered, min(max_per_channel, len(uncovered)))
    else:
        # 全部覆盖过一轮，随机重开
        picked = random.sample(categories, min(max_per_channel, len(categories)))

    last_cats["picked"] = picked
    
    # Save rotation
    rotation_file.parent.mkdir(parents=True, exist_ok=True)
    rotation_file.write_text(json.dumps(last_cats))
    
    print(f"🇫🇷 开始扫描Amazon DE... ({len(picked)} 个类别)", file=sys.stderr)
    
    for key in picked:
        cat, channel = key.split("|")
        url = AMAZON_DE_URLS[key]
        print(f"  扫描: {cat} ({channel})", file=sys.stderr)
        
        html = _fetch_page(url)
        if not html:
            print(f"    ⚠️ 获取失败", file=sys.stderr)
            continue
        
        products = _parse_amazon_de_page(html, cat, channel)
        for p in products:
            if p['asin'] not in seen_asins:
                seen_asins.add(p['asin'])
                all_products.append(p)
        
        print(f"    ✅ 获取 {len(products)} 个产品", file=sys.stderr)
        time.sleep(1)  # Rate limiting
    
    print(f"✅ 扫描完成: {len(all_products)} 个产品", file=sys.stderr)
    return all_products


def main():
    """Main entry point."""
    import asyncio
    from datetime import datetime
    
    products = fetch()
    
    # Save results
    output_dir = BASE / 'data' / 'channels'
    output_dir.mkdir(parents=True, exist_ok=True)
    
    date_str = datetime.now().strftime('%Y-%m-%d')
    scan_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    output_file = output_dir / f'{date_str}_fr_raw.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            'scan_date': date_str,
            'scan_time': scan_time,
            'platform': 'Amazon-DE',
            'products': products,
            'stats': {
                'total': len(products),
                'categories': len(AMAZON_DE_URLS),
            }
        }, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 结果已保存: {output_file}")
    return products


if __name__ == '__main__':
    main()
