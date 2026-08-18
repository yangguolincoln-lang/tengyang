/**
 * 海洋曲线装饰体系（纯 SVG + CSS 动画，无额外依赖）
 * 呼应「腾洋育纯」品牌意象：黄河入海口的海洋曲线美。
 * - FlowingWaves：多层正弦曲线描边流动动画（stroke-dashoffset 循环），
 *   金绿双色极淡，用于深色背景底部，营造"海浪涌动"。
 * - OceanArc：超大弧度洋流曲线，松绿极淡，用于浅色区块背景构图。
 * 全部为装饰性元素：absolute / pointer-events-none / aria-hidden。
 * 动画在 prefers-reduced-motion 下由 CSS 停用（见 index.css）。
 */

/** 深色背景底部的流动海浪线（金绿双色多层正弦描边） */
export function FlowingWaves({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-32 overflow-hidden md:h-44 ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {/* 第一层 · 麦金主浪 */}
        <path
          className="ocean-wave ocean-wave-1"
          d="M-40 118 C160 78 320 148 520 118 C720 88 880 58 1080 92 C1240 118 1360 102 1480 74"
          stroke="#D9A441"
          strokeOpacity="0.22"
          strokeWidth="1.5"
          strokeDasharray="14 22"
        />
        {/* 第二层 · 松绿涌浪（相位错开） */}
        <path
          className="ocean-wave ocean-wave-2"
          d="M-40 140 C180 104 360 158 560 136 C760 114 920 84 1120 112 C1280 134 1380 122 1480 98"
          stroke="#2E7A4E"
          strokeOpacity="0.2"
          strokeWidth="1.25"
          strokeDasharray="10 18"
        />
        {/* 第三层 · 麦金细浪（最远最淡） */}
        <path
          className="ocean-wave ocean-wave-3"
          d="M-40 92 C200 62 380 116 580 94 C780 72 940 46 1140 72 C1300 92 1390 82 1480 58"
          stroke="#D9A441"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="6 16"
        />
      </svg>
    </div>
  )
}

/** 浅色区块背景的超大弧度洋流曲线（松绿极淡，大弧线构图） */
export function OceanArc({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {/* 洋流大弧：自左下向右上扬起的超大半径弧线 */}
        <path
          d="M-220 700 C 360 60 1080 -60 1700 240"
          stroke="#2E7A4E"
          strokeOpacity="0.09"
          strokeWidth="2"
        />
        <path
          d="M-220 780 C 400 150 1120 20 1700 330"
          stroke="#2E7A4E"
          strokeOpacity="0.06"
          strokeWidth="1.5"
        />
        <path
          d="M-220 860 C 440 240 1160 100 1700 420"
          stroke="#D9A441"
          strokeOpacity="0.05"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

/** 海洋曲线分隔符：居中的一小段流动浪线，用于板块标题间的诗意分隔 */
export function OceanWaveDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none flex justify-center ${className}`} aria-hidden>
      <svg viewBox="0 0 220 24" className="h-6 w-56" fill="none">
        <path
          className="ocean-wave ocean-wave-1"
          d="M4 14 C36 4 62 22 96 13 C130 4 156 22 190 12 C204 8 212 10 216 9"
          stroke="#D9A441"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="8 12"
        />
        <path
          className="ocean-wave ocean-wave-2"
          d="M4 19 C40 11 68 24 100 17 C132 10 162 23 194 15"
          stroke="#2E7A4E"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="5 10"
        />
      </svg>
    </div>
  )
}
