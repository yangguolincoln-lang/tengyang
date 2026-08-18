import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const ENGINES = [
  {
    key: 'tech',
    to: '/tech',
    image: '/lab-science.jpg',
    alt: '基因实验室科研场景',
    title: '科技创新',
    desc: 'GBS 肉羊基因检测液相芯片 · 2 万份样本基因数据库 · 国家发明专利《一种雪花肉羊的培育方法》',
    badges: ['专利', '芯片', '基因库'],
    cta: '探索科技',
  },
  {
    key: 'industry',
    to: '/industry',
    image: '/barn-modern.jpg',
    alt: '现代化高标准羊舍内景',
    title: '产业园区',
    desc: '落地全国单体规模最大肉羊标准化养殖园区 —— 黄河口滩羊产业园，年出栏超 110 万只，全产业链产值 131.7 亿元',
    badges: ['4200 亩核心区', '400 栋高标准羊舍'],
    cta: '走进园区',
  },
]

export default function TwinEngines() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.engine-card',
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
    <section ref={rootRef} className="bg-pine-950 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Eyebrow text="Science × Industry" />
        <h2 className="mt-4 font-serif text-3xl font-bold text-ivory-50 md:text-4xl">
          一粒种芯，两大引擎
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {ENGINES.map((e) => (
            <Link
              key={e.key}
              to={e.to}
              className="engine-card group relative block overflow-hidden rounded-2xl border border-white/10"
            >
              {/* 背景图 + 遮罩 */}
              <div className="absolute inset-0">
                <img loading="lazy"
                  src={e.image}
                  alt={e.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-pine-950/70 transition-colors duration-500 group-hover:bg-pine-950/55" />
              </div>

              <div className="relative flex min-h-[320px] flex-col justify-end p-7 md:min-h-[380px] md:p-10">
                <div className="flex flex-wrap gap-2">
                  {e.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-md border border-wheat-400/50 bg-pine-950/50 px-2.5 py-1 text-xs font-medium text-wheat-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-ivory-50 md:text-3xl">
                  {e.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-[1.8] text-ivory-50/80">{e.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-medium text-wheat-300">
                  {e.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
                {/* 底部金线 */}
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
