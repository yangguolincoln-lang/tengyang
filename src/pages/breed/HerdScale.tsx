import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HERD = [
  { value: 3000, unit: '只', label: '雪花羊核心群' },
  { value: 30000, unit: '只', label: '繁育群' },
]

/** Section 6 · 种群规模（全宽横幅 + 双联大数字） */
export default function HerdScale() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景视差 yPercent -12
      gsap.fromTo(
        '.herd-bg',
        { yPercent: 0 },
        {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      // 双数字 count-up（1.8s，触发 35%）
      gsap.utils.toArray<HTMLElement>('.herd-value').forEach((el) => {
        const target = Number(el.dataset.value ?? 0)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power1.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString('en-US')
          },
        })
      })
      // 数字下方金线生长
      gsap.utils.toArray<HTMLElement>('.herd-line').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
          },
        )
      })
      // 副文案延迟淡入
      gsap.fromTo(
        '.herd-sub',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.4,
          scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden py-24 md:py-36">
      <div className="herd-bg absolute -inset-y-[15%] inset-x-0" aria-hidden>
        <img loading="lazy" src="/flock-pasture.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-pine-950/60" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 text-center md:px-12">
        <div className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-20 md:gap-32">
          {HERD.map((h) => (
            <div key={h.label}>
              <div className="flex items-baseline justify-center gap-2">
                <span
                  className="herd-value font-fraunces text-6xl font-bold tabular-nums text-wheat-400 md:text-8xl"
                  data-value={h.value}
                >
                  0
                </span>
                <span className="font-serif text-2xl font-bold text-ivory-50">{h.unit}</span>
              </div>
              <span
                className="herd-line mx-auto mt-4 block h-[3px] w-24 origin-center bg-gradient-to-r from-wheat-400 to-wheat-300"
                aria-hidden
              />
              <p className="mt-3 font-serif text-lg text-ivory-50/90">{h.label}</p>
            </div>
          ))}
        </div>
        <p className="herd-sub mx-auto mt-12 max-w-xl text-base leading-[1.8] text-ivory-50/80">
          从核心群到繁育群，一条可复制、可推广的产业化扩繁路径。
        </p>
      </div>
    </section>
  )
}
