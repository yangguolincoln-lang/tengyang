import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, X } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const FOREIGN = ['种源受制于人', '引种成本高', '适应性存疑']
const OURS = ['种源自主可控', '本土适应性验证', '持续选育迭代']

/** Section 5 · 打破垄断（左文右对比卡） */
export default function WhyMatters() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 左栏文字 stagger 入场
      gsap.fromTo(
        '.why-left',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
      // 对比卡从右滑入
      gsap.fromTo(
        '.why-card',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
        },
      )
      // 右列逐项打勾弹入
      gsap.fromTo(
        '.why-check',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2.2)',
          stagger: 0.2,
          delay: 0.4,
          scrollTrigger: { trigger: '.why-card', start: 'top 70%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-ivory-100 py-14 md:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-12 lg:grid-cols-2 lg:gap-16">
        {/* 左栏 */}
        <div>
          <div className="why-left">
            <Eyebrow text="WHY IT MATTERS" />
          </div>
          <h2 className="why-left mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
            为什么“自主”如此重要？
          </h2>
          <p className="why-left mt-6 text-base leading-[1.9] text-ink-600 md:text-lg">
            长期以来，高端雪花肉羊种质资源被国外垄断，引种贵、受制于人、改良难。
          </p>
          <p className="why-left mt-4 text-base leading-[1.9] text-ink-600 md:text-lg">
            黄三角肉羊的诞生，让我国高端肉羊种源第一次实现
            <strong className="font-bold text-pine-700">自主可控</strong>
            ——这是种业振兴的“肉羊答案”。
          </p>
        </div>

        {/* 右栏：对比卡 */}
        <div className="why-card grid overflow-hidden rounded-2xl shadow-card sm:grid-cols-2">
          {/* 国外引种路线（灰绿） */}
          <div className="bg-pine-900/10 p-7 md:p-8">
            <h3 className="font-serif text-lg font-semibold text-ink-600">国外引种路线</h3>
            <ul className="mt-5 space-y-4">
              {FOREIGN.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink-600">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-400/15">
                    <X className="h-3.5 w-3.5 text-ink-400" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* 黄三角肉羊路线（金色高亮） */}
          <div className="border-t-2 border-wheat-400 bg-white p-7 md:p-8 sm:border-l sm:border-t-0 sm:border-l-wheat-400/40">
            <h3 className="font-serif text-lg font-semibold text-pine-700">黄三角肉羊路线</h3>
            <ul className="mt-5 space-y-4">
              {OURS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium text-ink-900">
                  <span className="why-check flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-wheat-400">
                    <Check className="h-3.5 w-3.5 text-pine-950" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
