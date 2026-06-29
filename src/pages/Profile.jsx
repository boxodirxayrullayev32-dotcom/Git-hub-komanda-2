import { Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Profile = () => {
  const navigate = useNavigate()
  const raw = localStorage.getItem('user')
  if (!raw) return <Navigate to="/" replace />

  const user = JSON.parse(raw)

  const sections = [
    {
      title: 'Shaxsiy maʼlumotlar',
      icon: '👤',
      items: [
        { label: 'Ism', value: user.ism },
        { label: 'Familiya', value: user.familiya },
        { label: 'Telefon', value: user.telefon },
      ],
    },
    {
      title: 'Mashina haqida',
      icon: '🚗',
      items: [
        { label: 'Model', value: user.mashina },
        { label: 'Davlat raqami', value: user.raqam },
        { label: 'Rangi', value: user.rangi || "Ko'rsatilmagan" },
      ],
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#031427' }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-8">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/')}
          className="text-white/60 hover:text-white mb-6 flex items-center gap-2 text-sm transition"
        >
          ← Ortga
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl text-white"
        >
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-4xl shadow-lg shrink-0">
              👤
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.ism} {user.familiya}</h1>
              <p className="text-white/50 text-sm mt-1">{user.telefon}</p>
            </div>
          </div>

          <div className="space-y-6">
            {sections.map((section, si) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + si * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{section.icon}</span>
                  <h2 className="font-semibold text-sm uppercase tracking-wider text-white/60">
                    {section.title}
                  </h2>
                </div>
                <div
                  className="rounded-2xl p-4 space-y-3"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  {section.items.map((item, ii) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + si * 0.1 + ii * 0.05 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-white/50 text-sm">{item.label}</span>
                      <span className="font-medium text-white text-sm">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            localStorage.removeItem('user')
            window.location.reload()
          }}
          className="w-full mt-6 py-3 rounded-2xl font-medium text-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          Chiqish
        </motion.button>
      </div>
    </div>
  )
}

export default Profile
