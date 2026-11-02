import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Check,
  Dna,
  FlaskConical,
  Globe,
  Handshake,
  Languages,
  MapPin,
  Menu,
  Microscope,
  Network,
  ShoppingBag,
  Snowflake,
  Sprout,
  Sun,
  Wheat,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import EnglishInquiryForm from '@/components/EnglishInquiryForm'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Breeding', href: '#breeding' },
  { label: 'Technology', href: '#technology' },
  { label: 'Industry', href: '#industry' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
]

const STATS = [
  { value: '18', unit: 'years', label: 'of dedicated selective breeding' },
  { value: '3,000+', unit: 'head', label: 'in the core breeding flock' },
  { value: '350', unit: 'g/day', label: 'average daily gain' },
  { value: '230–260%', unit: '', label: 'lambing rate' },
]

const BREED_METRICS = [
  { value: '>10%', label: 'M5-grade marbling share' },
  { value: '10 kg', label: 'stable snowflake meat yield per head' },
  { value: '6–8', unit: 'months', label: 'typical finishing age' },
  { value: '+200 g', label: 'daily gain compared with local breeds' },
]

const RESEARCH = [
  {
    icon: Dna,
    date: '20 Sep 2026',
    field: 'Genetic innovation',
    title: 'Genomic selection and embryo transfer accelerate precision multiplication',
    summary:
      'A China.com.cn report describes whole-genome sequencing for snowflake sheep selection, together with superovulation and embryo transfer. Reported conception rates above 80% demonstrate a practical link between genetic selection, rapid multiplication and contract farming.',
    source: 'China.com.cn',
    url: 'http://ccpd.china.com.cn/2026-09/20/content_43494780.html',
  },
  {
    icon: Wheat,
    date: '4 Sep 2026',
    field: 'Precision nutrition',
    title: 'Digital monitoring, multi-omics and functional additives converge',
    summary:
      'An Animal Advances review proposes combining wearable and image sensors, AI prediction, metagenomics, metabolomics and transcriptomics into an adaptive nutrition framework for ruminant health, productivity and emissions management.',
    source: 'Animal Advances · DOI: 10.48130/animadv-0026-0011',
    url: 'https://maxapress.com/article/doi/10.48130/animadv-0026-0011',
  },
  {
    icon: Microscope,
    date: '4 Sep 2026',
    field: 'Meat quality',
    title: 'Rumen-protected betaine offers clues to marbling and tenderness',
    summary:
      'A 90-day trial involving 60 Tibetan sheep linked 0.08% rumen-protected betaine with increased intramuscular fat, selected unsaturated fatty acids, and lower shear force, cooking loss and hardness. Breed- and diet-specific validation remains necessary.',
    source: 'Metabolites · PubMed',
    url: 'https://pubmed.ncbi.nlm.nih.gov/42783775/',
  },
]

const INDUSTRY_CARDS = [
  {
    icon: Sun,
    title: 'Solar Grazing 3.0',
    subtitle: 'Raised-bed sheep housing',
    description:
      'Photovoltaic panels generate renewable power above the barns while sheep are raised below, producing approximately 30 million kWh of green electricity annually.',
    image: '/solar-highbed-3.jpg',
    alt: 'Solar panels above raised-bed sheep barns at the Yellow River Estuary industrial park',
  },
  {
    icon: Building2,
    title: 'Breeding Base',
    subtitle: 'Yellow River Estuary snowflake sheep',
    description:
      'A RMB 988 million programme is transforming more than 1,300 mu of legacy farming sites into enclosed breeding and multiplier areas designed for 50,000 animals per year.',
    image: '/snow-sheep-breeding-base.jpg',
    alt: 'Snowflake sheep at the Yellow River Estuary breeding base',
  },
  {
    icon: Network,
    title: '5G Service Center',
    subtitle: 'Integrated digital management',
    description:
      'A dedicated management centre brings flock, feeding, health and traceability data together for more precise, responsive farm operations.',
    image: '/5g-service-center.jpg',
    alt: 'Inside the 5G integrated management service centre at the industrial park',
  },
  {
    icon: Globe,
    title: 'Cloud Trading',
    subtitle: 'National digital trading network',
    description:
      'The cloud trading platform is designed to connect farming bases and processing enterprises, supported by digital flock management and traceability.',
    image: '/cloud-trading-center.jpg',
    alt: 'Data cockpit at the Yellow River Estuary Tan Sheep Industrial Park',
  },
]

const VALUE_CHAIN = [
  'Breeding stock',
  'Precision feed',
  'Standardised farming',
  'Resource recovery',
  'Processing',
  'Cold-chain delivery',
]

