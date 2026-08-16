import { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Eyebrow from '@/components/Eyebrow'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  {
    year: '约 15 年前',
    title: '育种启程',
    desc: '以小尾寒羊为母本、澳洲白羊为父本，启动雪花肉羊系统选育。',
    highlight: false,
  },
  {
    year: '2023.05',
    title: '中试阶段',
    desc: '雪花肉羊繁育科研项目全面进入中试阶段。',
    highlight: false,
  },
  {
    year: '2023.12',
    title: '发明专利公布',
    desc: '《一种雪花肉羊的培育方法》发明专利正式公布。',
    highlight: false,
  },
  {
    year: '2024.01',
    title: '通过现场初审',
    desc: '「黄三角肉羊」新品种生产性能测定，具备新品种申报条件。',
    highlight: false,
  },
  {
    year: '2024.11',
    title: '核心群成型',
    desc: '雪花羊核心群存栏达 3000 多只，“为肉羊产业创芯”。',
    highlight: false,
  },
  {
    year: '2025.12',
    title: '品牌布局',
    desc: '注册「超白羊」商标，布局羊肉、羊奶等品牌化产品。',
    highlight: false,
  },
  {
    year: '2026',
    title: '成果认证',
    desc: '黄三角肉羊通过新品系成果认证 —— 我国首个自主培育的专门化雪花肉羊新品系。',
    highlight: true,
  },
]

/** 2026 高亮节点的持续脉冲光环（scale 1→1.4，opacity 0.6→0，2s 循环） */
const PulseHalo = memo(function PulseHalo() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tween = gsap.fromTo(
      ref.current,
      { scale: 1, opacity: 0.6 },
      { scale: 1.4, opacity: 0, duration: 2, ease: 'power1.out', repeat: -1 },
    )
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <span
      ref={ref}
      className="absolute inset-0 rounded-full bg-wheat-400 will-change-transform"
      aria-hidden
    />
  )
})

export default function Timeline() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 竖线随滚动 scaleY 0→1（scrub）
      gsap.fromTo(
        '.tl-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.tl-track',
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: true,
          },
        },
      )
      // 节点圆点弹跳入场
      gsap.utils.toArray<HTMLElement>('.tl-dot').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: el, start: 'top 70%' },
          },
        )
      })
      // 卡片从对应侧滑入淡入
      gsap.utils.toArray<HTMLElement>('.tl-card').forEach((el) => {
        const fromLeft = el.dataset.side === 'left'
        gsap.fromTo(
          el,
          { x: fromLeft ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 78%' },
          },
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-ivory-100 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Eyebrow text="Milestones" />
        <h2 className="mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">发展历程</h2>

        <div className="tl-track relative mt-14">
          {/* 中央/左侧金色竖线 */}
          <span
            className="tl-line absolute bottom-0 left-[7px] top-0 w-0.5 origin-top bg-gradient-to-b from-wheat-400 via-wheat-400 to-wheat-300 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <div className="space-y-10 md:space-y-14">
            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={m.title} className="relative md:grid md:grid-cols-2 md:gap-16">
                  {/* 节点圆点 */}
                  <span
                    className={cn(
                      'tl-dot absolute left-0 top-1.5 flex items-center justify-center rounded-full md:left-1/2 md:-translate-x-1/2',
                      m.highlight ? 'h-5 w-5 -translate-x-[2px] md:-translate-x-1/2' : 'h-4 w-4 bg-wheat-400',
                    )}
                  >
                    {m.highlight ? (
                      <>
                        <PulseHalo />
                        <span className="relative h-5 w-5 rounded-full bg-wheat-400 ring-4 ring-wheat-400/25" />
                      </>
                    ) : (
                      <span className="absolute inset-0 rounded-full bg-wheat-400 ring-4 ring-wheat-400/20" />
                    )}
                  </span>

                  {/* 卡片：桌面左右交错，移动全部靠右 */}
                  <div
                    className={cn(
                      'pl-10 md:pl-0',
                      isLeft ? 'md:col-start-1 md:pr-4 md:text-right' : 'md:col-start-2 md:pl-4',
                    )}
                  >
                    <div
                      data-side={isLeft ? 'left' : 'right'}
                      className={cn(
                        'tl-card rounded-2xl bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover md:p-7',
                        m.highlight && 'ring-1 ring-wheat-400/60',
                        isLeft ? 'md:ml-auto' : 'md:mr-auto',
                        'md:max-w-md',
                      )}
                    >
                      <span className="font-fraunces text-2xl font-bold tabular-nums text-wheat-400 md:text-3xl">
                        {m.year}
                      </span>
                      <h3 className="mt-2 font-serif text-xl font-semibold text-ink-900">
                        {m.title}
                        {m.highlight && (
                          <span className="ml-3 inline-flex rounded-md bg-wheat-400/15 px-2 py-0.5 align-middle text-xs font-bold text-wheat-600">
                            里程碑
                          </span>
                        )}
                      </h3>
                      <p className="mt-2 text-sm leading-[1.8] text-ink-600">{m.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
