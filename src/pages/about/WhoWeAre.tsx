import { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

/** 持续 6s 缓慢上下浮动 ±8px 的羔羊小卡（隔离的循环动画微组件） */
const FloatingLambCard = memo(function FloatingLambCard() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tween = gsap.to(ref.current, {
      y: -8,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <div ref={ref} className="will-change-transform">
      <img loading="lazy"
        src="/lamb-closeup.jpg"
        alt="黄河口羔羊特写"
        className="w-40 rounded-xl border-[6px] border-white object-cover shadow-card-hover md:w-56"
      />
    </div>
  )
})

export default function WhoWeAre() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 左栏文字 stagger 上移淡入
      gsap.fromTo(
        '.who-text',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
        },
      )
      // 右大图 clip-path 从右向左揭示
      gsap.fromTo(
        '.who-photo',
        { clipPath: 'inset(0 0 0 100%)' },
        {
          clipPath: 'inset(0 0 0 0%)',
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
        },
      )
      // 浮动小卡延迟入场
      gsap.fromTo(
        '.who-float',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-12 lg:grid-cols-[45%_55%] lg:gap-16">
        {/* 左栏 · 文字 */}
        <div>
          <div className="who-text">
            <Eyebrow text="Who We Are" />
          </div>
          <h2 className="who-text mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
            专注雪花肉羊育种的科技企业
          </h2>
          <p className="who-text mt-6 text-base leading-[1.8] text-ink-600">
            公司坐落于
            <strong className="font-bold text-pine-700">山东省东营市 · 黄三角农高区农业高新技术产业示范区</strong>
            ，专注高品质雪花肉羊的育种、繁育与产业化推广。
          </p>
          <p className="who-text mt-4 text-base leading-[1.8] text-ink-600">
            我们与
            <strong className="font-bold text-pine-700">中国科学院西北生态环境资源研究院（杨果教授团队）</strong>
            、<strong className="font-bold text-pine-700">黄河口滩羊产业技术研究院</strong>
            深度共建，历时约 18 年培育出「黄三角肉羊」——我国首个自主培育的专门化雪花肉羊新品系。
          </p>
          <p className="who-text mt-4 text-base leading-[1.8] text-ink-600">
            自主育种，亦与世界一流同频：与
            <strong className="font-bold text-pine-700">新西兰林肯大学（Lincoln University）基因团队</strong>
            联合攻关、技术同频迭代，并与
            <strong className="font-bold text-pine-700">澳大利亚</strong>
            等国家保持技术交流与稳定合作，确保始终站在全球肉羊育种技术第一梯队。
          </p>
          <p className="who-text mt-4 text-base leading-[1.8] text-ink-600">
            我们以解决肉羊产业
            <strong className="font-bold text-pine-700">“缺芯之痛”</strong>
            为使命，推动高端肉羊种源实现
            <strong className="font-bold text-pine-700">自主可控</strong>。
          </p>
        </div>

        {/* 右栏 · 大图 + 浮动小卡 */}
        <div className="relative">
          <div className="who-photo overflow-hidden rounded-2xl">
            <img loading="lazy"
              src="/flock-pasture.jpg"
              alt="黄河口盐碱地牧场黄昏羊群"
              className="h-64 w-full object-cover md:h-[420px]"
            />
          </div>
          <div className="who-float absolute -bottom-10 -left-4 md:-left-10">
            <FloatingLambCard />
          </div>
        </div>
      </div>
    </section>
  )
}
