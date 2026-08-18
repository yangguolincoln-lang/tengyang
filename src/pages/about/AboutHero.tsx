import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Eyebrow from '@/components/Eyebrow'
import { FlowingWaves } from '@/components/OceanCurves'

/** 关于我们 · 子页 Hero：60vh 横幅，湿地黄昏背景 + 渐变遮罩 */
export default function AboutHero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景 scale 1.06 → 1.0
      gsap.fromTo(
        '.about-hero-bg',
        { scale: 1.06 },
        { scale: 1, duration: 1.4, ease: 'power2.out' },
      )
      // 面包屑 → Eyebrow → H1 → 副标题 依次上移淡入
      gsap.fromTo(
        '.about-hero-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.15 },
      )
      // 底部金线从左向右生长
      gsap.fromTo(
        '.about-hero-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power3.inOut', delay: 0.6 },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative -mt-20 flex min-h-[60vh] flex-col justify-end overflow-hidden bg-pine-950"
    >
      {/* 背景 + 遮罩（下深上浅） */}
      <div className="about-hero-bg absolute inset-0 will-change-transform" aria-hidden>
        <img src="/wetland-dusk.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-950/90 via-pine-950/60 to-pine-950/35" />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-16 pt-40 md:px-12 md:pb-20">
        <nav className="about-hero-item text-xs tracking-wider text-ivory-50/60" aria-label="面包屑">
          <Link to="/" className="transition-colors hover:text-wheat-300">
            首页
          </Link>
          <span className="mx-2 text-ivory-50/40">/</span>
          <span className="text-ivory-50/80">关于我们</span>
        </nav>
        <div className="about-hero-item mt-5">
          <Eyebrow text="About Us" />
        </div>
        <h1 className="about-hero-item mt-4 font-serif text-4xl font-black leading-[1.2] text-ivory-50 md:text-5xl lg:text-[56px]">
          把论文写在黄河口的盐碱地上
        </h1>
        <p className="about-hero-item mt-5 max-w-2xl text-base leading-[1.7] text-ivory-50/80 md:text-lg">
          山东腾洋育纯农牧科技有限公司 —— 一家扎根黄河口滩羊产业园的肉羊种业科技企业。
        </p>
      </div>

      {/* 底部流动海浪线：黄河入海口 · 海洋曲线意象 */}
      <FlowingWaves className="bottom-1" />

      {/* 底部金线生长 */}
      <div className="about-hero-line relative h-px w-full origin-left bg-gradient-to-r from-wheat-400 via-wheat-400/60 to-transparent" />
    </section>
  )
}
