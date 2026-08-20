import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/** Section 7 · 底部 CTA 横幅 */
export default function ParkCta() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.park-cta-item',
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
        '.park-cta-btn',
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
        <h3 className="park-cta-item font-serif text-2xl font-bold text-ivory-50 md:text-3xl">
          欢迎莅临黄河口滩羊产业园参观考察
        </h3>
        <p className="park-cta-item mt-5 flex items-center justify-center gap-2 text-sm text-ivory-50/65">
          <MapPin className="h-4 w-4 shrink-0 text-wheat-400" />
          山东省东营市 · 黄三角农高区农业高新技术产业示范区
        </p>
        <div className="park-cta-btn mt-9 inline-block">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-9 py-4 text-lg font-bold text-pine-950 transition-all duration-300 hover:scale-[1.04] hover:shadow-card-hover active:scale-95"
          >
            在线预约留言
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
