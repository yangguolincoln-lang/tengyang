import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Printer, Calculator, Info } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

/* ------------------------------------------------------------------ */
/* 配方模型（基于公开调研，见文件底部注释）                                */
/* ------------------------------------------------------------------ */

type GroupKey = 'lamb' | 'early' | 'late' | 'ewe' | 'ram'

interface Ingredient {
  name: string
  pct: number // 占全价日粮 %
  price: number // 参考价 元/kg
  kind: 'concentrate' | 'roughage' | 'additive'
}

interface Recipe {
  label: string
  ratioText: string // 精粗比说明
  dmiPct: number // 风干日粮采食量，占体重 %
  refAdg?: number // 参考日增重 g（生长群体）
  ingredients: Ingredient[]
}

const ING_PRICE = {
  corn: 2.4, // 玉米
  soybean: 3.6, // 豆粕
  bran: 2.0, // 麸皮
  forage: 1.0, // 青贮或干草（风干）
  soda: 2.0, // 小苏打
  premix: 6.0, // 预混料
} as const

/** 各阶段基础配方：育肥前期 55:45；后期雪花育成约 75:25；全程小苏打约 1%~1.5% 防酸中毒 */
const STAGE_RECIPES: Record<string, Recipe> = {
  lamb: {
    label: '羔羊开口/培育期',
    ratioText: '约 50:50',
    dmiPct: 3.0,
    refAdg: 200,
    ingredients: [
      { name: '玉米', pct: 34, price: ING_PRICE.corn, kind: 'concentrate' },
      { name: '豆粕', pct: 10, price: ING_PRICE.soybean, kind: 'concentrate' },
      { name: '麸皮', pct: 5, price: ING_PRICE.bran, kind: 'concentrate' },
      { name: '青贮或干草', pct: 49, price: ING_PRICE.forage, kind: 'roughage' },
      { name: '小苏打', pct: 1, price: ING_PRICE.soda, kind: 'additive' },
      { name: '预混料', pct: 1, price: ING_PRICE.premix, kind: 'additive' },
    ],
  },
  early: {
    label: '育肥前期',
    ratioText: '约 55:45',
    dmiPct: 3.2,
    refAdg: 250,
    ingredients: [
      { name: '玉米', pct: 38, price: ING_PRICE.corn, kind: 'concentrate' },
      { name: '豆粕', pct: 11, price: ING_PRICE.soybean, kind: 'concentrate' },
      { name: '麸皮', pct: 5, price: ING_PRICE.bran, kind: 'concentrate' },
      { name: '青贮或干草', pct: 44, price: ING_PRICE.forage, kind: 'roughage' },
      { name: '小苏打', pct: 1, price: ING_PRICE.soda, kind: 'additive' },
      { name: '预混料', pct: 1, price: ING_PRICE.premix, kind: 'additive' },
    ],
  },
  late: {
    label: '育肥后期 · 雪花育成',
    ratioText: '约 75:25（促肌内脂肪沉积）',
    dmiPct: 2.8,
    refAdg: 300,
    ingredients: [
      { name: '玉米', pct: 54, price: ING_PRICE.corn, kind: 'concentrate' },
      { name: '豆粕', pct: 12, price: ING_PRICE.soybean, kind: 'concentrate' },
      { name: '麸皮', pct: 6, price: ING_PRICE.bran, kind: 'concentrate' },
      { name: '青贮或干草', pct: 23, price: ING_PRICE.forage, kind: 'roughage' },
      { name: '小苏打', pct: 1, price: ING_PRICE.soda, kind: 'additive' },
      { name: '预混料', pct: 4, price: ING_PRICE.premix, kind: 'additive' },
    ],
  },
  'ewe-dry': {
    label: '繁殖母羊 · 空怀/妊娠前期',
    ratioText: '约 40:60',
    dmiPct: 2.5,
    ingredients: [
      { name: '玉米', pct: 22, price: ING_PRICE.corn, kind: 'concentrate' },
      { name: '豆粕', pct: 6, price: ING_PRICE.soybean, kind: 'concentrate' },
      { name: '麸皮', pct: 10, price: ING_PRICE.bran, kind: 'concentrate' },
      { name: '青贮或干草', pct: 60, price: ING_PRICE.forage, kind: 'roughage' },
      { name: '小苏打', pct: 1, price: ING_PRICE.soda, kind: 'additive' },
      { name: '预混料', pct: 1, price: ING_PRICE.premix, kind: 'additive' },
    ],
  },
  'ewe-late': {
    label: '繁殖母羊 · 妊娠后期',
    ratioText: '约 55:45',
    dmiPct: 3.2,
    ingredients: [
      { name: '玉米', pct: 30, price: ING_PRICE.corn, kind: 'concentrate' },
      { name: '豆粕', pct: 10, price: ING_PRICE.soybean, kind: 'concentrate' },
      { name: '麸皮', pct: 12, price: ING_PRICE.bran, kind: 'concentrate' },
      { name: '青贮或干草', pct: 45, price: ING_PRICE.forage, kind: 'roughage' },
      { name: '小苏打', pct: 1.5, price: ING_PRICE.soda, kind: 'additive' },
      { name: '预混料', pct: 1.5, price: ING_PRICE.premix, kind: 'additive' },
    ],
  },
  'ewe-lact': {
    label: '繁殖母羊 · 泌乳期',
    ratioText: '约 60:40',
    dmiPct: 3.8,
    ingredients: [
      { name: '玉米', pct: 34, price: ING_PRICE.corn, kind: 'concentrate' },
      { name: '豆粕', pct: 14, price: ING_PRICE.soybean, kind: 'concentrate' },
      { name: '麸皮', pct: 10, price: ING_PRICE.bran, kind: 'concentrate' },
      { name: '青贮或干草', pct: 39, price: ING_PRICE.forage, kind: 'roughage' },
      { name: '小苏打', pct: 1.5, price: ING_PRICE.soda, kind: 'additive' },
      { name: '预混料', pct: 1.5, price: ING_PRICE.premix, kind: 'additive' },
    ],
  },
  'ram-rest': {
    label: '种公羊 · 非配种期',
    ratioText: '约 45:55',
    dmiPct: 2.5,
    ingredients: [
      { name: '玉米', pct: 25, price: ING_PRICE.corn, kind: 'concentrate' },
      { name: '豆粕', pct: 7, price: ING_PRICE.soybean, kind: 'concentrate' },
      { name: '麸皮', pct: 10, price: ING_PRICE.bran, kind: 'concentrate' },
      { name: '青贮或干草', pct: 55, price: ING_PRICE.forage, kind: 'roughage' },
      { name: '小苏打', pct: 1.5, price: ING_PRICE.soda, kind: 'additive' },
      { name: '预混料', pct: 1.5, price: ING_PRICE.premix, kind: 'additive' },
    ],
  },
  'ram-breed': {
    label: '种公羊 · 配种期',
    ratioText: '约 60:40',
    dmiPct: 3.0,
    ingredients: [
      { name: '玉米', pct: 33, price: ING_PRICE.corn, kind: 'concentrate' },
      { name: '豆粕', pct: 12, price: ING_PRICE.soybean, kind: 'concentrate' },
      { name: '麸皮', pct: 12, price: ING_PRICE.bran, kind: 'concentrate' },
      { name: '青贮或干草', pct: 40, price: ING_PRICE.forage, kind: 'roughage' },
      { name: '小苏打', pct: 1.5, price: ING_PRICE.soda, kind: 'additive' },
      { name: '预混料', pct: 1.5, price: ING_PRICE.premix, kind: 'additive' },
    ],
  },
}

