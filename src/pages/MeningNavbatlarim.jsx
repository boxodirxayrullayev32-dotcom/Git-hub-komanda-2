import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueue } from '../context/QueueContext'

const MeningNavbatlarim = () => {
  const navigate = useNavigate()
  const { queues, cancelQueue } = useQueue()
  const [visibleCount, setVisibleCount] = useState(6)

  const activeQueues = useMemo(() => queues.filter(q => q.status === 'waiting' || q.status === 'arrived'), [queues])
  const pastQueues = useMemo(() => queues.filter(q => q.status !== 'waiting' && q.status !== 'arrived'), [queues])

  const totalSum = queues.reduce((sum, q) => sum + (parseInt(q.price) || 0), 0)
  const metanCount = queues.filter(q => q.fuel === 'Metan').length
  const propanCount = queues.filter(q => q.fuel === 'Propan').length
  const benzinCount = queues.filter(q => q.fuel === 'Benzin').length
  const totalFuel = metanCount + propanCount + benzinCount || 1

  const statistics = [
    { label: "Metan", percentage: Math.round((metanCount / totalFuel) * 100), color: "bg-emerald-500", dot: '💨' },
    { label: "Propan", percentage: Math.round((propanCount / totalFuel) * 100), color: "bg-orange-500", dot: '🔥' },
    { label: "Benzin", percentage: Math.round((benzinCount / totalFuel) * 100), color: "bg-blue-500", dot: '⚡' },
  ]

  const statusColors = {
    waiting: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    arrived: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    cancelled: 'text-red-400 bg-red-500/10 border-red-500/20',
    completed: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
  }

  const statusLabels = {
    waiting: 'Kutilmoqda',
    arrived: 'Yetib kelgan',
    cancelled: 'Bekor qilingan',
    completed: 'Yakunlangan',
  }

  const fuelEmojis = { Metan: '💨', Propan: '🔥', Benzin: '⚡' }

  return (
    <div className="min-h-screen bg-[#071126] text-white font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Mening navbatlarim
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Navbat holatini kuzatish va tarix</p>
          </div>
          <button
            onClick={() => navigate('/navbat-olish')}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Yangi navbat
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0e1a33]/60 rounded-2xl p-5 border border-gray-800/40">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Jami navbatlar</p>
            <p className="text-3xl font-bold text-white mt-1">{queues.length}</p>
          </div>
          <div className="bg-[#0e1a33]/60 rounded-2xl p-5 border border-gray-800/40">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Faol navbatlar</p>
            <p className="text-3xl font-bold text-emerald-400 mt-1">{activeQueues.length}</p>
          </div>
          <div className="bg-[#0e1a33]/60 rounded-2xl p-5 border border-gray-800/40">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Yoqilg'i turlari</p>
            <p className="text-3xl font-bold text-white mt-1">{totalFuel}</p>
          </div>
          <div className="bg-[#0e1a33]/60 rounded-2xl p-5 border border-gray-800/40">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Umumiy summa</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">{totalSum.toLocaleString()} so'm</p>
          </div>
        </div>

        {queues.length === 0 ? (
          <div className="bg-[#0e1a33]/40 rounded-3xl border border-gray-800/40 p-16 text-center">
            <div className="text-7xl mb-6">📋</div>
            <h2 className="text-2xl font-bold text-white mb-2">Hozircha navbatlar yo'q</h2>
            <p className="text-gray-400 mb-8">Navbat olish sahifasidan birinchi navbatingizni band qiling</p>
            <button
              onClick={() => navigate('/navbat-olish')}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              Navbat olish
            </button>
          </div>
        ) : (
          <>
            {/* Active Bookings */}
            {activeQueues.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Faol navbatlar ({activeQueues.length})
                </h2>
                <div className="space-y-4">
                  {activeQueues.map((q, index) => (
                    <div
                      key={q.id}
                      className="bg-gradient-to-b from-[#0e1a33] to-[#0b1428] rounded-3xl border border-gray-800/60 overflow-hidden shadow-xl"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Left - Queue number */}
                        <div className="bg-gradient-to-b from-emerald-500/5 to-transparent p-6 md:p-8 flex flex-col items-center justify-center md:border-r border-gray-800/40 md:min-w-[160px]">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center mb-3">
                            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                          </div>
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Navbat raqami</span>
                          <span className="text-2xl font-black text-white">#A-{index + 1}</span>
                        </div>

                        {/* Middle - Info */}
                        <div className="flex-1 p-6 md:p-8 space-y-5">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-white">{q.station}</h3>
                              <p className="text-sm text-gray-400 mt-0.5">{q.model} • {q.plate}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[q.status] || 'text-gray-400 bg-gray-500/10 border-gray-500/20'}`}>
                              {statusLabels[q.status] || q.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-6">
                            <div>
                              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Vaqt</p>
                              <p className="text-lg font-bold text-white">{q.time}</p>
                            </div>
                            <div className="w-px h-8 bg-gray-700/50" />
                            <div>
                              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Kolonka</p>
                              <p className="text-lg font-bold text-white">#{q.kolonka}</p>
                            </div>
                            <div className="w-px h-8 bg-gray-700/50" />
                            <div>
                              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Yoqilg'i</p>
                              <p className="text-lg font-bold flex items-center gap-1">
                                <span>{fuelEmojis[q.fuel] || '⛽'}</span>
                                {q.fuel}
                              </p>
                            </div>
                          </div>

                          {q.status === 'waiting' && (
                            <div className="flex gap-3 pt-2">
                              <button className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Marshrut
                              </button>
                              <button
                                onClick={() => cancelQueue(q.id)}
                                className="bg-red-500/5 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 font-semibold px-5 py-2.5 rounded-xl text-xs transition-all"
                              >
                                Bekor qilish
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Right - Time indicator */}
                        <div className="bg-emerald-500/5 p-6 md:p-8 flex flex-col items-center justify-center md:border-l border-gray-800/40 md:min-w-[140px]">
                          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2">
                            <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Yetib kelish</span>
                          <span className="text-xl font-black text-emerald-400">{q.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Bookings */}
            {pastQueues.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Navbat tarixi ({pastQueues.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pastQueues.slice(0, visibleCount).map((q) => (
                    <div
                      key={q.id}
                      className="bg-[#0e1a33]/40 rounded-2xl border border-gray-800/40 p-5 hover:border-gray-700/60 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/10 border border-gray-700/40 flex items-center justify-center text-lg">
                            ⛽
                          </div>
                          <div>
                            <p className="font-bold text-sm text-white group-hover:text-emerald-400 transition">{q.station}</p>
                            <p className="text-[10px] text-gray-500">{q.date || q.time}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[q.status] || 'text-gray-400 bg-gray-500/10 border-gray-500/20'}`}>
                          {statusLabels[q.status] || q.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-2 pt-3 border-t border-gray-800/30">
                        <span>{q.model}</span>
                        <span className="font-mono bg-gray-800/50 px-1.5 py-0.5 rounded text-yellow-400/80">{q.plate}</span>
                        <span className="flex items-center gap-1">{fuelEmojis[q.fuel] || '⛽'} {q.fuel}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {pastQueues.length > visibleCount && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      className="bg-gray-800/40 hover:bg-gray-700/40 text-gray-400 font-semibold px-8 py-3 rounded-xl text-sm transition-all border border-gray-700/30"
                    >
                      Yana ko'rsat ({pastQueues.length - visibleCount} ta qoldi)
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Fuel Statistics */}
            <div className="mt-8 bg-[#0e1a33]/40 rounded-3xl border border-gray-800/40 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Yoqilg'i statistikasi</h3>
                <span className="text-xs text-gray-500">Jami {totalFuel} ta</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {statistics.filter(s => s.percentage > 0).map((item) => (
                  <div key={item.label} className="bg-[#071126]/40 rounded-xl p-4 border border-gray-800/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2 text-sm font-bold text-white">
                        <span>{item.dot}</span> {item.label}
                      </span>
                      <span className="text-sm font-bold text-white">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700/30 rounded-full h-2.5 overflow-hidden">
                      <div className={`${item.color} h-2.5 rounded-full transition-all duration-700`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MeningNavbatlarim
