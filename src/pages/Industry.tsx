import IndustryHero from './industry/IndustryHero'
import ParkNumbers from './industry/ParkNumbers'
import FullChain from './industry/FullChain'
import Infrastructure from './industry/Infrastructure'
import Impact from './industry/Impact'
import HumanTouch from './industry/HumanTouch'
import ParkCta from './industry/ParkCta'
import { WaveDivider } from '@/components/Droplets'

/** 产业园区 — 黄河口滩羊产业园 */
export default function Industry() {
  return (
    <>
      <IndustryHero />
      <ParkNumbers />
      <FullChain />
      <Infrastructure />
      <Impact />
      <HumanTouch />
      <WaveDivider top="#FAF7F0" fill="#0B1F16" />
      <ParkCta />
    </>
  )
}
