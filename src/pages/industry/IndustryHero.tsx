import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const TITLE = '全国单体规模最大的肉羊标准化养殖园区'
const TITLE_WORDS = ['全国单体规模最大的', '肉羊标准化养殖园区']

function scrollToNext() {
  document
    .querySelector('#park-numbers')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Section 1 · 园区 Hero（75vh 航拍 + 深绿渐变遮罩） */
export default function IndustryHero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景 scale 1.08 → 1.0（1.6s）
      gsap.fromTo(
        '.park-hero-bg',
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: 'power2.out' },
      )
      // 标题 word-level 上移 40px 淡入 stagger 0.09s
      gsap.fromTo(
        '.park-hero-word',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.09,
          delay: 0.3,
        },
      )
      // 副文案延迟 0.6s
      gsap.fromTo(
        '.park-hero-fade',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.6 },
      )
      // 背景轻微视差
      gsap.to('.park-hero-bg-wrap', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative -mt-20 flex min-h-[75dvh] flex-col overflow-hidden bg-pine-950"
    >
      {/* 背景图 + 下部深绿渐变遮罩 80% */}
      <div className="park-hero-bg-wrap absolute inset-0 will-change-transform">
        <img
          src="/aerial-park.jpg"
          alt="黄河口滩羊产业园高空航拍：矩阵排列的标准化羊舍"
          className="park-hero-bg h-full w-full object-cover will-change-transform"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(11,31,22,0.8) 0%, rgba(11,31,22,0.35) 55%, rgba(11,31,22,0.55) 100%)',
          }}
          aria-hidden
        />
      </div>

      {/* 内容 */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 pb-24 pt-36 md:px-12">
        {/* 面包屑 */}
        <nav className="park-hero-fade mb-6 flex items-center gap-1.5 text-sm text-ivory-50/65" aria-label="面包屑">
          <Link to="/" className="transition-colors hover:text-wheat-300">
            首页
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="text-ivory-50/90">产业园区</span>
        </nav>

        <div className="park-hero-fade flex items-center gap-4">
          <span className="h-px w-8 bg-wheat-400/70" aria-hidden />
          <span className="eyebrow">Industry Park · 东营利津盐窝镇</span>
        </div>

        <h1 className="mt-6 max-w-3xl font-serif text-4xl font-bold leading-[1.25] text-ivory-50 sm:text-5xl lg:text-[56px]">
          {TITLE_WORDS.map((word) => (
            <span key={word} className="block">
              {Array.from(word).map((ch, i) => (
                <span key={`${word}-${i}`} className="park-hero-word inline-block will-change-transform">
                  {ch}
                </span>
              ))}
            </span>
          ))}
          <span className="sr-only">{TITLE}</span>
        </h1>

        <p className="park-hero-fade mt-7 max-w-2xl text-base leading-[1.8] text-ivory-50/85 md:text-lg">
          黄河口滩羊产业园 —— 规划总投资 28.6 亿元、总规划面积 1 万亩，腾洋育纯的核心育种基地就扎根于此。
        </p>
      </div>

      {/* 底部滚动提示：金线生长-回缩循环 */}
      <div className="park-hero-fade relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-8 md:px-12">
        <button
          type="button"
          onClick={scrollToNext}
          className="flex cursor-pointer flex-col items-center gap-3 text-ivory-50/70 transition-colors hover:text-wheat-300"
        >
          <span className="font-inter text-xs tracking-[0.25em]">向下滚动</span>
          <span className="block h-12 w-px overflow-hidden">
            <span className="park-scroll-line block h-full w-full bg-wheat-400" />
          </span>
        </button>
      </div>

      {/* 本地金线循环 keyframes（不依赖全局配置） */}
      <style>{`
        @keyframes park-scroll-line {
          0% { transform: scaleY(0); transform-origin: top; }
          45% { transform: scaleY(1); transform-origin: top; }
          55% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        .park-scroll-line { animation: park-scroll-line 2s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
