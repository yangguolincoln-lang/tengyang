import { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOUCH_TEXT = '在这里，每一栋羊舍都有数据档案，每一只种羊都有基因身份证。现代化养殖，是技术，也是对生命的尊重。'

/** 持续 7s 缓慢浮动 ±6px 的后图（隔离 perpetual 动画，memo 防重渲染重置） */
const FloatingImage = memo(function FloatingImage() {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tween = gsap.fromTo(
      imgRef.current,
      { y: -6 },
      { y: 6, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1 },
    )
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <div
      ref={imgRef}
      className="touch-img-r absolute -bottom-10 -right-4 w-3/5 overflow-hidden rounded-2xl border-4 border-ivory-50 shadow-card-hover md:-right-8"
    >
      <img
        src="/barn-modern.jpg"
        alt="现代化高标准羊舍内景"
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  )
})

/** Section 6 · 园区人文（双图错落交叠 + 短文） */
export default function HumanTouch() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 双图分别从左/右滑入 60px 淡入（stagger 0.15s）
      gsap.fromTo(
        '.touch-img-l',
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
      gsap.fromTo(
        '.touch-img-r',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
      // 短文 word-level 上移淡入
      gsap.fromTo(
        '.touch-word',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.04,
          scrollTrigger: { trigger: '.touch-text', start: 'top 75%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="overflow-hidden bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-5 md:px-12 lg:grid-cols-2 lg:gap-20">
        {/* 双图错落交叠 */}
        <div className="relative pb-12 pr-8 md:pr-12">
          <div className="touch-img-l overflow-hidden rounded-2xl shadow-card">
            <img
              src="/worker-care.jpg"
              alt="牧场技术人员在羊舍中检查羊只"
              className="aspect-[7/5] w-full object-cover"
              loading="lazy"
            />
          </div>
          <FloatingImage />
        </div>

        {/* 短文 */}
        <div className="touch-text">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-wheat-400/70" aria-hidden />
            <span className="eyebrow">Human Touch</span>
          </div>
          <p className="mt-6 font-serif text-2xl font-semibold leading-[1.7] text-ink-900 md:text-[28px]">
            {TOUCH_TEXT.split('，').map((seg, i, arr) => (
              <span key={i} className="touch-word inline-block will-change-transform">
                {seg}
                {i < arr.length - 1 ? '，' : ''}
              </span>
            ))}
          </p>
          <div className="touch-word mt-8 flex items-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-wheat-400 to-transparent" aria-hidden />
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-ink-400">
              黄河口滩羊产业园 · 养殖日常
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
