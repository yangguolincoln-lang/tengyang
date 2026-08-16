import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const TITLE = '把“芯片”装进肉羊种源里'

/** 静态回退：CSS 金色径向渐变 */
function StaticGlow() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 55% 45% at 70% 40%, rgba(217,164,65,0.18), transparent 65%), radial-gradient(ellipse 40% 35% at 25% 70%, rgba(234,242,238,0.08), transparent 70%)',
      }}
      aria-hidden
    />
  )
}

/**
 * DNA 双螺旋 canvas 粒子背景：约 200 粒子连成缓慢旋转的双螺旋点阵
 * （20s/圈，金色/冷白，整体 opacity 40%），鼠标视差 ±20px。
 * 离开视口自动暂停渲染。
 */
function DnaHelixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2d = canvas.getContext('2d')
    if (!ctx2d) return

    let raf = 0
    let running = false
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // 鼠标视差目标与当前值（lerp 衰减）
    const mouse = { tx: 0, ty: 0, x: 0, y: 0 }
    let rot = 0
    let last = performance.now()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 40 // ±20px
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 40
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('resize', resize)

    const PER_STRAND = 100 // 2 × 100 = 200 粒子
    const RUNG_EVERY = 8
    const TURNS = 2.2 // 螺旋圈数

    const draw = (now: number) => {
      if (!running) return
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      rot += (dt * Math.PI * 2) / 20 // 20s / 圈

      // 鼠标视差 lerp
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06

      ctx2d.clearRect(0, 0, width, height)
      ctx2d.globalAlpha = 0.4

      const cx = width * 0.62 + mouse.x
      const cy = mouse.y
      const amp = Math.min(width * 0.16, 190)
      const strandX: number[] = []
      const strandY: number[] = []
      const strandD: number[] = []

      for (let s = 0; s < 2; s++) {
        const phase = s * Math.PI
        for (let i = 0; i < PER_STRAND; i++) {
          const t = i / (PER_STRAND - 1)
          const y = t * height
          const angle = t * Math.PI * 2 * TURNS + rot + phase
          const x = cx + Math.sin(angle) * amp
          const depth = (Math.cos(angle) + 1) / 2 // 0(后) → 1(前)
          const r = 1.2 + depth * 2.2
          const gold = (i + s) % 3 === 0
          ctx2d.fillStyle = gold ? '#D9A441' : '#EAF2EE'
          ctx2d.globalAlpha = 0.14 + depth * 0.26
          ctx2d.beginPath()
          ctx2d.arc(x, y + cy, r, 0, Math.PI * 2)
          ctx2d.fill()
          if (s === 1 && i % RUNG_EVERY === 0) {
            // 与对侧链同索引位置画横向连接
            const angleA = t * Math.PI * 2 * TURNS + rot
            const xA = cx + Math.sin(angleA) * amp
            ctx2d.globalAlpha = 0.06 + depth * 0.1
            ctx2d.strokeStyle = '#D9A441'
            ctx2d.lineWidth = 1
            ctx2d.beginPath()
            ctx2d.moveTo(xA, y + cy)
            ctx2d.lineTo(x, y + cy)
            ctx2d.stroke()
          }
          if (s === 0) {
            strandX.push(x)
            strandY.push(y + cy)
            strandD.push(depth)
          }
        }
      }
      ctx2d.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    // 视口可见性控制：离开视口暂停
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false
        if (visible && !running) {
          running = true
          last = performance.now()
          raf = requestAnimationFrame(draw)
        } else if (!visible && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.05 },
    )
    io.observe(canvas)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
      aria-hidden
    />
  )
}

/** Section 1 · 科技 Hero（70vh，背景图 + DNA 粒子） */
export default function TechHero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // H1 字符级拆分：上移 50px + 淡入，stagger 0.04s
      gsap.fromTo(
        '.tech-hero-char',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.04, delay: 0.25 },
      )
      // 面包屑 / eyebrow
      gsap.fromTo(
        '.tech-hero-fade',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12 },
      )
      // 副文案延迟 0.8s 淡入上移
      gsap.fromTo(
        '.tech-hero-sub',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 },
      )
      // 背景轻微视差
      gsap.to('.tech-hero-bg', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative -mt-20 flex min-h-[70vh] items-center overflow-hidden bg-pine-950"
    >
      {/* 背景图 + 75% 深色遮罩 */}
      <div className="tech-hero-bg absolute -inset-y-[10%] inset-x-0" aria-hidden>
        <img src="/lab-science.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-pine-950/75" />
      </div>
      <StaticGlow />
      {/* DNA 粒子（仅桌面） */}
      <div className="absolute inset-0 z-[1] hidden md:block">
        <DnaHelixCanvas />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-[1280px] px-5 pb-14 pt-36 md:px-12 md:pt-44">
        <nav className="tech-hero-fade flex items-center gap-1.5 text-sm text-ivory-50/60" aria-label="面包屑">
          <Link to="/" className="transition-colors hover:text-wheat-300">
            首页
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="text-wheat-300">科技创新</span>
        </nav>

        <Eyebrow text="SCIENCE & INNOVATION" className="tech-hero-fade mt-8" />

        <h1
          className="mt-5 font-serif text-4xl font-black leading-[1.2] text-ivory-50 md:text-[56px] md:leading-[1.15]"
          aria-label={TITLE}
        >
          {Array.from(TITLE).map((ch, i) => (
            <span key={i} className="tech-hero-char inline-block will-change-transform" aria-hidden>
              {ch}
            </span>
          ))}
        </h1>

        <p className="tech-hero-sub mt-6 max-w-xl text-base leading-[1.8] text-ivory-50/80 md:text-lg md:leading-[1.75]">
          自主研发 GBS 肉羊基因检测液相芯片，构建 2 万余份样本基因数据库，用分子精准育种锁定每一片雪花。
        </p>
      </div>
    </section>
  )
}
