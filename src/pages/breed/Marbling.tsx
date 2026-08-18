import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const DATA_POINTS = [
  { value: '>10%', label: 'M5 级别雪花纹占比' },
  { value: '低膻味', label: '肌间脂肪均匀分布，肉质细嫩' },
  { value: 'M5 级', label: '对标高端雪花牛肉的评级体系' },
]

/**
 * Section 2 · 雪花纹理 — 大理石纹 SVG 生成动画。
 * 肉图上叠加 marble-pattern 同款金色描边曲线，随滚动以
 * stroke-dashoffset 逐条绘制（scrub，1.5× 视口行程）。
 */
export default function Marbling() {
  const rootRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 测量每条纹理路径长度，设置 dasharray / dashoffset 初值
      const paths = svgRef.current
        ? Array.from(svgRef.current.querySelectorAll<SVGPathElement>('path'))
        : []
      paths.forEach((p) => {
        const len = p.getTotalLength()
        p.style.strokeDasharray = `${len}`
        p.style.strokeDashoffset = `${len}`
      })
      // 随滚动逐条"点亮"纹理
      gsap.to(paths, {
        strokeDashoffset: 0,
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.marble-visual',
          start: 'top 85%',
          end: '+=150%',
          scrub: true,
        },
      })
      // 肉图轻微视差 yPercent -8
      gsap.fromTo(
        '.marble-img',
        { yPercent: 8 },
        {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.marble-visual',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
      // 标题入场
      gsap.fromTo(
        '.marble-head',
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
      // 数据点依次淡入上移
      gsap.fromTo(
        '.marble-stat',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '.marble-stats', start: 'top 80%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="overflow-hidden bg-pine-900 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="marble-head">
          <Eyebrow text="THE MARBLING" align="center" />
        </div>
        <h2 className="marble-head mt-4 text-center font-serif text-3xl font-bold text-ivory-50 md:text-4xl">
          大理石花纹，是写进基因里的品质
        </h2>

        {/* 中央肉图 + 金色纹理叠加 */}
        <div className="marble-visual relative mx-auto mt-12 md:w-[60%]">
          <div className="relative overflow-hidden rounded-2xl shadow-card-hover">
            <div className="marble-img will-change-transform">
              <img loading="lazy"
                src="/marble-meat.jpg"
                alt="雪花羊肉大理石花纹微距特写"
                className="block h-auto w-full scale-110 object-cover"
              />
            </div>
            {/* 金色描边纹理（与肉纹走向呼应，随滚动绘制） */}
            <svg
              ref={svgRef}
              viewBox="0 0 1200 600"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
              aria-hidden
            >
              <defs>
                <linearGradient id="marbleGold" x1="0" y1="0" x2="1200" y2="600" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#E8BE6A" stopOpacity="0.9" />
                  <stop offset="0.5" stopColor="#D9A441" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#FAF7F0" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id="marbleIvory" x1="1200" y1="0" x2="0" y2="600" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#FAF7F0" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#E8BE6A" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <g stroke="url(#marbleGold)" fill="none" strokeLinecap="round">
                <path d="M-20 120 C160 60 260 200 420 160 C580 120 640 240 820 210 C980 185 1060 260 1220 230" strokeWidth="2.4" />
                <path d="M-20 180 C180 130 300 260 460 220 C620 180 700 300 860 270 C1010 242 1100 320 1220 290" strokeWidth="1.4" opacity="0.7" />
                <path d="M-20 320 C140 260 280 380 440 340 C600 300 680 420 850 390 C1000 364 1090 440 1220 410" strokeWidth="2" opacity="0.85" />
                <path d="M-20 460 C180 400 320 520 480 480 C640 440 720 560 890 530 C1030 505 1110 570 1220 545" strokeWidth="1.6" opacity="0.6" />
              </g>
              <g stroke="url(#marbleIvory)" fill="none" strokeLinecap="round">
                <path d="M-20 60 C200 110 340 20 520 70 C700 120 780 30 960 80 C1080 112 1150 70 1220 90" strokeWidth="1.8" />
                <path d="M-20 260 C170 310 330 210 510 260 C690 310 770 220 950 270 C1070 302 1140 260 1220 280" strokeWidth="1.2" opacity="0.75" />
                <path d="M-20 400 C190 450 350 350 530 400 C710 450 790 360 970 410 C1090 442 1160 400 1220 420" strokeWidth="2.2" opacity="0.9" />
                <path d="M-20 540 C210 590 370 490 550 540 C730 590 810 500 990 550 C1110 582 1180 540 1220 560" strokeWidth="1.4" opacity="0.65" />
              </g>
            </svg>
          </div>
          <p className="mt-4 text-center font-inter text-xs uppercase tracking-[0.25em] text-ivory-50/40">
            Snowflake Marbling · M5 Grade
          </p>
        </div>

        {/* 三枚横向数据点 */}
        <div className="marble-stats mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3 md:mt-16">
          {DATA_POINTS.map((d) => (
            <div key={d.label} className="marble-stat border-t border-wheat-400/30 pt-5 text-center">
              <p className="font-fraunces text-3xl font-bold tabular-nums text-wheat-400 md:text-4xl">{d.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-ivory-50/70">{d.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
