import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const TITLE_WORDS = ['一路向“新”的', '腾洋时刻']

/** Section 1 · 新闻 Hero（55vh 子页横幅） */
export default function NewsHero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景 scale 1.06 → 1.0
      gsap.fromTo(
        '.news-hero-bg',
        { scale: 1.06 },
        { scale: 1, duration: 1.6, ease: 'power2.out' },
      )
      // 标题 word-level 入场
      gsap.fromTo(
        '.news-hero-word',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.3,
        },
      )
      // 副文案标准子页入场
      gsap.fromTo(
        '.news-hero-fade',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.6 },
      )
      gsap.to('.news-hero-bg-wrap', {
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
      className="relative -mt-20 flex min-h-[55dvh] flex-col overflow-hidden bg-pine-950"
    >
      {/* 背景 news-cert.jpg + pine-950 75% 遮罩 */}
      <div className="news-hero-bg-wrap absolute inset-0 will-change-transform">
        <img
          src="/news-cert.jpg"
          alt="黄三角肉羊新品系成果认证会议现场"
          className="news-hero-bg h-full w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-pine-950/75" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 pb-20 pt-36 md:px-12">
        {/* 面包屑 */}
        <nav className="news-hero-fade mb-6 flex items-center gap-1.5 text-sm text-ivory-50/65" aria-label="面包屑">
          <Link to="/" className="transition-colors hover:text-wheat-300">
            首页
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="text-ivory-50/90">新闻动态</span>
        </nav>

        <div className="news-hero-fade flex items-center gap-4">
          <span className="h-px w-8 bg-wheat-400/70" aria-hidden />
          <span className="eyebrow">News & Milestones</span>
        </div>

        <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.25] text-ivory-50 sm:text-5xl lg:text-[56px]">
          {TITLE_WORDS.map((word) => (
            <span key={word} className="block">
              {Array.from(word).map((ch, i) => (
                <span key={`${word}-${i}`} className="news-hero-word inline-block will-change-transform">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="news-hero-fade mt-7 max-w-2xl text-base leading-[1.8] text-ivory-50/85 md:text-lg">
          从实验室到中试，从初审到成果认证 —— 记录黄三角肉羊的每一步。
        </p>
      </div>
    </section>
  )
}
