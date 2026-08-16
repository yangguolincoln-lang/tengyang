import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const MINI_DATA = [
  { value: 200, prefix: '+', suffix: 'g', label: '日增重（比国内本土品种）' },
  { value: 10, prefix: '>', suffix: '%', label: 'M5 级雪花纹占比' },
  { value: 260, prefix: '', suffix: '%', range: '230–260', label: '产羔率' },
  { value: 56, prefix: '', suffix: '%', label: '屠宰率高出' },
]

export default function BreedSpotlight() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 左图 clip-path 自下而上揭示
      gsap.fromTo(
        '.breed-photo',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
        },
      )
      // 右栏文字
      gsap.fromTo(
        '.breed-fade',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      )
      // 迷你数据 count-up
      gsap.utils.toArray<HTMLElement>('.breed-num').forEach((el) => {
        const target = Number(el.dataset.value ?? 0)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.2,
          ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v))
          },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home-breed" ref={rootRef} className="bg-ivory-100 py-14 md:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-12 lg:grid-cols-[55fr_45fr]">
        {/* 左栏大图 */}
        <div className="relative">
          <div className="breed-photo overflow-hidden rounded-2xl shadow-card">
            <img
              src="/sheep-portrait.jpg"
              alt="黄三角肉羊种羊肖像"
              className="aspect-[7/8] w-full object-cover"
            />
          </div>
          <span className="absolute left-5 top-5 rounded-md bg-wheat-400 px-3.5 py-2 text-xs font-bold tracking-wide text-pine-950 shadow-card-hover">
            我国首个自主雪花肉羊新品系
          </span>
        </div>

        {/* 右栏 */}
        <div>
          <Eyebrow text="Huangsanjiao Sheep" className="breed-fade" />
          <h2 className="breed-fade mt-4 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
            黄三角肉羊 · 雪花肉羊
          </h2>
          <p className="breed-fade mt-5 text-base leading-[1.8] text-ink-600">
            由中国科学院西北生态环境资源研究院杨果教授团队、黄河口滩羊产业技术研究院与腾洋育纯联合培育，历时十五年，实现高端雪花肉羊种源自主可控。
          </p>

          {/* 2×2 迷你数据格 */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {MINI_DATA.map((d) => (
              <div key={d.label} className="breed-fade rounded-xl bg-white p-5 shadow-card">
                <div className="flex items-baseline font-fraunces text-3xl font-bold tabular-nums text-wheat-400">
                  <span>{d.prefix}</span>
                  {d.range ? (
                    <span className="text-2xl">{d.range}</span>
                  ) : (
                    <span className="breed-num" data-value={d.value}>
                      0
                    </span>
                  )}
                  <span>{d.suffix}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-600">{d.label}</p>
              </div>
            ))}
          </div>

          {/* 雪花肉小卡 */}
          <div className="breed-fade group mt-6 flex items-center gap-5 rounded-2xl border border-transparent bg-white p-4 shadow-card transition-all duration-300 hover:border-wheat-400/60 hover:shadow-card-hover">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
              <img
                src="/marble-meat.jpg"
                alt="雪花羊肉大理石纹特写"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div>
              <p className="font-serif text-base font-bold text-ink-900">雪花大理石纹</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">
                肌间脂肪均匀分布 · 低膻味 · 高端雪花品质
              </p>
            </div>
          </div>

          <div className="breed-fade mt-8">
            <Link
              to="/breed"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-7 py-3.5 font-bold text-pine-950 transition-all duration-300 hover:scale-[1.03] hover:shadow-card-hover active:scale-95"
            >
              走进核心品种
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
