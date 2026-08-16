import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Manifesto() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto-line',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
      // 水印字视差
      gsap.to('.manifesto-watermark', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home-manifesto" ref={rootRef} className="relative overflow-hidden bg-pine-950 py-20">
      {/* 上下金色渐变线 */}
      <div className="gold-gradient-line absolute left-0 right-0 top-0 h-px" aria-hidden />
      <div className="gold-gradient-line absolute bottom-0 left-0 right-0 h-px" aria-hidden />
      {/* 背景水印 */}
      <div
        className="manifesto-watermark pointer-events-none absolute -right-8 bottom-0 hidden select-none font-fraunces text-[11rem] font-bold uppercase leading-none text-ivory-50/[0.04] md:block"
        aria-hidden
      >
        Snowflake
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-12">
        <p className="manifesto-line font-serif text-xl leading-[1.8] text-ivory-50/90 md:text-[28px]">
          「一粒种子可以改变世界，
        </p>
        <p className="manifesto-line font-serif text-xl leading-[1.8] md:text-[28px]">
          <span className="bg-gradient-to-r from-wheat-300 to-wheat-400 bg-clip-text text-transparent">
            一个品种可以重塑产业。
          </span>
        </p>
        <p className="manifesto-line font-serif text-xl leading-[1.8] text-ivory-50/90 md:text-[28px]">
          我们把论文写在黄河口的盐碱地上，把芯片装进中国肉羊的种源里。」
        </p>
        <p className="manifesto-line mt-8 text-sm tracking-wider text-ivory-50/50">
          —— 腾洋育纯 · 育种使命
        </p>
      </div>
    </section>
  )
}
