import { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/** MapPin 图标的持续脉冲光环（2s 循环，隔离微组件） */
const IconHalo = memo(function IconHalo() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tween = gsap.fromTo(
      ref.current,
      { scale: 1, opacity: 0.5 },
      { scale: 1.6, opacity: 0, duration: 2, ease: 'power1.out', repeat: -1 },
    )
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <span
      ref={ref}
      className="absolute inset-0 rounded-full border-2 border-wheat-400 will-change-transform"
      aria-hidden
    />
  )
})

export default function AddressBanner() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景视差 yPercent -10
      gsap.fromTo(
        '.addr-bg',
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      // 文字淡入上移
      gsap.fromTo(
        '.addr-text',
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
    <section ref={rootRef} className="relative overflow-hidden">
      {/* 背景 + 深绿遮罩 70% */}
      <div className="addr-bg absolute -inset-y-[12%] inset-x-0" aria-hidden>
        <img loading="lazy" src="/aerial-park.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-pine-950/70" />
      </div>

      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center px-5 py-16 text-center md:px-12 md:py-24">
        <span className="addr-text relative flex h-16 w-16 items-center justify-center rounded-full bg-wheat-400/15">
          <IconHalo />
          <MapPin className="relative h-8 w-8 text-wheat-400" strokeWidth={1.6} />
        </span>
        <h3 className="addr-text mt-7 max-w-2xl font-serif text-2xl font-bold leading-snug text-ivory-50 md:text-3xl">
          山东省东营市 · 黄三角农高区农业高新技术产业示范区
        </h3>
        <p className="addr-text mt-3 text-sm tracking-wider text-ivory-50/70">
          黄河入海口 · 盐碱地上的现代牧歌
        </p>
      </div>
    </section>
  )
}
