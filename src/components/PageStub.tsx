import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Eyebrow from './Eyebrow'

/** 子页占位（由页面 Agent 填充完整内容） */
export default function PageStub({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string
  title: string
  desc: string
}) {
  return (
    <section className="bg-ivory-50 py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Eyebrow text={eyebrow} />
        <h1 className="mt-4 font-serif text-3xl font-bold text-ink-900 md:text-5xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-[1.8] text-ink-600">{desc}</p>
        <div className="mt-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-pine-700/40 px-6 py-3 text-sm font-medium text-pine-700 transition-all duration-300 hover:bg-pine-700 hover:text-ivory-50"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            返回首页
          </Link>
        </div>
      </div>
    </section>
  )
}
