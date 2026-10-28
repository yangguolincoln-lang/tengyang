import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Eyebrow from '@/components/Eyebrow'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

type NewsItem = {
  id: string
  year: string
  date: string
  title: string
  summary: string
  tag: string
  source: string
  url?: string
  image?: string
  imageAlt?: string
}

/** 时间倒序（2026 最新在前），数据均来自公开报道 */
const NEWS: NewsItem[] = [
  {
    id: 'sd-market-w39-2026',
    year: '2026',
    date: '2026.09.30',
    title: '山东第 39 周行情：羊肉均价 80.24 元/公斤突破「80 元」区间，创 2024 年以来新高',
    summary: '山东省畜牧兽医局监测：第 39 周（9 月 21—27 日）全省羊肉均价 80.24 元/公斤（同比 +10.60%、环比 +0.66%），突破 80 元区间、创 2024 年以来新高；活羊出栏均价 31.21 元/公斤（同比 +14.24%、环比 +0.61%），羊粮比价 13.11:1，肉羊养殖维持盈利；判断国庆假期走货加快、价格上行，四季度消费旺季回升动力增强。',
    tag: '行业动态',
    source: '山东省畜牧兽医局',
    url: 'http://xm.shandong.gov.cn/art/2026/9/30/art_101456_10366076.html',
  },
  {
    id: 'intl-nz-exports-2026',
    year: '2026',
    date: '2026.09.29',
    title: '新西兰红肉出口 2025/26 年度创 132 亿纽币纪录：羊肉出口额同比 +26% 至 52 亿纽币，量平价升',
    summary: '新西兰肉类行业协会数据：2025/26 财年红肉出口额达 132 亿纽币（同比 +21%），其中羊肉出口额增长 26% 至 52 亿纽币、出口量基本持平，呈现「以价补量」格局；美国（38 亿）、中国（27 亿）、欧盟（19 亿纽币）为前三大市场。Beef + Lamb NZ 预计 2026-27 年度牛、羊、羊毛合计收入 126 亿纽币，全球供应偏紧继续支撑国际羊价高位，利好国内高端羊肉替代与自主品种价值。',
    tag: '国际动态',
    source: 'B2B News（新西兰）',
    url: 'https://b2bnews.co.nz/news/nz-red-meat-exports-surge-23-percent-as-rivals-hit-trade-walls/',
  },
  {
    id: 'intl-au-china-2026',
    year: '2026',
    date: '2026.09.29',
    title: '澳大利亚 2025 年对华羊肉出口 11.9 万吨、9.34 亿澳元，中国跃居其羊肉第一大出口市场',
    summary: '澳大利亚绵羊生产者协会（SPA）CEO 访华观察：按 MLA 市场快照，2025 日历年澳大利亚对华羊肉出口 119,163 吨、价值 9.34 亿澳元，中国超越美国成为其羊肉出口量第一大市场；中国同时是澳洲最大的羊肉（mutton）市场与第二大羔羊（lamb）市场。全球绵羊存栏收缩、出口供给偏紧背景下，进口羊肉到岸成本抬升，为黄河口雪花羊等国产高端羊肉腾出价格与渠道空间。',
    tag: '国际动态',
    source: 'Sheep Producers Australia',
    url: 'https://sheepproducers.com.au/post/from-the-ceo-s-desk-china-industry-visit-september-2026',
  },
  {
    id: 'sd-market-w38-2026',
    year: '2026',
    date: '2026.09.21',
    title: '山东第 38 周行情：羊肉均价 79.71 元/公斤再创年内新高',
    summary: '山东省畜牧兽医局监测：第 38 周（9 月 14—20 日）全省羊肉均价 79.71 元/公斤（同比 +10.71%、环比 +0.37%），活羊出栏均价 31.02 元/公斤（同比 +14.00%、环比 +0.55%），羊粮比价 12.98:1，肉羊养殖维持盈利；判断后期活羊与羊肉价格以震荡回暖、小幅回升为主。',
    tag: '行业动态',
    source: '山东省畜牧兽医局',
    url: 'http://xm.shandong.gov.cn/art/2026/9/21/art_101456_10363955.html',
  },
  {
    id: 'ccpd-orders-2026',
    year: '2026',
    date: '2026.09.20',
    title: '中国网「两山」染绿黄河岸：盐窝镇「胚胎工厂+龙头企业+合作社/养殖户」订单化联营，黄三角肉羊繁育群达 3 万只',
    summary: '中国网报道：利津县盐窝镇科研团队采用超数排卵加胚胎移植，对核心种羊实施精准扩繁，一只优质母羊一次可取 10 多枚胚胎、一年可繁育 5 轮，胚胎移植受孕率稳定在 80% 以上，「黄三角肉羊」核心群达 3000 只、繁育群达 30000 只；龙头企业统一提供基础母羊、胚胎移植和营养方案并对优质羊羔保价回购；黄河口滩羊全产业链产值 131.7 亿元，全年供应北京市场 20 万只、占北京鲜羊市场 15% 份额。',
    tag: '科研',
    source: '中国网',
    url: 'http://ccpd.china.com.cn/2026-09/20/content_43494780.html',
  },
  {
    id: 'sd-market-w37-2026',
    year: '2026',
    date: '2026.09.17',
    title: '山东第 37 周行情：羊肉均价 79.42 元/公斤再创年内新高',
    summary: '山东省畜牧兽医局监测：第 37 周（9 月 7—13 日）全省羊肉均价 79.42 元/公斤（同比 +10.55%、环比 +0.05%），活羊出栏均价 30.85 元/公斤（同比 +13.84%、环比 +0.49%），羊粮比价 12.85:1，肉羊养殖维持盈利；判断后期活羊与羊肉价格以震荡回暖、小幅回升为主。',
    tag: '行业动态',
    source: '山东省畜牧兽医局',
    url: 'http://xm.shandong.gov.cn/art/2026/9/17/art_101456_10363015.html',
  },
  {
    id: 'sd-market-w36-2026',
    year: '2026',
    date: '2026.09.09',
    title: '山东第 36 周行情：羊肉均价 79.38 元/公斤再创年内新高',
    summary: '山东省畜牧兽医局监测：第 36 周（8 月 31 日—9 月 6 日）全省羊肉均价 79.38 元/公斤（同比 +10.71%、环比 +0.53%），活羊出栏均价 30.70 元/公斤（同比 +13.41%），羊粮比价 12.74:1，肉羊养殖维持盈利。',
    tag: '行业动态',
    source: '山东省畜牧兽医局',
    url: 'http://xm.shandong.gov.cn/art/2026/9/9/art_24714_10361255.html',
  },
  {
    id: 'precision-nutrition-2026',
    year: '2026',
    date: '2026.09.04',
    title: '精准营养研究：数字监测、多组学与功能性添加剂走向一体化',
    summary: '《Animal Advances》综述提出，将可穿戴与图像传感、人工智能预测和宏基因组、代谢组、转录组信息结合，形成可动态调整的精准营养框架，为反刍动物健康、生产效率与减排协同管理提供新思路。',
    tag: '科研',
    source: 'Animal Advances',
    url: 'https://maxapress.com/article/doi/10.48130/animadv-0026-0011',
  },
  {
    id: 'rumen-betaine-meat-2026',
    year: '2026',
    date: '2026.09.04',
    title: '过瘤胃甜菜碱研究揭示肌内脂肪与羊肉嫩度调控线索',
    summary: '《Metabolites》一项 60 只藏羊、90 天饲喂试验显示，在日粮中添加 0.08% 过瘤胃甜菜碱与肌内脂肪沉积增加、部分不饱和脂肪酸提高，以及剪切力、蒸煮损失和硬度下降相关；其应用仍需结合品种与日粮验证。',
    tag: '科研',
    source: 'Metabolites / PubMed',
    url: 'https://pubmed.ncbi.nlm.nih.gov/42783775/',
  },
  {
    id: 'yellow-river-forum-held-2026',
    year: '2026',
    date: '2026.09.03',
    title: '第三届（2026）肉羊产业黄河论坛在利津举办',
    summary: '论坛于 9 月 3—4 日在利津县举行，同期举办山东省羊病绿色防控技术交流大会，主题「科技赋能 绿色低碳 提质增效」，规模 500 余人；按议程设开幕式、授牌仪式与新品发布秀。',
    tag: '产业',
    source: '饲料市场信息网（第二轮通知）',
    url: 'http://m.chinafeedm.com/nd.jsp?groupId=6&id=31669&mid=5',
  },
  {
    id: 'shearing-contest-2026',
    year: '2026',
    date: '2026.09.02',
    title: '2026 山东盐窝「北元杯」剪羊毛大赛在盐窝镇举办',
    summary: '大赛系山东羊业大会重要分会场活动，参赛总名额 30 个（男子组 20 名、女子组 10 名），全国剪毛能手与行业专家齐聚「山东肉羊产业第一大镇」。',
    tag: '产业',
    source: '中国网',
    url: 'https://mtz.china.com/touzi/2026/0830/263619.html',
  },
  {
    id: 'sd-market-w35-2026',
    year: '2026',
    date: '2026.09.03',
    title: '山东第 35 周行情：羊肉均价 78.96 元/公斤再创年内新高',
    summary: '山东省畜牧兽医局监测：第 35 周（8 月 24—30 日）全省羊肉均价 78.96 元/公斤（同比 +10.25%），活羊出栏均价 30.57 元/公斤（同比 +13.6%），养殖端维持盈利。',
    tag: '行业动态',
    source: '山东省畜牧兽医局 / 山东省畜牧总站',
    url: 'http://xm.shandong.gov.cn/art/2026/9/4/art_24614_10360415.html',
  },
  {
    id: 'sd-animal-sci-award-2026',
    year: '2026',
    date: '2026.09.02',
    title: '「黄三角肉羊新品系选育与配套技术产业化应用」获 2026 年度山东省畜牧科学技术奖二等奖（拟授奖公示）',
    summary: '山东省畜牧协会公示 2026 年度山东省畜牧科学技术奖拟授奖成果 21 项（一等奖 6 项、二等奖 7 项、三等奖 8 项）：该项目列科学技术成果二等奖首位，主要完成单位含山东腾洋育纯农牧科技有限公司、中国科学院西北生态环境资源研究院、山东省华坤乡村振兴研究院有限责任公司、山东鲁澳新羊科技有限公司、黄河口滩羊产业技术研究院，主要完成人丛海涛、杨果等 10 人；公示期 9 月 2—6 日。',
    tag: '荣誉资质',
    source: '山东省畜牧协会',
    url: 'http://www.sdxmxh.com/infoList.jsp?upCateId=000002&infoId=1902',
  },
  {
    id: 'dzwww-breeding-2026',
    year: '2026',
    date: '2026.09.01',
    title: '利津「黄三角肉羊」新品系进入繁育阶段，雪花纹 M5 级别占比超 10%',
    summary: '大众网报道：园区与中国科学院西北院杨果团队联合攻关，新品系依托全基因组选择、基因芯片测定等技术培育；日增重达 350 克，产羔率提升至 230%，屠宰率达 56%，单只羊综合增收 10% 以上。',
    tag: '科研',
    source: '大众网（来源：利津宣传）',
    url: 'https://dongying.dzwww.com/xsq/ljx/ljxyaonews/202609/t20260901_18074740.htm',
  },
  {
    id: 'tech-sme-2026',
    year: '2026',
    date: '2026.08.24',
    title: '腾洋育纯入选山东省 2026 年第 3 批科技型中小企业名单',
    summary: '山东省科技厅公示第 3 批 12678 家拟入库科技型中小企业名单（公示期 8 月 24 日—9 月 4 日），山东腾洋育纯农牧科技有限公司在列（注册地：东营市广饶县）；公示无异议后纳入全国科技型中小企业信息库。公司继 2024 年入库后再次通过年度评价。',
    tag: '荣誉资质',
    source: '山东省科学技术厅',
    url: 'http://kjt.shandong.gov.cn/art/2026/8/24/art_13360_10327510.html',
  },
  {
    id: 'market-report-2026',
    year: '2026',
    date: '2026.08.12',
    title: '2026 年 1—7 月中国活羊、羊肉市场行情报告：后市「震荡上行、旺季冲高」',
    summary: '报告判断 2026 年 8—12 月价格中枢高于上半年及去年同期；产能低位、能繁母羊修复周期长、进口收缩为主要支撑，9 月起稳步上涨，四季度迎全年价格高点。',
    tag: '行业动态',
    source: '玉湖福谷（转载自行业媒体）',
    url: 'https://www.frozengoods.com.hk/zh-CN/news/6603?cate=126&child=9',
  },
  {
    id: 'dongying-h1-2026',
    year: '2026',
    date: '2026.08.10',
    title: '2026 年上半年东营市畜牧业运行平稳，肉羊存出栏同比增长',
    summary: '东营市现代畜牧业发展服务中心数据：上半年全市肉蛋奶总产量 43.2 万吨，肉羊存出栏量均实现同比增长，行业整体维持盈利。',
    tag: '行业动态',
    source: '东营网 / 东营日报、齐鲁网',
    url: 'https://news.dongyingnews.cn/system/2026/08/10/010894803.shtml',
  },
  {
    id: 'sdnews-2026',
    year: '2026',
    date: '2026.08.07',
    title: '山东利津：盐碱地上，一只羊的「百亿逆袭」',
    summary: '全基因组测序（2 万余份样本）锁定「雪花」性状主效基因，核心群 3000 多只；2025 年黄河口滩羊全产业链产值 131.7 亿元，下一步扩群至 2 万只后申报农业农村部新品种审定。',
    tag: '头条',
    source: '山东新闻网',
    url: 'http://sd.sdnews.com.cn/yw/202608/t20260807_4719212.htm',
    image: '/marble-meat.jpg',
    imageAlt: '雪花羊肉大理石纹理特写',
  },
  {
    id: 'chinadaily-2026',
    year: '2026',
    date: '2026.07.22',
    title: '黄河口滩羊全产业链升级，盐碱地跑出百亿富民产业',
    summary: '黄三角肉羊产羔率稳定在 230%—260%，平均日增重 350 克，6—8 个月即可出栏；种群扩容至 2 万只、通过国家级新品种审定后将规模化推向市场。',
    tag: '产业',
    source: '中国日报中文网',
    url: 'https://cn.chinadaily.com.cn/a/202607/22/WS6a6026daa310d709c2fbeed2.html',
  },
  {
    id: 'jjrb-2026',
    year: '2026',
    date: '2026.07.14',
    title: '经济日报：黄三角肉羊打破国外高端雪花肉羊种质长期垄断',
    summary: '利津盐窝镇黄河口滩羊产业园培育的黄三角肉羊通过新品系成果认证，是我国首个自主培育的专门化雪花肉羊新品系；园区建有国家级胚胎育种中心和 CNAS 生物基因工程实验室，全链条产值超 130 亿元。',
    tag: '媒体聚焦',
    source: '经济日报',
    url: 'http://www.jingjiribao.cn/static/detail.jsp?id=669513',
  },
  {
    id: 'hebei-cycle-2026',
    year: '2026',
    date: '2026.07.13',
    title: '行业分析：养羊行业完成「筑底」，四季度或迎年内价格高峰',
    summary: '经过 4 年深度去产能，行业处于周期反转临界点；2026 年前 4 个月羊肉进口量同比下降 23.96%，进口低价冲击减弱，9—12 月消费旺季屠宰企业抢收羊源。',
    tag: '行业动态',
    source: '东方网（转载自行业分析）',
    url: 'https://mini.eastday.com/mobile/260713110210218967033.html',
  },
  {
    id: 'forum-2026',
    year: '2026',
    date: '2026.06.22',
    title: '第三届（2026）肉羊产业黄河论坛将于 9 月落地利津',
    summary: '论坛定于 2026 年 9 月 3—4 日在利津县举办，主题「科技赋能 绿色低碳 提质增效」；2025 年利津肉羊出栏突破 370 万只，稳居山东省第一。',
    tag: '产业',
    source: '饲料市场（chinafeedm.com）',
    url: 'http://www.chinafeedm.com/h-nd-31669.html',
  },
  {
    id: 'dongying-press-2026',
    year: '2026',
    date: '2026.06.09',
    title: '东营畜牧业「十四五」收官：黄河口滩羊全产业链产值突破 130 亿元',
    summary: '2025 年全市羊出栏量居全省首位，牧业总产值 119.7 亿元；「十五五」将深耕黄河口滩羊、黄河三角洲奶业两大集群，推进总投资 15.49 亿元的 11 个重点项目。',
    tag: '产业',
    source: '大众网 / 东营市畜牧业高质量发展新闻发布会',
    url: 'https://dongying.dzwww.com/dyxw/202606/t20260609_17821110.htm',
  },
  {
    id: 'dzwww-survey-2026',
    year: '2026',
    date: '2026.05.29',
    title: '蹲点调查：盐碱地育出高端「雪花羊」，利津上演「逆袭记」',
    summary: '利津年出栏肉羊 370 万只、存栏 170 万只，90% 产能集中在盐窝镇；年供北京市场 20 万只、占有率超十分之一，屠宰能力由 20 万只提升至 140 万只。',
    tag: '媒体聚焦',
    source: '大众网 / 山东省畜牧兽医局',
    url: 'https://sd.dzwww.com/sdnews/202605/t20260529_17783345.htm',
    image: '/worker-care.jpg',
    imageAlt: '牧场技术人员检查羊只',
  },
  {
    id: 'spring-2026',
    year: '2026',
    date: '2026.02.14',
    title: '新春走基层：黄河口跑出「中国羊」新高度，肉质可媲美顶级牛肉',
    summary: '中科院杨果团队在黄河口生物基因工程研发中心推进「雪花羊」新品系申报，计划核心群扩至 2 万只，培育拥有自主知识产权的肉羊新种质。',
    tag: '科研',
    source: '大众日报（腾讯新闻转载）',
    url: 'https://news.qq.com/rain/a/20260214A03SP300',
  },
]

