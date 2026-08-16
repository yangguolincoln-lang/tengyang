import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScanSearch, Database, Gauge } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { icon: ScanSearch, title: '精准锁定', desc: '定位雪花性状主效基因' },
  { icon: Database, title: '数据底座', desc: '2 万余份样本基因数据库' },
  { icon: Gauge, title: '提速育种', desc: '分子标记辅助选择，选育效率倍增' },
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
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="overflow-hidden bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-12 lg:grid-cols-2 lg:gap-16">
        {/* 左栏：芯片图 + 浮动数据徽章 */}
        <div className="relative">
          <div className="gbs-img overflow-hidden rounded-2xl shadow-card">
            <img
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
    </section>
  )
}