function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string
  title: string
  description?: string
  dark?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl"
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-wheat-400" aria-hidden />
        <span className="font-inter text-xs font-medium uppercase tracking-[0.28em] text-wheat-400">
          {eyebrow}
        </span>
      </div>
      <h2
        className={cn(
          'mt-5 font-fraunces text-4xl font-bold leading-[1.12] tracking-[-0.025em] md:text-5xl',
          dark ? 'text-ivory-50' : 'text-ink-900',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-5 text-base leading-8 md:text-lg', dark ? 'text-ivory-50/70' : 'text-ink-600')}>
          {description}
        </p>
      )}
    </motion.div>
  )
}

function EnglishNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled || open
            ? 'border-b border-wheat-400/20 bg-pine-950/95 shadow-lg backdrop-blur-xl'
            : 'bg-gradient-to-b from-pine-950/80 to-transparent',
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="group flex shrink-0 items-center gap-3" aria-label="Tengyang Yuchun home">
            <img src="/logo-icon.png" alt="" className="h-10 w-10" />
            <span className="flex flex-col leading-none">
              <span className="font-fraunces text-xl font-bold tracking-wide text-ivory-50">Tengyang Yuchun</span>
              <span className="mt-1.5 font-inter text-[9px] uppercase tracking-[0.23em] text-ivory-50/55">
                Snowflake Sheep Genetics
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="English main navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-2 font-inter text-sm font-medium text-ivory-50/80 transition-colors hover:text-wheat-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-ivory-50/25 px-3.5 font-inter text-xs font-medium text-ivory-50/85 transition-colors hover:border-wheat-400 hover:text-wheat-300"
              aria-label="切换到中文网站"
            >
              <Languages className="h-4 w-4" />
              中文
            </Link>
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-5 py-2.5 font-inter text-sm font-bold text-pine-950 transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Partner with us
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ivory-50 transition-colors hover:bg-white/10 xl:hidden"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-pine-950 px-8 pt-20 xl:hidden"
          >
            <nav className="mx-auto w-full max-w-lg" aria-label="English mobile navigation">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.055 }}
                  className="flex items-center justify-between border-b border-white/10 py-4 font-fraunces text-3xl font-semibold text-ivory-50"
                >
                  {item.label}
                  <span className="font-inter text-xs tracking-widest text-wheat-400/60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function EnglishSite() {
  useEffect(() => {
    const previous = {
      lang: document.documentElement.lang,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content'),
    }

    const setMeta = (selector: string, content: string) => {
      document.querySelector(selector)?.setAttribute('content', content)
    }

    document.documentElement.lang = 'en'
    document.title = 'Tengyang Yuchun | Snowflake Sheep Genetics & Breeding'
    setMeta(
      'meta[name="description"]',
      'Tengyang Yuchun develops Huangsanjiao snowflake sheep through selective breeding, genomic testing, embryo engineering and international research collaboration in Dongying, Shandong, China.',
    )
    setMeta('meta[property="og:title"]', 'Tengyang Yuchun | Snowflake Sheep Genetics & Breeding')
    setMeta(
      'meta[property="og:description"]',
      'Independent Chinese sheep genetics, precision breeding and a fully connected premium mutton value chain.',
    )
    setMeta('meta[property="og:url"]', 'https://tengyangyuchun.com/en')

    return () => {
      document.documentElement.lang = previous.lang
      document.title = previous.title
      if (previous.description) setMeta('meta[name="description"]', previous.description)
      if (previous.ogTitle) setMeta('meta[property="og:title"]', previous.ogTitle)
      if (previous.ogDescription) setMeta('meta[property="og:description"]', previous.ogDescription)
      if (previous.ogUrl) setMeta('meta[property="og:url"]', previous.ogUrl)
    }
  }, [])

  return (
    <div className="bg-ivory-50 font-inter [&_p]:text-left">
      <EnglishNavbar />

      <main>
        <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-pine-950">
          <motion.img
            initial={{ scale: 1.07, opacity: 0.75 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            src="/hero-home.jpg"
            alt="Sheep grazing in the Yellow River Delta wetlands"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,22,0.94)_0%,rgba(11,31,22,0.70)_52%,rgba(11,31,22,0.28)_100%)]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-950 via-transparent to-pine-950/20" aria-hidden />

          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-32 pt-36 md:px-12 md:pb-36">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-wheat-400/40 bg-wheat-400/10 px-4 py-2 text-xs font-medium tracking-wide text-wheat-300 backdrop-blur-md">
                <Award className="h-4 w-4" />
                New strain achievement certified · April 2026
              </div>
              <h1 className="mt-7 font-fraunces text-5xl font-bold leading-[1.04] tracking-[-0.035em] text-ivory-50 sm:text-6xl lg:text-[76px]">
                Independent genetics.
                <span className="mt-2 block text-wheat-300">Exceptional snowflake mutton.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-ivory-50/80 md:text-lg">
                Shandong Tengyang Yuchun Agriculture &amp; Animal Husbandry Technology develops premium sheep genetics,
                precision breeding systems and commercial partnerships from the Yellow River Delta in China.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#breeding"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-7 py-3.5 text-sm font-bold text-pine-950 transition-all hover:scale-[1.03]"
                >
                  Explore our breed
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#technology"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory-50/45 px-7 py-3.5 text-sm font-medium text-ivory-50 transition-colors hover:border-wheat-400 hover:text-wheat-300"
                >
                  Discover our science
                </a>
              </div>
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-pine-950/35 backdrop-blur-md">
            <div className="mx-auto grid max-w-[1280px] grid-cols-3 px-5 py-5 md:px-12">
              {[
                ['18 years', 'selective breeding'],
                ['3,000+', 'core breeding flock'],
                ['20,000+', 'genomic samples'],
              ].map(([value, label]) => (
                <div key={label} className="border-l border-white/15 pl-3 first:border-l-0 first:pl-0 md:pl-6">
                  <strong className="block font-fraunces text-xl text-wheat-300 md:text-2xl">{value}</strong>
                  <span className="mt-1 block text-[10px] uppercase tracking-wider text-ivory-50/55 md:text-xs">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 overflow-hidden py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 md:px-12">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <SectionHeading
                  eyebrow="Who we are"
                  title="Chinese sheep genetics, developed for premium quality."
                  description="Based in Dongying’s Yellow River Delta Agricultural High-Tech Zone, Tengyang Yuchun focuses on the breeding, multiplication and commercial development of high-quality snowflake mutton sheep."
                />
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <p className="mt-5 text-base leading-8 text-ink-600">
                    Working with the Northwest Institute of Eco-Environment and Resources at the Chinese Academy of
                    Sciences and the Yellow River Estuary Tan Sheep Industry Technology Research Institute, our team
                    has spent approximately 18 years developing the Huangsanjiao sheep line.
                  </p>
                  <p className="mt-4 text-base leading-8 text-ink-600">
                    International collaboration with a genetics team at Lincoln University, New Zealand, and technical
                    exchanges with Australian partners connect our breeding programme with global expertise.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {['Chinese Academy of Sciences', 'Lincoln University', 'Industry–research collaboration'].map((item) => (
                      <span key={item} className="rounded-full border border-pine-700/15 bg-white px-4 py-2 text-xs font-medium text-pine-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="overflow-hidden rounded-3xl shadow-card-hover">
                  <img src="/flock-pasture.jpg" alt="Flock grazing on Yellow River Delta pasture" className="h-[360px] w-full object-cover md:h-[500px]" />
                </div>
                <div className="absolute -bottom-7 left-5 max-w-[280px] rounded-2xl border border-wheat-400/25 bg-pine-950 p-6 text-ivory-50 shadow-card-hover md:left-8">
                  <Snowflake className="h-7 w-7 text-wheat-400" />
                  <p className="mt-3 font-fraunces text-xl font-semibold leading-snug">China’s first independently developed specialised snowflake mutton sheep line</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-24 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {STATS.map((stat, index) => (
                <motion.article
                  key={stat.label}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-pine-950/5 bg-white p-6 shadow-card md:p-7"
                >
                  <div className="font-fraunces text-4xl font-bold text-pine-700 md:text-5xl">{stat.value}</div>
                  {stat.unit && <div className="mt-1 text-xs font-medium uppercase tracking-widest text-wheat-600">{stat.unit}</div>}
                  <p className="mt-3 text-sm leading-6 text-ink-600">{stat.label}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="breeding" className="scroll-mt-20 bg-ivory-100 py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 md:px-12">
            <div className="grid items-center gap-14 lg:grid-cols-[52fr_48fr] lg:gap-20">
              <motion.div
                initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9 }}
                className="relative"
              >
                <img src="/breed-trio.jpg" alt="Huangsanjiao snowflake breeding sheep" className="h-[500px] w-full rounded-3xl object-cover shadow-card md:h-[650px]" />
                <span className="absolute left-5 top-5 rounded-full bg-wheat-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-pine-950">
                  Huangsanjiao Sheep
                </span>
              </motion.div>

              <div>
                <SectionHeading
                  eyebrow="Our signature breed"
                  title="Huangsanjiao snowflake sheep."
                  description="A specialised mutton sheep line developed for consistent marbling, efficient growth and strong reproductive performance—bringing independent Chinese genetics to the premium sheep sector."
                />
                <div className="mt-9 grid grid-cols-2 gap-4">
                  {BREED_METRICS.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.07 }}
                      className="rounded-2xl bg-white p-5 shadow-card"
                    >
                      <div className="font-fraunces text-3xl font-bold text-wheat-600">
                        {metric.value}
                        {metric.unit && <span className="ml-1 text-base">{metric.unit}</span>}
                      </div>
                      <p className="mt-2 text-xs leading-5 text-ink-600">{metric.label}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-5 rounded-2xl bg-white p-4 shadow-card">
                  <img src="/marble-meat.jpg" alt="Fine marbling in premium snowflake mutton" className="h-24 w-24 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-fraunces text-xl font-semibold text-ink-900">Fine, even marbling</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-600">Balanced intramuscular fat, a clean flavour profile and premium snowflake quality.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {[
                { icon: Dna, title: 'Breeding stock', text: 'Huangsanjiao breeding sheep, flock development and technical support for farms and cooperatives.' },
                { icon: Wheat, title: 'Precision nutrition', text: 'Stage-specific Xuehuabao feed programmes for lambs, finishing sheep, ewes and breeding rams.' },
                { icon: ShoppingBag, title: 'Premium mutton', text: 'Yellow River Estuary snowflake mutton for premium retail, gifting and restaurant supply chains.' },
              ].map((product) => (
                <article key={product.title} className="rounded-2xl border border-pine-950/5 bg-ivory-50 p-7">
                  <product.icon className="h-7 w-7 text-pine-700" />
                  <h3 className="mt-5 font-fraunces text-2xl font-semibold text-ink-900">{product.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-600">{product.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="technology" className="scroll-mt-20 overflow-hidden bg-pine-950 py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 md:px-12">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <SectionHeading
                  dark
                  eyebrow="Breeding technology"
                  title="From phenotype to genotype."
                  description="Our breeding system combines genomic data, molecular markers and reproductive engineering to improve selection accuracy and accelerate the multiplication of elite animals."
                />
                <div className="mt-9 space-y-5">
                  {[
                    ['GBS liquid chip', 'A genomic database built from more than 20,000 samples supports marker-assisted selection and trait discovery.'],
                    ['Genomic selection', 'Genomic estimated breeding values help identify promising animals earlier and shorten the selection cycle.'],
                    ['Embryo engineering', 'Reproductive technologies support the efficient multiplication of elite genetics and the growth of the core flock.'],
                  ].map(([title, text]) => (
                    <div key={title} className="flex gap-4">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-wheat-400/15">
                        <Check className="h-4 w-4 text-wheat-400" />
                      </span>
                      <div>
                        <h3 className="font-fraunces text-xl font-semibold text-ivory-50">{title}</h3>
                        <p className="mt-2 text-sm leading-7 text-ivory-50/65">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img src="/gene-chip.jpg" alt="Microplate used for sheep genomic testing" className="w-full rounded-3xl border border-white/10 object-cover shadow-2xl" />
                <div className="absolute -bottom-7 right-5 rounded-2xl bg-wheat-400 px-7 py-5 text-pine-950 shadow-card-hover">
                  <strong className="block font-fraunces text-4xl">20,000+</strong>
                  <span className="mt-1 block text-xs font-bold uppercase tracking-wider">genomic samples</span>
                </div>
              </motion.div>
            </div>

            <div className="mt-24 grid gap-5 md:grid-cols-3">
              {[
                { icon: FlaskConical, title: 'Joint research', text: 'Collaborative programmes in molecular breeding, gene chips and applied sheep science.' },
                { icon: Sprout, title: 'Commercial translation', text: 'A connected pathway from genetic selection and rapid multiplication to standardised production.' },
                { icon: Handshake, title: 'Global exchange', text: 'International technical collaboration that keeps our breeding programme connected to global progress.' },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-7">
                  <item.icon className="h-7 w-7 text-wheat-400" />
                  <h3 className="mt-5 font-fraunces text-2xl font-semibold text-ivory-50">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ivory-50/60">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="industry" className="scroll-mt-20 py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 md:px-12">
            <SectionHeading
              eyebrow="Industrial ecosystem"
              title="A connected sheep value chain."
              description="From breeding and feed to smart farming, processing and cold-chain delivery, the Yellow River Estuary Tan Sheep Industrial Park brings the production system together at scale."
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative mt-12 overflow-hidden rounded-3xl"
            >
              <img src="/yellow-river-park-hero.jpg" alt="Yellow River Estuary Tan Sheep Industrial Park" className="h-[340px] w-full object-cover md:h-[500px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950/90 via-pine-950/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-wheat-300">Yellow River Delta · Dongying</span>
                <h3 className="mt-3 max-w-3xl font-fraunces text-3xl font-semibold text-ivory-50 md:text-4xl">Yellow River Estuary Tan Sheep Industrial Park</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-ivory-50/75">A large-scale, standardised farming and industrial integration platform serving the modern mutton sheep sector.</p>
              </div>
            </motion.div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {INDUSTRY_CARDS.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 2) * 0.08 }}
                  className="group overflow-hidden rounded-2xl bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={card.image} alt={card.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-pine-950/85 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-wheat-300 backdrop-blur-sm">
                      {card.subtitle}
                    </span>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-3">
                      <card.icon className="h-6 w-6 text-pine-700" />
                      <h3 className="font-fraunces text-2xl font-semibold text-ink-900">{card.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-ink-600">{card.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-16 rounded-3xl border border-pine-950/5 bg-ivory-100 p-7 md:p-10">
              <h3 className="text-center font-fraunces text-2xl font-semibold text-ink-900">One integrated value chain</h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                {VALUE_CHAIN.map((item, index) => (
                  <div key={item} className="relative rounded-xl bg-white px-4 py-5 text-center shadow-sm">
                    <span className="block text-xs font-medium text-wheat-600">{String(index + 1).padStart(2, '0')}</span>
                    <span className="mt-2 block text-sm font-medium leading-6 text-pine-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="research" className="scroll-mt-20 border-y border-pine-950/5 bg-ivory-100 py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 md:px-12">
            <SectionHeading
              eyebrow="Research frontiers · 2026"
              title="Science we are watching."
              description="Selected public research and reporting on genetics, nutrition and meat quality. These items provide industry context and are not all Tengyang Yuchun research outputs."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {RESEARCH.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex flex-col rounded-2xl bg-white p-7 shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pine-700/8 text-pine-700">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div className="text-right">
                      <span className="block text-xs font-medium text-pine-700">{item.field}</span>
                      <time className="mt-1 block text-xs text-ink-400">{item.date}</time>
                    </div>
                  </div>
                  <h3 className="mt-6 font-fraunces text-2xl font-semibold leading-snug text-ink-900">{item.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-ink-600">{item.summary}</p>
                  <div className="mt-6 border-t border-ink-900/8 pt-5">
                    <p className="text-xs leading-5 text-ink-400">Source: {item.source}</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-pine-700 hover:text-wheat-600">
                      Read the original source
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 bg-ivory-50 py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 md:px-12">
            <div className="overflow-hidden rounded-3xl bg-pine-950 shadow-card-hover">
              <div className="grid lg:grid-cols-[45fr_55fr]">
                <div className="p-8 md:p-12 lg:p-14">
                  <SectionHeading
                    dark
                    eyebrow="Work with us"
                    title="Let’s build a stronger sheep industry together."
                    description="We welcome conversations with farming enterprises, cooperatives, research institutions, retailers and channel partners."
                  />
                  <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {['Breeding stock & multiplication', 'Joint scientific research', 'Premium product supply', 'Retail & distribution'].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-ivory-50/75">
                        <Check className="h-4 w-4 shrink-0 text-wheat-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 border-t border-white/10 pt-7">
                    <MapPin className="h-5 w-5 text-wheat-400" />
                    <p className="mt-3 text-sm leading-7 text-ivory-50/65">Yellow River Delta Agricultural High-Tech Zone<br />Dongying, Shandong, China</p>
                    <p className="mt-4 text-xs leading-5 text-ivory-50/40">Our team responds to English inquiries on working days.</p>
                  </div>
                </div>
                <div className="bg-white p-6 md:p-10 lg:p-12">
                  <EnglishInquiryForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-pine-950 text-ivory-50">
        <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <a href="#top" className="flex items-center gap-3">
              <img src="/logo-icon.png" alt="" className="h-10 w-10" />
              <span>
                <span className="block font-fraunces text-xl font-bold">Tengyang Yuchun</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-ivory-50/45">Snowflake Sheep · Yellow River Delta</span>
              </span>
            </a>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ivory-50/60">
              {NAV_ITEMS.slice(0, 5).map((item) => (
                <a key={item.href} href={item.href} className="hover:text-wheat-300">{item.label}</a>
              ))}
              <Link to="/" className="text-wheat-300">中文网站</Link>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-xs leading-6 text-ivory-50/40">
            © 2026 Shandong Tengyang Yuchun Agriculture &amp; Animal Husbandry Technology Co., Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
