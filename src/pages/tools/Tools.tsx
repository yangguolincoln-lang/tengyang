import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ChevronRight } from 'lucide-react'
import FeedMixer from './FeedMixer'
import PriceBoard from './PriceBoard'

/** 子页 Hero（复用 news hero 模式） */
function ToolsHero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tl-hero-bg', { scale: 1.06 }, { scale: 1, duration: 1.6, ease: 'power2.out' })
      gsap.fromTo(
        '.tl-hero-fade',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.3 },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative -mt-20 flex min-h-[55dvh] flex-col overflow-hidden bg-pine-950"
    >
      <div className="absolute inset-0">
        <img loading="lazy"
          src="/flock-pasture.jpg"
          alt="黄河口滩羊牧场羊群"
          className="tl-hero-bg h-full w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-pine-950/78" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 pb-20 pt-36 md:px-12">
        <nav className="tl-hero-fade mb-6 flex items-center gap-1.5 text-sm text-ivory-50/65" aria-label="面包屑">
          <Link to="/" className="transition-colors hover:text-wheat-300">首页</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="text-ivory-50/90">养殖工具</span>
        </nav>

        <div className="tl-hero-fade flex items-center gap-4">
          <span className="h-px w-8 bg-wheat-400/70" aria-hidden />
          <span className="eyebrow">Farm Toolkit</span>
        </div>

        <h1 className="tl-hero-fade mt-6 font-serif text-4xl font-bold leading-[1.25] text-ivory-50 sm:text-5xl lg:text-[56px]">
          把账算清，
          <br />
          把羊养好
        </h1>

        <p className="tl-hero-fade mt-7 max-w-2xl text-base leading-[1.8] text-ivory-50/85 md:text-lg">
          饲料配方在线制作 × 价格行情看板 —— 两个实用小工具，服务每一位黄河口养殖户。
        </p>
      </div>
    </section>
  )
}

export default function Tools() {
  return (
    <>
      <ToolsHero />
      <FeedMixer />
      <PriceBoard />
    </>
  )
}
