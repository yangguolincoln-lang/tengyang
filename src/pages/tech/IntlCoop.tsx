import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe2, MapPin } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'
import { DropletField, LiquidBlob } from '@/components/Droplets'

gsap.registerPlugin(ScrollTrigger)

/** 极简经纬线地球 SVG：金绿双色、点阵标注中国 / 新西兰 / 澳大利亚合作节点 */
function MiniGlobe({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden fill="none">
      {/* 球体轮廓 */}
      <circle cx="100" cy="100" r="88" stroke="#D9A441" strokeOpacity="0.35" strokeWidth="1" />
      {/* 纬线 */}
      <ellipse cx="100" cy="100" rx="88" ry="58" stroke="#FAF7F0" strokeOpacity="0.14" strokeWidth="1" />
      <ellipse cx="100" cy="100" rx="88" ry="24" stroke="#FAF7F0" strokeOpacity="0.14" strokeWidth="1" />
      {/* 经线 */}
      <ellipse cx="100" cy="100" rx="52" ry="88" stroke="#FAF7F0" strokeOpacity="0.14" strokeWidth="1" />
      <ellipse cx="100" cy="100" rx="22" ry="88" stroke="#FAF7F0" strokeOpacity="0.14" strokeWidth="1" />
      <line x1="100" y1="12" x2="100" y2="188" stroke="#FAF7F0" strokeOpacity="0.1" strokeWidth="1" />
      {/* 合作节点：中国（东营） / 新西兰（林肯大学） / 澳大利亚 */}
      <circle cx="132" cy="70" r="3" fill="#D9A441" />
      <circle cx="132" cy="70" r="7" stroke="#D9A441" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="146" cy="150" r="3.5" fill="#E8BE6A" />
      <circle cx="146" cy="150" r="8" stroke="#E8BE6A" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="118" cy="138" r="3" fill="#FAF7F0" fillOpacity="0.85" />
      {/* 连线弧线（东营 → 南半球） */}
      <path
        d="M132 70 C 160 92, 168 122, 146 150"
        stroke="#D9A441"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <path
        d="M132 70 C 146 96, 142 118, 118 138"
        stroke="#FAF7F0"
        strokeOpacity="0.35"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
    </svg>
  )
}

const SUB_TAGS = ['澳大利亚等国家 · 技术交流', '稳定合作机制', '技术保持第一梯队']

/** Section 5 · 全球视野 · 国际合作 */
export default function IntlCoop() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.intl-head',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
        },
      )
      gsap.fromTo(
        '.intl-card',
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: { trigger: '.intl-grid', start: 'top 72%' },
        },
      )
      gsap.fromTo(
        '.intl-tag',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.intl-tags', start: 'top 85%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-pine-950 py-14 md:py-24">
      {/* 装饰：金色液团 + 水滴浮游 */}
      <LiquidBlob tone="gold" className="-right-24 -top-24 h-96 w-96 opacity-40" />
      <LiquidBlob tone="light" className="-bottom-32 -left-24 h-80 w-80 opacity-30" />
      <DropletField count={8} tone="gold" />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="intl-head">
          <Eyebrow text="Global Collaboration" />
        </div>
        <h2 className="intl-head mt-4 font-serif text-3xl font-bold text-ivory-50 md:text-4xl">
          全球视野 · 国际合作
        </h2>
        <p className="intl-head mt-5 max-w-2xl text-base leading-[1.8] text-ivory-50/70">
          从黄河口到南半球 —— 自主育种技术，与世界一流同频。
          在与中国科学院等国内院所深度共建之上，公司育种技术主动链接全球一线科研力量，始终站在国际第一梯队。
        </p>

        <div className="intl-grid mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* 主卡 · 新西兰林肯大学 */}
          <div className="intl-card glass-dark group relative overflow-hidden rounded-2xl p-7 md:p-10 lg:col-span-3">
            <MiniGlobe className="pointer-events-none absolute -right-6 -top-6 h-44 w-44 opacity-60 transition-transform duration-700 group-hover:rotate-6 md:h-56 md:w-56" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-md border border-wheat-400/50 bg-pine-950/40 px-3 py-1.5 text-xs font-medium text-wheat-300">
                <MapPin className="h-3.5 w-3.5" />
                主合作方 · 🇳🇿 新西兰
              </span>
              <h3 className="mt-5 font-serif text-2xl font-bold text-ivory-50 md:text-3xl">
                新西兰林肯大学 · 基因团队
              </h3>
              <p className="mt-2 font-inter text-xs uppercase tracking-[0.25em] text-ivory-50/40">
                Lincoln University · New Zealand
              </p>
              <p className="mt-5 max-w-xl text-sm leading-[1.9] text-ivory-50/80">
                与林肯大学（Lincoln University）基因团队围绕
                <strong className="font-bold text-wheat-300">基因育种技术联合攻关</strong>
                ，技术同频迭代、持续进化，让黄河口的育种能力始终保持
                <strong className="font-bold text-wheat-300">国际一流水平</strong>。
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['基因团队联合攻关', '技术同频迭代', '国际一流水平'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-ivory-50/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 副卡 · 澳大利亚等技术交流 */}
          <div className="intl-card glass-dark relative overflow-hidden rounded-2xl p-7 md:p-9 lg:col-span-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-wheat-400/15">
              <Globe2 className="h-5 w-5 text-wheat-300" />
            </span>
            <h3 className="mt-5 font-serif text-xl font-semibold text-ivory-50 md:text-2xl">
              多国技术交流与稳定合作
            </h3>
            <p className="mt-4 text-sm leading-[1.9] text-ivory-50/80">
              与<strong className="font-bold text-wheat-300">澳大利亚</strong>
              等国家保持技术交流与稳定合作机制，在开放协作中校准方向，确保公司始终站在
              <strong className="font-bold text-wheat-300">全球肉羊育种技术第一梯队</strong>。
            </p>
            <div className="intl-tags mt-6 flex flex-wrap gap-2">
              {SUB_TAGS.map((t) => (
                <span
                  key={t}
                  className="intl-tag rounded-md border border-wheat-400/40 px-2.5 py-1 text-xs font-medium text-wheat-300/90"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="intl-head mt-12 text-center font-serif text-lg font-semibold text-wheat-300/90 md:text-xl">
          技术无国界，标准有高度 —— 黄河口的种子，世界级的品质
        </p>
      </div>
    </section>
  )
}