const YEARS = ['全部', '2026'] as const

/** Section 3 · 新闻时间线（年份筛选 + 纵向金色时间轴） */
export default function Timeline() {
  const [year, setYear] = useState<(typeof YEARS)[number]>('全部')
  const listRef = useRef<HTMLDivElement>(null)

  // 竖线随滚动 scaleY 生长（scrub）
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 80%', 'end 70%'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  const filtered = useMemo(
    () => (year === '全部' ? NEWS : NEWS.filter((n) => n.year === year)),
    [year],
  )

  return (
    <section className="bg-ivory-100 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Eyebrow text="Timeline" />
        <h2 className="mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">新闻时间线</h2>

        {/* 年份筛选 Tab：金色下划线指示器（layoutId 滑动） */}
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-b border-ink-900/10" role="tablist" aria-label="按年份筛选">
          {YEARS.map((y) => {
            const active = year === y
            return (
              <button
                key={y}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setYear(y)}
                className={cn(
                  'relative cursor-pointer pb-3 text-sm font-medium tracking-wide transition-colors',
                  active ? 'text-pine-700' : 'text-ink-400 hover:text-ink-900',
                )}
              >
                {y}
                {active && (
                  <motion.span
                    layoutId="news-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* 纵向时间线 */}
        <div ref={listRef} className="relative mt-12 pl-8 md:pl-12">
          {/* 左侧 2px 金色竖线（scrub 生长） */}
          <motion.div
            className="absolute bottom-4 left-[5px] top-2 w-[2px] origin-top bg-gradient-to-b from-wheat-400 via-wheat-400/70 to-wheat-300/40"
            style={{ scaleY: lineScale }}
            aria-hidden
          />

          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                layout="position"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group relative rounded-2xl px-5 py-6 transition-colors duration-300 hover:bg-wheat-400/[0.06] md:px-7 [&+article]:mt-2"
              >
                {/* 节点圆点（hover 脉冲） */}
                <span className="absolute -left-8 top-9 flex h-3.5 w-3.5 items-center justify-center md:-left-12" aria-hidden>
                  <span className="absolute h-full w-full rounded-full bg-wheat-400/40 opacity-0 group-hover:animate-ping group-hover:opacity-100" />
                  <span className="relative h-3.5 w-3.5 rounded-full border-2 border-wheat-400 bg-ivory-100 transition-colors group-hover:bg-wheat-400" />
                </span>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <time className="font-fraunces text-xl font-bold tabular-nums text-wheat-600 md:text-2xl">
                    {item.date}
                  </time>
                  <span className="rounded-md border border-pine-700/25 px-2.5 py-1 text-xs font-medium text-pine-700">
                    {item.tag}
                  </span>
                </div>

                <div className={cn('mt-3 flex gap-6', item.image && 'flex-col sm:flex-row')}>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg font-semibold text-ink-900 md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-[1.8] text-ink-600">
                      {item.summary}
                    </p>
                    <p className="mt-2 text-xs text-ink-400">
                      来源：{item.source}
                      {item.url && (
                        <>
                          {' · '}
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-pine-700 underline-offset-2 transition-colors hover:text-wheat-600 hover:underline"
                          >
                            查看原文
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                  {item.image && (
                    <div className="w-full shrink-0 overflow-hidden rounded-xl sm:w-40 md:w-48">
                      <img
                        src={item.image}
                        alt={item.imageAlt ?? item.title}
                        className="aspect-[8/5] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
