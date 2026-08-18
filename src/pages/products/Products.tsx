import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, ArrowRight, Wheat, Baby, Snowflake, HeartHandshake, Crown } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

/** 雪花宝系列 · 精准营养饲料（5 条产品线） */
const FEED_LINES = [
  {
    icon: Baby,
    name: '羔羊开口料',
    stage: '哺乳期 — 断奶后 2 周',
    group: '新生 / 断奶羔羊',
    points: ['高消化率蛋白与乳糖源，平稳过渡断奶应激', '益生菌与有机酸呵护瘤胃发育', '小颗粒易采食，早开食早出栏'],
  },
  {
    icon: Wheat,
    name: '育肥前期料',
    stage: '断奶后 — 50 斤体重',
    group: '育肥前期羔羊',
    points: ['精粗比约 55:45，促瘤胃与骨骼发育', '蛋白能量平衡，日增重稳定', '添加小苏打缓冲，预防瘤胃酸中毒'],
  },
  {
    icon: Snowflake,
    name: '育肥后期雪花育成料',
    stage: '50 斤 — 出栏（雪花形成关键期）',
    group: '雪花育成期育肥羊',
    points: ['精粗比提高至约 70:30 — 80:20', '高能量 + 过瘤胃营养，促肌内脂肪均匀沉积', '全程小苏打缓冲，保障高精料下瘤胃健康'],
  },
  {
    icon: HeartHandshake,
    name: '繁殖母羊料',
    stage: '空怀 / 妊娠 / 泌乳全程',
    group: '繁殖母羊',
    points: ['妊娠后期强化能量蛋白，保胎促羔', '泌乳期高营养浓度，提升奶水与羔羊断奶重', '钙磷与微量元素精准配比，减少代谢病'],
  },
  {
    icon: Crown,
    name: '种公羊料',
    stage: '非配种期 / 配种期',
    group: '种公羊',
    points: ['配种期提高蛋白与维生素 E、锌供给', '维持体况不过肥，保障精液品质', '过瘤胃氨基酸，支持高强度采精'],
  },
]

/** 黄河口雪花羊肉产品形态 */
const MUTTON_FORMS = [
  { title: '精细分割肉', desc: '按部位精细分割，雪花纹理清晰稳定，适配高端商超与生鲜渠道。' },
  { title: '高端礼盒', desc: '节日与商务场景定制礼盒，黄河口雪花羊品牌背书。' },
  { title: '餐饮直供', desc: '面向中高端餐饮连锁稳定直供，冷链锁鲜到店。' },
]

/** 子页 Hero（复用 news hero 模式） */
function ProductsHero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pd-hero-bg', { scale: 1.06 }, { scale: 1, duration: 1.6, ease: 'power2.out' })
      gsap.fromTo(
        '.pd-hero-fade',
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
          src="/marble-meat.jpg"
          alt="雪花羊肉大理石花纹特写"
          className="pd-hero-bg h-full w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-pine-950/78" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 pb-20 pt-36 md:px-12">
        <nav className="pd-hero-fade mb-6 flex items-center gap-1.5 text-sm text-ivory-50/65" aria-label="面包屑">
          <Link to="/" className="transition-colors hover:text-wheat-300">首页</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="text-ivory-50/90">产品中心</span>
        </nav>

        <div className="pd-hero-fade flex items-center gap-4">
          <span className="h-px w-8 bg-wheat-400/70" aria-hidden />
          <span className="eyebrow">Products</span>
        </div>

        <h1 className="pd-hero-fade mt-6 font-serif text-4xl font-bold leading-[1.25] text-ivory-50 sm:text-5xl lg:text-[56px]">
          从一包饲料，
          <br />
          到一块雪花羊肉
        </h1>

        <p className="pd-hero-fade mt-7 max-w-2xl text-base leading-[1.8] text-ivory-50/85 md:text-lg">
          「雪花宝」系列精准营养饲料 × 黄河口雪花羊肉 —— 营养精控技术贯穿“种、养、加、销”全链条。
        </p>
      </div>
    </section>
  )
}

