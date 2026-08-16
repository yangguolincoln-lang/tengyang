import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Plus } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const PARTNERS = [
  {
    name: '中国科学院西北生态环境资源研究院',
    desc: '杨果 · 中国科学院西北生态环境资源研究院研究员、黄河口滩羊产业技术研究院院长，「把实验室搬到牧场里」，育种核心技术来源。',
    badge: '核心共建',
  },
  {
    name: '黄河口滩羊产业技术研究院',
    desc: '联合培育单位，产业技术转化枢纽。',
  },
  {
    name: '黄三角生物遗传与分子精准育种实验室',
    desc: '国内首个最大的绵羊基因检测室。',
  },
  {
    name: '中国农业科学院',
    desc: '科研协作。',
  },
  {
    name: '中国农业大学 · 山东农业大学',
    desc: '高校院所人才与技术协作。',
  },
]

/** Section 4 · 产学研合作矩阵 */
export default function Partners() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.partner-head',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
      gsap.fromTo(
        '.partner-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.partner-grid', start: 'top 70%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-ivory-100 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="partner-head">
          <Eyebrow text="COLLABORATION" />
        </div>
        <h2 className="partner-head mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
          一个开放的产学研协同网络
        </h2>

        <div className="partner-grid mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="partner-card group relative overflow-hidden rounded-2xl bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              {/* hover 顶部金条生长 */}
              <span
                className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-wheat-400 to-wheat-300 transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden
              />
              {p.badge && (
                <span className="inline-block rounded-md border border-wheat-400/60 px-2.5 py-1 text-xs font-medium text-wheat-600">
                  {p.badge}
                </span>
              )}
              <h3 className="mt-4 font-serif text-xl font-semibold leading-snug text-ink-900">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{p.desc}</p>
            </div>
          ))}

          {/* CTA 卡（金色实底） */}
          <Link
            to="/contact"
            className="partner-card group flex flex-col justify-between rounded-2xl bg-gradient-to-br from-wheat-400 to-wheat-600 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
          >
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pine-950/15">
                <Plus className="h-5 w-5 text-pine-950" />
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-pine-950">开放合作</h3>
              <p className="mt-3 text-sm leading-relaxed text-pine-950/75">
                期待更多科研机构与产业伙伴加入。
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 font-bold text-pine-950">
              洽谈科研合作
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
