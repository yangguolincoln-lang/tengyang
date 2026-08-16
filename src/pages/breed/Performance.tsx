import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const TAGS = ['6–8 个月达 130 斤出栏标准', '体型大', '出肉多', '抗逆性强', '低膻味']

const RING_R = 54
const RING_C = 2 * Math.PI * RING_R

/** 环形图卡片（日增重 / 屠宰率） */
function RingCard({
  target,
  fill,
  prefix,
  unit,
  title,
  desc,
}: {
  target: number
  fill: number
  prefix: string
  unit: string
  title: string
  desc: string
}) {
  return (
    <div className="perf-card group relative overflow-hidden rounded-2xl border border-wheat-400/20 bg-pine-900/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-wheat-400/50 md:p-7">
      <div className="relative mx-auto h-[132px] w-[132px]">
        <svg viewBox="0 0 132 132" className="h-full w-full -rotate-90">
          <circle cx="66" cy="66" r={RING_R} fill="none" stroke="rgba(250,247,240,0.1)" strokeWidth="10" />
          <circle
            className="perf-ring"
            cx="66"
            cy="66"
            r={RING_R}
            fill="none"
            stroke="url(#perfGoldRing)"
            strokeWidth="10"
            strokeLinecap="round"
            data-fill={fill}
            style={{ strokeDasharray: RING_C, strokeDashoffset: RING_C }}
          />
          <defs>
            <linearGradient id="perfGoldRing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#D9A441" />
              <stop offset="1" stopColor="#E8BE6A" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline">
            <span className="font-fraunces text-base font-bold text-wheat-300">{prefix}</span>
            <span
              className="perf-count font-fraunces text-3xl font-bold tabular-nums text-wheat-400"
              data-value={target}
            >
              0
            </span>
          </div>
          <span className="text-xs text-ivory-50/60">{unit}</span>
        </div>
      </div>
      <h3 className="mt-5 text-center font-serif text-lg font-semibold text-ivory-50">{title}</h3>
      <p className="mt-2 text-center text-sm leading-relaxed text-ivory-50/60">{desc}</p>
    </div>
  )
}

/** Section 4 · 性能数据仪表盘 */
export default function Performance() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题入场
      gsap.fromTo(
        '.perf-head',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
      // 卡片 stagger 淡入上移
      gsap.fromTo(
        '.perf-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.perf-grid', start: 'top 70%' },
        },
      )
      // 环形图 stroke-dashoffset 0→目标值（1.4s, power2.out）
      gsap.utils.toArray<SVGCircleElement>('.perf-ring').forEach((el) => {
        const fill = Number(el.dataset.fill ?? 0)
        gsap.to(el, {
          strokeDashoffset: RING_C * (1 - fill),
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 70%' },
        })
      })
      // 中心数字 count-up
      gsap.utils.toArray<HTMLElement>('.perf-count').forEach((el) => {
        const target = Number(el.dataset.value ?? 0)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 70%' },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v))
          },
        })
      })
      // 条形图 scaleX 生长
      gsap.utils.toArray<HTMLElement>('.perf-bar').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 70%' },
          },
        )
      })
      // 标签行
      gsap.fromTo(
        '.perf-tag',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.perf-tags', start: 'top 85%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-pine-950 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="perf-head">
          <Eyebrow text="PERFORMANCE" />
        </div>
        <h2 className="perf-head mt-4 font-serif text-3xl font-bold text-ivory-50 md:text-4xl">
          用数据说话的品种力
        </h2>

        <div className="perf-grid mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. 日增重优势 · 环形图 */}
          <RingCard
            target={350}
            fill={0.7}
            prefix=""
            unit="克 / 天"
            title="平均日增重"
            desc="平均日增重达 350 克，生长速度行业领先。"
          />

          {/* 2. 产羔率 · 条形区间 */}
          <div className="perf-card group relative overflow-hidden rounded-2xl border border-wheat-400/20 bg-pine-900/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-wheat-400/50 md:p-7">
            <div className="flex h-[132px] flex-col items-center justify-center">
              <div className="flex items-baseline gap-1">
                <span className="font-fraunces text-3xl font-bold tabular-nums text-wheat-400">230%</span>
                <span className="font-fraunces text-xl font-bold text-wheat-300">–</span>
                <span className="font-fraunces text-3xl font-bold tabular-nums text-wheat-400">260%</span>
              </div>
              {/* 区间可视化：0–300 刻度轨道，230–260 高亮段 */}
              <div className="relative mt-6 h-2.5 w-full overflow-hidden rounded-full bg-ivory-50/10">
                <div
                  className="perf-bar absolute inset-y-0 origin-left rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300"
                  style={{ left: `${(230 / 300) * 100}%`, width: `${((260 - 230) / 300) * 100}%` }}
                />
              </div>
              <div className="mt-2 flex w-full justify-between font-inter text-[10px] tabular-nums text-ivory-50/40">
                <span>0%</span>
                <span className="text-wheat-300/80">230% – 260%</span>
                <span>300%</span>
              </div>
            </div>
            <h3 className="mt-5 text-center font-serif text-lg font-semibold text-ivory-50">产羔率</h3>
            <p className="mt-2 text-center text-sm leading-relaxed text-ivory-50/60">繁殖效率行业领先。</p>
          </div>

          {/* 3. 单只雪花肉 · 环形图 */}
          <RingCard
            target={20}
            fill={0.5}
            prefix=""
            unit="斤 / 只"
            title="单只雪花肉"
            desc="核心群单只可稳定产出雪花肉 20 斤。"
          />

          {/* 4. M5 雪花纹占比 · 金色填充条形 */}
          <div className="perf-card group relative overflow-hidden rounded-2xl border border-wheat-400/20 bg-pine-900/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-wheat-400/50 md:p-7">
            <div className="flex h-[132px] flex-col items-center justify-center">
              <div className="flex items-baseline">
                <span className="font-fraunces text-3xl font-bold tabular-nums text-wheat-400">&gt;10%</span>
              </div>
              <div className="relative mt-6 h-2.5 w-full overflow-hidden rounded-full bg-ivory-50/10">
                <div
                  className="perf-bar absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300"
                  style={{ width: '12%' }}
                />
                {/* 10% 刻度线 */}
                <span className="absolute inset-y-0" style={{ left: '10%' }}>
                  <span className="block h-full w-px bg-ivory-50/50" />
                </span>
              </div>
              <div className="mt-2 flex w-full justify-between font-inter text-[10px] tabular-nums text-ivory-50/40">
                <span>0%</span>
                <span className="text-wheat-300/80">M5 阈值 10%</span>
                <span>100%</span>
              </div>
            </div>
            <h3 className="mt-5 text-center font-serif text-lg font-semibold text-ivory-50">M5 雪花纹占比</h3>
            <p className="mt-2 text-center text-sm leading-relaxed text-ivory-50/60">
              高端大理石花纹稳定表达。
            </p>
          </div>
        </div>

        {/* 附加标签行 */}
        <div className="perf-tags mt-10 flex flex-wrap justify-center gap-3">
          {TAGS.map((t) => (
            <span
              key={t}
              className="perf-tag rounded-full border border-wheat-400/50 px-5 py-2 text-sm font-medium tracking-wide text-wheat-300 transition-colors duration-300 hover:bg-wheat-400/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
