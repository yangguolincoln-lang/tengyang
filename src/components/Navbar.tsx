import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export const NAV_LINKS = [
  { to: '/', label: '首页' },
  { to: '/about', label: '关于我们' },
  { to: '/breed', label: '核心品种' },
  { to: '/tech', label: '科技创新' },
  { to: '/industry', label: '产业园区' },
  { to: '/news', label: '新闻动态' },
  { to: '/contact', label: '联系我们' },
] as const

/** 悬浮导航：初始透明叠于 Hero，滚动 >80px 后转毛玻璃 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 路由切换时关闭抽屉
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'h-16 bg-ivory-50/90 text-ink-900 shadow-[0_1px_0_rgba(217,164,65,0.35)] backdrop-blur-md'
            : 'h-20 bg-transparent text-ivory-50',
        )}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-5 md:px-12">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3" aria-label="腾洋育纯首页">
            <img
              src="/logo-icon.png"
              alt="腾洋育纯标识"
              className={cn(
                'h-9 w-9 transition-colors',
                scrolled ? 'text-pine-700' : 'text-wheat-400',
              )}
              style={{ color: scrolled ? '#1E4D33' : '#D9A441' }}
            />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-lg font-bold tracking-wide">腾洋育纯</span>
              <span
                className={cn(
                  'font-inter text-[10px] uppercase tracking-[0.28em]',
                  scrolled ? 'text-ink-400' : 'text-ivory-50/60',
                )}
              >
                Tengyang Yuchun
              </span>
            </span>
          </Link>

          {/* 桌面菜单 */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="主导航">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'group relative py-2 text-sm font-medium tracking-wide transition-colors',
                    scrolled
                      ? isActive
                        ? 'text-pine-700'
                        : 'text-ink-600 hover:text-pine-700'
                      : isActive
                        ? 'text-wheat-300'
                        : 'text-ivory-50/85 hover:text-ivory-50',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={cn(
                        'absolute -bottom-0.5 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-wheat-400 transition-all duration-300',
                        isActive ? 'w-5' : 'w-0 group-hover:w-full group-hover:left-0 group-hover:translate-x-0',
                      )}
                      aria-hidden
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* 右侧 CTA + 汉堡 */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className={cn(
                'hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 sm:inline-flex',
                'bg-gradient-to-r from-wheat-400 to-wheat-300 text-pine-950 hover:scale-[1.03] hover:shadow-card-hover active:scale-95',
              )}
            >
              在线留言
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              aria-label={open ? '关闭菜单' : '打开菜单'}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden cursor-pointer',
                scrolled ? 'text-ink-900 hover:bg-pine-700/10' : 'text-ivory-50 hover:bg-white/10',
              )}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* 毛玻璃态底部金色渐变线 */}
        <div
          className={cn(
            'gold-gradient-line absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden
        />
      </header>

      {/* 移动端全屏抽屉 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-pine-950 px-10 lg:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="移动端导航">
              {NAV_LINKS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-baseline justify-between border-b border-white/10 py-4',
                        isActive ? 'text-wheat-300' : 'text-ivory-50',
                      )
                    }
                  >
                    <span className="font-serif text-3xl font-bold">{item.label}</span>
                    <span className="font-fraunces text-sm text-wheat-400/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-10"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-7 py-3 font-bold text-pine-950"
              >
                在线留言
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
