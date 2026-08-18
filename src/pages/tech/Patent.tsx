import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const FIELDS = [
  { label: '发明人', value: '梁艳萍 · 杨果' },
  { label: '申请日', value: '2023-10-26' },
  { label: '公布日', value: '2023-12-12' },
  { label: '专利权人', value: '山东腾洋育纯农牧科技有限公司' },
]

const STEPS = ['表型测定', '基因检测', '标记筛选', '定向培育']

/** Section 3 · 专利方法（深色区块，专利信息横条 + 4 步流程） */
export default function Patent() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题入场
      gsap.fromTo(
        '.patent-head',
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
      // 专利宽卡上移淡入（触发 25%）
      gsap.fromTo(
        '.patent-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
        },
      )
      // 4 字段 stagger 亮起
      gsap.fromTo(
        '.patent-field',
        { opacity: 0.15 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.3,
          scrollTrigger: { trigger: '.patent-card', start: 'top 75%' },
        },
      )
      // 流程节点虚线逐段绘制
      const connectors = gsap.utils.toArray<SVGLineElement>('.patent-connector')
      connectors.forEach((line) => {
        const len = 120
        line.style.strokeDasharray = '5 5'
        line.style.strokeDashoffset = String(len)
      })
      gsap.to(connectors, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: { trigger: '.patent-steps', start: 'top 78%' },
      })
      // 节点徽章依次弹入
      gsap.fromTo(
        '.patent-step',
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.8)',
          stagger: 0.2,
          scrollTrigger: { trigger: '.patent-steps', start: 'top 78%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-pine-900 py-14 md:py-24">
      {/* DNA 装饰水印 */}
      <img loading="lazy"
        src="/dna-helix.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 w-72 -translate-y-1/2 select-none opacity-[0.07] md:w-96"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="patent-head">
          <Eyebrow text="NATIONAL INVENTION PATENT" align="center" />
        </div>
        <h2 className="patent-head mt-4 text-center font-serif text-3xl font-bold text-ivory-50 md:text-4xl">
          《一种雪花肉羊的培育方法》
        </h2>
        <p className="patent-head mt-4 text-center font-inter text-xs uppercase tracking-[0.25em] text-ivory-50/40">
          National Invention Patent
        </p>

        {/* 专利信息横条 */}
        <div className="patent-card mt-12 rounded-2xl border border-wheat-400/40 bg-pine-950/60 p-7 md:p-9">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {FIELDS.map((f) => (
              <div key={f.label} className="patent-field border-l-2 border-wheat-400/50 pl-4">
                <p className="font-inter text-xs uppercase tracking-[0.2em] text-ivory-50/50">{f.label}</p>
                <p className="mt-2 font-serif text-base font-semibold text-ivory-50 md:text-lg">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 步方法流程 */}
        <div className="patent-steps mx-auto mt-14 flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-0">
          {STEPS.map((step, i) => (
            <div key={step} className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="patent-step flex flex-col items-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-wheat-400 bg-pine-950 font-fraunces text-lg font-bold text-wheat-400">
                  {i + 1}
                </span>
                <span className="mt-3 font-serif text-base font-semibold text-ivory-50">{step}</span>
              </div>
              {i < STEPS.length - 1 && (
                <svg
                  className="h-px w-16 rotate-90 sm:mx-5 sm:rotate-0"
                  viewBox="0 0 64 2"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <line className="patent-connector" x1="0" y1="1" x2="64" y2="1" stroke="#D9A441" strokeWidth="2" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* 平台投入 */}
        <p className="patent-field mx-auto mt-14 max-w-3xl text-center text-sm leading-[1.9] text-ivory-50/60">
          园区投资 6000 万元建设黄河口雪花羊胚胎繁育中心，投资 6200 万元建设黄河口生物基因工程研发中心（CNAS
          生物基因工程实验室），为育种创新提供硬核平台支撑。
        </p>
      </div>
    </section>
  )
}
