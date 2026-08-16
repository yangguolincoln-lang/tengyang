import { useEffect, useRef } from 'react'

/**
 * 基因星尘粒子（2D Canvas 实现，无 WebGL 依赖）：
 * 金色/象牙白微粒缓慢流动 + 正弦浮动 + 鼠标视差（lerp 回归）。
 * 保持原 Three.js 版视觉意图，兼容性更好、体积更小。
 */

interface Particle {
  bx: number // 基础位置（0-1 归一化）
  by: number
  depth: number // 0-1，模拟景深：越大越近
  phase: number
  speed: number
  gold: boolean
  size: number
}

const GOLD = '217, 164, 65'
const IVORY = '250, 247, 240'

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let running = true
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)

    // 鼠标视差（lerp 衰减）
    const pointer = { x: 0, y: 0 }
    const displacement = { x: 0, y: 0 }

    // 根据面积自适应粒子数（上限 900，2D canvas 性能安全）
    const particles: Particle[] = []

    const seed = () => {
      const target = Math.min(900, Math.floor((width * height) / 2200))
      particles.length = 0
      for (let i = 0; i < target; i++) {
        particles.push({
          bx: Math.random(),
          by: Math.random(),
          depth: 0.25 + Math.random() * 0.75,
          phase: Math.random() * Math.PI * 2,
          // 周期 6–10s
          speed: (Math.PI * 2) / (6 + Math.random() * 4),
          gold: Math.random() < 0.4,
          size: 0.6 + Math.random() * 1.8,
        })
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (particles.length === 0) seed()
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1
      pointer.y = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1
    }

    let start = performance.now()
    const tick = (now: number) => {
      if (!running) return
      const t = (now - start) / 1000
      ctx.clearRect(0, 0, width, height)

      // lerp 回归鼠标视差
      displacement.x += (pointer.x * 26 - displacement.x) * 0.05
      displacement.y += (pointer.y * 18 - displacement.y) * 0.05

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const floatY = Math.sin(t * p.speed + p.phase) * 14 * p.depth
        const x = p.bx * width + displacement.x * p.depth
        const y = p.by * height + floatY + displacement.y * p.depth
        const r = p.size * p.depth
        const alpha = 0.25 + p.depth * 0.55
        ctx.beginPath()
        ctx.fillStyle = p.gold
          ? `rgba(${GOLD}, ${alpha})`
          : `rgba(${IVORY}, ${alpha * 0.85})`
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    // 离屏暂停，省电省性能
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true
        if (visible && !running) {
          running = true
          start = performance.now()
          raf = requestAnimationFrame(tick)
        } else if (!visible && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )

    resize()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
