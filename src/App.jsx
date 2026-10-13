import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import ClickEffect from './components/ClickEffect'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import Hobbies from './pages/Hobbies'

export default function App() {
  const location = useLocation()

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <ClickEffect />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/hobbies" element={<Hobbies />} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  )
}
