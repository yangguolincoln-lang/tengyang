import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'

gsap.registerPlugin(ScrollTrigger)

/**
 * 全站布局：Lenis 平滑滚动 + 悬浮导航 + 页脚。
 * 导航为 fixed 悬浮（初始高 80px），内容槽统一补 pt-20，
 * 全幅 Hero 在页面内部以 -mt-20 自行抵消。
 */
export default function Layout() {
  const location = useLocation()

  // Lenis 平滑滚动，与 GSAP ScrollTrigger 同步
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  // 路由切换回到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [location.pathname])

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
