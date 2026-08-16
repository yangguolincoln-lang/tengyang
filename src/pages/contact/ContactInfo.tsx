import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, MessageSquare, Users } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const INFO_CARDS = [
  {
    icon: MapPin,
    title: '公司地址',
    desc: '山东省东营市利津县盐窝镇 · 黄河口滩羊产业园',
  },
  {
    icon: MessageSquare,
    title: '在线留言',
    desc: '右侧表单提交，我们将在工作日内回复',
  },
  {
    icon: Users,
    title: '合作对象',
    desc: '养殖企业与合作社 · 科研机构 · 商超与渠道伙伴',
  },
]

export default function ContactInfo() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 左栏卡片 stagger 从左滑入淡入
      gsap.fromTo(
        '.info-card',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef}>
      <Eyebrow text="Reach Us" />
      <h2 className="mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">找到我们</h2>

      <div className="mt-8 space-y-4">
        {INFO_CARDS.map((c) => (
          <div
            key={c.title}
            className="info-card flex items-start gap-4 rounded-2xl bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wheat-400/12">
              <c.icon className="h-5 w-5 text-wheat-400" strokeWidth={1.8} />
            </span>
            <div>
              <h3 className="font-serif text-lg font-semibold text-ink-900">{c.title}</h3>
              <p className="mt-1 text-sm leading-[1.8] text-ink-600">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-[13px] leading-[1.5] tracking-[0.08em] text-ink-400">
        为保护信息安全，本站暂不公示电话；请通过在线留言与我们取得联系。
      </p>
    </div>
  )
}
