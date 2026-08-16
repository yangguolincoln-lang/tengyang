import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Dna, FlaskConical, Globe, Network, Sun, type LucideIcon } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

type Facility = {
  icon: LucideIcon
  title: string
  desc: string
  image?: string
  imageAlt?: string
  badge: string
}

const FACILITIES: Facility[] = [
  {
    icon: Dna,
    title: '国家级胚胎育种中心',
    desc: '5 万枚/年胚胎产能，种业“芯片工厂”。',
    image: '/lab-science.jpg',
    imageAlt: '胚胎育种中心实验场景',
    badge: 'Embryo Center',
  },
  {
    icon: FlaskConical,
    title: 'CNAS 生物基因工程实验室',
    desc: '高规格基因检测能力，为选育提供数据支撑。',
    image: '/gene-chip.jpg',
    imageAlt: '基因检测芯片微距',
    badge: 'CNAS Lab',
  },
  {
    icon: Network,
    title: '全国首家肉羊产业 5G 综合管理服务中心',
    desc: '数字化养殖管理中枢，羊只数据一屏统览。',
    image: '/barn-modern.jpg',
    imageAlt: '现代化高标准羊舍内景',
    badge: '5G Service Center',
  },
  {
    icon: Sun,
    title: '牧光互补 3.0 高床养殖',
    desc: '棚上发电、棚下养羊，年发绿电 3000 万度。',
    badge: 'Solar Grazing',
  },
  {
    icon: Building2,
    title: '黄河口雪花羊繁育基地',
    desc: '项目总投资 9.88 亿元，改造老旧养殖小区 1300 多亩，建设封闭化养殖区与育种扩繁配套养殖区，将实现 5 万只/年繁育规模。',
    badge: 'Breeding Base',
  },
  {
    icon: Globe,
    title: '全国肉羊云商电子交易中心',
    desc: '瞄准千亿级规模，整合全国 2000 余家养殖基地与加工企业，重塑肉羊流通格局。',
    badge: 'Cloud Trading',
  },
]

const HONORS = [
  '中国肉羊小镇',
  '全国乡村特色产业超十亿元镇',
  '全国畜禽养殖标准化示范园',
]

/** Section 4 · 园区配套（4 张大卡） */
export default function Infrastructure() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.infra-head',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
      // 卡片 stagger 0.12s 上移 40px 淡入（触发 20%）
      gsap.fromTo(
        '.infra-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.infra-grid', start: 'top 80%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-ivory-100 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="infra-head">
          <Eyebrow text="Infrastructure" />
        </div>
        <h2 className="infra-head mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
          一座园区的硬核配套
        </h2>

        <div className="infra-grid mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {FACILITIES.map((f) => {
            const Icon = f.icon
            return (
              <article
                key={f.title}
                className="infra-card group overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
              >
                {/* 封面：图片或（牧光互补）主题面板 */}
                {f.image ? (
                  <div className="relative h-56 overflow-hidden md:h-64">
                    <img
                      src={f.image}
                      alt={f.imageAlt ?? f.title}
                      className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-4 top-4 rounded-md bg-pine-950/80 px-3 py-1 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-wheat-300 backdrop-blur-sm">
                      {f.badge}
                    </span>
                  </div>
                ) : (
                  <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-pine-900 to-pine-950 md:h-64">
                    {/* 光伏栅格装饰 */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(217,164,65,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(217,164,65,0.35) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                      }}
                      aria-hidden
                    />
                    <Icon className="relative h-20 w-20 text-wheat-400 transition-transform duration-[600ms] group-hover:scale-110 group-hover:rotate-12" />
                    <span className="absolute left-4 top-4 rounded-md bg-ivory-50/10 px-3 py-1 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-wheat-300 backdrop-blur-sm">
                      {f.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine-700/10 text-pine-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="relative font-serif text-xl font-semibold text-ink-900">
                      {f.title}
                      {/* 标题金色下划线 hover 生长 */}
                      <span
                        className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-gradient-to-r from-wheat-400 to-wheat-300 transition-all duration-300 group-hover:w-full"
                        aria-hidden
                      />
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-[1.8] text-ink-600">{f.desc}</p>
                </div>
              </article>
            )
          })}
        </div>

        {/* 国家级荣誉徽章行 */}
        <div className="infra-card mt-12 flex flex-wrap items-center justify-center gap-3">
          <span className="font-inter text-[11px] uppercase tracking-[0.25em] text-ink-400">
            10 余项国家级荣誉
          </span>
          {HONORS.map((h) => (
            <span
              key={h}
              className="rounded-full border border-wheat-400/50 bg-white px-5 py-2 text-sm font-medium tracking-wide text-pine-700 shadow-card transition-colors duration-300 hover:bg-wheat-400/10"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
