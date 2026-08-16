import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const NODES = [
  {
    name: '母本奠基',
    desc: '山东小尾寒羊：繁殖力强、适应性好的本土优秀母本。',
  },
  {
    name: '父本引入',
    desc: '澳洲白羊：生长快、体型大、肉用性能突出。',
  },
  {
    name: '排序杂交 · 多代选育',
    desc: '逐代筛选雪花性状与综合性能。',
  },
  {
    name: '择优定型 · 横交固定',
    desc: '锁定理想型，性状稳定遗传。',
  },
  {
    name: '提纯复壮 · 新品系成型',
    desc: '核心群 3000 只、繁育群 30000 只，成果通过认证。',
  },
]

/** Section 3 · 育种路线（5 节点流程，桌面横排 / 移动纵向） */
export default function BreedingRoute() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题入场
      gsap.fromTo(
        '.route-head',
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
      // 节点依次入场：徽章 scale 弹跳 + 文字上移淡入
      gsap.fromTo(
        '.route-badge',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.6,
          ease: 'back.out(2)',
          stagger: 0.15,
          scrollTrigger: { trigger: '.route-flow', start: 'top 70%' },
        },
      )
      gsap.fromTo(
        '.route-text',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '.route-flow', start: 'top 70%' },
        },
      )
      // 连接虚线 dash-offset 逐段绘制（与节点入场同步）
      const connectors = gsap.utils.toArray<SVGLineElement>('.route-connector')
      connectors.forEach((line) => {
        line.style.strokeDasharray = '6 6'
        line.style.strokeDashoffset = '120'
      })
      gsap.to(connectors, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.route-flow', start: 'top 70%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ivory-50 py-14 md:py-24">
      {/* route-map.svg 底图装饰（低透明度，仅桌面） */}
      <img
        src="/route-map.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 hidden w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.08] lg:block"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="route-head">
          <Eyebrow text="BREEDING ROUTE" />
        </div>
        <h2 className="route-head mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
          一条走了十八年的育种路线
        </h2>

        {/* 桌面：5 节点横排；移动：纵向 */}
        <div className="route-flow mt-14 flex flex-col gap-10 lg:flex-row lg:gap-0">
          {NODES.map((node, i) => (
            <div key={node.name} className="group relative flex flex-1 items-start gap-4 lg:flex-col lg:items-center lg:px-3 lg:text-center">
              {/* 序号徽章 + 连接线 */}
              <div className="relative flex flex-col items-center lg:w-full lg:flex-row">
                {/* 左/上连接线 */}
                {i > 0 && (
                  <>
                    {/* 移动端：上方纵向连接线 */}
                    <svg
                      className="absolute -top-10 left-7 h-10 w-0.5 -translate-x-1/2 lg:hidden"
                      viewBox="0 0 2 40"
                      aria-hidden
                    >
                      <line className="route-connector" x1="1" y1="0" x2="1" y2="40" stroke="#D9A441" strokeWidth="2" />
                    </svg>
                    {/* 桌面端：左侧横向连接线 */}
                    <svg
                      className="absolute left-0 top-1/2 hidden h-0.5 w-[calc(50%-1.75rem)] -translate-y-1/2 lg:block"
                      viewBox="0 0 100 2"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <line className="route-connector" x1="0" y1="1" x2="100" y2="1" stroke="#D9A441" strokeWidth="2" />
                    </svg>
                  </>
                )}
                <span
                  className="route-badge relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-wheat-400 bg-ivory-50 font-fraunces text-xl font-bold text-pine-700 transition-colors duration-300 group-hover:bg-wheat-400 group-hover:text-pine-950"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* 右连接线（桌面） */}
                {i < NODES.length - 1 && (
                  <svg
                    className="absolute right-0 top-1/2 hidden h-0.5 w-[calc(50%-1.75rem)] -translate-y-1/2 lg:block"
                    viewBox="0 0 100 2"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <line className="route-connector" x1="0" y1="1" x2="100" y2="1" stroke="#D9A441" strokeWidth="2" />
                  </svg>
                )}
              </div>
              <div className="route-text pt-1 lg:pt-6">
                <h3 className="font-serif text-lg font-semibold text-ink-900 transition-colors duration-300 group-hover:text-pine-700">
                  {node.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600 transition-colors duration-300 group-hover:text-ink-900">
                  {node.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
