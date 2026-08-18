import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const NEWS = [
  {
    date: '2026 · 里程碑',
    title: '黄三角肉羊通过新品系成果认证',
    summary: '我国首个自主培育专门化雪花肉羊新品系。',
    image: '/news-cert.jpg',
    alt: '成果认证会议场景',
  },
  {
    date: '2025.12',
    title: '公司注册「超白羊」商标',
    summary: '布局羊肉、羊奶等品牌化产品。',
    image: '/marble-meat.jpg',
    alt: '雪花羊肉特写',
  },
  {
    date: '2024.01',
    title: '「黄三角肉羊」通过新品种生产性能测定暨现场初审',
    summary: '专家组一致认为具备新品种申报条件。',
    image: '/worker-care.jpg',
    alt: '技术人员在羊舍检查羊只',
  },
]

export default function NewsPreview() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.news-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
      // 日期徽章弹入
      gsap.fromTo(
        '.news-badge',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl font-bold text-ink-900 md:text-4xl">新闻动态</h2>
          <Link
            to="/news"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-pine-700 transition-colors hover:text-wheat-600"
          >
            查看全部
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {NEWS.map((n) => (
            <Link
              key={n.title}
              to="/news"
              className="news-card glass glass-hover group overflow-hidden rounded-2xl"
            >
              <div className="img-frame relative aspect-[4/3] overflow-hidden">
                <img loading="lazy"
                  src={n.image}
                  alt={n.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="news-badge absolute left-4 top-4 rounded-full bg-wheat-400 px-3 py-1 font-inter text-xs font-medium text-pine-950">
                  {n.date}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-pine-700">
                  {n.title}
                </h3>
                <p className="mt-2 line-clamp-1 text-sm text-ink-600">{n.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-wheat-600">
                  阅读全文
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