/** Section A · 雪花宝系列精准营养饲料 */
function FeedProducts() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feed-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.feed-grid', start: 'top 80%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Eyebrow text="Xuehuabao Feed" />
        <h2 className="mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
          「雪花宝」系列 · 精准营养饲料
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-[1.9] text-ink-600">
          由黄河口生物精准营养研发中心研制，应用“营养精控技术”，
          使雪花肉品质提升 <span className="font-fraunces font-bold text-pine-700">20%</span>、
          饲喂效率提高 <span className="font-fraunces font-bold text-pine-700">20%</span>。
          按羊只生长阶段分线供给，一包料对应一个关键期。
        </p>
        <p className="mt-3 text-xs leading-relaxed text-ink-400">
          资料来源：齐鲁网（东营）《黄河口滩羊喜获国字号招牌》，2025-01-15
        </p>

        <div className="feed-grid mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEED_LINES.map((f) => (
            <article
              key={f.name}
              className="feed-card glass glass-hover group flex flex-col rounded-2xl p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pine-700/8 text-pine-700 transition-colors duration-300 group-hover:bg-wheat-400/15 group-hover:text-wheat-600">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-serif text-xl font-bold text-ink-900">雪花宝 · {f.name}</h3>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-md bg-pine-700/8 px-2.5 py-1 font-medium text-pine-700">
                  适用：{f.group}
                </span>
                <span className="rounded-md bg-wheat-400/12 px-2.5 py-1 font-medium text-wheat-600">
                  阶段：{f.stage}
                </span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm leading-relaxed text-ink-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-wheat-400" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* 工具导流卡 */}
          <Link
            to="/tools"
            className="feed-card glass-dark glass-hover group flex flex-col justify-between rounded-2xl bg-pine-950/80 p-7"
          >
            <div>
              <span className="eyebrow">Feed Mixer</span>
              <h3 className="mt-4 font-serif text-xl font-bold text-ivory-50">
                不确定该用哪款料？
              </h3>
              <p className="mt-3 text-sm leading-[1.8] text-ivory-50/75">
                用「饲料配方在线制作」工具，按群体与体重一键生成日粮配方与成本估算。
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 font-medium text-wheat-300">
              去算一算
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

/** Section B · 黄河口雪花羊肉产品 */
function MuttonProducts() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mutton-img',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
        },
      )
      gsap.fromTo(
        '.mutton-fade',
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
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="overflow-hidden bg-pine-950 py-14 md:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-12 lg:grid-cols-2 lg:gap-16">
        {/* 左栏文案 */}
        <div>
          <div className="mutton-fade">
            <Eyebrow text="Snowflake Mutton" />
          </div>
          <h2 className="mutton-fade mt-4 font-serif text-3xl font-bold text-ivory-50 md:text-4xl">
            黄河口雪花羊肉 ·「超白羊」
          </h2>
          <p className="mutton-fade mt-6 text-base leading-[1.9] text-ivory-50/80">
            源自我国首个自主培育的专门化雪花肉羊新品系，脂肪呈大理石花纹分布，
            M5 级雪花纹占比超过 10%，单只可稳定产出雪花肉 20 斤，6~8 月龄即可出栏。
          </p>

          {/* 金色大数字 */}
          <div className="mutton-fade mt-9 grid grid-cols-3 gap-4">
            {[
              { num: '>10%', label: 'M5 级雪花纹占比' },
              { num: '20斤', label: '单只雪花肉产出' },
              { num: '6-8', label: '月龄出栏' },
            ].map((s) => (
              <div key={s.label}>
                <p className="gold-glow font-fraunces text-3xl font-bold tabular-nums text-wheat-400 md:text-4xl">
                  {s.num}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ivory-50/60">{s.label}</p>
              </div>
            ))}
          </div>

          <ul className="mutton-fade mt-9 space-y-4">
            {MUTTON_FORMS.map((m) => (
              <li key={m.title} className="glass-dark glass-hover rounded-xl p-5">
                <h3 className="font-serif text-base font-semibold text-wheat-300">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ivory-50/70">{m.desc}</p>
              </li>
            ))}
          </ul>

          <p className="mutton-fade mt-6 text-sm leading-relaxed text-ivory-50/55">
            「黄河口雪花羊」品牌已在北京、济南等地设立品鉴店与直营店，鲜羊肉直供北京市场。
            <br />
            <span className="text-xs text-ivory-50/40">
              资料来源：大众日报蹲点调查，2026-05-29；山东省畜牧兽医局/大众日报，2026-05-29；经济日报，2026-07-14
            </span>
          </p>
        </div>

        {/* 右栏图 */}
        <div className="relative">
          <div className="mutton-img img-frame group overflow-hidden rounded-2xl shadow-card-hover">
            <img loading="lazy"
              src="/marble-meat.jpg"
              alt="黄河口雪花羊肉大理石花纹"
              className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <div className="glass absolute -bottom-6 left-4 rounded-2xl px-6 py-4 shadow-card-hover md:-left-6 md:px-8 md:py-5">
            <p className="font-fraunces text-2xl font-bold text-pine-700 md:text-3xl">超白羊</p>
            <p className="mt-1 text-sm text-ink-600">黄河口雪花羊肉品牌</p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { WaveDivider } from '@/components/Droplets'

export default function Products() {
  return (
    <>
      <ProductsHero />
      <FeedProducts />
      <WaveDivider top="#FAF7F0" fill="#0B1F16" />
      <MuttonProducts />
    </>
  )
}
