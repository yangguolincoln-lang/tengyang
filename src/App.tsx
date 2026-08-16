import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Breed from './pages/Breed'
import Tech from './pages/Tech'
import Industry from './pages/Industry'
import News from './pages/News'
import Contact from './pages/Contact'
import Products from './pages/products/Products'
import Tools from './pages/tools/Tools'

/** 页面切换：淡入 + 上移 24px，300ms */
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="breed" element={<Breed />} />
            <Route path="tech" element={<Tech />} />
            <Route path="products" element={<Products />} />
            <Route path="tools" element={<Tools />} />
            <Route path="industry" element={<Industry />} />
            <Route path="news" element={<News />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
