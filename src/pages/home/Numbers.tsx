import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

type Stat = {
  value?: number
  text?: string
  suffix?: string
  unit: string
  label: string
}

const STATS: Stat[] = [
  { value: 18, suffix: '', unit: '年', label: '品种选育历程' },
  { value: 3000, suffix: '+', unit: '只', label: '雪花羊核心群存栏' },
  { value: 350, suffix: '', unit: '克', label: '平均日增重' },
  { value: 20, suffix: '', unit: '斤', label: '单只稳定产出雪花肉' },
  { text: '>10%', unit: '', label: 'M5 雪花纹占比' },
  { text: '230%–260%', unit: '', label: '产羔率' },
]

export default function Numbers() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 卡片入场
      gsap.fromTo(
        '.stat-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
      // 数字 count-up + 金线生长（触发于 30% 视口）
      gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
        const target = Number(el.dataset.value ?? 0)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 70%' },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString('en-US')
          },
        })
      })
      gsap.utils.toArray<HTMLElement>('.stat-line').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 70%' },
          },
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home-numbers" ref={rootRef} className="bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Eyebrow text="Core Strength" />
        <h2 className="mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
          数字里的硬实力
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="stat-card glass glass-hover group relative overflow-hidden rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-baseline gap-1">
                {s.text ? (
                  <span className="gold-glow font-fraunces text-4xl font-bold tabular-nums text-wheat-400 md:text-[44px]">
                    {s.text}
                  </span>
                ) : (
                  <>
                    <span
                      className="stat-value gold-glow font-fraunces text-4xl font-bold tabular-nums text-wheat-400 md:text-[56px]"
                      data-value={s.value}
                    >
                      0
                    </span>
                    <span className="font-fraunces text-2xl font-bold text-wheat-400">{s.suffix}</span>
                  </>
                )}
                <span className="ml-1 text-sm text-ink-600">{s.unit}</span>
              </div>
              <p className="mt-3 text-sm font-medium text-ink-900">{s.label}</p>
              <span
                className="stat-line absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-wheat-400 to-wheat-300"
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
