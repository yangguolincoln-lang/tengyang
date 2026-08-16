import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Eyebrow from '@/components/Eyebrow'

/** 联系我们 · 子页 Hero：50vh 横幅 */
export default function ContactHero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-hero-bg',
        { scale: 1.06 },
        { scale: 1, duration: 1.4, ease: 'power2.out' },
      )
      gsap.fromTo(
        '.contact-hero-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.15 },
      )
      gsap.fromTo(
        '.contact-hero-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power3.inOut', delay: 0.6 },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative -mt-20 flex min-h-[50vh] flex-col justify-end overflow-hidden bg-pine-950"
    >
      <div className="contact-hero-bg absolute inset-0 will-change-transform" aria-hidden>
        <img src="/wetland-dusk.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-pine-950/70" />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-14 pt-36 md:px-12 md:pb-16">
        <nav className="contact-hero-item text-xs tracking-wider text-ivory-50/60" aria-label="面包屑">
          <Link to="/" className="transition-colors hover:text-wheat-300">
            首页
          </Link>
          <span className="mx-2 text-ivory-50/40">/</span>
          <span className="text-ivory-50/80">联系我们</span>
        </nav>
        <div className="contact-hero-item mt-5">
          <Eyebrow text="Contact Us" />
        </div>
        <h1 className="contact-hero-item mt-4 font-serif text-4xl font-black leading-[1.2] text-ivory-50 md:text-5xl">
          期待与您共育未来
        </h1>
        <p className="contact-hero-item mt-5 max-w-2xl text-base leading-[1.7] text-ivory-50/80 md:text-lg">
          引种合作 · 科研协作 · 渠道共建 —— 欢迎留言，我们会尽快与您联系。
        </p>
      </div>

      <div className="contact-hero-line relative h-px w-full origin-left bg-gradient-to-r from-wheat-400 via-wheat-400/60 to-transparent" />
    </section>
  )
}
