import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin } from 'lucide-react'
import { NAV_LINKS } from './Navbar'

gsap.registerPlugin(ScrollTrigger)

const KEYWORDS = ['雪花肉羊育种', '种羊繁育', '胚胎工程', '基因检测', '产业化推广']
const PARTNERS = ['中国科学院西北生态环境资源研究院', '黄河口滩羊产业技术研究院']

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null)

  // 背景水印英文缓慢视差
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.footer-watermark', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={rootRef} className="relative overflow-hidden bg-pine-950 text-ivory-50">
      {/* 顶部细分隔线：金色渐变 + 柔光晕 */}
      <div className="relative h-px w-full" aria-hidden>
        <div className="gold-gradient-line absolute inset-0" />
        <div className="absolute inset-x-0 -top-px h-[3px] bg-gradient-to-r from-transparent via-wheat-400/25 to-transparent blur-[2px]" />
      </div>

      {/* 背景水印（仅桌面） */}
      <div
        className="footer-watermark pointer-events-none absolute -bottom-8 left-0 hidden w-full select-none whitespace-nowrap font-fraunces text-[9vw] font-bold uppercase leading-none tracking-tight text-ivory-50/[0.08] lg:block"
        aria-hidden
      >
        Snowflake Mutton Sheep
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 pb-10 pt-16 md:px-12 md:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* 品牌栏 */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo-icon.png" alt="腾洋育纯标识" className="h-10 w-10" style={{ color: '#D9A441' }} />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-xl font-bold">腾洋育纯</span>
                <span className="font-inter text-[10px] uppercase tracking-[0.28em] text-ivory-50/50">
                  Tengyang Yuchun
                </span>
              </span>
            </Link>
            <p className="mt-5 font-serif text-lg leading-relaxed text-ivory-50/85">
              让高端肉羊种源，自主可控。
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ivory-50/60">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-wheat-400" />
              山东省东营市利津县盐窝镇 · 黄河口滩羊产业园
            </p>
          </div>

          {/* 快速导航 */}
          <div>
            <h3 className="font-serif text-base font-bold text-wheat-300">快速导航</h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-ivory-50/70 transition-colors hover:text-wheat-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 业务关键词 */}
          <div>
            <h3 className="font-serif text-base font-bold text-wheat-300">业务方向</h3>
            <ul className="mt-5 space-y-3">
              {KEYWORDS.map((k) => (
                <li key={k} className="flex items-center gap-2 text-sm text-ivory-50/70">
                  <span className="h-1 w-1 rounded-full bg-wheat-400" aria-hidden />
                  {k}
                </li>
              ))}
            </ul>
          </div>

          {/* 合作栏 */}
          <div>
            <h3 className="font-serif text-base font-bold text-wheat-300">产学研合作</h3>
            <ul className="mt-5 space-y-3">
              {PARTNERS.map((p) => (
                <li key={p} className="text-sm leading-relaxed text-ivory-50/70">
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-wheat-400/70 px-5 py-2.5 text-sm font-medium text-wheat-300 transition-all duration-300 hover:bg-wheat-400/10"
            >
              在线留言
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 底部条 */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-ivory-50/45 md:flex-row">
          <span>© 2026 山东腾洋育纯农牧科技有限公司 · 版权所有</span>
          <span className="font-inter uppercase tracking-[0.25em]">Snowflake Sheep · Yellow River Delta</span>
        </div>
      </div>
    </footer>
  )
}
