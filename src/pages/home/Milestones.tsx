import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileCheck, ClipboardCheck, Tag, Award, type LucideIcon } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

type Milestone = {
  date: string
  title: string
  desc: string
  icon: LucideIcon
  highlight?: boolean
}

const MILESTONES: Milestone[] = [
  {
    date: '2023.12',
    title: '国家发明专利公布',
    desc: '《一种雪花肉羊的培育方法》获国家发明专利公布，育种方法自主可控。',
    icon: FileCheck,
  },
  {
    date: '2024.01',
    title: '通过省级现场初审',
    desc: '新品种生产性能测定通过省级现场初审，具备新品种申报条件。',
    icon: ClipboardCheck,
  },
  {
    date: '2025.12',
    title: '「超白羊」商标注册',
    desc: '注册「超白羊」商标，布局雪花羊肉品牌化产品。',
    icon: Tag,
  },
  {
    date: '2026.04',
    title: '通过新品系成果认证',
    desc: '我国首个自主培育的专门化雪花肉羊新品系，打破国外长期垄断。',
    icon: Award,
    highlight: true,
  },
]

/** 重大成果板块（深色 pine-950，4 张里程碑卡，末卡金色高亮） */
export default function Milestones() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.milestone-head',
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
        '.milestone-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.milestone-grid', start: 'top 75%' },
        },
      )
      // 高亮卡金色描边呼吸
      gsap.fromTo(
        '.milestone-glow',
        { opacity: 0.35 },
        {
          opacity: 1,
          duration: 1.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          scrollTrigger: { trigger: '.milestone-grid', start: 'top 75%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-pine-950 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="milestone-head">
          <Eyebrow text="Achievements" />
        </div>
        <h2 className="milestone-head mt-4 font-serif text-3xl font-bold text-ivory-50 md:text-4xl">
          成果认证 · 国家认可
        </h2>

        <div className="milestone-grid mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MILESTONES.map((m) => {
            const Icon = m.icon
            return (
              <article
                key={m.date}
                className={`milestone-card glass-hover group relative rounded-2xl border p-6 md:p-7 ${
                  m.highlight
                    ? 'milestone-glow glass-dark !border-wheat-400/60 shadow-card-hover lg:scale-[1.04]'
                    : 'glass-dark'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-fraunces text-2xl font-bold tabular-nums text-wheat-400">
                    {m.date}
                  </span>
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      m.highlight ? 'bg-wheat-400 text-pine-950' : 'bg-wheat-400/15 text-wheat-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-ivory-50 md:text-xl">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.8] text-ivory-50/70">{m.desc}</p>
                {m.highlight && (
                  <span className="mt-4 inline-block rounded-md bg-wheat-400/15 px-2.5 py-1 font-inter text-[11px] uppercase tracking-[0.2em] text-wheat-300">
                    National First
                  </span>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
