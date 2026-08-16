import { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Target, Telescope, Handshake } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const BELIEFS = [
  {
    icon: Target,
    title: '使命',
    en: 'Mission',
    desc: '破解肉羊产业“缺芯之痛”，让高端肉羊种源自主可控。',
  },
  {
    icon: Telescope,
    title: '愿景',
    en: 'Vision',
    desc: '成为具有国际竞争力的雪花肉羊种业品牌，让「超白羊」走向千家万户的餐桌。',
  },
  {
    icon: Handshake,
    title: '价值观',
    en: 'Values',
    desc: '长期主义 · 科学实证 · 与农户共生 · 对产业负责。',
  },
]

/** DNA 双螺旋背景装饰：5% 透明度缓慢旋转（隔离的循环动画微组件） */
const RotatingHelix = memo(function RotatingHelix() {
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const tween = gsap.to(ref.current, {
      rotation: 360,
      duration: 60,
      ease: 'none',
      repeat: -1,
    })
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <img
      ref={ref}
      src="/dna-helix.svg"
      alt=""
      aria-hidden
      className="pointer-events-none absolute -right-16 -top-16 w-72 select-none opacity-5 will-change-transform md:w-96"
    />
  )
})

export default function Beliefs() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 引言逐词入场
      gsap.fromTo(
        '.belief-word',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
      // 三卡 stagger 上移淡入
      gsap.fromTo(
        '.belief-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
      // 卡片描边金线四角生长
      gsap.fromTo(
        '.belief-corner',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-pine-950 py-14 md:py-24">
      <div className="gold-gradient-line absolute left-0 right-0 top-0 h-px" aria-hidden />
      <RotatingHelix />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow text="Our Belief" align="center" />
          <h2 className="mt-4 font-serif text-3xl font-bold text-ivory-50 md:text-4xl">
            {Array.from('使命 · 愿景 · 价值观').map((ch, i) => (
              <span key={i} className="belief-word inline-block will-change-transform">
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BELIEFS.map((b) => (
            <div
              key={b.title}
              className="belief-card group relative overflow-hidden rounded-2xl border border-wheat-400/30 bg-white/[0.03] p-8 transition-colors duration-300 hover:bg-wheat-400/[0.04]"
            >
              {/* 四角金线生长 */}
              <span className="belief-corner absolute left-0 top-0 h-6 w-6 origin-top-left border-l-2 border-t-2 border-wheat-400/70" aria-hidden />
              <span className="belief-corner absolute right-0 top-0 h-6 w-6 origin-top-right border-r-2 border-t-2 border-wheat-400/70" aria-hidden />
              <span className="belief-corner absolute bottom-0 left-0 h-6 w-6 origin-bottom-left border-b-2 border-l-2 border-wheat-400/70" aria-hidden />
              <span className="belief-corner absolute bottom-0 right-0 h-6 w-6 origin-bottom-right border-b-2 border-r-2 border-wheat-400/70" aria-hidden />

              <b.icon
                className="h-10 w-10 text-wheat-400 transition-transform duration-300 group-hover:rotate-[8deg]"
                strokeWidth={1.5}
              />
              <h3 className="mt-5 font-serif text-2xl font-semibold text-ivory-50">
                {b.title}
                <span className="ml-3 font-inter text-xs font-medium uppercase tracking-[0.3em] text-wheat-400/70">
                  {b.en}
                </span>
              </h3>
              <p className="mt-4 text-base leading-[1.8] text-ivory-50/75">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
