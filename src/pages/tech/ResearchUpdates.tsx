import { ArrowUpRight, Dna, Microscope, Wheat } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

const RESEARCH = [
  {
    icon: Dna,
    date: '2026.09.20',
    field: '种源创新',
    title: '基因组选育与胚胎移植协同，加快优质种羊精准扩繁',
    summary:
      '中国网报道，盐窝镇科研团队以全基因组测序辅助雪花肉羊选育，并采用超数排卵与胚胎移植扩繁核心种羊；报道所述胚胎移植受孕率稳定在 80% 以上，为“基因选种—快速扩繁—订单化养殖”衔接提供了产业样本。',
    source: '中国网',
    url: 'http://ccpd.china.com.cn/2026-09/20/content_43494780.html',
  },
  {
    icon: Wheat,
    date: '2026.09.04',
    field: '精准营养',
    title: '数字监测、多组学与功能性添加剂走向一体化',
    summary:
      '《Animal Advances》综述提出，将可穿戴与图像传感、人工智能预测和宏基因组、代谢组、转录组信息结合，形成可动态调整的精准营养框架，为反刍动物健康、生产效率与减排协同管理提供新思路。',
    source: 'Animal Advances · DOI: 10.48130/animadv-0026-0011',
    url: 'https://maxapress.com/article/doi/10.48130/animadv-0026-0011',
  },
  {
    icon: Microscope,
    date: '2026.09.04',
    field: '肉品质',
    title: '过瘤胃甜菜碱研究揭示肌内脂肪与嫩度调控线索',
    summary:
      '《Metabolites》一项 60 只藏羊、90 天饲喂试验显示，在日粮中添加 0.08% 过瘤胃甜菜碱与肌内脂肪沉积增加、部分不饱和脂肪酸提高，以及剪切力、蒸煮损失和硬度下降相关；其应用仍需结合品种与日粮验证。',
    source: 'Metabolites · PubMed',
    url: 'https://pubmed.ncbi.nlm.nih.gov/42783775/',
  },
]

/** 近期公开科研进展：明确区分外部研究与园区产业实践 */
export default function ResearchUpdates() {
  return (
    <section className="border-y border-pine-950/8 bg-ivory-100 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <Eyebrow text="RESEARCH FRONTIERS · 2026" />
            <h2 className="mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
              近期肉羊科研进展
            </h2>
            <p className="mt-4 text-sm leading-[1.85] text-ink-600 md:text-base">
              跟踪种源、营养与肉品质研究的公开成果，为育种和养殖实践提供可参考的前沿视角。
            </p>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-ink-400 md:text-right">
            更新至 2026.10.28。以下为公开论文或报道，不代表均为本企业研发成果。
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {RESEARCH.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col rounded-2xl border border-pine-950/8 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover md:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pine-700/8 text-pine-700 transition-colors group-hover:bg-wheat-400/15 group-hover:text-wheat-600">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="text-right">
                  <span className="block text-xs font-medium tracking-wide text-pine-700">{item.field}</span>
                  <time className="mt-1 block font-fraunces text-sm tabular-nums text-ink-400">{item.date}</time>
                </div>
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold leading-[1.55] text-ink-900">
                {item.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-[1.85] text-ink-600">{item.summary}</p>
              <div className="mt-6 border-t border-ink-900/8 pt-4">
                <p className="text-xs leading-relaxed text-ink-400">来源：{item.source}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-pine-700 underline-offset-4 transition-colors hover:text-wheat-600 hover:underline"
                >
                  阅读原始来源
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
