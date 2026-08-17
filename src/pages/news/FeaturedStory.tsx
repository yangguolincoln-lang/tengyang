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
                  alt="黄河口滩羊产业技术研究院育种科研场景"
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-4 py-1.5 text-xs font-bold text-pine-950">
                  2026 · 头条
                </span>
                <span className="rounded-full border border-ivory-50/60 bg-pine-950/40 px-4 py-1.5 text-xs font-medium text-ivory-50 backdrop-blur-md shadow-card">
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
                2026.08
              </motion.p>
              <motion.h2
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                className="mt-4 font-serif text-2xl font-semibold leading-[1.5] text-ink-900 md:text-[26px]"
              >
                全基因组测序锁定雪花性状主效基因 —— 盐碱地上一只羊的「百亿逆袭」
              </motion.h2>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                className="mt-5 text-sm leading-[1.9] text-ink-600 md:text-base"
              >
                2026 年 8 月 7 日，山东新闻网重磅报道：黄河口滩羊产业技术研究院完成 2 万余份样本全基因组测序，锁定控制「雪花」性状的主效基因；核心群已培育 3000 多只，2025 年黄河口滩羊全产业链产值达 131.7 亿元。来源：山东新闻网（2026-08-07）
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
                    '科研突破：黄河口滩羊产业技术研究院通过 2 万余份样本全基因组测序与 2 万余只表型数据库，锁定控制「雪花」性状的主效基因，培育出遗传稳定、肌间脂肪丰富的黄三角肉羊，单只可稳定产出雪花肉 20 斤。',
                    '产业规模：目前已培育 3000 多只核心群，2026 年 4 月底通过新品系成果认证；2025 年黄河口滩羊全产业链产值 131.7 亿元，带动 3.5 万人从业。',
                    '下一步计划：待群体扩至 2 万只后，将申报农业农村部新品种审定，争取跻身《国家畜禽遗传资源品种名录》。（来源：山东新闻网，2026-08-07，http://sd.sdnews.com.cn/yw/202608/t20260807_4719212.htm）',
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
