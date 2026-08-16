import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RefreshCw, TrendingUp, AlertTriangle, Tag } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

interface PriceItem {
  id: string
  name: string
  value: string
  unit: string
  date: string
  source: string
  note?: string
}

interface PriceData {
  updatedAt: string
  trend: { summary: string; source: string }
  items: PriceItem[]
  disclaimer: string
}

const REFRESH_MS = 5 * 60 * 1000 // 每 5 分钟自动重拉

export default function PriceBoard() {
  const rootRef = useRef<HTMLElement>(null)
  const [data, setData] = useState<PriceData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null)

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
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-2 rounded-full border border-wheat-400/60 px-4 py-2 text-xs font-medium text-wheat-300 transition-colors hover:bg-wheat-400/10"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            手动刷新
          </button>
        </div>

        {/* 趋势提示 */}
        {data && (
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-wheat-400/30 bg-wheat-400/8 p-5">
            <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-wheat-400" />
            <div>
              <p className="text-sm leading-[1.8] text-ivory-50/85">{data.trend.summary}</p>
              <p className="mt-1.5 text-xs text-ivory-50/45">趋势来源：{data.trend.source}</p>
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
                className="price-card flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-wheat-400/40"
              >
                <div className="flex items-center gap-2 text-xs text-ivory-50/55">
                  <Tag className="h-3.5 w-3.5 text-wheat-400" />
                  {it.date}
                </div>
                <h3 className="mt-3 font-serif text-base font-semibold text-ivory-50">{it.name}</h3>
                <p className="mt-3 font-fraunces text-3xl font-bold tabular-nums text-wheat-400">
                  {it.value}
                  <span className="ml-1.5 text-sm font-normal text-ivory-50/60">{it.unit}</span>
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
