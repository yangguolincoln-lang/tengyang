import { Suspense, lazy, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import WebGLBoundary from '@/components/WebGLBoundary'
import { DropletField, LiquidBlob } from '@/components/Droplets'
import { FlowingWaves } from '@/components/OceanCurves'

gsap.registerPlugin(ScrollTrigger)

const HeroParticles = lazy(() => import('@/components/HeroParticles'))

const TITLE_LINE_1 = '为肉羊产业创芯'
const TITLE_LINE_2_A = '让雪花纹理，'
const TITLE_LINE_2_GOLD = '自主'
const TITLE_LINE_2_B = '生长'

const MINI_STATS = [
  { value: '18', unit: '年育种', target: '#home-journey' },
  { value: '3000', unit: '只核心群', target: '#home-numbers' },
  { value: '>10%', unit: 'M5 雪花纹', target: '#home-breed' },
]

/** 静态回退：CSS 金色径向渐变光晕 */
function StaticGlow() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 60% 45% at 30% 40%, rgba(217,164,65,0.22), transparent 65%), radial-gradient(ellipse 45% 35% at 75% 65%, rgba(250,247,240,0.10), transparent 70%)',
      }}
      aria-hidden
    />
  )
}

function scrollTo(target: string) {
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景图载入缩放
      gsap.fromTo(
        '.hero-bg',
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: 'power2.out' },
      )
      // 主标题字符拆分：上移 60px + rotateX 20° → 0
      gsap.fromTo(
        '.hero-char',
        { y: 60, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.045,
          delay: 0.3,
        },
      )
      // 副标题与按钮
      gsap.fromTo(
        '.hero-fade',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 1.0 },
      )
      // 滚动：内容上移渐隐，背景视差
      gsap.to('.hero-content', {
        yPercent: -15,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-bg-wrap', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const renderChars = (text: string, gold = false) =>
    Array.from(text).map((ch, i) => (
      <span
        key={`${text}-${i}`}
        className={`hero-char inline-block will-change-transform ${gold ? 'text-wheat-400' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {ch}
      </span>
    ))

  return (
    <section ref={rootRef} className="relative -mt-20 flex min-h-[100dvh] flex-col overflow-hidden bg-pine-950">
      {/* 背景图 + 渐变遮罩 */}
      <div className="hero-bg-wrap absolute inset-0 will-change-transform">
        <img
          src="/hero-home.jpg"
          alt="黄河口湿地清晨羊群航拍"
          className="hero-bg h-full w-full object-cover will-change-transform"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(11,31,22,0.95) 0%, rgba(11,31,22,0.4) 50%, rgba(11,31,22,0.6) 100%)',
          }}
          aria-hidden
        />
      </div>

      {/* 粒子层（Three.js，失败回退静态光晕） */}
      <WebGLBoundary fallback={<StaticGlow />}>
        <Suspense fallback={<StaticGlow />}>
          <HeroParticles />
        </Suspense>
      </WebGLBoundary>

      {/* 流体色团：松绿→麦金，极低透明液态氛围 */}
      <LiquidBlob tone="gold" className="left-[-8%] top-[12%] h-[420px] w-[420px]" />
      <LiquidBlob tone="light" className="bottom-[-10%] right-[-6%] h-[380px] w-[380px]" style={{ animationDelay: '-9s' }} />
      {/* 水珠浮游层 */}
      <DropletField count={10} tone="gold" />
      {/* 底部流动海浪线：黄河入海口 · 海洋曲线意象 */}
      <FlowingWaves />

      {/* 内容 */}
      <div className="hero-content relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 pb-28 pt-32 md:px-12">
        <div className="max-w-3xl">
          <div className="hero-fade flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="h-px w-8 bg-wheat-400/70" aria-hidden />
            <span className="eyebrow">Snowflake Mutton Sheep · 黄三角肉羊</span>
            <span className="h-px w-8 bg-wheat-400/70" aria-hidden />
            {/* 成果认证金色徽章（pulse 微光，克制） */}
            <span className="hero-badge glass-dark glass-liquid relative inline-flex items-center gap-2 rounded-full !border-wheat-400/50 !bg-wheat-400/10 px-4 py-1.5 text-xs font-medium tracking-wide text-wheat-300">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wheat-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-wheat-400" />
              </span>
              2026.4 通过新品系成果认证 · 我国首个自主培育专门化雪花肉羊新品系
            </span>
          </div>
          <h1
            className="mt-6 font-serif text-4xl font-black leading-[1.2] text-ivory-50 sm:text-5xl lg:text-[64px] lg:leading-[1.15]"
            style={{ perspective: '800px' }}
          >
            <span className="block">{renderChars(TITLE_LINE_1)}</span>
            <span className="mt-2 block">
              {renderChars(TITLE_LINE_2_A)}
              {renderChars(TITLE_LINE_2_GOLD, true)}
              {renderChars(TITLE_LINE_2_B)}
            </span>
          </h1>
          <p className="hero-fade mt-7 max-w-2xl text-base leading-[1.8] text-ivory-50/85 md:text-lg">
            山东腾洋育纯农牧科技有限公司 —— 联合中国科学院科研团队，历时十八年培育我国首个自主雪花肉羊新品系「黄三角肉羊」，打破国外高端种质资源长期垄断；并与新西兰林肯大学基因团队联合攻关，育种技术始终保持国际一流水平。
          </p>
          <div className="hero-fade mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/breed"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-7 py-3.5 font-bold text-pine-950 transition-all duration-300 hover:scale-[1.03] hover:shadow-card-hover active:scale-95"
            >
              探索核心品种
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <Link
              to="/tech"
              className="inline-flex items-center gap-2 rounded-full border border-ivory-50/60 px-7 py-3.5 font-medium text-ivory-50 transition-all duration-300 hover:border-wheat-400 hover:bg-wheat-400/10 hover:text-wheat-300"
            >
              了解育种科技
            </Link>
          </div>
        </div>
      </div>

      {/* 底部：滚动提示 + 迷你数据锚点 */}
      <div className="hero-fade relative z-10 mx-auto flex w-full max-w-[1280px] items-end justify-between px-5 pb-8 md:px-12">
        <button
          type="button"
          onClick={() => scrollTo('#home-manifesto')}
          className="flex cursor-pointer flex-col items-center gap-3 text-ivory-50/70 transition-colors hover:text-wheat-300"
        >
          <span className="font-inter text-xs tracking-[0.25em]">向下滚动</span>
          <span className="block h-12 w-px overflow-hidden">
            <span className="block h-full w-full animate-scroll-line bg-wheat-400" />
          </span>
        </button>
        <div className="hidden items-center gap-8 sm:flex">
          {MINI_STATS.map((s) => (
            <button
              key={s.unit}
              type="button"
              onClick={() => scrollTo(s.target)}
              className="group cursor-pointer text-left"
            >
              <span className="font-fraunces text-2xl font-bold tabular-nums text-wheat-400">
                {s.value}
              </span>
              <span className="ml-1.5 text-xs text-ivory-50/65 transition-colors group-hover:text-ivory-50">
                {s.unit}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