const GROUPS: { key: GroupKey; label: string; product: string; stages?: { key: string; label: string }[] }[] = [
  { key: 'lamb', label: '羔羊', product: '雪花宝 · 羔羊开口料' },
  { key: 'early', label: '育肥前期', product: '雪花宝 · 育肥前期料' },
  { key: 'late', label: '育肥后期（雪花育成）', product: '雪花宝 · 育肥后期雪花育成料' },
  {
    key: 'ewe',
    label: '繁殖母羊',
    product: '雪花宝 · 繁殖母羊料',
    stages: [
      { key: 'ewe-dry', label: '空怀/妊娠前期' },
      { key: 'ewe-late', label: '妊娠后期' },
      { key: 'ewe-lact', label: '泌乳期' },
    ],
  },
  {
    key: 'ram',
    label: '种公羊',
    product: '雪花宝 · 种公羊料',
    stages: [
      { key: 'ram-rest', label: '非配种期' },
      { key: 'ram-breed', label: '配种期' },
    ],
  },
]

const fmt = (n: number, digits = 1) =>
  n.toLocaleString('zh-CN', { minimumFractionDigits: digits, maximumFractionDigits: digits })

export default function FeedMixer() {
  const [group, setGroup] = useState<GroupKey>('late')
  const [stage, setStage] = useState('ewe-late')
  const [count, setCount] = useState(500)
  const [weightJin, setWeightJin] = useState(80)
  const [adg, setAdg] = useState(300)

  const groupMeta = GROUPS.find((g) => g.key === group)!
  const isBreedingStock = group === 'ewe' || group === 'ram'
  const recipeKey = isBreedingStock ? stage : group
  const recipe = STAGE_RECIPES[recipeKey]

  const result = useMemo(() => {
    const weightKg = Math.max(weightJin, 1) / 2
    const n = Math.max(Math.round(count), 1)
    // 目标日增重相对参考值微调采食量（限幅 ±20%）
    const adgFactor = !isBreedingStock && recipe.refAdg
      ? Math.min(Math.max(adg / recipe.refAdg, 0.8), 1.2)
      : 1
    const dmiPerHead = weightKg * (recipe.dmiPct / 100) * adgFactor // kg/只/天（风干）
    const rows = recipe.ingredients.map((ing) => ({
      ...ing,
      perHead: (dmiPerHead * ing.pct) / 100,
      total: (dmiPerHead * ing.pct * n) / 100,
    }))
    const costPerKg = recipe.ingredients.reduce((s, i) => s + (i.pct / 100) * i.price, 0)
    const costPerHead = dmiPerHead * costPerKg
    const costTotal = costPerHead * n
    return { dmiPerHead, rows, costPerHead, costTotal, n }
  }, [group, stage, count, weightJin, adg, isBreedingStock, recipe])

  const inputCls =
    'w-full rounded-lg border border-pine-950/15 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-wheat-400 focus:ring-2 focus:ring-wheat-400/25'

  return (
    <section className="bg-ivory-50 py-14 md:py-20" id="feed-mixer">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Eyebrow text="Feed Mixer" />
        <h2 className="mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
          饲料配方在线制作
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-[1.9] text-ink-600 md:text-base">
          选择养殖群体、输入存栏与体重，一键生成分阶段日粮配方、全场日用量与单只日成本估算。
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* 参数面板 */}
          <div className="h-fit rounded-2xl border border-pine-950/8 bg-white p-6 shadow-card md:p-7">
            <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-ink-900">
              <Calculator className="h-5 w-5 text-wheat-400" />
              参数设置
            </h3>

            <div className="mt-6">
              <label className="text-xs font-medium uppercase tracking-wider text-ink-400">
                养殖群体
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {GROUPS.map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => {
                      setGroup(g.key)
                      if (g.stages) setStage(g.stages[1]?.key ?? g.stages[0].key)
                    }}
                    className={
                      group === g.key
                        ? 'rounded-lg bg-pine-700 px-3 py-2.5 text-sm font-medium text-ivory-50 transition-colors'
                        : 'rounded-lg bg-ivory-100 px-3 py-2.5 text-sm text-ink-600 transition-colors hover:bg-wheat-400/15 hover:text-pine-700'
                    }
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {groupMeta.stages && (
              <div className="mt-5">
                <label className="text-xs font-medium uppercase tracking-wider text-ink-400">
                  生理阶段
                </label>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {groupMeta.stages.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setStage(s.key)}
                      className={
                        stage === s.key
                          ? 'rounded-full bg-wheat-400 px-4 py-2 text-sm font-medium text-pine-950'
                          : 'rounded-full bg-ivory-100 px-4 py-2 text-sm text-ink-600 transition-colors hover:bg-wheat-400/20'
                      }
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="fm-count" className="text-xs font-medium text-ink-600">
                  存栏只数（只）
                </label>
                <input
                  id="fm-count"
                  type="number"
                  min={1}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value) || 0)}
                  className={inputCls + ' mt-1.5'}
                />
              </div>
              <div>
                <label htmlFor="fm-weight" className="text-xs font-medium text-ink-600">
                  平均体重（斤）
                </label>
                <input
                  id="fm-weight"
                  type="number"
                  min={1}
                  value={weightJin}
                  onChange={(e) => setWeightJin(Number(e.target.value) || 0)}
                  className={inputCls + ' mt-1.5'}
                />
              </div>
              {!isBreedingStock && (
                <div>
                  <label htmlFor="fm-adg" className="text-xs font-medium text-ink-600">
                    目标日增重（克/天）
                  </label>
                  <input
                    id="fm-adg"
                    type="number"
                    min={50}
                    max={500}
                    value={adg}
                    onChange={(e) => setAdg(Number(e.target.value) || 0)}
                    className={inputCls + ' mt-1.5'}
                  />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-5 py-3 text-sm font-bold text-pine-950 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <Printer className="h-4 w-4" />
              打印配方单
            </button>
          </div>

          {/* 结果区（打印区域） */}
          <motion.div
            key={recipeKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="print-area"
          >
            <div className="rounded-2xl border border-pine-950/8 bg-white p-6 shadow-card md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink-900">{recipe.label} · 日粮配方</h3>
                  <p className="mt-1.5 text-sm text-ink-600">
                    推荐精粗比 <span className="font-semibold text-pine-700">{recipe.ratioText}</span>
                    ，全程添加小苏打防瘤胃酸中毒
                  </p>
                </div>
                <div className="rounded-xl bg-pine-700/8 px-4 py-2.5 text-right">
                  <p className="font-fraunces text-2xl font-bold tabular-nums text-pine-700">
                    {fmt(result.dmiPerHead, 2)}
                    <span className="text-sm font-normal text-ink-600"> kg/只·天</span>
                  </p>
                  <p className="text-xs text-ink-400">风干日粮参考喂量</p>
                </div>
              </div>

              {/* 配方表 */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="border-b border-pine-950/10 text-left text-xs uppercase tracking-wider text-ink-400">
                      <th className="py-3 pr-4 font-medium">原料</th>
                      <th className="py-3 pr-4 font-medium">占比</th>
                      <th className="py-3 pr-4 font-medium">单只日用量</th>
                      <th className="py-3 font-medium">全场日用量（{result.n} 只）</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((r) => (
                      <tr key={r.name} className="border-b border-pine-950/5">
                        <td className="py-3 pr-4 font-medium text-ink-900">
                          {r.name}
                          <span className="ml-2 text-xs font-normal text-ink-400">
                            {r.kind === 'concentrate' ? '精料' : r.kind === 'roughage' ? '粗料' : '添加剂'}
                          </span>
                        </td>
                        <td className="py-3 pr-4 tabular-nums text-ink-600">{fmt(r.pct)}%</td>
                        <td className="py-3 pr-4 tabular-nums text-ink-600">{fmt(r.perHead, 2)} kg</td>
                        <td className="py-3 tabular-nums font-medium text-pine-700">{fmt(r.total, 0)} kg</td>
                      </tr>
                    ))}
                    <tr className="text-sm font-semibold text-ink-900">
                      <td className="py-3 pr-4">合计</td>
                      <td className="py-3 pr-4 tabular-nums">100%</td>
                      <td className="py-3 pr-4 tabular-nums">{fmt(result.dmiPerHead, 2)} kg</td>
                      <td className="py-3 tabular-nums text-pine-700">
                        {fmt(result.dmiPerHead * result.n, 0)} kg
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 成本估算 */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-ivory-100 p-5">
                  <p className="text-xs uppercase tracking-wider text-ink-400">单只日饲喂成本（估）</p>
                  <p className="mt-2 font-fraunces text-3xl font-bold tabular-nums text-pine-700">
                    ¥{fmt(result.costPerHead, 2)}
                  </p>
                </div>
                <div className="rounded-xl bg-ivory-100 p-5">
                  <p className="text-xs uppercase tracking-wider text-ink-400">全场日饲喂成本（估）</p>
                  <p className="mt-2 font-fraunces text-3xl font-bold tabular-nums text-wheat-600">
                    ¥{fmt(result.costTotal, 0)}
                  </p>
                </div>
              </div>

              <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-ink-400">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                配方为通用参考方案（调研来源：Frontiers《肉羊养殖的饲料配方与营养管理措施》2026-01-10 及公开育肥体系资料）；
                原料参考价：玉米 2.4 / 豆粕 3.6 / 麸皮 2.0 / 粗饲料 1.0 / 小苏打 2.0 / 预混料 6.0（元/kg）。
                实际生产请结合原料实测营养值与当地行情调整。
              </p>
            </div>

            {/* 雪花宝推荐位 */}
            <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl bg-pine-950 p-6 sm:flex-row sm:items-center md:p-7">
              <div>
                <span className="eyebrow">Recommended</span>
                <h4 className="mt-2 font-serif text-lg font-bold text-ivory-50">
                  推荐配套：{groupMeta.product}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ivory-50/70">
                  黄河口生物精准营养研发中心研制，营养精控技术使雪花肉品质提升 20%、饲喂效率提高 20%。
                </p>
              </div>
              <Link
                to="/products"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-wheat-400/70 px-5 py-2.5 text-sm font-medium text-wheat-300 transition-colors hover:bg-wheat-400/10"
              >
                查看产品
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
