import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { DropletField, LiquidBlob } from '@/components/Droplets'

gsap.registerPlugin(ScrollTrigger)

export default function ContactBanner() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景视差
      gsap.fromTo(
        '.cta-bg',
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      // 标题逐词上移淡入
      gsap.fromTo(
        '.cta-word',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
      // 按钮弹入
      gsap.fromTo(
        '.cta-button',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.6)',
          delay: 0.4,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      <div className="cta-bg absolute -inset-y-[15%] inset-x-0" aria-hidden>
        <img src="/wetland-dusk.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-pine-950/75" />
      </div>
      {/* 流体色团 + 水珠浮游 */}
      <LiquidBlob tone="light" className="left-[6%] top-[-20%] h-[360px] w-[360px]" />
      <LiquidBlob tone="gold" className="bottom-[-25%] right-[4%] h-[320px] w-[320px]" style={{ animationDelay: '-12s' }} />
      <DropletField count={8} tone="light" />

      <div className="relative mx-auto max-w-[1280px] px-5 py-20 text-center md:px-12 md:py-32">
        <h2 className="font-serif text-3xl font-bold leading-snug text-ivory-50 md:text-4xl">
          {Array.from('让高端肉羊种源，自主可控').map((ch, i) => (
            <span key={i} className="cta-word inline-block will-change-transform">
              {ch}
            </span>
          ))}
        </h2>
        <p className="cta-word mx-auto mt-5 max-w-xl text-base leading-[1.8] text-ivory-50/80">
          期待与养殖场、科研机构、渠道伙伴共建雪花肉羊产业生态。
        </p>
        <div className="cta-button mt-9 inline-block">
          <Link
            to="/contact"
            className="btn-glow group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-9 py-4 text-lg font-bold text-pine-950 transition-all duration-300 hover:scale-[1.04] active:scale-95"
          >
            在线留言合作
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
