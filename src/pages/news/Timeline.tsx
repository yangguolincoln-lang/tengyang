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
