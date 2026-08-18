import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 28.6, decimals: 1, unit: '亿元', label: '规划总投资' },
  { value: 1, decimals: 0, unit: '万亩', label: '总规划面积' },
  { value: 400, decimals: 0, unit: '栋', label: '高标准羊舍' },
]

/** 产地优势：全宽图文横幅 + 背景视差 + 数字 count-up */
export default function PlaceAdvantage() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景视差 yPercent -10
      gsap.fromTo(
        '.place-bg',
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      // 文字 stagger 上移淡入
      gsap.fromTo(
        '.place-text',
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
      // 统计数字 count-up
      gsap.utils.toArray<HTMLElement>('.place-value').forEach((el) => {
        const target = Number(el.dataset.value ?? 0)
        const decimals = Number(el.dataset.decimals ?? 0)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 70%' },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals)
          },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      {/* 背景 + 深绿遮罩 65% */}
      <div className="place-bg absolute -inset-y-[12%] inset-x-0" aria-hidden>
        <img loading="lazy" src="/aerial-park.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-pine-950/65" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 py-16 md:px-12 md:py-28">
        <div className="max-w-3xl">
          <h2 className="place-text font-serif text-3xl font-bold leading-snug text-ivory-50 md:text-4xl">
            扎根全国单体规模最大的肉羊标准化养殖园区
          </h2>

          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-8">
            {STATS.map((s) => (
              <div key={s.label} className="place-text">
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="place-value font-fraunces text-4xl font-bold tabular-nums text-wheat-400 md:text-5xl"
                    data-value={s.value}
                    data-decimals={s.decimals}
                  >
                    0
                  </span>
                  <span className="text-sm text-ivory-50/80">{s.unit}</span>
                </div>
                <p className="mt-2 text-sm text-ivory-50/70">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="place-text mt-10">
            <Link
              to="/industry"
              className="group inline-flex items-center gap-2 text-base font-medium text-wheat-300 transition-colors hover:text-wheat-400"
            >
              了解产业园区
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
