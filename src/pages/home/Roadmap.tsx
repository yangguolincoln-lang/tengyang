import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, CircleDot, Circle } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

type Step = {
  status: 'done' | 'active' | 'todo'
  date: string
  title: string
  desc: string
}

const STEPS: Step[] = [
  {
    status: 'done',
    date: '2026.04',
    title: '新品系成果认证',
    desc: '我国首个自主培育的专门化雪花肉羊新品系，已完成认证。',
  },
  {
    status: 'active',
    date: '进行中',
    title: '核心群 3000 只 → 扩繁至 2 万只',
    desc: '总投资 9.88 亿元建设雪花羊繁育基地，形成 5 万只/年繁育能力。',
  },
  {
    status: 'todo',
    date: '下一步',
    title: '农业农村部新品种审定',
    desc: '完成国家层面新品种审定，种业自主「芯片」再进一步。',
  },
  {
    status: 'todo',
    date: '远景',
    title: '入选《国家畜禽遗传资源品种名录》',
    desc: '跻身国家名录，雪花肉羊规模化推向市场。',
  },
]

const STATUS_ICON = { done: Check, active: CircleDot, todo: Circle }

/** 发展前景板块（浅色 ivory，横向 4 步路线图，移动端纵向） */
export default function Roadmap() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.roadmap-head',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
      gsap.fromTo(
        '.roadmap-step',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: { trigger: '.roadmap-track', start: 'top 75%' },
        },
      )
      // 桌面：金色连接线生长；移动：纵向生长
      gsap.fromTo(
        '.roadmap-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.roadmap-track', start: 'top 75%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="roadmap-head">
          <Eyebrow text="Roadmap" />
        </div>
        <h2 className="roadmap-head mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
          从实验室，到餐桌
        </h2>
        <p className="roadmap-head mt-4 max-w-2xl text-sm leading-[1.9] text-ink-600 md:text-base">
          从「为别人育肥」到「为自己育种」—— 一条清晰可见的产业化路线图。
        </p>

        <div className="roadmap-track relative mt-12">
          {/* 桌面水平连接线 */}
          <div
            className="absolute left-6 right-6 top-6 hidden h-px bg-ink-900/10 lg:block"
            aria-hidden
          >
            <div className="roadmap-line h-full w-full origin-left bg-gradient-to-r from-wheat-400 to-wheat-300" />
          </div>
          {/* 移动竖线 */}
          <div className="absolute bottom-6 left-[23px] top-6 w-px bg-ink-900/10 lg:hidden" aria-hidden>
            <div className="roadmap-line h-full w-full origin-top bg-gradient-to-b from-wheat-400 to-wheat-300" />
          </div>

          <ol className="relative grid grid-cols-1 gap-10 pl-16 lg:grid-cols-4 lg:gap-8 lg:pl-0">
            {STEPS.map((s) => {
              const Icon = STATUS_ICON[s.status]
              const active = s.status === 'active'
              return (
                <li key={s.title} className="roadmap-step relative lg:pt-0">
                  <span
                    className={`absolute -left-16 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 lg:static lg:mb-6 ${
                      s.status === 'done'
                        ? 'border-wheat-400 bg-wheat-400 text-pine-950'
                        : active
                          ? 'border-wheat-400 bg-white text-wheat-600'
                          : 'border-ink-900/15 bg-white text-ink-400'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${active ? 'animate-pulse' : ''}`} />
                  </span>
                  <div
                    className={`rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 ${
                      active
                        ? 'border border-wheat-400/70 bg-white shadow-card-hover'
                        : 'border border-ink-900/8 bg-white shadow-card hover:shadow-card-hover'
                    }`}
                  >
                    <p
                      className={`font-inter text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        active ? 'text-wheat-600' : 'text-ink-400'
                      }`}
                    >
                      {s.date}
                      {s.status === 'done' && ' · 已完成'}
                      {active && ' · 当前重点'}
                    </p>
                    <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-ink-900">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-[1.8] text-ink-600">{s.desc}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
