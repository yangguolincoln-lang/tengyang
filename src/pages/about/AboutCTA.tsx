import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/** 底部 CTA：pine-950 横幅 + 双按钮 */
export default function AboutCTA() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题逐词上移淡入
      gsap.fromTo(
        '.about-cta-word',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
      // 按钮弹入
      gsap.fromTo(
        '.about-cta-btn',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.6)',
          stagger: 0.12,
          delay: 0.35,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-pine-950 py-16 md:py-24">
      <div className="gold-gradient-line absolute left-0 right-0 top-0 h-px" aria-hidden />

      <div className="relative mx-auto max-w-[1280px] px-5 text-center md:px-12">
        <h3 className="font-serif text-2xl font-bold leading-snug text-ivory-50 md:text-3xl">
          {Array.from('想了解我们的品种与科研？').map((ch, i) => (
            <span key={i} className="about-cta-word inline-block will-change-transform">
              {ch}
            </span>
          ))}
        </h3>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <span className="about-cta-btn inline-block">
            <Link
              to="/breed"
              className="btn-glow group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-8 py-3.5 font-bold text-pine-950 transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              探索核心品种
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </span>
          <span className="about-cta-btn inline-block">
            <Link
              to="/tech"
              className="inline-flex items-center gap-2.5 rounded-full border border-wheat-400/70 px-8 py-3.5 font-medium text-wheat-300 transition-all duration-300 hover:bg-wheat-400/10 active:scale-95"
            >
              走进科技创新
              <ArrowRight className="h-5 w-5" />
            </Link>
          </span>
        </div>
      </div>
    </section>
  )
}
