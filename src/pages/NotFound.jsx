import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#071126] text-white font-sans flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative text-center px-6">
        {/* Large 404 */}
        <div className="relative mb-6">
          <h1 className="text-[150px] md:text-[200px] font-black leading-none bg-gradient-to-b from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent select-none">
            404
          </h1>
          <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 md:w-12 md:h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Error message */}
        <div className="max-w-md mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Sahifa topilmadi
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin.
            URL manzilni tekshirib qaytadan urinib ko'ring.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-emerald-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
          <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-emerald-500/50"></div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-[0.98] flex items-center gap-2"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Bosh sahifaga qaytish
          </button>
          <button
            onClick={() => navigate(-1)}
            className="group bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 font-semibold px-8 py-4 rounded-xl text-sm transition-all border border-gray-700/50 hover:border-gray-600/50 flex items-center gap-2"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Orqaga qaytish
          </button>
        </div>

        {/* Some helpful links */}
        <div className="mt-12 pt-8 border-t border-gray-800/40 max-w-md mx-auto">
          <p className="text-xs text-gray-600 mb-4">Foydali sahifalar</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { to: '/', label: 'Bosh sahifa' },
              { to: '/zapravkalar', label: 'Zapravkalar' },
              { to: '/navbat-olish', label: 'Navbat olish' },
              { to: '/aloqa', label: 'Aloqa' },
            ].map((link) => (
              <button
                key={link.to}
                onClick={() => navigate(link.to)}
                className="text-xs text-gray-500 hover:text-emerald-400 transition px-3 py-1.5 rounded-lg hover:bg-emerald-500/5"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
