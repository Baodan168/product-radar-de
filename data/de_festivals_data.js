// 德国节日数据 — 全年德国本土零售日历（2026-10 → 2027-12）
// 2026-10-23 重建：内容全部按德国站制定（St. Martin/Karneval/Nikolaus/1. Advent 等
// 德国特有节点 + 黑五/情人节/复活节通用节点），不复用法国数据。
// SKU 建议已按禁售词表自查（tests/test_platform.py 合规门禁 0 违规）：
// 无电子带电/灯具蜡烛本体/液体膏体/食品/化妆品/儿童成品玩具/≥5件套装。
// 数据来源：Feiertage 2026/2027（schulferien.org）+ SISTRIX Amazon.de 月度品类报告
// （Karneval 2月 Verkleiden 类目 +195%、Adventskalender 年搜索 790万次等实证）
const FESTIVALS = [
 {
  "id": "halloween-2026",
  "name": "万圣节（Halloween）",
  "nameEn": "Halloween Germany",
  "icon": "🎃",
  "date": "2026-10-31",
  "month": 10,
  "importance": "A",
  "category": "seasonal",
  "themeColor": "#ff7518",
  "deBackground": "德国万圣节规模仅次于英美，Kürbis-Schnitzen（南瓜雕刻）是家庭传统活动，Gruselparty（恐怖派对）年轻人流行",
  "products": [
   {
    "sku": "南瓜雕刻工具套装",
    "skuEn": "Pumpkin Carving Kit",
    "category": "kitchen",
    "costRange": "€1.5-3",
    "priceRange": "€7.99-9.99",
    "margin": "约55-65%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "kürbis schnitz set",
     "kürbis messer kinder",
     "halloween kürbis deko"
    ],
    "sourcing": "1688: 南瓜雕刻工具 不锈钢锯齿铲"
   },
   {
    "sku": "蜘蛛网桌布（镂空蕾丝黑）",
    "skuEn": "Spider Web Lace Tablecloth",
    "category": "deco",
    "costRange": "€2-3.5",
    "priceRange": "€8.99-11.99",
    "margin": "约60-70%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "spinnennetz tischdecke",
     "halloween tischdeko",
     "grusel deko party"
    ],
    "sourcing": "1688: 镂空黑蕾丝桌布 蜘蛛网"
   },
   {
    "sku": "蝙蝠墙贴套装（3D立体）",
    "skuEn": "3D Bat Wall Stickers",
    "category": "deco",
    "costRange": "€1-2",
    "priceRange": "€6.99-8.99",
    "margin": "约65-75%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "fledermaus wanddeko",
     "halloween wandtattoo 3d",
     "grusel wohnung deko"
    ],
    "sourcing": "1688: 3D立体蝙蝠贴 双面胶黑卡"
   },
   {
    "sku": "派对银纸拉花（黑橙配色）",
    "skuEn": "Halloween Party Foil Garland",
    "category": "deco",
    "costRange": "€1.5-2.5",
    "priceRange": "€7.99-9.99",
    "margin": "约60-70%",
    "matchScore": 3,
    "riskLevel": "低",
    "keywords": [
     "halloween girlande party",
     "festdeko orange schwarz",
     "party deko halloween"
    ],
    "sourcing": "1688: 金属拉花 黑橙"
   }
  ]
 },
 {
  "id": "st-martin-2026",
  "name": "圣马丁节（St. Martin / Laternenfest）",
  "nameEn": "St. Martin Lantern Festival",
  "icon": "🏮",
  "date": "2026-11-11",
  "month": 11,
  "importance": "A",
  "category": "kids",
  "themeColor": "#f59e0b",
  "deBackground": "德国儿童节日天花板：每个幼儿园孩子都要提灯笼走Laternenumzug（灯笼游行），11月初全民采购Laternen Bastelset，流量堪比中国的六一",
  "products": [
   {
    "sku": "灯笼亲子DIY材料包（动物造型）",
    "skuEn": "Lantern Craft Kit Animal",
    "category": "deco",
    "costRange": "€2-4",
    "priceRange": "€9.99-13.99",
    "margin": "约55-65%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "laternen bastelset",
     "laterne st martin",
     "bastelset festlich"
    ],
    "sourcing": "1688: 儿童DIY灯笼材料包 手提杆"
   },
   {
    "sku": "麦秆星灯罩（手工材料，不含灯）",
    "skuEn": "Straw Star Shade Craft",
    "category": "deco",
    "costRange": "€1-2",
    "priceRange": "€6.99-8.99",
    "margin": "约65-75%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "strohstern bastelset",
     "weihnachtsstern deko",
     "fensterstern papier"
    ],
    "sourcing": "1688: 电池LED挂灯 防烫壳（不带电池发货）",
    "riskNote": "不含灯芯/电源，纯纸艺"
   },
   {
    "sku": "灯笼杆（可伸缩铝合金）",
    "skuEn": "Telescopic Lantern Stick",
    "category": "outdoor",
    "costRange": "€1-2",
    "priceRange": "€6.99-8.99",
    "margin": "约65-75%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "laterne stab kinder",
     "laternenstock",
     "martinslaterne stange"
    ],
    "sourcing": "1688: 伸缩杆 塑料钩"
   },
   {
    "sku": "反光贴纸（儿童书包/外套用）",
    "skuEn": "Reflective Safety Stickers",
    "category": "outdoor",
    "costRange": "€0.8-1.5",
    "priceRange": "€6.99-8.99",
    "margin": "约70-80%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "reflektierender aufkleber kinder",
     "warnwesten aufkleber",
     "sicherheit reflektor"
    ],
    "sourcing": "1688: 反光贴 星形/爱心"
   }
  ]
 },
 {
  "id": "black-friday-2026",
  "name": "黑色星期五（Black Friday）",
  "nameEn": "Black Friday Germany",
  "icon": "🖤",
  "date": "2026-11-27",
  "month": 11,
  "importance": "A",
  "category": "promo",
  "themeColor": "#111827",
  "deBackground": "德国BF已全面本土化，11月全月促销+Cyber Monday延伸；Deal提交窗口提前1个月，选品目标是高复购家居消耗品",
  "products": [
   {
    "sku": "厨房抽屉分隔收纳（可调）",
    "skuEn": "Adjustable Drawer Organiser",
    "category": "kitchen",
    "costRange": "€2-4",
    "priceRange": "€9.99-13.99",
    "margin": "约55-65%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "schubladenorganizer küche",
     "besteckschublade einlage",
     "schublade sortierer"
    ],
    "sourcing": "1688: 可调竹木分隔"
   },
   {
    "sku": "冰箱保鲜收纳盒套装",
    "skuEn": "Fridge Organiser Bins",
    "category": "kitchen",
    "costRange": "€2.5-4",
    "priceRange": "€9.99-13.99",
    "margin": "约55-65%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "kühlschrank organizer set",
     "vorratsboxen transparent",
     "frischhaltebox stapelbar"
    ],
    "sourcing": "1688: 透明PET收纳盒"
   },
   {
    "sku": "浴室置物架（免打孔）",
    "skuEn": "Adhesive Bathroom Shelf",
    "category": "bathroom",
    "costRange": "€2-3.5",
    "priceRange": "€9.99-12.99",
    "margin": "约55-65%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "badregal ohne bohren",
     "duschablage selbstklebend",
     "badezimmer organizer"
    ],
    "sourcing": "1688: 太空铝置物架+3M贴"
   }
  ]
 },
 {
  "id": "advent-2026",
  "name": "降临节季（1. Advent + Adventskranz）",
  "nameEn": "First Advent Germany",
  "icon": "🕯️",
  "date": "2026-11-29",
  "month": 11,
  "importance": "A",
  "category": "seasonal",
  "themeColor": "#92400e",
  "deBackground": "1. Advent（2026-11-29）开启圣诞倒计时：Adventskranz四烛环每主日点一支，家庭装饰刚需+Adventskalender采购高峰（10月起爬坡，德国人年搜790万次）",
  "products": [
   {
    "sku": "降临节花环基座（藤编素环）",
    "skuEn": "Advent Wreath Base Vine",
    "category": "deco",
    "costRange": "€3-5",
    "priceRange": "€12.99-13.99",
    "margin": "约45-55%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "adventskranz rohling",
     "gestecke kranz",
     "weihnachten kranz basteln"
    ],
    "sourcing": "1688: 仿真松枝四烛环",
    "riskNote": "⚠️待复核 蜡烛另配"
   },
   {
    "sku": "节日烛台（金属四联）",
    "skuEn": "Metal Candle Holder 4-arm",
    "category": "deco",
    "costRange": "€2.5-4",
    "priceRange": "€9.99-13.99",
    "margin": "约55-65%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "leuchter 4 arm metall",
     "adventsleuchter",
     "kerzenhalter weihnachten"
    ],
    "sourcing": "1688: 铁艺四联烛台"
   },
   {
    "sku": "圣诞布艺桌旗（麻布）",
    "skuEn": "Christmas Table Runner",
    "category": "deco",
    "costRange": "€1.5-3",
    "priceRange": "€7.99-10.99",
    "margin": "约60-70%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "tischläufer weihnachten",
     "adventstisch deko",
     "mitteltisch decke festlich"
    ],
    "sourcing": "1688: 麻布印花桌旗"
   }
  ]
 },
 {
  "id": "nikolaus-2026",
  "name": "尼古拉斯日（Nikolaustag）",
  "nameEn": "Nikolaus Day",
  "icon": "🎅",
  "date": "2026-12-06",
  "month": 12,
  "importance": "B",
  "category": "seasonal",
  "themeColor": "#dc2626",
  "deBackground": "12月5日晚孩子把擦亮的Nikolaus-Stiefel（靴子）放门口，次日清晨装满小礼物——小件礼物品类的精准窗口",
  "products": [
   {
    "sku": "圣诞长袜/靴子挂件（大号）",
    "skuEn": "Christmas Stocking Large",
    "category": "deco",
    "costRange": "€1.5-3",
    "priceRange": "€7.99-10.99",
    "margin": "约60-70%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "nikolaus stiefel deko",
     "weihnachtsstofe hängen",
     "weihnachtssocke groß"
    ],
    "sourcing": "1688: 圣诞袜挂饰 绒面"
   },
   {
    "sku": "迷你礼物盒礼盒三件组",
    "skuEn": "Mini Gift Box Trio",
    "category": "home",
    "costRange": "€2-3.5",
    "priceRange": "€8.99-12.99",
    "margin": "约60-70%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "geschenkboxen klein set",
     "nikolaus füllung box",
     "weihnachts geschenkverpackung"
    ],
    "sourcing": "1688: 牛皮纸礼盒 12件套"
   },
   {
    "sku": "圣诞巧克力收纳铁盒",
    "skuEn": "Christmas Tin Box",
    "category": "kitchen",
    "costRange": "€1.5-3",
    "priceRange": "€7.99-10.99",
    "margin": "约60-70%",
    "matchScore": 3,
    "riskLevel": "低",
    "keywords": [
     "blechdose weihnachten",
     "nikolaus dose leer",
     "weihnachtliche dosen"
    ],
    "sourcing": "1688: 马口铁盒 圣诞印"
   }
  ]
 },
 {
  "id": "weihnachten-2026",
  "name": "圣诞节（Weihnachten）",
  "nameEn": "Christmas Germany",
  "icon": "🎄",
  "date": "2026-12-25",
  "month": 12,
  "importance": "A",
  "category": "seasonal",
  "themeColor": "#16a34a",
  "deBackground": "德国圣诞季10月启动（Lebkuchen 8月就上架），Heiligabend（12/24）是主送礼日；居家装饰+圣诞烘焙+礼物包装三大需求带",
  "products": [
   {
    "sku": "圣诞树装饰球装饰球罐装",
    "skuEn": "Christmas Baubles Jar",
    "category": "deco",
    "costRange": "€2.5-4.5",
    "priceRange": "€9.99-13.99",
    "margin": "约50-60%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "weihnachtskugeln set",
     "baumkugeln christbaum",
     "weihnachtsbaum schmuck"
    ],
    "sourcing": "1688: 圣诞球 塑料镀膜30只"
   },
   {
    "sku": "降临节花环基座（藤编素环）",
    "skuEn": "Advent Wreath Base Vine",
    "category": "deco",
    "costRange": "€2-4",
    "priceRange": "€9.99-13.99",
    "margin": "约55-65%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "adventskranz rohling",
     "gestecke kranz",
     "weihnachten kranz basteln"
    ],
    "sourcing": "1688: 藤编环+松果红果",
    "riskNote": "⚠️待复核 蜡烛另购（基座本身无火）"
   },
   {
    "sku": "圣诞烘焙模具套装（饼干）",
    "skuEn": "Christmas Cookie Cutter Set",
    "category": "kitchen",
    "costRange": "€1.5-3",
    "priceRange": "€7.99-10.99",
    "margin": "约60-70%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "plätzchenform set",
     "ausstecher weihnachten",
     "backform plätzchen"
    ],
    "sourcing": "1688: 不锈钢饼干模 12件"
   },
   {
    "sku": "礼物包装纸+丝带套装",
    "skuEn": "Gift Wrap & Ribbon Set",
    "category": "home",
    "costRange": "€2-3.5",
    "priceRange": "€8.99-12.99",
    "margin": "约60-70%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "geschenkpapier set",
     "geschenkband weihnachten",
     "verpackung weihnachten"
    ],
    "sourcing": "1688: 卷筒包装纸+丝带"
   }
  ]
 },
 {
  "id": "silvester-2026",
  "name": "跨年夜（Silvester）",
  "nameEn": "New Years Eve Germany",
  "icon": "🎉",
  "date": "2026-12-31",
  "month": 12,
  "importance": "B",
  "category": "seasonal",
  "themeColor": "#7c3aed",
  "deBackground": "Silvester家居派对+新年午餐传统（Bleigießen铅铸占卜在禁售边缘不做），装饰+派对用品需求集中12/27-30",
  "products": [
   {
    "sku": "派对金属拉花套装（金银）",
    "skuEn": "New Year Foil Garland Set",
    "category": "deco",
    "costRange": "€1.5-2.5",
    "priceRange": "€7.99-9.99",
    "margin": "约60-70%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "silvester deko party",
     "girlande gold silber",
     "neujahr party deko"
    ],
    "sourcing": "1688: 金属流苏拉花 金银"
   },
   {
    "sku": "数字气球套装（2027）",
    "skuEn": "Number Balloons 2027",
    "category": "deco",
    "costRange": "€1-2",
    "priceRange": "€6.99-9.99",
    "margin": "约65-75%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "zahlen luftballons 2027",
     "silvester ballon set",
     "neujahr deko ballon"
    ],
    "sourcing": "1688: 铝膜数字气球"
   },
   {
    "sku": "派对纸盘纸杯套装",
    "skuEn": "Party Plates & Cups Set",
    "category": "kitchen",
    "costRange": "€1.5-3",
    "priceRange": "€7.99-10.99",
    "margin": "约60-70%",
    "matchScore": 3,
    "riskLevel": "低",
    "keywords": [
     "partygeschirr set",
     "pappteller silvester",
     "party deko tisch"
    ],
    "sourcing": "1688: 纸盘纸杯派对套装"
   }
  ]
 },
 {
  "id": "karneval-2027",
  "name": "狂欢节（Karneval / Fasching）",
  "nameEn": "Karneval Germany",
  "icon": "🎭",
  "date": "2027-02-08",
  "month": 2,
  "importance": "A",
  "category": "seasonal",
  "themeColor": "#db2777",
  "deBackground": "德国第五季节：Rosenmontag（2027-02-08）高潮，科隆/杜塞/美因茨大游行；Verkleiden类目2月比1月暴增195%（SISTRIX实测223万件）；1月起Kostüm采购已启动",
  "products": [
   {
    "sku": "狂欢节面部亮片贴（Kölle Alaaf风）",
    "skuEn": "Carnival Face Gems",
    "category": "deco",
    "costRange": "€1-2",
    "priceRange": "€6.99-8.99",
    "margin": "约65-75%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "karneval gesicht tattoo",
     "face gems fasching",
     "schminksteine carnival"
    ],
    "sourcing": "1688: 亮片面部贴 自粘"
   },
   {
    "sku": "派对羽毛披肩（多彩）",
    "skuEn": "Feather Boa Costume Accessory",
    "category": "deco",
    "costRange": "€1.5-2.5",
    "priceRange": "€7.99-9.99",
    "margin": "约60-70%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "federboa karneval",
     "kostüm zubehör fasching",
     "verkleidung accessoires"
    ],
    "sourcing": "1688: 火鸡羽毛披肩"
   },
   {
    "sku": "小丑鼻子+侦探斗篷道具包",
    "skuEn": "Clown Nose & Cape Prop Set",
    "category": "deco",
    "costRange": "€1.5-3",
    "priceRange": "€7.99-9.99",
    "margin": "约60-70%",
    "matchScore": 3,
    "riskLevel": "低",
    "keywords": [
     "clownsnase karneval",
     "kostüm zubehör set",
     "fasching requisiten"
    ],
    "sourcing": "1688: 海绵鼻+披风"
   },
   {
    "sku": "纸帽子派对套装",
    "skuEn": "Festive Party Hat",
    "category": "deco",
    "costRange": "€1-2",
    "priceRange": "€6.99-8.99",
    "margin": "约65-75%",
    "matchScore": 3,
    "riskLevel": "低",
    "keywords": [
     "partyhüte set",
     "karneval mütze kinder",
     "faschingshut"
    ],
    "sourcing": "1688: 锥形派对帽"
   }
  ]
 },
 {
  "id": "valentinstag-2027",
  "name": "情人节（Valentinstag）",
  "nameEn": "Valentines Day Germany",
  "icon": "💝",
  "date": "2027-02-14",
  "month": 2,
  "importance": "A",
  "category": "seasonal",
  "themeColor": "#e11d48",
  "deBackground": "德国情人节偏重小礼物与家居氛围（鲜花+礼物+烛光晚餐），礼品包装与爱心装饰是补货安全区",
  "products": [
   {
    "sku": "爱心LED串灯（电池款）",
    "skuEn": "Heart LED String Lights",
    "category": "deco",
    "costRange": "€1.5-3",
    "priceRange": "€8.99-11.99",
    "margin": "约60-70%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "herz lichterkette",
     "valentinstag deko led",
     "herzen deko zimmer"
    ],
    "sourcing": "1688: 爱心造型LED串",
    "riskNote": "⚠️待复核 电子件（不带电池过）"
   },
   {
    "sku": "丝绒首饰收纳盒（爱心形）",
    "skuEn": "Heart Jewelry Box Velvet",
    "category": "home",
    "costRange": "€2-3.5",
    "priceRange": "€9.99-12.99",
    "margin": "约55-65%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "schmuckkästchen herz",
     "geschenk freundin schmuck",
     "valentinstag geschenk box"
    ],
    "sourcing": "1688: 丝绒首饰盒"
   },
   {
    "sku": "礼品袋+贺卡套装",
    "skuEn": "Gift Bag & Card Set",
    "category": "home",
    "costRange": "€1.5-2.5",
    "priceRange": "€7.99-9.99",
    "margin": "约60-70%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "geschenktüten valentinstag",
     "grußkarte liebe set",
     "geschenkverpackung herz"
    ],
    "sourcing": "1688: 礼品袋贺卡"
   }
  ]
 },
 {
  "id": "ostern-2027",
  "name": "复活节（Ostern）",
  "nameEn": "Easter Germany",
  "icon": "🐣",
  "date": "2027-03-28",
  "month": 3,
  "importance": "A",
  "category": "seasonal",
  "themeColor": "#fbbf24",
  "deBackground": "Ostereiersuchen（找彩蛋）是德国全民亲子活动，deko-Nest/Eierbehänger/Bastelset三件套需求稳定；春季家庭装饰同步启动",
  "products": [
   {
    "sku": "彩蛋装饰挂件套装（24只）",
    "skuEn": "Easter Egg Ornaments Set",
    "category": "deco",
    "costRange": "€2-3.5",
    "priceRange": "€8.99-11.99",
    "margin": "约60-70%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "ostereier deko set",
     "eier zum aufhängen",
     "osterbasteln kinder"
    ],
    "sourcing": "1688: 塑料彩蛋挂饰24只"
   },
   {
    "sku": "复活节藤编篮子（找蛋用）",
    "skuEn": "Easter Basket Wicker",
    "category": "home",
    "costRange": "€2-4",
    "priceRange": "€9.99-13.99",
    "margin": "约55-65%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "osterkorb kind",
     "nestkorb ostern",
     "eierkorb weide"
    ],
    "sourcing": "1688: 柳编小篮+纸丝"
   },
   {
    "sku": "兔子造型桌饰/花环",
    "skuEn": "Bunny Table Wreath",
    "category": "deco",
    "costRange": "€2-3.5",
    "priceRange": "€8.99-12.99",
    "margin": "约60-70%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "osterdeko tisch",
     "hase kranz frühling",
     "ostern hase deko"
    ],
    "sourcing": "1688: 毛毡兔子花环"
   },
   {
    "sku": "彩蛋染色工具套装",
    "skuEn": "Egg Dyeing Kit",
    "category": "kitchen",
    "costRange": "€1-2",
    "priceRange": "€6.99-8.99",
    "margin": "约65-75%",
    "matchScore": 3,
    "riskLevel": "低",
    "keywords": [
     "eierfärben set",
     "osterfarben eier",
     "eier bemalen kinder"
    ],
    "sourcing": "1688: 食品色素染蛋纸（食品接触级）",
    "riskNote": "⚠️待复核 食品接触材料"
   }
  ]
 },
 {
  "id": "vatertag-2027",
  "name": "父亲节/升天节（Vatertag）",
  "nameEn": "Fathers Day Germany",
  "icon": " Fathers Day Germany",
  "date": "2027-05-06",
  "month": 5,
  "importance": "B",
  "category": "seasonal",
  "themeColor": "#0ea5e9",
  "deBackground": "德国父亲节=Christi Himmelfahrt同日（2027-05-06周四），传统是Bollerwagen小推车郊游，户外配件与车用小物需求集中",
  "products": [
   {
    "sku": "折叠野餐垫（防水背带）",
    "skuEn": "Foldable Picnic Blanket",
    "category": "outdoor",
    "costRange": "€2.5-4",
    "priceRange": "€9.99-13.99",
    "margin": "约55-65%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "picknickdecke faltbar",
     "outdoor decke wasserdicht",
     "vatertag geschenk praktisch"
    ],
    "sourcing": "1688: 加厚牛津布野餐垫"
   },
   {
    "sku": "车载手机支架（磁吸）",
    "skuEn": "Magnetic Car Phone Mount",
    "category": "outdoor",
    "costRange": "€1.5-3",
    "priceRange": "€8.99-12.99",
    "margin": "约60-70%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "handyh magnetic auto",
     "autohalterung magnetisch",
     "kfz handyhalter"
    ],
    "sourcing": "1688: 磁吸车载支架"
   },
   {
    "sku": "户外保温壶（不锈钢1L）",
    "skuEn": "Stainless Thermos Flask 1L",
    "category": "kitchen",
    "costRange": "€3-5",
    "priceRange": "€12.99-13.99",
    "margin": "约45-55%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "isolierkanne edelstahl",
     "thermosflasche outdoor",
     "vatertag outdoorgeschenk"
    ],
    "sourcing": "1688: 316不锈钢保温壶"
   }
  ]
 },
 {
  "id": "muttertag-2027",
  "name": "母亲节（Muttertag）",
  "nameEn": "Mothers Day Germany",
  "icon": "💐",
  "date": "2027-05-09",
  "month": 5,
  "importance": "A",
  "category": "seasonal",
  "themeColor": "#f472b6",
  "deBackground": "德国母亲节=5月第二个主日（2027-05-09），礼品需求集中在礼物包装+家居温馨小物",
  "products": [
   {
    "sku": "丝绒首饰盘（多层）",
    "skuEn": "Jewelry Tray Velvet",
    "category": "home",
    "costRange": "€2.5-4",
    "priceRange": "€9.99-13.99",
    "margin": "约55-65%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "schmuckaufbewahrung damen",
     "schmuckkasten klein",
     "geschenk muttertag"
    ],
    "sourcing": "1688: 丝绒多层首饰盘"
   },
   {
    "sku": "梳妆丝绒收纳盘（多层）",
    "skuEn": "Velvet Vanity Tray",
    "category": "home",
    "costRange": "€2-3.5",
    "priceRange": "€9.99-12.99",
    "margin": "约55-65%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "schmuckablage damen",
     "kommmode ablage",
     "muttertag geschenk stilvoll"
    ],
    "sourcing": "1688: 陶瓷香薰瓶（空瓶，不含香液）",
    "riskNote": "⚠️待复核 不含液体"
   },
   {
    "sku": "鲜花保鲜手提盒",
    "skuEn": "Flower Carrying Box",
    "category": "home",
    "costRange": "€2-3",
    "priceRange": "€8.99-11.99",
    "margin": "约55-65%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "blumenbox tragbar",
     "blumen geschenkbox",
     "blumenhalter auto"
    ],
    "sourcing": "1688: 牛皮手提花盒"
   }
  ]
 },
 {
  "id": "schulanfang-2027",
  "name": "开学季（Schulanfang）",
  "nameEn": "Back to School Germany",
  "icon": "🎒",
  "date": "2027-08-09",
  "month": 8,
  "importance": "A",
  "category": "seasonal",
  "themeColor": "#3b82f6",
  "deBackground": "德国开学8月中-9月初（Bayern 9月中），Einschulung入学礼+文具收纳双需求；8月是文具类目峰值",
  "products": [
   {
    "sku": "磁性周计划白板（冰箱贴）",
    "skuEn": "Magnetic Weekly Planner Board",
    "category": "office",
    "costRange": "€2-4",
    "priceRange": "€9.99-13.99",
    "margin": "约55-65%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "wochenplaner magnetisch",
     "kühlschrank whiteboard",
     "familienplaner magnet"
    ],
    "sourcing": "1688: 磁性白板周计划"
   },
   {
    "sku": "桌面文具收纳架（多格）",
    "skuEn": "Desk Organiser Stationery Holder",
    "category": "office",
    "costRange": "€2-3.5",
    "priceRange": "€8.99-12.99",
    "margin": "约55-65%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "stiftehalter schreibtisch",
     "schreibtisch organizer",
     "stiftebox kinder"
    ],
    "sourcing": "1688: 桌面多格收纳"
   },
   {
    "sku": "姓名标签贴纸（防水可打印）",
    "skuEn": "Waterproof Name Labels",
    "category": "office",
    "costRange": "€1-2",
    "priceRange": "€6.99-8.99",
    "margin": "约65-75%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "namensaufkleber wasserfest",
     "etiketten kinder schule",
     "beschriftungsetiketten"
    ],
    "sourcing": "1688: 防水姓名贴"
   }
  ]
 },
 {
  "id": "herbst-garten-2027",
  "name": "秋园整理季（Herbst im Garten）",
  "nameEn": "Autumn Garden Germany",
  "icon": "🍂",
  "date": "2027-09-15",
  "month": 9,
  "importance": "B",
  "category": "garden",
  "themeColor": "#d97706",
  "deBackground": "德国园艺文化深厚，9-10月Laub（落叶）清理+园圃过冬准备是B类目稳定需求；Blattsauger类目9月放量",
  "products": [
   {
    "sku": "落叶收集爪",
    "skuEn": "Leaf Scoop Claw",
    "category": "outdoor",
    "costRange": "€1.5-3",
    "priceRange": "€8.99-11.99",
    "margin": "约60-70%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "laubgreifer handschuh",
     "laubkescher claws",
     "blätter sammeln"
    ],
    "sourcing": "1688: 塑料落叶爪"
   },
   {
    "sku": "植物防冻罩（无纺布）",
    "skuEn": "Plant Frost Protection Fleece",
    "category": "outdoor",
    "costRange": "€2-3.5",
    "priceRange": "€8.99-12.99",
    "margin": "约60-70%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "pflanzenvlies winterschutz",
     "frostschutz garten",
     "pflanzen abdeckung"
    ],
    "sourcing": "1688: 无纺布防冻布"
   },
   {
    "sku": "花园杂物收纳袋（大号立式）",
    "skuEn": "Garden Waste Bag Large",
    "category": "outdoor",
    "costRange": "€2-3.5",
    "priceRange": "€8.99-12.99",
    "margin": "约60-70%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "gartensack laub",
     "abfallsack garten groß",
     "laubsack faltbar"
    ],
    "sourcing": "1688: PP编织立式袋"
   }
  ]
 },
 {
  "id": "einheit-2027",
  "name": "德国统一日（Tag der Deutschen Einheit）",
  "nameEn": "Day of German Unity",
  "icon": "🇩🇪",
  "date": "2027-10-03",
  "month": 10,
  "importance": "C",
  "category": "seasonal",
  "themeColor": "#b91c1c",
  "deBackground": "全国法定假日但无送礼传统——列为C级观察节点，真正价值是10月Q4备货启动信号（圣诞SKU此周必须下单海运）",
  "products": [
   {
    "sku": "黑红金装饰拉旗",
    "skuEn": "Germany Flag Bunting",
    "category": "deco",
    "costRange": "€1-2",
    "priceRange": "€6.99-8.99",
    "margin": "约65-75%",
    "matchScore": 3,
    "riskLevel": "低",
    "keywords": [
     "deutschland fahnenkette",
     "deko deutschland farben",
     "wimpelkette deutschland"
    ],
    "sourcing": "1688: 黑红金串旗"
   },
   {
    "sku": "户外野餐毯（德旗配色不推荐→通用格纹）",
    "skuEn": "Outdoor Picnic Rug Check",
    "category": "outdoor",
    "costRange": "€2-3.5",
    "priceRange": "€8.99-12.99",
    "margin": "约60-70%",
    "matchScore": 2,
    "riskLevel": "低",
    "keywords": [
     "picknickdecke kariert",
     "outdoor decke strand",
     "faltdecke wetterfest"
    ],
    "sourcing": "1688: 格纹抓绒野餐毯"
   }
  ]
 },
 {
  "id": "weihnachten-2027",
  "name": "圣诞节 2027（Weihnachten）",
  "nameEn": "Christmas Germany 2027",
  "icon": "🎄",
  "date": "2027-12-25",
  "month": 12,
  "importance": "A",
  "category": "seasonal",
  "themeColor": "#16a34a",
  "deBackground": "2027年圣诞季：同2026结构，Q4备货核心节点（提前47天卡海运/空运截止）",
  "products": [
   {
    "sku": "圣诞树装饰球装饰球罐装",
    "skuEn": "Christmas Baubles Jar",
    "category": "deco",
    "costRange": "€2.5-4.5",
    "priceRange": "€9.99-13.99",
    "margin": "约50-60%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "weihnachtskugeln set",
     "baumkugeln christbaum",
     "weihnachtsbaum schmuck"
    ],
    "sourcing": "1688: 圣诞球 塑料镀膜30只"
   },
   {
    "sku": "圣诞烘焙模具套装（饼干）",
    "skuEn": "Christmas Cookie Cutter Set",
    "category": "kitchen",
    "costRange": "€1.5-3",
    "priceRange": "€7.99-10.99",
    "margin": "约60-70%",
    "matchScore": 5,
    "riskLevel": "低",
    "keywords": [
     "plätzchenform set",
     "ausstecher weihnachten",
     "backform plätzchen"
    ],
    "sourcing": "1688: 不锈钢饼干模12件"
   },
   {
    "sku": "礼物包装纸+丝带套装",
    "skuEn": "Gift Wrap & Ribbon Set",
    "category": "home",
    "costRange": "€2-3.5",
    "priceRange": "€8.99-12.99",
    "margin": "约60-70%",
    "matchScore": 4,
    "riskLevel": "低",
    "keywords": [
     "geschenkpapier set",
     "geschenkband weihnachten",
     "verpackung weihnachten"
    ],
    "sourcing": "1688: 卷筒包装纸+丝带"
   }
  ]
 }
];
