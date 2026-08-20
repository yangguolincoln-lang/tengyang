import { useId, useMemo } from 'react'

/**
 * 雪花飘落装饰体系（纯 SVG + CSS 动画，无额外依赖）
 * 呼应品牌核心「雪花肉羊 / 雪花纹理」：六瓣雪花自上方安静飘落。
 * - DropletField：雪花飘落背景层（自顶部缓缓飘落 + 正弦摇摆 + 轻微自转 + 透明度呼吸）
 * - LiquidBlob：大型模糊径向渐变色团（松绿→麦金，液态 morph/漂浮）
 * - WaveDivider：柔和波浪/雪花弧线区块分隔
 * 全部为装饰性元素：absolute / pointer-events-none / aria-hidden。
 * 动画在 prefers-reduced-motion 下由 CSS 停用。
 */

type Tone = 'light' | 'gold'

/** 确定性伪随机（同一 count 渲染结果稳定，避免 hydration/重渲染抖动） */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

/** 六瓣雪花单枝：主枝 + 枝端小分叉（绕中心旋转 6 次组成六角雪花） */
function SnowflakeArms({ stroke }: { stroke: string }) {
  return (
    <g stroke={stroke} strokeWidth="0.9" strokeLinecap="round" fill="none">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 12 12)`}>
          {/* 主枝 */}
          <path d="M12 12 L12 2.4" />
          {/* 枝端小分叉 */}
          <path d="M12 5.2 L9.9 7.1 M12 5.2 L14.1 7.1" />
          {/* 中段细分叉 */}
          <path d="M12 8.6 L10.6 9.9 M12 8.6 L13.4 9.9" strokeWidth="0.7" />
        </g>
      ))}
      {/* 中心六角 */}
      <path
        d="M12 10.2 L13.56 11.1 L13.56 12.9 L12 13.8 L10.44 12.9 L10.44 11.1 Z"
        strokeWidth="0.8"
      />
    </g>
  )
}

export function DropletField({
  count = 8,
  tone = 'light',
  className = '',
}: {
  count?: number
  tone?: Tone
  className?: string
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const flakes = useMemo(
    () =>
      Array.from({ length: Math.min(count, 12) }, (_, i) => ({
        left: 4 + seeded(i, 1) * 92, // %
        size: 6 + seeded(i, 2) * 12, // 6–18px 错落，营造景深
        duration: 8 + seeded(i, 3) * 8, // 8–16s，不同相位如安静初雪
        delay: -seeded(i, 4) * 16, // 负延迟错开相位
        opacity: 0.35 + seeded(i, 5) * 0.35,
        sway: 1.5 + seeded(i, 6) * 3, // 左右正弦摇摆幅度 vw
        spin: 12 + seeded(i, 7) * 18, // 自转幅度 12–30°
      })),
    [count],
  )
  // 金色雪花用于深色区，米白雪花用于浅金区
  const c1 = tone === 'gold' ? '#EFCB84' : '#FAF7F0'
  const c2 = tone === 'gold' ? '#D9A441' : '#E8DCC3'

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {flakes.map((d, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="snowflake absolute top-[-8%]"
          style={
            {
              left: `${d.left}%`,
              width: d.size,
              height: d.size,
              opacity: d.opacity,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
              '--flake-sway': `${d.sway}vw`,
              '--flake-spin': `${d.spin}deg`,
            } as React.CSSProperties
          }
        >
          <defs>
            <linearGradient id={`sf-${uid}-${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={c1} stopOpacity="0.95" />
              <stop offset="100%" stopColor={c2} stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <SnowflakeArms stroke={`url(#sf-${uid}-${i})`} />
          {/* 轻微渐变高光感：中心一点亮核 */}
          <circle cx="12" cy="12" r="1.1" fill={c1} opacity="0.7" />
        </svg>
      ))}
    </div>
  )
}

export function LiquidBlob({
  tone = 'gold',
  className = '',
  style,
}: {
  tone?: Tone
  className?: string
  style?: React.CSSProperties
}) {
  const bg =
    tone === 'gold'
      ? 'radial-gradient(circle at 35% 35%, rgba(217,164,65,0.5), rgba(46,122,78,0.28) 55%, transparent 72%)'
      : 'radial-gradient(circle at 35% 35%, rgba(46,122,78,0.55), rgba(217,164,65,0.22) 60%, transparent 75%)'
  return (
    <div
      className={`liquid-blob pointer-events-none absolute ${className}`}
      style={{ background: bg, ...style }}
      aria-hidden
    />
  )
}

/** 波浪分隔：top 为上半区背景色，fill 为相邻深色区块颜色 */
export function WaveDivider({
  top = '#FAF7F0',
  fill = '#0B1F16',
  flip = false,
}: {
  top?: string
  fill?: string
  flip?: boolean
}) {
  return (
    <div
      className="relative h-14 w-full overflow-hidden md:h-20"
      style={{ background: top }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={flip ? { transform: 'scaleY(-1)' } : undefined}
      >
        {/* 主波 + 一道错位浅波，形成雪花弧线层次 */}
        <path
          d="M0 58 C180 20 340 92 540 66 C740 40 860 10 1080 42 C1240 66 1350 50 1440 30 L1440 96 L0 96 Z"
          fill={fill}
          opacity="0.35"
        />
        <path
          d="M0 72 C200 36 380 96 580 74 C780 52 920 26 1120 56 C1280 80 1370 64 1440 46 L1440 96 L0 96 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}

/** 极小的迷你雪花点缀图标（用于卡片角落等克制装饰，hover 变金由调用方控制） */
export function DropletAccent({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.35">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 12 12)`}>
            <path d="M12 12 L12 2.6" />
            <path d="M12 5.4 L10.2 7.2 M12 5.4 L13.8 7.2" />
          </g>
        ))}
      </g>
      <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  )
}
