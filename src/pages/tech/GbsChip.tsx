import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScanSearch, Database, Gauge, Dna, GitBranch, LibraryBig } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { icon: ScanSearch, title: '精准锁定', desc: '定位雪花性状主效基因' },
  { icon: Database, title: '数据底座', desc: '2 万余份样本基因数据库' },
  { icon: Gauge, title: '提速育种', desc: '分子标记辅助选择，选育效率倍增' },
]

/** 基因检测四大应用方向 */
const GENOMIC_APPLICATIONS = [
  {
    icon: Dna,
    title: '全基因组选择（GS）',
    desc: '基于覆盖全基因组的标记信息估计基因组育种值（GEBV），在羔羊出生时即可预测其成年后的产肉与雪花性状表现，世代间隔大幅缩短，选择准确性显著提升。',
  },
  {
    icon: ScanSearch,
    title: 'SNP 分子标记辅助选育',
    desc: '针对肌内脂肪沉积、生长速度、产羔率等关键经济性状的功能 SNP 位点，开展标记辅助选择（MAS），把好基因“看得见、选得准”。',
  },
  {
    icon: GitBranch,
    title: '亲缘鉴定与系谱纠偏',
    desc: '利用 SNP 指纹进行亲子鉴定与亲缘关系分析，校正群体系谱误差，避免近交衰退，保障核心育种群遗传结构清晰可靠。',
  },
  {
    icon: LibraryBig,
    title: '基因库建设',
    desc: '十八年育种积累沉淀为可溯源的基因资源库 —— 联合中国科学院共同开发肉羊 5K、14K 基因芯片，累计采集分析 3 万余只肉羊基因数据，为长期选育提供数据底座。',
  },
]

/** Section 2 · GBS 液相芯片（左图右文） */
export default function GbsChip() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 左图 clip-path 从左揭示
      gsap.fromTo(
        '.gbs-img',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
        },
      )
      // 徽章卡延迟弹入
      gsap.fromTo(
        '.gbs-badge',
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.8)',
          delay: 0.4,
          scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
        },
      )
      // 右栏标题文字
      gsap.fromTo(
        '.gbs-head',
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
      // 特性点从右滑入
      gsap.fromTo(
        '.gbs-feature',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.gbs-features', start: 'top 75%' },
        },
      )
      // 基因组应用卡片入场
      gsap.fromTo(
        '.gbs-app',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.gbs-apps', start: 'top 80%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="overflow-hidden bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-12 lg:grid-cols-2 lg:gap-16">
        {/* 左栏：芯片图 + 浮动数据徽章 */}
        <div className="relative">
          <div className="gbs-img overflow-hidden rounded-2xl shadow-card">
            <img loading="lazy"
              src="/gene-chip.jpg"
              alt="GBS 肉羊基因检测液相芯片微孔板"
              className="block h-auto w-full object-cover"
            />
          </div>
          <div className="gbs-badge absolute -bottom-6 right-4 rounded-2xl bg-white px-6 py-4 shadow-card-hover md:-right-6 md:px-8 md:py-5">
            <p className="font-fraunces text-3xl font-bold tabular-nums text-pine-700">
              20000<span className="text-wheat-400">+</span>
            </p>
            <p className="mt-1 text-sm text-ink-600">份样本基因数据库</p>
          </div>
        </div>

        {/* 右栏 */}
        <div>
          <div className="gbs-head">
            <Eyebrow text="GBS LIQUID CHIP" />
          </div>
          <h2 className="gbs-head mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
            自主研发 GBS 肉羊基因检测液相芯片
          </h2>
          <p className="gbs-head mt-6 text-base leading-[1.9] text-ink-600">
            团队采集 2 万余份样本构建基因数据库，精准锁定控制“雪花”性状的主效基因，让选育从“看表型”进入“读基因”时代。
            十八年育种深耕，叠加与中国科学院的联合攻关 —— 共同开发肉羊 5K、14K 基因芯片，
            累计采集分析 3 万余只肉羊基因数据，把分子育种做成体系化能力。
          </p>

          <ul className="gbs-features mt-9 space-y-5">
            {FEATURES.map((f) => (
              <li key={f.title} className="gbs-feature group flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pine-700/8 text-pine-700 transition-colors duration-300 group-hover:bg-wheat-400/15 group-hover:text-wheat-600">
                  <f.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink-900">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 基因组选育四大应用 */}
      <div className="mx-auto mt-16 max-w-[1280px] px-5 md:px-12">
        <h3 className="font-serif text-2xl font-bold text-ink-900 md:text-3xl">
          从芯片到种群：基因组选育四大应用
        </h3>
        <div className="gbs-apps mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GENOMIC_APPLICATIONS.map((a) => (
            <article
              key={a.title}
              className="gbs-app group rounded-2xl border border-pine-950/8 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pine-700/8 text-pine-700 transition-colors duration-300 group-hover:bg-wheat-400/15 group-hover:text-wheat-600">
                <a.icon className="h-5 w-5" />
              </span>
              <h4 className="mt-4 font-serif text-lg font-semibold text-ink-900">{a.title}</h4>
              <p className="mt-2.5 text-sm leading-[1.8] text-ink-600">{a.desc}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-ink-400">
          芯片与基因数据来源：齐鲁网（东营）《黄河口滩羊喜获国字号招牌》，2025-01-15（东营市与中国科学院、新西兰林肯大学联合开发肉羊 5K、14K 基因芯片，采集分析 3 万余只肉羊基因数据）
        </p>
      </div>
    </section>
  )
}
