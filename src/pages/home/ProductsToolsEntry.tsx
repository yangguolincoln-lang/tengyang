import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    key: 'products',
    to: '/products',
    image: '/marble-meat.jpg',
    alt: '雪花羊肉大理石花纹特写',
    title: '产品中心',
    desc: '「雪花宝」系列精准营养饲料五条产品线，黄河口雪花羊肉「超白羊」品牌 —— 从一包料到一个雪花羊。',
    badges: ['雪花宝饲料', '超白羊'],
    cta: '进入产品中心',
  },
  {
    key: 'tools',
    to: '/tools',
    image: '/flock-pasture.jpg',
    alt: '黄河口牧场羊群',
    title: '养殖工具',
    desc: '饲料配方在线制作：按群体与体重一键生成日粮配方与成本估算；价格行情看板：羊肉、活羊、羔羊行情一屏掌握。',
    badges: ['配方制作', '行情看板'],
    cta: '打开养殖工具',
  },
]

/** 首页 · 产品与工具入口（两张大卡） */
export default function ProductsToolsEntry() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pt-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Eyebrow text="Products & Tools" />
        <h2 className="mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
          产品与工具，服务到羊圈
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {CARDS.map((c) => (
            <Link
              key={c.key}
              to={c.to}
              className="pt-card group relative block overflow-hidden rounded-2xl border border-pine-950/10"
            >
              <div className="absolute inset-0">
                <img
                  src={c.image}
                  alt={c.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-pine-950/70 transition-colors duration-500 group-hover:bg-pine-950/55" />
              </div>

              <div className="relative flex min-h-[320px] flex-col justify-end p-7 md:min-h-[380px] md:p-10">
                <div className="flex flex-wrap gap-2">
                  {c.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-md border border-wheat-400/50 bg-pine-950/50 px-2.5 py-1 text-xs font-medium text-wheat-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-ivory-50 md:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-[1.8] text-ivory-50/80">{c.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-medium text-wheat-300">
                  {c.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
                <span
                  className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-wheat-400 to-wheat-300 transition-all duration-500 group-hover:w-full"
                  aria-hidden
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
