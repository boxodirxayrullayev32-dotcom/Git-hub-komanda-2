import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './Header'

const Layout = () => {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}

export default Layout
