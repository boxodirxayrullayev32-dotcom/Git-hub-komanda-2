import { useMemo } from 'react'
import { useQueue } from '../context/QueueContext'

const MeningNavbatlarim = () => {
  const { queues, cancelQueue } = useQueue()
  const currentQueue = queues[0] || null

  const qrPattern = useMemo(() => {
    const pattern = []
    for (let i = 0; i < 121; i++) {
      const row = Math.floor(i / 11)
      const col = i % 11
      const isBlack =
        (row < 3 && col < 3) ||
        (row < 3 && col > 7) ||
        (row > 7 && col < 3) ||
        (row > 7 && col > 7) ||
        (row >= 4 && row <= 6 && col >= 4 && col <= 6) ||
        (row === 0 && col === 5) ||
        (row === 5 && col === 0) ||
        (row === 10 && col === 5) ||
        (row === 5 && col === 10) ||
        (row === 2 && col === 2) ||
        (row === 2 && col === 8) ||
        (row === 8 && col === 2) ||
        (row === 8 && col === 8) ||
        (row === 5 && col === 5) ||
        ((row * 7 + col * 13) % 11 < 6)
      pattern.push(isBlack)
    }
    return pattern
  }, [])

  // Statistikani hisoblash
  const totalSum = queues.reduce((sum, q) => {
    const amount = parseInt(q.price) || 0
    return sum + amount
  }, 0)

  const metanCount = queues.filter(q => q.fuel === 'Metan').length
  const propanCount = queues.filter(q => q.fuel === 'Propan').length
  const totalCount = metanCount + propanCount || 1

  const statistics = [
    { label: "Metan", percentage: Math.round((metanCount / totalCount) * 100), color: "bg-green-500" },
    { label: "Propan", percentage: Math.round((propanCount / totalCount) * 100), color: "bg-blue-500" },
  ]

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shaxsiy Kabinet</h1>
        <p className="text-gray-400 mt-1 text-sm">Navbat va statistikani kuzatish</p>
      </div>

      {currentQueue ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Main Card */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a1a2e] rounded-2xl p-6 flex flex-col md:flex-row gap-6">
              {/* QR Code */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 bg-white rounded-xl p-2 flex items-center justify-center">
                  <div className="w-full h-full bg-[#1a1a2e] rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-11 grid-rows-11 gap-0.5 w-full h-full p-2">
                      {qrPattern.map((isBlack, i) => (
                        <div
                          key={i}
                          className={`${isBlack ? "bg-black" : "bg-white"} rounded-sm`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-200">{currentQueue.station}</h2>
                  <p className="text-sm text-gray-400">
                    {currentQueue.model} • {currentQueue.plate}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Navbat raqami</p>
                    <p className="text-2xl font-bold text-white">
                      #A-{queues.indexOf(currentQueue) + 1}
                    </p>
                  </div>
                  <div className="h-10 w-px bg-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Holati</p>
                    <span className="inline-flex items-center gap-1 text-green-400 font-semibold text-sm">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      {currentQueue.status === 'waiting' ? 'Kutilmoqda' : currentQueue.status === 'arrived' ? 'Yetib kelgan' : 'OCHIQ'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500">Vaqt</p>
                    <p className="text-lg font-semibold">{currentQueue.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Kolonka</p>
                    <p className="text-lg font-semibold">#{currentQueue.kolonka}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Yoqilg'i</p>
                    <p className="text-lg font-semibold">{currentQueue.fuel}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Marshrut
                  </button>
                  <button
                    onClick={() => cancelQueue(currentQueue.id)}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
                  >
                    Bekor qilish
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Statistika */}
            <div className="bg-[#1a1a2e] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Statistika
              </h3>
              <p className="text-2xl font-bold mb-4">
                {totalSum.toLocaleString()} so'm
              </p>
              <div className="space-y-3">
                {statistics.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-gray-300">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sevimlilar */}
            <div className="bg-[#1a1a2e] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Sevimlilar
              </h3>
              <div className="space-y-3">
                {[
                  { name: "UNG Petro", location: "Chilonzor, 12/5", distance: "2.3 km" },
                  { name: "Gazprom", location: "Yunusobod, 45", distance: "3.1 km" },
                  { name: "Lukoil", location: "Sergeli, 8", distance: "4.5 km" },
                ].map((fav, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-xs font-bold">
                      {fav.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{fav.name}</p>
                      <p className="text-xs text-gray-400">{fav.location}</p>
                    </div>
                    <span className="text-xs text-gray-500">{fav.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#1a1a2e] rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-gray-300">Hozircha navbatlar yo'q</h2>
          <p className="text-gray-500 mt-2">Navbat olish sahifasidan navbat band qiling</p>
        </div>
      )}

      {/* Table - Oxirgi quyishlar */}
      {queues.length > 0 && (
        <div className="bg-[#1a1a2e] rounded-2xl p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Oxirgi quyishlar</h3>
            <button className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
              Hammasini ko'rish →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-700/50">
                  <th className="text-left py-3 px-2 font-medium">Sana</th>
                  <th className="text-left py-3 px-2 font-medium">Zapravka</th>
                  <th className="text-left py-3 px-2 font-medium">Model</th>
                  <th className="text-left py-3 px-2 font-medium">Yoqilg'i</th>
                  <th className="text-right py-3 px-2 font-medium">Holat</th>
                </tr>
              </thead>
              <tbody>
                {queues.slice(0, 10).map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-700/30 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-2 text-gray-300">{row.date || row.time}</td>
                    <td className="py-3 px-2 text-gray-300">{row.station}</td>
                    <td className="py-3 px-2">
                      <span className="text-gray-300">{row.model}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {row.fuel}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      {row.status === 'waiting' ? (
                        <span className="text-yellow-400 text-xs">Kutilmoqda</span>
                      ) : row.status === 'arrived' ? (
                        <span className="text-green-400 text-xs">Yetib kelgan</span>
                      ) : (
                        <span className="text-gray-500 text-xs">Bekor qilingan</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default MeningNavbatlarim
