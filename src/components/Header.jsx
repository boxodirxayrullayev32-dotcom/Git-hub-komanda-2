import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/zapravkalar', label: 'Zapravkalar' },
  { to: '/zapravka/1', label: 'Batafsil' },
  { to: '/navbat-olish', label: 'Navbat Olish' },
  { to: '/mening-navbatlarim', label: 'Navbatlarim' },
  { to: '/navbat-tasdiqlash', label: 'Tasdiqlash' },
  { to: '/narxlar', label: 'Narxlar' },
  { to: '/aloqa', label: 'Aloqa' },
]

const Header = () => {
  return (
    <header style={{ backgroundColor: '#031427' }} className="text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <NavLink to="/" className="text-xl font-bold tracking-tight">
          Navbatol.uz
        </NavLink>
        <nav className="flex gap-4 text-sm font-medium flex-wrap">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `hover:text-gray-300 transition ${isActive ? 'text-yellow-400' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/profile"
          className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-lg hover:bg-white/25 transition shrink-0"
        >
          👤
        </NavLink>
      </div>
    </header>
  )
}

export default Header
