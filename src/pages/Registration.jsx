import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const fields = [
  { name: 'ism', label: 'Ism', type: 'text', col: 2 },
  { name: 'familiya', label: 'Familiya', type: 'text', col: 2 },
  { name: 'telefon', label: 'Telefon raqam', type: 'tel', col: 1 },
  { name: 'mashina', label: 'Mashina modeli', type: 'text', col: 1, placeholder: 'Mas: Chevrolet Lacetti' },
  { name: 'raqam', label: 'Davlat raqami', type: 'text', col: 2, placeholder: 'Mas: 01 A 123 AA' },
  { name: 'rangi', label: 'Mashina rangi', type: 'text', col: 2 },
]

const Registration = ({ onRegister }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState(
    Object.fromEntries(fields.map((f) => [f.name, '']))
  )

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.ism || !form.familiya || !form.telefon || !form.mashina || !form.raqam) return
    localStorage.setItem('user', JSON.stringify(form))
    onRegister()
    navigate('/')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: '#031427' }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <motion.form
        autoComplete="off"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onSubmit={handleSubmit}
        className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 w-full max-w-lg mx-4 shadow-2xl border border-white/20"
      >
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl mb-3 shadow-lg"
            style={{ backgroundColor: '#031427' }}
          >
            🚗
          </div>
          <h1 className="text-2xl font-bold" style={{ color: '#031427' }}>
            Ro‘yxatdan o‘tish
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Haydovchi va mashina ma'lumotlarini kiriting
          </p>
        </div>

        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            {fields.slice(0, 2).map((f) => (
              <motion.div
                key={f.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  {f.label}
                </label>
                <input
                  name={f.name}
                  autoComplete="off"
                  placeholder={f.label}
                  value={form[f.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#031427] focus:ring-2 focus:ring-[#031427]/20 bg-gray-50 hover:bg-white focus:bg-white"
                  required
                />
              </motion.div>
            ))}
          </div>

          {fields.slice(2).map((f) => (
            <motion.div
              key={f.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                {f.label}
              </label>
              <input
                name={f.name}
                autoComplete="off"
                placeholder={f.placeholder || f.label}
                value={form[f.name]}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#031427] focus:ring-2 focus:ring-[#031427]/20 bg-gray-50 hover:bg-white focus:bg-white"
                required={f.name !== 'rangi'}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full mt-6 text-white py-3 rounded-xl font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-200"
          style={{ backgroundColor: '#031427' }}
        >
          Kirish
        </motion.button>
      </motion.form>
    </div>
  )
}

export default Registration
