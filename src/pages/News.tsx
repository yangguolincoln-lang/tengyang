import NewsHero from './news/NewsHero'
import FeaturedStory from './news/FeaturedStory'
import Timeline from './news/Timeline'
import QuoteStrip from './news/QuoteStrip'
import NewsCta from './news/NewsCta'

/** 新闻动态 — 2023–2026 品牌大事记时间线 */
export default function News() {
  return (
    <>
      <NewsHero />
      <FeaturedStory />
      <Timeline />
      <QuoteStrip />
      <NewsCta />
    </>
  )
}
