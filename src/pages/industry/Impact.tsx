import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Store, TrendingUp, Users } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const FACTS = [
  '全年供应北京市场 20 万只，市场占有率超 1/10',
  '与华润万家、银座等 150 余家大型连锁商超合作',
  '全县年出栏肉羊 370 万只、存栏 170 万只',
  '山东唯一鲜羊肉直供北京农贸市场的产区',
]

/** Section 5 · 带动效应（深色大数字 + 事实条 marquee） */
export default function Impact() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.impact-head',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
      // 大数字 count-up（1.8s，stagger 0.2s）
      gsap.utils.toArray<HTMLElement>('.impact-value').forEach((el, i) => {
        const target = Number(el.dataset.value ?? 0)
        const decimals = Number(el.dataset.decimals ?? 0)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          delay: 0.2 * i,
          ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 70%' },
          onUpdate: () => {
            el.textContent =
              decimals > 0 ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString('en-US')
          },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-pine-950 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="impact-head flex justify-center">
          <Eyebrow text="Impact" align="center" />
        </div>
        <h2 className="impact-head mt-4 text-center font-serif text-3xl font-bold text-ivory-50 md:text-4xl">
          一只羊，带活一座城
        </h2>

        <div className="mt-14 grid gap-10 text-center md:grid-cols-3 md:gap-6">
          {/* 131.7 亿元 */}
          <div>
            <div className="flex items-baseline justify-center gap-1.5">
              <span
                className="impact-value font-fraunces text-5xl font-bold tabular-nums text-wheat-400 md:text-[64px]"
                data-value="131.7"
                data-decimals="1"
              >
                0
              </span>
              <span className="text-lg text-ivory-50/75">亿元</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ivory-50/65">
              2025 年黄河口滩羊全产业链产值
            </p>
          </div>
          {/* 370 万只出栏 · 170 万只存栏 */}
          <div>
            <div className="flex items-baseline justify-center gap-1.5">
              <span
                className="impact-value font-fraunces text-5xl font-bold tabular-nums text-wheat-400 md:text-[64px]"
                data-value="370"
                data-decimals="0"
              >
                0
              </span>
              <span className="text-lg text-ivory-50/75">万只</span>
              <span className="mx-1 font-fraunces text-2xl text-ivory-50/40">/</span>
              <span
                className="impact-value font-fraunces text-5xl font-bold tabular-nums text-wheat-400 md:text-[64px]"
                data-value="170"
                data-decimals="0"
              >
                0
              </span>
              <span className="text-lg text-ivory-50/75">万只</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ivory-50/65">全县年出栏 / 存栏</p>
          </div>
          {/* 3.5 万人 */}
          <div>
            <div className="flex items-baseline justify-center gap-1.5">
              <span
                className="impact-value font-fraunces text-5xl font-bold tabular-nums text-wheat-400 md:text-[64px]"
                data-value="3.5"
                data-decimals="1"
              >
                0
              </span>
              <span className="text-lg text-ivory-50/75">万人</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ivory-50/65">吸纳就业</p>
          </div>
        </div>
      </div>

      {/* 事实条 marquee（桌面循环，hover 暂停；移动端静态换行） */}
      <div className="mt-14 border-y border-wheat-400/20 py-5">
        <div className="impact-marquee-wrap hidden overflow-hidden md:block" aria-hidden={false}>
          <div className="impact-marquee flex w-max items-center gap-12">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-12" aria-hidden={dup === 1}>
                {FACTS.map((fact, i) => {
                  const icons = [TrendingUp, Store, Users]
                  const Icon = icons[i % icons.length]
                  return (
                    <span key={`${dup}-${fact}`} className="flex items-center gap-3 whitespace-nowrap">
                      <Icon className="h-4 w-4 text-wheat-400" />
                      <span className="text-sm tracking-wide text-ivory-50/80">{fact}</span>
                      <span className="ml-6 h-1 w-1 rounded-full bg-wheat-400/50" aria-hidden />
                    </span>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        {/* 移动端静态 */}
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 md:hidden">
          {FACTS.map((fact, i) => {
            const icons = [TrendingUp, Store, Users]
            const Icon = icons[i % icons.length]
            return (
              <span key={fact} className="flex items-center gap-3">
                <Icon className="h-4 w-4 shrink-0 text-wheat-400" />
                <span className="text-sm text-ivory-50/80">{fact}</span>
              </span>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes impact-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .impact-marquee { animation: impact-marquee 20s linear infinite; }
        .impact-marquee-wrap:hover .impact-marquee { animation-play-state: paused; }
      `}</style>
    </section>
  )
}
