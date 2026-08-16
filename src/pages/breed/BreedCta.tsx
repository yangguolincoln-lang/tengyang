import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/** Section 7 · 底部 CTA 横幅 */
export default function BreedCta() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-item',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-pine-950">
      <div className="gold-gradient-line h-px w-full" aria-hidden />
      <div className="mx-auto max-w-[1280px] px-5 py-16 text-center md:px-12 md:py-24">
        <h3 className="cta-item font-serif text-2xl font-bold text-ivory-50 md:text-3xl">
          对引种合作与产业化推广感兴趣？
        </h3>
        <div className="cta-item mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-9 py-4 text-base font-bold text-pine-950 transition-all duration-300 hover:scale-[1.04] hover:shadow-card-hover active:scale-95"
          >
            在线留言咨询
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
          <Link
            to="/tech"
            className="inline-flex items-center gap-2 rounded-full border border-wheat-400/60 px-9 py-4 text-base font-bold text-wheat-300 transition-all duration-300 hover:bg-wheat-400/10 active:scale-95"
          >
            了解育种科技
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
