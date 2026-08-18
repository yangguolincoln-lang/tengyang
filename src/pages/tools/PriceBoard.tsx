import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RefreshCw, TrendingUp, AlertTriangle, Tag } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

interface HistoryPoint {
  month: string
  value: number // 元/公斤
}

interface PriceItem {
  id: string
  name: string
  value: string
  unit: string
  date: string
  source: string
  note?: string
  history?: HistoryPoint[]
  historySource?: string
}

interface PriceData {
  updatedAt: string
  trend: { summary: string; source: string }
  items: PriceItem[]
  disclaimer: string
}

/** 纯 SVG 迷你折线图（无依赖） */
function Sparkline({ data, convert }: { data: HistoryPoint[]; convert: (v: number) => number }) {
  if (data.length < 2) return null
  const W = 560
  const H = 140
  const PAD_X = 8
  const PAD_TOP = 18
  const PAD_BOTTOM = 24
  const vals = data.map((d) => convert(d.value))
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const span = max - min || 1
  const x = (i: number) => PAD_X + (i / (data.length - 1)) * (W - PAD_X * 2)
  const y = (v: number) => PAD_TOP + (1 - (v - min) / span) * (H - PAD_TOP - PAD_BOTTOM)
  const pts = data.map((_, i) => [x(i), y(vals[i])] as const)
  const line = pts.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`).join(' ')
  const area = `${line} L${x(data.length - 1).toFixed(1)},${H - PAD_BOTTOM} L${x(0).toFixed(1)},${H - PAD_BOTTOM} Z`
  const last = pts[pts.length - 1]
  const first = pts[0]
  const fmtV = (v: number) => (v >= 100 ? v.toFixed(0) : v.toFixed(1))
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-32 w-full" role="img" aria-label="羊肉批发价历史趋势图">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9A441" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D9A441" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-fill)" />
      <path d={line} fill="none" stroke="#D9A441" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={first[0]} cy={first[1]} r="3" fill="#D9A441" />
      <circle cx={last[0]} cy={last[1]} r="3.5" fill="#D9A441" stroke="#0b2b23" strokeWidth="1.5" />
      <text x={first[0]} y={first[1] - 8} fontSize="11" fill="rgba(253,251,245,0.7)" className="tabular-nums">
        {fmtV(vals[0])}
      </text>
      <text x={last[0]} y={last[1] - 8} fontSize="11" fill="#D9A441" textAnchor="end" className="tabular-nums" fontWeight="700">
        {fmtV(vals[vals.length - 1])}
      </text>
      <text x={first[0]} y={H - 6} fontSize="10" fill="rgba(253,251,245,0.45)">
        {data[0].month}
      </text>
      <text x={last[0]} y={H - 6} fontSize="10" fill="rgba(253,251,245,0.45)" textAnchor="end">
        {data[data.length - 1].month}
      </text>
    </svg>
  )
}

const REFRESH_MS = 5 * 60 * 1000 // 每 5 分钟自动重拉

export default function PriceBoard() {
  const rootRef = useRef<HTMLElement>(null)
  const [data, setData] = useState<PriceData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null)
  const [perJin, setPerJin] = useState(false) // false=元/公斤，true=元/斤

  /** 单位联动换算：公斤 ⇄ 斤（1 公斤 = 2 斤） */
  const convPrice = useCallback(
    (v: number) => (perJin ? v / 2 : v),
    [perJin],
  )
  const displayPrice = useCallback(
    (it: PriceItem): { value: string; unit: string } => {
      const parts = it.value.split(/[-—~]/).map((s) => Number(s.trim()))
      const numeric = parts.every((n) => Number.isFinite(n))
      if (!numeric) return { value: it.value, unit: it.unit }
      const sep = it.value.match(/[-—~]/)?.[0] ?? ''
      const fmtNum = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2))
      if (it.unit === '元/公斤' && perJin)
        return { value: parts.map((n) => fmtNum(n / 2)).join(sep), unit: '元/斤' }
      if (it.unit === '元/斤' && !perJin)
        return { value: parts.map((n) => fmtNum(n * 2)).join(sep), unit: '元/公斤' }
      return { value: it.value, unit: it.unit }
    },
    [perJin],
  )

  const load = useCallback(async () => {
    try {
      const res = await fetch('/data/prices.json', { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = (await res.json()) as PriceData
      setData(json)
      setError(null)
      setFetchedAt(new Date())
    } catch {
      setError('行情数据加载失败，请稍后重试')
    }
  }, [])

  useEffect(() => {
    load()
    const timer = window.setInterval(load, REFRESH_MS)
    return () => window.clearInterval(timer)
  }, [load])

  useEffect(() => {
    if (!data) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.price-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.price-grid', start: 'top 85%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [data])

  return (
    <section ref={rootRef} className="bg-pine-950 py-14 md:py-20" id="price-board">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Eyebrow text="Market Prices" />
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-ivory-50 md:text-4xl">
              价格行情看板
            </h2>
            {data && (
              <p className="mt-3 text-xs text-ivory-50/55">
                数据更新日期：{data.updatedAt}
                {fetchedAt &&
                  ` · 本页拉取于 ${fetchedAt.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}（每 5 分钟自动刷新）`}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* 单位切换 */}
            <div
              role="group"
              aria-label="价格单位切换"
              className="inline-flex overflow-hidden rounded-full border border-wheat-400/40"
            >
              {(['元/公斤', '元/斤'] as const).map((u) => {
                const active = (u === '元/斤') === perJin
                return (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setPerJin(u === '元/斤')}
                    className={
                      active
                        ? 'bg-wheat-400 px-4 py-2 text-xs font-bold text-pine-950 transition-colors'
                        : 'px-4 py-2 text-xs font-medium text-ivory-50/70 transition-colors hover:bg-wheat-400/10'
                    }
                  >
                    {u}
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              onClick={load}
              className="inline-flex items-center gap-2 rounded-full border border-wheat-400/60 px-4 py-2 text-xs font-medium text-wheat-300 transition-colors hover:bg-wheat-400/10"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              手动刷新
            </button>
          </div>
        </div>

        {/* 趋势提示 */}
        {data && (
          <div className="glass-dark glass-liquid mt-8 flex items-start gap-3 rounded-xl !border-wheat-400/30 bg-wheat-400/8 p-5">
            <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-wheat-400" />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-[1.8] text-ivory-50/85">{data.trend.summary}</p>
              <p className="mt-1.5 text-xs text-ivory-50/45">趋势来源：{data.trend.source}</p>
              {/* 羊肉批发价历史趋势迷你图 */}
              {data.items.some((it) => it.history && it.history.length > 1) && (
                <div className="mt-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-xs font-medium text-ivory-50/70">
                      全国羊肉批发价月度走势（{perJin ? '元/斤' : '元/公斤'}）
                    </p>
                    <p className="text-[11px] text-ivory-50/40">
                      {data.items.find((it) => it.history)?.historySource}
                    </p>
                  </div>
                  <div className="mt-2">
                    <Sparkline
                      data={data.items.find((it) => it.history)!.history!}
                      convert={convPrice}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 价格卡片 */}
        {error && (
          <div className="mt-8 flex items-center gap-2 rounded-xl border border-marble-500/40 bg-marble-500/10 p-5 text-sm text-ivory-50/85">
            <AlertTriangle className="h-4 w-4 shrink-0 text-marble-500" />
            {error}
          </div>
        )}
        {!data && !error && (
          <p className="mt-10 text-sm text-ivory-50/55">行情数据加载中…</p>
        )}
        {data && (
          <div className="price-grid mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((it) => (
              <article
                key={it.id}
                className="price-card glass-dark glass-hover flex flex-col rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 text-xs text-ivory-50/55">
                  <Tag className="h-3.5 w-3.5 text-wheat-400" />
                  {it.date}
                </div>
                <h3 className="mt-3 font-serif text-base font-semibold text-ivory-50">{it.name}</h3>
                <p className="gold-glow mt-3 font-fraunces text-3xl font-bold tabular-nums text-wheat-400">
                  {displayPrice(it).value}
                  <span className="ml-1.5 text-sm font-normal text-ivory-50/60">{displayPrice(it).unit}</span>
                </p>
                {it.note && (
                  <p className="mt-3 text-xs leading-relaxed text-ivory-50/60">{it.note}</p>
                )}
                <p className="mt-auto pt-4 text-[11px] leading-relaxed text-ivory-50/40">
                  来源：{it.source}
                </p>
              </article>
            ))}
          </div>
        )}

        {/* 免责声明 */}
        {data && (
          <p className="mt-8 flex items-start gap-2 border-t border-white/10 pt-6 text-xs leading-relaxed text-ivory-50/45">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-wheat-400/70" />
            {data.disclaimer}
          </p>
        )}
      </div>
    </section>
  )
}
