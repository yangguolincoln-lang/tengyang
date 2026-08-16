import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Baby,
  Wheat,
  Warehouse,
  Recycle,
  UtensilsCrossed,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

type ChainNode = {
  icon: LucideIcon
  title: string
  tip: string
}

const NODES: ChainNode[] = [
  { icon: Baby, title: '母羊繁育', tip: '种源繁育与胚胎工程' },
  { icon: Wheat, title: '饲料加工', tip: '标准化营养供给' },
  { icon: Warehouse, title: '标准养殖', tip: '高床养殖 · 智慧管理' },
  { icon: Recycle, title: '废弃物处理', tip: '粪污资源化循环利用' },
  { icon: UtensilsCrossed, title: '屠宰深加工', tip: '150 万只/年屠宰深加工 · 120 个部位精细分割' },
  { icon: Truck, title: '冷链物流', tip: '直达北京等鲜羊市场' },
]

/** Section 3 · 全产业链：6 环节链条（桌面横向 + 回环虚线，移动纵向） */
export default function FullChain() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题入场
      gsap.fromTo(
        '.chain-head',
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
      // 节点徽章 scale 弹入，随滚动依次点亮
      gsap.fromTo(
        '.chain-node',
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.12,
          scrollTrigger: { trigger: '.chain-track', start: 'top 78%' },
        },
      )
      // 节点间金线逐段生长（与滚动 scrub 绑定）
      gsap.utils.toArray<HTMLElement>('.chain-connector').forEach((el, i) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.chain-track',
              start: `top ${78 - i * 7}%`,
              end: `top ${58 - i * 7}%`,
              scrub: true,
            },
          },
        )
      })
      // 移动端纵向连接线
      gsap.utils.toArray<HTMLElement>('.chain-connector-v').forEach((el, i) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.chain-track',
              start: `top ${80 - i * 6}%`,
              end: `top ${62 - i * 6}%`,
              scrub: true,
            },
          },
        )
      })
      // 回环虚线描边绘制
      gsap.fromTo(
        '.chain-loop',
        { strokeDashoffset: 1200 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.chain-track',
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: true,
          },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const renderNode = (node: ChainNode, i: number) => {
    const Icon = node.icon
    return (
      <div key={node.title} className="chain-node group relative flex flex-col items-center">
        {/* hover tooltip 上浮小卡 */}
        <div
          className="pointer-events-none absolute -top-3 left-1/2 z-20 w-48 -translate-x-1/2 -translate-y-full rounded-xl bg-pine-950 px-4 py-2.5 text-center text-xs leading-relaxed text-ivory-50 opacity-0 shadow-card-hover transition-all duration-[250ms] group-hover:-translate-y-[calc(100%+6px)] group-hover:opacity-100"
          role="tooltip"
        >
          {node.tip}
          <span
            className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-pine-950"
            aria-hidden
          />
        </div>

        {/* 图标徽章 */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-wheat-400/40 bg-white shadow-card transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-wheat-400 group-hover:shadow-card-hover md:h-[72px] md:w-[72px]">
          <Icon className="h-7 w-7 text-pine-700 transition-colors duration-300 group-hover:text-wheat-600 md:h-8 md:w-8" />
        </div>
        {/* 序号 + 标题 */}
        <span className="mt-4 font-fraunces text-xs font-semibold tracking-widest text-wheat-600">
          {String(i + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-1 font-serif text-lg font-semibold text-ink-900">{node.title}</h3>
      </div>
    )
  }

  return (
    <section ref={rootRef} className="bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="chain-head">
          <Eyebrow text="Full Value Chain" />
        </div>
        <h2 className="chain-head mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
          从母羊繁育到冷链物流的全产业链
        </h2>

        {/* 桌面：横向 6 节点 + 首尾虚线回环 */}
        <div className="chain-track relative mt-16 hidden lg:block">
          {/* 回环虚线（末节点 → 首节点，闭环暗示） */}
          <svg
            className="pointer-events-none absolute inset-x-0 -bottom-16 h-24 w-full"
            viewBox="0 0 1200 96"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              className="chain-loop"
              d="M 1140 8 C 1140 70, 1060 88, 600 88 C 140 88, 60 70, 60 8"
              stroke="#D9A441"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
          </svg>
          <div className="grid grid-cols-6 items-start gap-0">
            {NODES.map((node, i) => (
              <div key={node.title} className="relative flex flex-col items-center">
                {renderNode(node, i)}
                {i < NODES.length - 1 && (
                  <span
                    className="chain-connector absolute left-[calc(50%+44px)] top-9 h-px w-[calc(100%-88px)] origin-left bg-gradient-to-r from-wheat-400 to-wheat-300"
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
          <p className="mt-24 text-center font-inter text-xs uppercase tracking-[0.3em] text-ink-400">
            循环闭环 · Circular Industry Chain
          </p>
        </div>

        {/* 移动端：纵向链条 */}
        <div className="chain-track mt-12 lg:hidden">
          {NODES.map((node, i) => (
            <div key={node.title} className="flex flex-col items-center">
              <div className="relative">
                {renderNode(node, i)}
                {/* 移动端 tooltip 改为常驻小字 */}
                <p className="mt-2 text-center text-xs text-ink-400">{node.tip}</p>
              </div>
              {i < NODES.length - 1 && (
                <span
                  className="chain-connector-v my-5 block h-10 w-px origin-top bg-gradient-to-b from-wheat-400 to-wheat-300"
                  aria-hidden
                />
              )}
            </div>
          ))}
          <p className="mt-8 text-center font-inter text-xs uppercase tracking-[0.3em] text-ink-400">
            循环闭环 · Circular Industry Chain
          </p>
        </div>
      </div>
    </section>
  )
}
