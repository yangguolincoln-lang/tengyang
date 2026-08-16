import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const BADGES = ['自主培育', '新品系认证', '打破国外垄断']

/** Section 1 · 品种 Hero（85vh，左文右图） */
export default function BreedHero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 羊图从右侧 clip-path 揭示 + 轻微 scale 1.05→1
      gsap.fromTo(
        '.breed-hero-img',
        { clipPath: 'inset(0 0 0 100%)', scale: 1.05 },
        { clipPath: 'inset(0 0 0 0%)', scale: 1, duration: 1, ease: 'power3.inOut' },
      )
      // 文字组 stagger 上移淡入
      gsap.fromTo(
        '.breed-hero-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.2 },
      )
      // 徽章逐个弹入
      gsap.fromTo(
        '.breed-hero-badge',
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.8)',
          stagger: 0.08,
          delay: 0.8,
        },
      )
      // 羊图轻微视差
      gsap.to('.breed-hero-img-wrap', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative -mt-20 flex min-h-[85vh] items-center overflow-hidden bg-pine-950"
    >
      {/* 右侧竖版羊图（45%） */}
      <div className="breed-hero-img-wrap absolute inset-y-0 right-0 hidden w-[45%] md:block" aria-hidden>
        <div className="breed-hero-img h-full w-full will-change-transform">
          <img
            src="/sheep-portrait.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        {/* 左侧渐变融入背景 */}
        <div className="absolute inset-0 bg-gradient-to-r from-pine-950 via-pine-950/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-950/70 via-transparent to-pine-950/40" />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-16 pt-36 md:px-12 md:pb-20 md:pt-44">
        <div className="md:w-[55%]">
          {/* 面包屑 */}
          <nav className="breed-hero-item flex items-center gap-1.5 text-sm text-ivory-50/60" aria-label="面包屑">
            <Link to="/" className="transition-colors hover:text-wheat-300">
              首页
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span className="text-wheat-300">核心品种</span>
          </nav>

          <Eyebrow text="HUANGSANJIAO SHEEP · 黄三角肉羊" className="breed-hero-item mt-8" />

          <h1 className="breed-hero-item mt-5 font-serif text-4xl font-black leading-[1.2] text-ivory-50 md:text-[56px] md:leading-[1.15]">
            一只会“长<span className="text-wheat-400">雪花</span>”的中国羊
          </h1>

          <p className="breed-hero-item mt-6 max-w-xl text-base leading-[1.8] text-ivory-50/80 md:text-lg md:leading-[1.75]">
            由中国科学院西北生态环境资源研究院（杨果教授团队）、黄河口滩羊产业技术研究院与腾洋育纯联合培育，2026
            年通过新品系成果认证 —— 我国首个自主培育的专门化雪花肉羊新品系。
          </p>

          {/* 徽章行 */}
          <div className="mt-8 flex flex-wrap gap-3">
            {BADGES.map((b) => (
              <span
                key={b}
                className="breed-hero-badge rounded-full border border-wheat-400/60 px-4 py-1.5 text-sm font-medium tracking-wide text-wheat-300"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 移动端羊图（文档流底部） */}
      <div className="relative h-64 w-full overflow-hidden md:hidden">
        <img src="/sheep-portrait.jpg" alt="黄三角肉羊种公羊肖像" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-950/60 to-transparent" />
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden>
        <span className="font-inter text-[11px] uppercase tracking-[0.3em] text-ivory-50/50">向下滚动</span>
        <span className="block h-10 w-px origin-top animate-scroll-line bg-wheat-400" />
      </div>
    </section>
  )
}
