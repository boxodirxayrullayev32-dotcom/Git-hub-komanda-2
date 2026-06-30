import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Navigatsiya uchun import
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Search, MapPin, Fuel, ArrowRight, Globe, Share2 } from 'lucide-react';

// Toshkentdagi real yoqilg'i quyish shoxobchalari
const stationsData = [
  {
    id: 1,
    name: 'UNIGAZ Metan (Chilonzor)',
    type: 'Metan (CNG)',
    details: 'Bosim: 210 atm • Navbat: 3 ta avto',
    address: 'Toshkent sh., Chilonzor tumani, Bunyodkor shoh ko‘chasi (Novza metro yaqinida)',
    coordinates: [41.285843, 69.219512],
    color: '#10B981', // Yashil
  },
  {
    id: 2,
    name: 'LUKOIL (Yunusobod)',
    type: 'Propan (LPG)',
    details: 'Suyuqlik: To\'la • Navbat: 4 ta avto',
    address: 'Toshkent sh., Yunusobod tumani, Ahmad Donish ko‘chasi',
    coordinates: [41.364282, 69.288214],
    color: '#3B82F6', // Ko'k
  },
  {
    id: 3,
    name: 'MUSTANG (Mirobod)',
    type: 'Benzin AI-92',
    details: 'AI-92 bor • Navbat: 5 ta avto',
    address: 'Toshkent sh., Mirobod tumani, Farg‘ona yo‘li ko‘chasi',
    coordinates: [41.284532, 69.292514],
    color: '#F97316', // To'q sariq
  },
  {
    id: 4,
    name: 'JEYRON Gaz (Sergeli)',
    type: 'Metan (CNG)',
    details: 'Bosim: 200 atm • Navbat: 12 ta avto',
    address: 'Toshkent sh., Sergeli tumani, Yangi Sergeli ko‘chasi',
    coordinates: [41.231245, 69.214125],
    color: '#10B981',
  },
];

