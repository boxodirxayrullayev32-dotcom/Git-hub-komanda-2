import { useState } from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Telefon',
    value: '+998 90 903 98 99 ',
    href: 'tel:+998909039899',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Email',
    value: 'info@navbatol.uz',
    href: 'mailto:info@navbatol.uz',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Ish vaqti',
    value: 'Kunlik 08:00 – 22:00',
  },
]

const branches = [
  {
    name: 'Carvon №31 – Yunusobod',
    address: 'Toshkent, Yunusobod tumani, Bog\'ishamol ko\'chasi, 31',
    phone: '+998 71 234 11 69',
    services: ['Benzin AI-80', 'Benzin AI-92', 'Metan', 'Dizel'],
    image: 'https://avatars.mds.yandex.net/get-altay/16374562/2a0000019a68fb603e31abe0cdb3fc0abc0d/XL_height',
  },
  {
    name: 'Carvon №60 – Uchtepa',
    address: 'Toshkent, Uchtepa tumani, Katta Kani ko\'chasi, 28A',
    phone: '+998 71 271 37 21',
    services: ['Benzin AI-80', 'Benzin AI-92', 'Metan', 'Dizel'],
    image: 'https://avatars.mds.yandex.net/get-altay/14092818/2a0000019370de5b1efab84ee53311f8b465/XL_height',
  },
  {
    name: 'Carvon №21 – Chilonzor',
    address: 'Toshkent, Uchtepa tumani, Shirin ko\'chasi, 21',
    phone: '+998 71 272 02 74',
    services: ['Benzin AI-80', 'Benzin AI-92', 'Metan'],
    image: 'https://avatars.mds.yandex.net/get-altay/13941727/2a000001945e3c4642fc53992a5083ea196e/XL_height',
  },
  {
    name: 'Carvon №93 – Yakkasaroy',
    address: 'Toshkent, Yakkasaroy tumani, Sh.Rustaveli ko\'chasi',
    phone: '+998 71 207 18 28',
    services: ['Benzin AI-92', 'Benzin AI-95', 'Metan', 'Dizel'],
    image: 'https://avatars.mds.yandex.net/get-altay/13925334/2a000001939a97604883b78d0fa1c4e747e8/XL_height',
  },
]

const Aloqa = () => {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Guruhga jo'natiladigan matn ko'rinishi
    const text = `⚠️ Yangi xabar!\n\n👤 Ism: ${form.name}\n📞 Telefon: ${form.phone}\n💬 Xabar: ${form.message}`
    
    // Matnni URL formatiga o'tkazish (bo'shliqlar va belgilarni brauzer tushunishi uchun)
    const encodedText = encodeURIComponent(text)
    
    // Telegram ulashish (share) havolasi
    const telegramUrl = `https://t.me/share/url?url=https://navbatol.uz&text=${encodedText}`
    
    // Yangi oynada ochish
    window.open(telegramUrl, '_blank')

    setSent(true)
    setForm({ name: '', phone: '', message: '' })
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#071126] text-white"
    >
      {/* Hero */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#031427' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-yellow-400 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-yellow-400 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 pt-16 sm:pt-20 pb-20 sm:pb-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Biz bilan bog‘laning
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Navbatol.uz – benzin va metan quyish shahobchalari tarmog‘i.
            Savol va takliflaringizni biz bilan ulashing!
          </p>
        </div>
      </motion.div>

      {/* Contact Cards */}
      <motion.div
        variants={itemVariants}
        className="max-w-7xl mx-auto px-4 mt-8 grid gap-6 sm:grid-cols-3"
      >
        {contactInfo.map((item, i) => (
          <div
            key={i}
            className="bg-[#0e1a33]/60 rounded-2xl border border-gray-800/40 p-6 flex items-start gap-4 hover:border-gray-700/60 transition-all"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white"
              style={{ backgroundColor: '#031427' }}
            >
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-400">{item.title}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-white font-semibold hover:text-emerald-400 transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-white font-semibold">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Form & Branches */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-white mb-2">Xabar qoldiring</h2>
          <p className="text-gray-400 mb-6">
            Savol yoki taklifingiz bo‘lsa, quyidagi formani to‘ldiring.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Ismingiz
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Ismingizni kiriting"
                className="w-full px-4 py-3 rounded-xl bg-[#0a1628]/90 border border-gray-700/60 text-white placeholder-gray-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Telefon raqam
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+998 90 123 45 67"
                className="w-full px-4 py-3 rounded-xl bg-[#0a1628]/90 border border-gray-700/60 text-white placeholder-gray-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Xabar matni
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Xabaringizni yozing..."
                className="w-full px-4 py-3 rounded-xl bg-[#0a1628]/90 border border-gray-700/60 text-white placeholder-gray-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/20"
            >
              {sent ? 'O‘tish amalga oshirildi...' : 'Yuborish'}
            </button>
          </form>
        </motion.div>

        {/* Branches */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Shahobchalarimiz</h2>
            <p className="text-gray-400 mb-6">
              Benzin va metan quyish shahobchalarimiz manzillari.
            </p>
          </div>
          {branches.map((branch, i) => (
            <div
              key={i}
              className="bg-[#0e1a33]/60 rounded-2xl border border-gray-800/40 overflow-hidden hover:border-gray-700/60 transition-all hover:scale-[1.02]"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-36 lg:w-40 shrink-0 overflow-hidden">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-40 sm:h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-bold text-white">{branch.name}</h3>
                    <span
                      className="text-xs font-semibold px-3 py-0.5 rounded-full text-white shrink-0 ml-2"
                      style={{ backgroundColor: '#031427' }}
                    >
                      {i === 0 ? 'Asosiy' : 'Filial'}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-sm text-gray-300 mb-3">
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4 shrink-0 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {branch.address}
                    </p>
                    <a
                      href={`tel:${branch.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                    >
                      <svg className="w-4 h-4 shrink-0 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {branch.services.map((s, j) => (
                      <span
                        key={j}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        variants={itemVariants}
        className="border-t border-gray-800/60 bg-[#050c1b]"
      >
        <div className="max-w-7xl mx-auto px-4 py-10 text-center">
          <div className="text-sm font-bold text-white mb-1">Navbatol.uz</div>
          <p className="text-gray-500 text-xs">© 2026 • Barcha huquqlar himoyalangan</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Aloqa