import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Registration from './pages/Registration'
import Profile from './pages/Profile'
import Home from './pages/Home'
import ZapravkalarKatalogi from './pages/ZapravkalarKatalogi'
import ZapravkaBatafsil from './pages/ZapravkaBatafsil'
import NavbatOlish from './pages/NavbatOlish'
import MeningNavbatlarim from './pages/MeningNavbatlarim'
import NavbatTasdiqlash from './pages/NavbatTasdiqlash'
import Narxlar from './pages/Narxlar'
import Aloqa from './pages/Aloqa'

const user = () => localStorage.getItem('user')

const App = () => {
  const [registered, setRegistered] = useState(!!user())
  const location = useLocation()

  const handleRegister = () => setRegistered(true)

  if (!registered) return <Registration onRegister={handleRegister} />

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="zapravkalar" element={<ZapravkalarKatalogi />} />
          <Route path="zapravka/:id" element={<ZapravkaBatafsil />} />
          <Route path="navbat-olish" element={<NavbatOlish />} />
          <Route path="mening-navbatlarim" element={<MeningNavbatlarim />} />
          <Route path="navbat-tasdiqlash" element={<NavbatTasdiqlash />} />
          <Route path="narxlar" element={<Narxlar />} />
          <Route path="aloqa" element={<Aloqa />} />
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