const Home = () => {
  const navigate = useNavigate(); // 2. Navigatsiya funksiyasini chaqiramiz

  // Qidiruv paneli uchun state'lar
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('Metan (CNG)');
  
  // Xaritada tanlangan shoxobcha va xarita markazi
  const [selectedStation, setSelectedStation] = useState(null);
  const [mapCenter, setMapCenter] = useState([41.311081, 69.240562]);
  const [mapZoom, setMapZoom] = useState(11);

  // Qidiruv tugmasi bosilganda ishlovchi funksiya (Filtrlash)
  const filteredStations = useMemo(() => {
    return stationsData.filter((station) => {
      const matchesCity = station.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          station.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFuel = station.type === selectedFuel;
      return matchesCity && matchesFuel;
    });
  }, [searchQuery, selectedFuel]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (filteredStations.length > 0) {
      setMapCenter(filteredStations[0].coordinates);
      setMapZoom(13);
      setSelectedStation(filteredStations[0]);
    } else {
      alert("Kechirasiz, ushbu hududda bunday yoqilg'i quyish shoxobchasi topilmadi.");
    }
  };

  return (
    <div className="min-h-screen bg-[#071126] text-white font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-4xl mx-auto pt-16 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Tizim onlayn • 124 ta stantsiya faol
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Vaqtingizni tejang, navbatni onlayn oling!
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          O'zbekistondagi barcha avtoparklar va shaxsiy avtomobillar uchun yagona elektron navbat platformasi. 
          Yoqilg'i quyish shoxobchalaridagi holatni real vaqt rejimida kuzatib boring.
        </p>

        {/* QIDIRUV PANELI WIDGETI */}
        <form onSubmit={handleSearch} className="bg-[#0b1b3d] border border-gray-800 p-2.5 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-2">
          <div className="flex items-center gap-3 px-3 py-2 w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-800">
            <MapPin className="w-5 h-5 text-gray-500 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hudud yoki shaharni kiriting..." 
              className="bg-transparent w-full text-sm focus:outline-none text-white placeholder-gray-500"
            />
          </div>
          
          <div className="flex items-center gap-3 px-3 py-2 w-full md:w-1/2 relative">
            <Fuel className="w-5 h-5 text-gray-500 shrink-0" />
            <select 
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="bg-transparent w-full text-sm focus:outline-none text-white cursor-pointer appearance-none pr-8"
            >
              <option value="Metan (CNG)" className="bg-[#0b1b3d] text-white">Metan (CNG)</option>
              <option value="Propan (LPG)" className="bg-[#0b1b3d] text-white">Propan (LPG)</option>
              <option value="Benzin AI-92" className="bg-[#0b1b3d] text-white">Benzin AI-92</option>
            </select>
            <div className="absolute right-3 pointer-events-none text-gray-500 text-xs">▼</div>
          </div>

          <button type="submit" className="w-full md:w-auto bg-[#3b82f6] hover:bg-blue-600 text-white font-medium text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0">
            <Search className="w-4 h-4" />
            <span>Izlash</span>
          </button>
        </form>

        {/* Fuel Prices Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-6">
          <div onClick={() => setSelectedFuel('Metan (CNG)')} className={`cursor-pointer transition-all border p-4 rounded-xl flex items-center gap-4 text-left ${selectedFuel === 'Metan (CNG)' ? 'bg-emerald-500/10 border-emerald-500' : 'bg-[#0b1b3d]/50 border-gray-800/80'}`}>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400"><span className="font-bold text-xs">M</span></div>
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Metan (CNG)</div>
              <div className="text-base font-bold text-emerald-400">3,700 so'm</div>
            </div>
          </div>

          <div onClick={() => setSelectedFuel('Propan (LPG)')} className={`cursor-pointer transition-all border p-4 rounded-xl flex items-center gap-4 text-left ${selectedFuel === 'Propan (LPG)' ? 'bg-blue-500/10 border-blue-500' : 'bg-[#0b1b3d]/50 border-gray-800/80'}`}>
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400"><span className="font-bold text-xs">P</span></div>
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Propan (LPG)</div>
              <div className="text-base font-bold text-blue-400">5,500 so'm</div>
            </div>
          </div>

          <div onClick={() => setSelectedFuel('Benzin AI-92')} className={`cursor-pointer transition-all border p-4 rounded-xl flex items-center gap-4 text-left ${selectedFuel === 'Benzin AI-92' ? 'bg-orange-500/10 border-orange-500' : 'bg-[#0b1b3d]/50 border-gray-800/80'}`}>
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400"><span className="font-bold text-xs">B</span></div>
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Benzin AI-92</div>
              <div className="text-base font-bold text-orange-400">9,500 so'm</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT (MAP & FEATURES) */}
      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Yandex Map Container */}
        <div className="lg:col-span-2 bg-[#0b1b3d]/40 border border-gray-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[550px]">
          <div className="flex items-start justify-between z-10 mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Yaqin-atrofdagi shoxobchalar</h3>
              <p className="text-xs text-gray-400">Tanlangan filter bo'yicha {filteredStations.length} ta zapravka ko'rsatilyapti</p>
            </div>
            <button onClick={() => { setMapCenter([41.311081, 69.240562]); setMapZoom(11); }} className="bg-gray-800/80 hover:bg-gray-700 text-gray-300 text-xs font-medium px-4 py-2 rounded-xl transition-colors">
              Xaritani tiklash
            </button>
          </div>

          {/* Map Area */}
          <div className="w-full flex-1 rounded-2xl overflow-hidden border border-gray-800 relative min-h-[380px] bg-[#050c1b]">
            <YMaps query={{ lang: 'ru_RU' }}>
              <Map
                state={{ center: mapCenter, zoom: mapZoom }}
                width="100%"
                height="100%"
                className="absolute inset-0 grayscale invert contrast-125 brightness-50 opacity-80"
              >
                {filteredStations.map((station) => (
                  <Placemark
                    key={station.id}
                    geometry={station.coordinates}
                    properties={{ hintContent: station.name }}
                    options={{
                      preset: 'islands#dotIcon',
                      iconColor: station.color,
                    }}
                    onClick={() => {
                      setSelectedStation(station);
                      setMapCenter(station.coordinates);
                    }}
                  />
                ))}
              </Map>
            </YMaps>

            {/* Marker Popup info Box */}
            {selectedStation && (
              <div className="absolute bottom-4 left-4 right-4 bg-[#071126]/95 border border-gray-800 p-4 rounded-xl z-20 shadow-2xl backdrop-blur-sm transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded font-bold" style={{ backgroundColor: `${selectedStation.color}20`, color: selectedStation.color }}>
                      {selectedStation.type}
                    </span>
                    <h4 className="text-base font-bold mt-1 text-white">{selectedStation.name}</h4>
                    <p className="text-xs text-emerald-400 font-semibold mt-0.5">{selectedStation.details}</p>
                    <p className="text-xs text-gray-400 mt-2 border-t border-gray-800/60 pt-2 leading-relaxed">
                      📍 <span>{selectedStation.address}</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedStation(null)}
                    className="text-gray-500 hover:text-white text-xs bg-gray-800/50 px-2 py-1 rounded shrink-0 ml-4"
                  >
                    Yopish
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#071126]/90 border border-gray-800 p-4 rounded-xl max-w-[160px] z-10 mt-4">
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">O'rtacha kutish</div>
            <div className="text-xl font-extrabold text-emerald-400">15 daqiqaga</div>
          </div>
        </div>

        {/* Right Side: Features */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#0b1b3d]/40 border border-gray-800 rounded-3xl p-6 flex flex-col justify-between flex-1">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4"><span className="font-bold text-lg">🎫</span></div>
              <h3 className="text-lg font-bold text-white mb-2">Tezkor navbat olish</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Sms orqali tasdiqlash shart emas, shunchaki QR-kodni skanerlang.</p>
            </div>
            {/* 3. YANGILANGAN TUGMA: Navbat olish sahifasiga o'tkazadi */}
            <button 
              type="button" 
              onClick={() => navigate('/navbat-olish')}
              className="w-full bg-[#16274f] hover:bg-blue-600 border border-gray-800 hover:border-blue-500 text-sm font-semibold py-3 px-4 rounded-xl mt-6 transition-all text-blue-400 hover:text-white flex items-center justify-center gap-2 group"
            >
              <span>Hozir olish</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="bg-[#0b1b3d]/40 border border-gray-800 rounded-3xl p-6 flex-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4"><span className="font-bold text-lg">💳</span></div>
            <h3 className="text-lg font-bold text-white mb-2">Yagona to'lov tizimi</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">Click, Payme orqali to'lovlarni amalga oshiring va keshbeklarga ega bo'ling.</p>
            <div className="flex gap-2">
              <div className="h-7 w-12 bg-gray-800/50 border border-gray-800 rounded-md"></div>
              <div className="h-7 w-12 bg-gray-800/50 border border-gray-800 rounded-md"></div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. TICKER */}
      <section className="border-y border-gray-800 bg-[#071126] py-3 overflow-hidden text-xs text-gray-400 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-8 whitespace-nowrap overflow-x-auto [scrollbar-width:none]">
          <div className="flex items-center gap-2 shrink-0"><span className="w-2 h-2 rounded-full bg-emerald-400"></span><span>MUSTANG: Metan 210 atm</span></div>
          <div className="flex items-center gap-2 shrink-0"><span className="w-2 h-2 rounded-full bg-emerald-400"></span><span>JEYRON: Ochiq - Navbat yo'q</span></div>
          <div className="flex items-center gap-2 shrink-0"><span className="w-2 h-2 rounded-full bg-red-400"></span><span>POYTAXT: Vaqtinchalik yopiq</span></div>
          <div className="flex items-center gap-2 shrink-0"><span className="w-2 h-2 rounded-full bg-emerald-400"></span><span>IBN SINO: Propan 5,300 so'm</span></div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-[#050c1b] text-gray-500 text-xs py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-base font-bold text-white mb-2">Gaz Navbat Tizimi</div>
            <div>© 2026 Gaz Navbat Tizimi</div>
          </div>
          <div className="flex items-center gap-6 font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Xavfsizlik</a>
            <a href="#" className="hover:text-white transition-colors">Yordam markazi</a>
            <a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a>
            <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <button type="button" className="p-2 hover:text-white transition-colors"><Globe className="w-4 h-4" /></button>
            <button type="button" className="p-2 hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;