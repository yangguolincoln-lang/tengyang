import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 28.6, decimals: 1, suffix: '', unit: '亿元', label: '规划总投资' },
  { value: 1, decimals: 0, suffix: '', unit: '万亩', label: '总规划面积' },
  { value: 4200, decimals: 0, suffix: '', unit: '亩', label: '核心养殖区' },
  { value: 400, decimals: 0, suffix: '', unit: '栋', label: '高标准羊舍' },
  { value: 42, decimals: 0, suffix: '+', unit: '万只', label: '园区肉羊存栏' },
  { value: 110, decimals: 0, suffix: '+', unit: '万只', label: '年出栏' },
]

/** Section 2 · 园区数据带（pine-950，与 Hero 无缝衔接） */
export default function ParkNumbers() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 统计项 stagger 0.08s 上移 30px 淡入
      gsap.fromTo(
        '.park-stat',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
      // 数字 count-up 1.6s（触发 30%）
      gsap.utils.toArray<HTMLElement>('.park-stat-value').forEach((el) => {
        const target = Number(el.dataset.value ?? 0)
        const decimals = Number(el.dataset.decimals ?? 0)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 70%' },
          onUpdate: () => {
            el.textContent =
              decimals > 0
                ? obj.v.toFixed(decimals)
                : Math.round(obj.v).toLocaleString('en-US')
          },
        })
      })
      // 相邻统计间 1px 竖向金/绿分隔线随入场生长
      gsap.utils.toArray<HTMLElement>('.park-stat-divider').forEach((el, i) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.1 * i,
            scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
          },
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="park-numbers"
      ref={rootRef}
      className="border-t border-wheat-400/15 bg-pine-950 py-14 md:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s, i) => (
            <div key={s.label} className="park-stat relative pl-0 lg:pl-6">
              {i > 0 && (
                <span
                  className="park-stat-divider absolute left-0 top-1/2 hidden h-14 w-px origin-top -translate-y-1/2 bg-gradient-to-b from-wheat-400/50 to-pine-500/40 lg:block"
                  aria-hidden
                />
              )}
              <div className="flex items-baseline gap-1">
                <span
                  className="park-stat-value font-fraunces text-4xl font-bold tabular-nums text-wheat-400 lg:text-[40px]"
                  data-value={s.value}
                  data-decimals={s.decimals}
                >
                  0
                </span>
                {s.suffix && (
                  <span className="font-fraunces text-2xl font-bold text-wheat-400">{s.suffix}</span>
                )}
                <span className="ml-1 text-sm text-ivory-50/70">{s.unit}</span>
              </div>
              <p className="mt-2.5 text-sm font-medium tracking-wide text-ivory-50/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
