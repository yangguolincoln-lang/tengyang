import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/** Section 5 · 订阅/关注 CTA 横幅 */
export default function NewsCta() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.news-cta-item',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
      gsap.fromTo(
        '.news-cta-btn',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.6)',
          delay: 0.4,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-pine-950">
      <div className="gold-gradient-line h-px w-full" aria-hidden />
      <div className="mx-auto max-w-[1280px] px-5 py-16 text-center md:px-12 md:py-24">
        <h3 className="news-cta-item font-serif text-2xl font-bold text-ivory-50 md:text-3xl">
          关注腾洋育纯的最新进展
        </h3>
        <p className="news-cta-item mx-auto mt-5 max-w-xl text-base leading-[1.8] text-ivory-50/70">
          有合作或采访意向，欢迎在线留言。
        </p>
        <div className="news-cta-btn mt-9 inline-block">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-9 py-4 text-lg font-bold text-pine-950 transition-all duration-300 hover:scale-[1.04] hover:shadow-card-hover active:scale-95"
          >
            在线留言
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
