import Hero from './home/Hero'
import Manifesto from './home/Manifesto'
import Numbers from './home/Numbers'
import Milestones from './home/Milestones'
import Roadmap from './home/Roadmap'
import Journey from './home/Journey'
import BreedSpotlight from './home/BreedSpotlight'
import TwinEngines from './home/TwinEngines'
import ProductsToolsEntry from './home/ProductsToolsEntry'
import NewsPreview from './home/NewsPreview'
import ContactBanner from './home/ContactBanner'

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Numbers />
      <Milestones />
      <Journey />
      <BreedSpotlight />
      <TwinEngines />
      <ProductsToolsEntry />
      <Roadmap />
      <NewsPreview />
      <ContactBanner />
    </>
  )
}
