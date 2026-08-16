import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/** Section 4 · 媒体视角金句（深色窄条，字距收紧动画） */
export default function QuoteStrip() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 文字整体淡入 + 字距从 0.2em 收紧至正常（0.8s, power2.out，触发 30%）
      gsap.fromTo(
        '.quote-text',
        { opacity: 0, letterSpacing: '0.2em' },
        {
          opacity: 1,
          letterSpacing: '0.02em',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
      gsap.fromTo(
        '.quote-attr',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-pine-950 py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-5 text-center md:px-12">
        <div className="flex items-start justify-center gap-4 md:gap-8">
          <Quote className="quote-text mt-1 h-8 w-8 shrink-0 -scale-x-100 text-wheat-400/70 md:h-10 md:w-10" aria-hidden />
          <blockquote className="quote-text font-serif text-3xl font-bold text-ivory-50 md:text-5xl">
            为肉羊产业创芯
          </blockquote>
          <Quote className="quote-text mt-1 h-8 w-8 shrink-0 text-wheat-400/70 md:h-10 md:w-10" aria-hidden />
        </div>
        <p className="quote-attr mt-6 text-sm tracking-wide text-ivory-50/55">
          —— 2024 年 11 月，雪花羊核心群突破 3000 只时的团队宣言
        </p>
      </div>
    </section>
  )
}
