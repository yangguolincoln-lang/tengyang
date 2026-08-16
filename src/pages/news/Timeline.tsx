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
  image?: string
  imageAlt?: string
}

/** 时间倒序（2026 → 2023） */
const NEWS: NewsItem[] = [
  {
    id: 'media-tour-2026',
    year: '2026',
    date: '2026.07–08',
    title: '「一只羊的百亿逆袭」全国媒体利津行集中报道',
    summary: '全国主流媒体走进利津，聚焦雪花羊产业从盐碱地到百亿产值的跨越。',
    tag: '媒体聚焦',
  },
  {
    id: 'media-report-2026',
    year: '2026',
    date: '2026.05–06',
    title: '主流媒体蹲点报道「盐碱地育出高端雪花羊」',
    summary: '多家主流媒体蹲点园区，记录雪花肉羊从实验室走向牧场的育种历程。',
    tag: '媒体聚焦',
  },
  {
    id: 'cert-2026',
    year: '2026',
    date: '2026.04',
    title: '黄三角肉羊通过新品系成果认证',
    summary: '我国首个自主培育的专门化雪花肉羊新品系诞生，高端肉羊种源实现自主可控。',
    tag: '里程碑',
    image: '/marble-meat.jpg',
    imageAlt: '雪花羊肉大理石纹理特写',
  },
  {
    id: 'trademark-2025',
    year: '2025',
    date: '2025.12',
    title: '注册「超白羊」商标',
    summary: '布局羊肉、羊奶等品牌化产品，打通从牧场到餐桌的品牌链路。',
    tag: '品牌',
  },
  {
    id: 'herd-2024',
    year: '2024',
    date: '2024.11',
    title: '雪花羊核心群存栏达 3000 多只',
    summary: '“为肉羊产业创芯”，规模化繁育体系成型。',
    tag: '繁育',
    image: '/worker-care.jpg',
    imageAlt: '牧场技术人员检查羊只',
  },
  {
    id: 'review-2024',
    year: '2024',
    date: '2024.01.10',
    title: '新品种生产性能测定暨现场初审',
    summary: '专家组一致认为「黄三角肉羊」具备新品种申报条件。',
    tag: '里程碑',
  },
  {
    id: 'patent-2023',
    year: '2023',
    date: '2023.12',
    title: '发明专利正式公布',
    summary: '《一种雪花肉羊的培育方法》获国家发明专利公布。',
    tag: '专利',
  },
  {
    id: 'pilot-2023',
    year: '2023',
    date: '2023.05',
    title: '繁育科研项目进入中试阶段',
    summary: '雪花肉羊从实验室走向规模化验证。',
    tag: '科研',
  },
]

const YEARS = ['全部', '2026', '2025', '2024', '2023'] as const

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
