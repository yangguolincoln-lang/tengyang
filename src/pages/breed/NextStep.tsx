import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const STEPS = ['群体扩繁至 2 万只', '国家新品种审定', '入选国家品种名录']

/** 下一步横幅：从成果认证走向国家名录 */
export default function NextStep() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.next-item',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-pine-900 py-14 md:py-20">
      <div className="gold-gradient-line h-px w-full" aria-hidden />
      <div className="mx-auto max-w-[1280px] px-5 pt-14 md:px-12 md:pt-16">
        <p className="next-item text-center font-inter text-xs uppercase tracking-[0.3em] text-wheat-300/80">
          Next Step
        </p>
        <h3 className="next-item mt-4 text-center font-serif text-2xl font-bold text-ivory-50 md:text-3xl">
          下一步：从新品系，走向国家名录
        </h3>
        <div className="next-item mt-10 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
              <span
                className={`inline-flex items-center gap-2.5 rounded-full border px-6 py-3 text-sm font-medium ${
                  i === 0
                    ? 'border-wheat-400/70 bg-wheat-400/10 text-wheat-300'
                    : 'border-ivory-50/20 text-ivory-50/75'
                }`}
              >
                <span className="font-fraunces text-base font-bold text-wheat-400">{i + 1}</span>
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <ArrowRight className="h-4 w-4 rotate-90 text-wheat-400/60 md:rotate-0" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
