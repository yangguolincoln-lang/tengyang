import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Dna, FlaskConical, Store } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const PATHS = [
  {
    icon: Dna,
    title: '引种与繁育合作',
    desc: '面向养殖企业与合作社，提供黄三角肉羊种羊引种、繁育体系建设与技术服务。',
  },
  {
    icon: FlaskConical,
    title: '科研与共建合作',
    desc: '面向高校院所，开展分子育种、基因芯片、联合攻关等协作。',
  },
  {
    icon: Store,
    title: '产品与渠道合作',
    desc: '围绕「超白羊」品牌，共建羊肉、羊奶等高端产品供应链。',
  },
  {
    icon: Award,
    title: '品牌与渠道合作',
    desc: '「超白羊」雪花羊肉 / 黄河口雪花羊品鉴店，共建北京、济南等地品鉴店与直营网络。',
  },
]

export default function Cooperation() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.coop-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-ivory-100 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Eyebrow text="Cooperation" />
        <h2 className="mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">四条合作路径</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PATHS.map((p) => (
            <div
              key={p.title}
              className="coop-card group relative overflow-hidden rounded-2xl bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              {/* hover 时金色顶条生长 */}
              <span
                className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-wheat-400 to-wheat-300 transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden
              />
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pine-700/8">
                <p.icon
                  className="h-6 w-6 text-pine-700 transition-transform duration-300 group-hover:rotate-[8deg] group-hover:text-wheat-400"
                  strokeWidth={1.6}
                />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-ink-900">{p.title}</h3>
              <p className="mt-3 text-sm leading-[1.8] text-ink-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
