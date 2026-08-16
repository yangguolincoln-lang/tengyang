import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sprout, Dna, ClipboardCheck, Award, type LucideIcon } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

type Node = {
  year: string
  title: string
  desc: string
  icon: LucideIcon
  highlight?: boolean
}

const NODES: Node[] = [
  {
    year: '起点 · 约15年前',
    title: '锁定方向',
    desc: '以山东小尾寒羊为母本、澳洲白羊为父本，开启雪花肉羊选育。',
    icon: Sprout,
  },
  {
    year: '攻坚 · 持续选育',
    title: '排序杂交 · 多代选育',
    desc: '择优定型、横交固定、提纯复壮，自主构建 GBS 液相芯片与基因数据库。',
    icon: Dna,
  },
  {
    year: '2024.01',
    title: '通过现场初审',
    desc: '「黄三角肉羊」新品种生产性能测定，专家组一致认为具备新品种申报条件。',
    icon: ClipboardCheck,
  },
  {
    year: '2026',
    title: '通过新品系成果认证',
    desc: '我国首个自主培育的专门化雪花肉羊新品系，打破国外长期垄断。',
    icon: Award,
    highlight: true,
  },
]

export default function Journey() {
  const rootRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    // 桌面：pin 150vh 横向滚动叙事
    mm.add('(min-width: 768px)', () => {
      const track = trackRef.current
      if (!track || !rootRef.current) return
      const getDistance = () => track.scrollWidth - rootRef.current!.clientWidth

      const tween = gsap.to(track, {
        x: () => -getDistance() * 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // 金色进度线与滚动同步
      gsap.fromTo(
        '.journey-progress',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: true,
          },
        },
      )

      // 节点卡进入视口中心时描边亮起
      gsap.utils.toArray<HTMLElement>('.journey-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.45 },
          {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left 75%',
              end: 'left 35%',
              scrub: true,
            },
          },
        )
      })

      // 背景缓慢横向视差
      gsap.to('.journey-bg', {
        xPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    // 移动端：纵向时间轴，卡片依次上移淡入
    mm.add('(max-width: 767px)', () => {
      gsap.utils.toArray<HTMLElement>('.journey-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          },
        )
      })
      gsap.fromTo(
        '.journey-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: true,
          },
        },
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="home-journey"
      ref={rootRef}
      className="relative overflow-hidden bg-pine-900 py-14 md:flex md:min-h-[100dvh] md:flex-col md:justify-center md:py-0"
    >
      {/* 背景图 12% 透明度铺底 */}
      <div className="journey-bg pointer-events-none absolute inset-0 scale-110" aria-hidden>
        <img src="/flock-pasture.jpg" alt="" className="h-full w-full object-cover opacity-[0.12]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <Eyebrow text="Breeding Journey" />
        <h2 className="mt-4 font-serif text-3xl font-bold text-ivory-50 md:text-4xl">
          十五年，一条自主育种之路
        </h2>
      </div>

      {/* 横向轨道（桌面）/ 纵向时间轴（移动） */}
      <div className="relative mt-12 md:mt-16">
        {/* 桌面水平进度线 */}
        <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-white/10 md:block" aria-hidden>
          <div className="journey-progress h-full w-full origin-left bg-gradient-to-r from-wheat-400 to-wheat-300" />
        </div>
        {/* 移动竖线 */}
        <div className="absolute bottom-0 left-[27px] top-0 w-px bg-white/10 md:hidden" aria-hidden>
          <div className="journey-progress h-full w-full origin-top bg-gradient-to-b from-wheat-400 to-wheat-300" />
        </div>

        <div
          ref={trackRef}
          className="relative flex flex-col gap-10 pl-16 pr-5 md:w-max md:flex-row md:gap-8 md:py-24 md:pl-[max(3rem,calc((100vw-1280px)/2+3rem))] md:pr-24"
        >
          {NODES.map((n) => (
            <article
              key={n.title}
              className={`journey-card relative w-full shrink-0 rounded-2xl border p-6 backdrop-blur-sm transition-colors md:w-[380px] md:p-8 ${
                n.highlight
                  ? 'border-wheat-400/70 bg-pine-950/80 md:scale-[1.05]'
                  : 'border-white/10 bg-pine-950/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-fraunces text-2xl font-bold text-wheat-400">{n.year}</span>
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${
                    n.highlight ? 'bg-wheat-400 text-pine-950' : 'bg-wheat-400/15 text-wheat-300'
                  }`}
                >
                  <n.icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-5 font-serif text-xl font-bold text-ivory-50 md:text-2xl">{n.title}</h3>
              <p className="mt-3 text-sm leading-[1.8] text-ivory-50/70">{n.desc}</p>
              {n.highlight && (
                <span className="mt-4 inline-block rounded-md bg-wheat-400/15 px-2.5 py-1 font-inter text-[11px] uppercase tracking-[0.2em] text-wheat-300">
                  Milestone
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
