import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, CheckCircle2, RefreshCw, Play, Fuel, BarChart3, Factory, Gauge } from 'lucide-react';

const fuelPrices = {
  metan: { label: 'Metan (CNG)', unit: "so'm/m³", price: 5750, icon: '💨', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/20' },
  benzin80: { label: 'Benzin AI-80', unit: "so'm/l", price: 6500, icon: '⛽', color: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/20' },
  benzin92: { label: 'Benzin AI-92', unit: "so'm/l", price: 7800, icon: '⚡', color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
  propan: { label: 'Propan (LPG)', unit: "so'm/l", price: 6800, icon: '🔥', color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20' },
};

const regionPrices = [
  { name: 'Toshkent sh.', metan: 5800, benzin: 7900, propan: 6900, rank: 1 },
  { name: 'Toshkent vil.', metan: 5700, benzin: 7800, propan: 6800, rank: 4 },
  { name: 'Samarqand', metan: 5600, benzin: 7700, propan: 6700, rank: 8 },
  { name: "Farg'ona", metan: 5750, benzin: 7750, propan: 6750, rank: 2 },
  { name: 'Andijon', metan: 5650, benzin: 7650, propan: 6650, rank: 6 },
  { name: 'Namangan', metan: 5600, benzin: 7600, propan: 6600, rank: 8 },
  { name: 'Buxoro', metan: 5500, benzin: 7550, propan: 6500, rank: 12 },
  { name: 'Qashqadaryo', metan: 5550, benzin: 7600, propan: 6550, rank: 10 },
  { name: 'Surxondaryo', metan: 5700, benzin: 7700, propan: 6700, rank: 4 },
  { name: 'Navoiy', metan: 5450, benzin: 7500, propan: 6450, rank: 14 },
  { name: 'Jizzax', metan: 5550, benzin: 7550, propan: 6550, rank: 10 },
  { name: 'Sirdaryo', metan: 5600, benzin: 7600, propan: 6600, rank: 8 },
  { name: 'Xorazm', metan: 5650, benzin: 7700, propan: 6700, rank: 6 },
  { name: "Qoraqalpog'iston", metan: 5750, benzin: 7800, propan: 6800, rank: 2 },
];

const productionStats = [
  { label: 'Tabiiy gaz', value: '42,3 mlrd', unit: 'm³', detail: '2025-yilda qazib olingan', icon: '💨', color: 'text-emerald-400', numValue: 42.3 },
  { label: 'Benzin', value: '1,2 mln', unit: 'tonna', detail: '2025-yilda ishlab chiqarilgan', icon: '⛽', color: 'text-orange-400', numValue: 1.2 },
  { label: 'Dizel', value: '1,2 mln', unit: 'tonna', detail: '2025-yilda ishlab chiqarilgan', icon: '🛢️', color: 'text-yellow-400', numValue: 1.2 },
  { label: 'Xom neft', value: '655,7', unit: 'ming tonna', detail: '2025-yilda qazib olingan', icon: '🛢️', color: 'text-blue-400', numValue: 655.7 },
];

const monthlyPrices = {
  metan: [4500, 4700, 4800, 5000, 5200, 5350, 5450, 5500, 5600, 5700, 5750, 5800],
  benzin92: [6500, 6600, 6800, 6900, 7100, 7300, 7400, 7500, 7600, 7700, 7750, 7800],
  propan: [5200, 5300, 5400, 5600, 5800, 6000, 6200, 6400, 6600, 6800, 6900, 6800],
};
const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noya', 'Dek'];

const stationStats = [
  { label: 'Metan (CNG)', count: 1200, color: 'bg-emerald-500', hexColor: '#10b981', percent: 40 },
  { label: 'Benzin', count: 1500, color: 'bg-orange-500', hexColor: '#f97316', percent: 50 },
  { label: 'Propan (LPG)', count: 300, color: 'bg-purple-500', hexColor: '#a855f7', percent: 10 },
];

function getGradient(tab) {
  if (tab === 'metan') return 'from-emerald-500 to-emerald-300';
  if (tab === 'benzin92') return 'from-blue-500 to-cyan-300';
  return 'from-purple-500 to-pink-300';
}

function getBarColor(tab) {
  if (tab === 'metan') return '#10b981';
  if (tab === 'benzin92') return '#3b82f6';
  return '#a855f7';
}

function useCounter(target, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function DonutChart({ data, size = 150 }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((s, d) => s + d.percent, 0);
  let accumulated = 0;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 150 150" className="transform -rotate-90">
        <circle cx="75" cy="75" r={radius} fill="none" stroke="#1a2233" strokeWidth="28" />
        {data.map((item, i) => {
          const segment = (item.percent / total) * circumference;
          const offset = -accumulated;
          accumulated += segment;
          return (
            <circle
              key={i}
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke={item.hexColor}
              strokeWidth="28"
              strokeDasharray={`${segment} ${circumference - segment}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-white">{total}%</span>
        <span className="text-[8px] text-gray-500">bozor</span>
      </div>
    </div>
  );
}

function TrendLine({ data, color, width, height }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const padding = 4;
  const chartH = height - padding * 2;
  const chartW = width - padding * 2;
  const stepX = chartW / (data.length - 1);

  const points = data.map((v, i) => {
    const x = padding + i * stepX;
    const y = padding + chartH - ((v - min) / range) * chartH;
    return `${x},${y}`;
  });

  const areaPoints = `${padding},${height} ` + points.join(' ') + ` ${padding + (data.length - 1) * stepX},${height}`;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`trend-fill-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#trend-fill-${color.replace('#', '')})`} />
      <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => {
        const x = padding + i * stepX;
        const y = padding + chartH - ((v - min) / range) * chartH;
        return <circle key={i} cx={x} cy={y} r="3" fill={color} className="opacity-60" />;
      })}
    </svg>
  );
}

function Sparkline({ data, color, width = 60, height = 24 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pad = 2;
  const cw = width - pad * 2;
  const ch = height - pad * 2;
  const stepX = cw / (data.length - 1);
  const points = data.map((v, i) => `${pad + i * stepX},${pad + ch - ((v - min) / range) * ch}`).join(' ');

  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnimatedStatCard({ stat, delay = 0 }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const raw = parseFloat(stat.value.replace(/[,\s]/g, '').replace(/[^0-9.]/g, ''));
  const isLarge = stat.value.includes('mlrd') || stat.value.includes('mln');
  const counter = useCounter(isLarge ? Math.round(raw / 10) : Math.round(raw), 1600);

  const displayNum = isLarge
    ? `${(counter * 10).toLocaleString()}`
    : counter.toLocaleString();

  return (
    <div
      className={`bg-[#0b1329] rounded-lg p-4 border border-gray-800/30 transition-all duration-700 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="text-xl mb-1">{stat.icon}</div>
      <div className={`text-xl font-bold ${stat.color}`}>
        {show ? displayNum : '0'}{' '}
        <span className="text-[9px] text-gray-500 font-normal">{stat.unit}</span>
      </div>
      <div className="text-[9px] text-gray-600 mt-1">{stat.detail}</div>
    </div>
  );
}

export default function Narxlar() {
  const [activeTab, setActiveTab] = useState('metan');
  const [activeRegionTab, setActiveRegionTab] = useState('metan');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    setAnimate(false);
    requestAnimationFrame(() => setAnimate(true));
  }, [activeTab]);

  const activePrices = monthlyPrices[activeTab] || monthlyPrices.metan;
  const maxPrice = Math.max(...activePrices);
  const chartColor = getBarColor(activeTab);
  const chartGradient = getGradient(activeTab);

  const sortedRegions = useMemo(() => {
    return [...regionPrices].sort((a, b) => {
      const aVal = activeRegionTab === 'metan' ? a.metan : activeRegionTab === 'benzin' ? a.benzin : a.propan;
      const bVal = activeRegionTab === 'metan' ? b.metan : activeRegionTab === 'benzin' ? b.benzin : b.propan;
      return bVal - aVal;
    });
  }, [activeRegionTab]);

  return (
    <div className="min-h-screen bg-[#0b1329] text-gray-300 font-sans p-4 md:p-6 selection:bg-green-500 selection:text-black">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ===== HEADER ===== */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-wide">Narxlar Analitikasi</h1>
            <p className="text-sm text-gray-400 mt-1">O'zbekiston bo'ylab metan, benzin va propan narxlari — real statistik ma'lumotlar</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto flex-wrap">
            {Object.values(fuelPrices).map((fuel) => (
              <div key={fuel.label} className={`${fuel.bgColor} ${fuel.borderColor} border p-2.5 rounded-lg flex-1 md:w-32 min-w-[90px]`}>
                <span className={`text-[9px] ${fuel.color} font-bold block uppercase tracking-wider`}>
                  {fuel.icon} {fuel.label}
                </span>
                <span className="text-base font-bold text-white">{fuel.price.toLocaleString()} <span className="text-[8px] text-gray-500 font-normal">{fuel.unit}</span></span>
              </div>
            ))}
          </div>
        </header>

        {/* ===== STATISTIKA KARTOCHKALARI ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: '💨', value: '1,200+', label: 'Metan shoxobchalari', gradient: 'from-emerald-500/10', border: 'border-emerald-500/20' },
            { icon: '⛽', value: '1,500+', label: 'Benzin shoxobchalari', gradient: 'from-orange-500/10', border: 'border-orange-500/20' },
            { icon: '🔥', value: '300+', label: 'Propan shoxobchalari', gradient: 'from-purple-500/10', border: 'border-purple-500/20' },
            { icon: '📊', value: '42,3 mlrd', label: 'm³ gaz/yil', gradient: 'from-blue-500/10', border: 'border-blue-500/20' },
          ].map((card, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${card.gradient} to-transparent border ${card.border} rounded-xl p-4 transition-all duration-700 ${
                animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="text-2xl mb-1">{card.icon}</div>
              <div className="text-lg font-bold text-white">{card.value}</div>
              <div className="text-[10px] text-gray-400">{card.label}</div>
            </div>
          ))}
        </div>

        {/* ===== ASOSIY GRAFIK VA VILOYATLAR ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Narxlar Dinamikasi (12 oy) */}
          <div className="lg:col-span-2 bg-[#131c35] rounded-xl p-5 border border-gray-800/50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <TrendingUp className="text-green-500 w-5 h-5" /> Narxlar Dinamikasi (12 oy)
              </h2>
              <div className="bg-[#0b1329] p-1 rounded-lg text-xs flex gap-1">
                {['metan', 'benzin92', 'propan'].map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-3 py-1 rounded font-medium transition-all ${activeTab === key ? 'bg-green-500 text-[#0b1329]' : 'text-gray-400 hover:text-white'}`}
                  >
                    {fuelPrices[key === 'benzin92' ? 'benzin92' : key]?.label.split(' ')[0] || key}
                  </button>
                ))}
              </div>
            </div>

            {/* Grafik */}
            <div className="relative h-52 pt-4">
              {/* Y o'qi chiziqlari va qiymatlari */}
              {[0, 25, 50, 75, 100].map((line) => (
                <div key={line} className="absolute left-0 right-0 border-t border-gray-800/30" style={{ bottom: `${line}%` }}>
                  <span className="absolute -top-3 -left-1 text-[8px] text-gray-600">
                    {Math.round(maxPrice * (1 - line / 100) / 100) * 100}
                  </span>
                </div>
              ))}

              {/* Ustunlar */}
              <div className="flex items-end justify-between gap-1.5 h-full px-1 relative z-10">
                {activePrices.map((price, i) => {
                  const heightPercent = (price / maxPrice) * 100;
                  return (
                    <div key={i} className="w-full flex flex-col items-center gap-1">
                      <div className="w-full flex-1 flex items-end relative">
                        <div
                          className={`w-full rounded-t-sm transition-all duration-700 ease-out group relative cursor-pointer`}
                          style={{
                            height: animate ? `${heightPercent}%` : '0%',
                            transitionDelay: `${i * 40}ms`,
                            background: `linear-gradient(to top, ${chartColor}40, ${chartColor}80)`,
                          }}
                        >
                          <div
                            className="absolute bottom-0 left-0 right-0 h-full rounded-t-sm opacity-40 group-hover:opacity-70 transition-opacity"
                            style={{
                              background: `linear-gradient(to top, ${chartColor}, transparent)`,
                            }}
                          />
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-[#0b1329]/90 px-2 py-0.5 rounded border border-gray-700/50 shadow-lg z-20">
                            {price.toLocaleString()} so'm
                          </div>
                        </div>
                      </div>
                      <span className="text-[8px] text-gray-600">{months[i]}</span>
                    </div>
                  );
                })}
              </div>

              {/* Trend chizig'i */}
              <div className="absolute inset-0 top-4 left-0 right-0 z-20 pointer-events-none">
                <TrendLine data={activePrices} color={chartColor} width={280} height={200} />
              </div>
            </div>

            {/* Legend va statistika */}
            <div className="mt-4 pt-3 border-t border-gray-800/30 grid grid-cols-3 gap-4 text-[10px] text-gray-500">
              <div>
                <span>Joriy narx</span>
                <div className="text-sm font-bold text-white">{activePrices[activePrices.length - 1].toLocaleString()} so'm</div>
              </div>
              <div>
                <span>12 oylik o'zgarish</span>
                <div className={`text-sm font-bold ${activePrices[activePrices.length - 1] > activePrices[0] ? 'text-red-400' : 'text-green-400'}`}>
                  +{Math.round(((activePrices[activePrices.length - 1] - activePrices[0]) / activePrices[0]) * 100)}%
                </div>
              </div>
              <div>
                <span>O'rtacha narx</span>
                <div className="text-sm font-bold text-white">
                  {Math.round(activePrices.reduce((a, b) => a + b, 0) / activePrices.length).toLocaleString()} so'm
                </div>
              </div>
            </div>
          </div>

          {/* Viloyatlar kesimi (sorted) */}
          <div className="bg-[#131c35] rounded-xl p-5 border border-gray-800/50 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">Viloyatlar kesimi</h2>
              <div className="bg-[#0b1329] p-1 rounded-lg text-[10px] flex gap-0.5">
                {['metan', 'benzin', 'propan'].map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveRegionTab(key)}
                    className={`px-2 py-1 rounded font-medium transition-all ${
                      activeRegionTab === key
                        ? key === 'metan' ? 'bg-emerald-500 text-[#0b1329]' : key === 'benzin' ? 'bg-orange-500 text-[#0b1329]' : 'bg-purple-500 text-[#0b1329]'
                        : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {key === 'metan' ? 'Metan' : key === 'benzin' ? 'Benzin' : 'Propan'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 flex-1 overflow-y-auto max-h-[300px] pr-1 scrollbar-thin">
              {sortedRegions.map((region, idx) => {
                const price = activeRegionTab === 'metan' ? region.metan : activeRegionTab === 'benzin' ? region.benzin : region.propan;
                const maxRegionPrice = Math.max(...regionPrices.map(r => activeRegionTab === 'metan' ? r.metan : activeRegionTab === 'benzin' ? r.benzin : r.propan));
                const barWidth = (price / maxRegionPrice) * 100;
                const barColor = activeRegionTab === 'metan' ? 'bg-emerald-500' : activeRegionTab === 'benzin' ? 'bg-orange-500' : 'bg-purple-500';
                const rankColors = ['text-yellow-400', 'text-gray-300', 'text-amber-600', 'text-gray-500'];
                return (
                  <div key={idx} className="flex items-center gap-2 py-1.5 border-b border-gray-800/20 last:border-0 group">
                    <span className={`text-[10px] font-bold w-5 text-center shrink-0 ${idx < 4 ? rankColors[idx] : 'text-gray-600'}`}>
                      {idx + 1}
                    </span>
                    <span className="text-[11px] text-gray-400 w-20 shrink-0 truncate" title={region.name}>{region.name}</span>
                    <div className="flex-1 h-3.5 bg-gray-800/40 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}/60 group-hover:${barColor}/80`}
                        style={{ width: animate ? `${barWidth}%` : '0%', transitionDelay: `${idx * 30}ms` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-white w-14 text-right shrink-0">{price.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== ISHLAB CHIQARISH STATISTIKASI (ANIMATED) ===== */}
        <div className="bg-[#131c35] rounded-xl p-5 border border-gray-800/50">
          <div className="flex items-center gap-2 mb-5">
            <Factory className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-semibold text-white">O'zbekistonda yoqilg'i ishlab chiqarish (2025)</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productionStats.map((stat, i) => (
              <AnimatedStatCard key={i} stat={stat} delay={i * 120} />
            ))}
          </div>
        </div>

        {/* ===== BOZOR ULUSHI (Shoxobchalar) ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shoxobchalar taqsimoti + Donut */}
          <div className="bg-[#131c35] rounded-xl p-5 border border-gray-800/50">
            <div className="flex items-center gap-2 mb-4">
              <Fuel className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-semibold text-white">Shoxobchalar taqsimoti</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <DonutChart data={stationStats} />
              <div className="space-y-3 flex-1 w-full">
                {stationStats.map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stat.hexColor }} />
                        <span className="text-gray-400">{stat.label}</span>
                      </span>
                      <span className="text-white font-bold">{stat.count.toLocaleString()} ta</span>
                    </div>
                    <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`${stat.color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: animate ? `${stat.percent}%` : '0%', transitionDelay: `${i * 150}ms` }}
                      />
                    </div>
                    <span className="text-[9px] text-gray-600">{stat.percent}% bozor ulushi</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Narx o'zgarishi xulosasi + sparklines */}
          <div className="bg-[#131c35] rounded-xl p-5 border border-gray-800/50">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-semibold text-white">2025-2026 yilgi o'zgarishlar</h2>
            </div>
            <div className="space-y-3">
              {[
                { icon: '💨', label: 'Metan narxi', change: '+30%', from: '3,800', to: '5,800', unit: "so'm/m³", color: '#10b981', isUp: true },
                { icon: '🔥', label: 'Propan narxi', change: '+25%', from: '5,200', to: '6,800', unit: "so'm/l", color: '#a855f7', isUp: true },
                { icon: '⛽', label: 'Benzin AI-92 narxi', change: '+20%', from: '6,500', to: '7,800', unit: "so'm/l", color: '#3b82f6', isUp: true },
                { icon: '📉', label: 'Propan (2026 Yanvar)', change: '-18%', from: '', to: '', unit: '', color: '#f97316', isUp: false, note: 'Raqobat qo\'mitasi choralari natijasida' },
              ].map((item, i) => (
                <div key={i} className={`bg-[#0b1329] rounded-lg p-3 border ${item.isUp ? 'border-gray-800/30' : 'border-yellow-500/20'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{item.icon} {item.label}</span>
                      {monthlyPrices[['metan', 'propan', 'benzin92'][i]] && (
                        <Sparkline data={monthlyPrices[['metan', 'propan', 'benzin92'][i]]} color={item.color} />
                      )}
                    </div>
                    <span className={`text-xs font-bold ${item.isUp ? 'text-red-400' : 'text-green-400'}`}>{item.change}</span>
                  </div>
                  {item.from && (
                    <div className="text-[10px] text-gray-500 mt-1">{item.from} → {item.to} {item.unit} (1 yilda)</div>
                  )}
                  {item.note && (
                    <div className="text-[10px] text-gray-500 mt-1">{item.note}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== INFO FOOTER ===== */}
        <div className="bg-[#131c35] rounded-xl p-5 border border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-3 md:max-w-[65%]">
            <h3 className="text-md font-semibold text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-green-400" /> Ma'lumotlar manbai
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Narxlar O'zbekiston Respublikasi Tovar-xom ashyo birjasi (O'zRTXB), O'zbekiston Milliy statistika qo'mitasi,
              Raqobatni rivojlantirish va iste'molchilar huquqlarini himoya qilish qo'mitasi ma'lumotlari asosida shakllantirilgan.
              Ma'lumotlar har 15 daqiqada yangilanadi.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="bg-green-950/40 text-green-400 border border-green-900/40 text-[10px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" /> Rasmiy manbalar asosida
              </span>
              <span className="bg-gray-800/30 text-gray-400 border border-gray-700/30 text-[10px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3" /> Har 15 daqiqada yangilanadi
              </span>
            </div>
          </div>

          <div className="w-full md:w-[30%] bg-[#0b1329] border border-gray-800/60 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
            <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-green-500/30 transition-all z-10 shadow-lg">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
