import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { OceanArc, OceanWaveDivider } from '@/components/OceanCurves'

gsap.registerPlugin(ScrollTrigger)

const NAME_PARTS = [
  {
    word: '腾洋',
    pinyin: 'TÉNG YÁNG',
    gist: '腾跃海洋',
    text: '地处黄河入海口，河海交汇、浩渺无垠。取腾跃海洋之势、向海而兴之志，以辽阔与进取，立企业之魂。',
  },
  {
    word: '育纯',
    pinyin: 'YÙ CHÚN',
    gist: '育种纯粹',
    text: '十八年只做一件事。让基因更纯正、让品质更纯粹，以专注与恒心，守育种之本。',
  },
]

/** 关于我们 · 「腾洋育纯 · 品牌之名」：四字拆解，海洋曲线分隔，克制诗意 */
export default function BrandName() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.brand-name-item',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: { trigger: rootRef.current, start: 'top 78%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ivory-50 py-16 md:py-24">
      {/* 洋流大弧线背景（松绿极淡） */}
      <OceanArc />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="text-center">
          <p className="brand-name-item eyebrow">The Meaning of Our Name</p>
          <h2 className="brand-name-item mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
            腾洋育纯 · 品牌之名
          </h2>
          <div className="brand-name-item mt-6">
            <OceanWaveDivider />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-10">
          {NAME_PARTS.map((p) => (
            <div
              key={p.word}
              className="brand-name-item glass glass-liquid glass-hover relative overflow-hidden rounded-2xl p-8 md:p-10"
            >
              {/* 卡内极淡海洋曲线 */}
              <svg
                viewBox="0 0 400 120"
                className="pointer-events-none absolute -bottom-4 left-0 w-full"
                fill="none"
                aria-hidden
              >
                <path
                  d="M-10 84 C70 58 150 104 230 82 C310 60 360 74 410 56"
                  stroke="#2E7A4E"
                  strokeOpacity="0.14"
                  strokeWidth="1.5"
                />
              </svg>
              <p className="font-inter text-[11px] uppercase tracking-[0.35em] text-wheat-400">
                {p.pinyin}
              </p>
              <div className="mt-3 flex items-baseline gap-4">
                <span className="font-serif text-5xl font-black leading-none text-pine-950 md:text-6xl">
                  {p.word}
                </span>
                <span className="font-serif text-lg font-bold text-wheat-400 md:text-xl">
                  {p.gist}
                </span>
              </div>
              <p className="mt-5 text-base leading-[1.9] text-ink-600">{p.text}</p>
            </div>
          ))}
        </div>

        <p className="brand-name-item mt-10 text-center font-serif text-sm italic tracking-[0.2em] text-ink-600/70 md:mt-12 md:text-base">
          腾跃海洋之志 · 育种纯粹之心
        </p>
      </div>
    </section>
  )
}
