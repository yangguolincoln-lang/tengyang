import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileBadge, BadgeCheck } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const IP_CARDS = [
  {
    icon: FileBadge,
    kind: '国家发明专利',
    name: '《一种雪花肉羊的培育方法》',
    fields: [
      { label: '发明人', value: '梁艳萍、杨果' },
      { label: '申请日', value: '2023-10-26' },
      { label: '公布日', value: '2023-12-12' },
      { label: '专利权人', value: '山东腾洋育纯农牧科技有限公司' },
    ],
    badge: '已公布',
  },
  {
    icon: BadgeCheck,
    kind: '注册商标',
    name: '「超白羊」',
    fields: [
      { label: '类别', value: '第 29 类 — 羊肉、肉片、羊奶、奶粉、奶制品、蛋、肉罐头等' },
      { label: '申请日', value: '2025-12-09' },
    ],
    badge: '品牌化布局中',
  },
]

export default function IPShowcase() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 双卡 stagger 上移淡入
      gsap.fromTo(
        '.ip-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
      // 图标旋转 -12° → 0 弹入
      gsap.fromTo(
        '.ip-icon',
        { rotation: -12, scale: 0.8, opacity: 0 },
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.8)',
          stagger: 0.15,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Eyebrow text="Intellectual Property" />
        <h2 className="mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">知识产权</h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {IP_CARDS.map((c) => (
            <div
              key={c.kind}
              className="ip-card group relative overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              {/* 顶部 4px 金色装饰条 */}
              <span
                className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-wheat-400 to-wheat-300 transition-all duration-300 group-hover:brightness-110"
                aria-hidden
              />
              {/* 证书式虚线内边框 */}
              <div className="m-3 rounded-xl border border-dashed border-wheat-400/40 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <c.icon className="ip-icon h-12 w-12 text-wheat-400" strokeWidth={1.5} />
                  <span className="rounded-md bg-wheat-400/15 px-3 py-1 text-xs font-bold tracking-wider text-wheat-600">
                    {c.badge}
                  </span>
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.25em] text-ink-400">{c.kind}</p>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-ink-900 md:text-2xl">
                  {c.name}
                </h3>
                <dl className="mt-5 space-y-2.5">
                  {c.fields.map((f) => (
                    <div key={f.label} className="flex gap-3 text-sm leading-relaxed">
                      <dt className="shrink-0 font-medium text-ink-400">{f.label}</dt>
                      <dd className="text-ink-600">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
