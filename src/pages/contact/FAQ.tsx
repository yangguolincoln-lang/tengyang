import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: '黄三角肉羊是什么品种？',
    a: '由中科院西北研究院杨果团队、黄河口滩羊产业技术研究院与我公司联合培育的雪花肉羊新品系，2026 年通过成果认证，是我国首个自主培育的专门化雪花肉羊新品系。',
  },
  {
    q: '如何开展引种合作？',
    a: '请通过在线留言说明养殖规模与需求，我们将安排专人与您对接种羊引种、繁育与技术服务方案。',
  },
  {
    q: '「超白羊」是什么？',
    a: '我公司注册的商标（第 29 类），用于羊肉、羊奶等品牌化产品，是从牧场到餐桌的品牌布局。',
  },
  {
    q: '可以参观产业园吗？',
    a: '欢迎预约考察黄河口滩羊产业园，请通过留言说明来访意向与时间。',
  },
]

function FaqItem({
  item,
  open,
  onToggle,
}: {
  item: (typeof FAQS)[number]
  open: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className="rounded-2xl bg-white shadow-card"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={cn('font-serif text-base font-semibold md:text-lg', open ? 'text-pine-700' : 'text-ink-900')}>
          {item.q}
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 transition-transform duration-300',
            open ? 'rotate-180 text-wheat-400' : 'text-ink-400',
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-[1.8] text-ink-600 md:text-base">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-12">
        <div className="text-center">
          <Eyebrow text="FAQ" align="center" />
          <h2 className="mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">常见问题</h2>
        </div>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 space-y-4"
        >
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
