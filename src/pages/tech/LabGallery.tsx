import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  { src: '/lab-science.jpg', alt: '基因实验室场景', caption: '在实验室里读懂基因', from: 'left' as const },
  { src: '/worker-care.jpg', alt: '牧场技术人员检查羊只', caption: '在牧场里验证数据', from: 'right' as const },
]

/** Section 5 · 科研场景（全宽双图横幅，左右揭示） */
export default function LabGallery() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 双图 clip-path 分别从左右揭示（触发 25%）
      gsap.utils.toArray<HTMLElement>('.lab-panel').forEach((el) => {
        const from = el.dataset.from === 'left' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
        gsap.fromTo(
          el,
          { clipPath: from },
          {
            clipPath: 'inset(0 0% 0 0%)',
            duration: 0.9,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
          },
        )
      })
      // 文字遮罩式上移揭示
      gsap.fromTo(
        '.lab-caption-inner',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.5,
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="grid grid-cols-1 md:grid-cols-2">
      {PANELS.map((p) => (
        <figure
          key={p.caption}
          className="lab-panel group relative h-64 overflow-hidden md:h-[420px]"
          data-from={p.from}
        >
          <img loading="lazy"
            src={p.src}
            alt={p.alt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-950/75 via-pine-950/10 to-transparent" aria-hidden />
          <figcaption className="absolute bottom-0 left-0 right-0 overflow-hidden p-7 md:p-9">
            <span className="lab-caption-inner block font-serif text-xl font-bold text-ivory-50 md:text-2xl">
              {p.caption}
            </span>
          </figcaption>
        </figure>
      ))}
    </section>
  )
}
