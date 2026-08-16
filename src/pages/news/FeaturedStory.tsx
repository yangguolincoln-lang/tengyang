import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

/** Section 2 · 头条里程碑（超大横式卡 + 内联详情抽屉） */
export default function FeaturedStory() {
  const [open, setOpen] = useState(false)

  return (
    <section className="bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="overflow-hidden rounded-2xl bg-white shadow-card"
        >
          <div className="flex flex-col lg:flex-row">
            {/* 左图 55%：clip-path 从左揭示 */}
            <div className="relative lg:w-[55%]">
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, margin: '-20% 0px' }}
                transition={{ duration: 0.9, ease: EASE }}
                className="h-64 overflow-hidden sm:h-80 lg:h-full lg:min-h-[420px]"
              >
                <img
                  src="/news-cert.jpg"
                  alt="新品系成果认证会议现场，专家审阅材料"
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-4 py-1.5 text-xs font-bold text-pine-950">
                  2026 · 头条
                </span>
                <span className="rounded-full border border-ivory-50/80 bg-pine-950/40 px-4 py-1.5 text-xs font-medium text-ivory-50 backdrop-blur-sm">
                  里程碑
                </span>
              </div>
            </div>

            {/* 右文 45% */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-20% 0px' }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.25 }}
              className="flex flex-col justify-center p-7 md:p-10 lg:w-[45%]"
            >
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                className="font-fraunces text-sm font-semibold tracking-widest text-wheat-600"
              >
                2026.04
              </motion.p>
              <motion.h2
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                className="mt-4 font-serif text-2xl font-semibold leading-[1.5] text-ink-900 md:text-[26px]"
              >
                黄三角肉羊通过新品系成果认证 —— 我国首个自主培育的专门化雪花肉羊新品系
              </motion.h2>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                className="mt-5 text-sm leading-[1.9] text-ink-600 md:text-base"
              >
                2026 年 4 月底，黄三角肉羊正式通过新品系成果认证，彻底打破国外对高端雪花肉羊种质资源的长期垄断，标志着我国高端肉羊种源实现自主可控。
              </motion.p>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                className="mt-7"
              >
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  className="group inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-pine-700 transition-colors hover:text-wheat-600"
                >
                  {open ? '收起详情' : '阅读详情'}
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')}
                  />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* 内联详情抽屉（Framer Motion height 动画 0.4s） */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="detail"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="overflow-hidden border-t border-ivory-100"
              >
                <motion.div
                  initial="hidden"
                  animate="show"
                  transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}
                  className="bg-ivory-50/60 p-7 md:p-10"
                >
                  {[
                    '认证历程回顾：2023 年 5 月，繁育科研项目进入中试阶段，雪花肉羊从实验室走向规模化验证；2024 年 1 月 10 日，新品种生产性能测定暨现场初审通过，专家组一致认为「黄三角肉羊」具备新品种申报条件。',
                    '2026 年 4 月底，黄三角肉羊正式通过新品系成果认证，成为我国首个自主培育的专门化雪花肉羊新品系，彻底打破国外对高端雪花肉羊种质资源的长期垄断。',
                    '成果引发广泛关注，CCTV 地方频道、山东新闻网、中国日报网等多家主流媒体集中报道，「盐碱地育出高端雪花羊」成为乡村振兴的热点样本。',
                  ].map((text) => (
                    <motion.p
                      key={text.slice(0, 12)}
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                      }}
                      className="text-sm leading-[1.9] text-ink-600 [&+p]:mt-4"
                    >
                      {text}
                    </motion.p>
                  ))}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                    }}
                    className="mt-7 flex flex-wrap gap-x-8 gap-y-3"
                  >
                    <Link
                      to="/breed"
                      className="group inline-flex items-center gap-1.5 text-sm font-bold text-pine-700 transition-colors hover:text-wheat-600"
                    >
                      了解核心品种
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/tech"
                      className="group inline-flex items-center gap-1.5 text-sm font-bold text-pine-700 transition-colors hover:text-wheat-600"
                    >
                      了解育种科技
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.article>
      </div>
    </section>
  )
}
