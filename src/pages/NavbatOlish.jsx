import { useState } from 'react';

const NavbatOlish = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Navbat Olish</h1>
      <p className="text-gray-600 mt-2">Navbat olish sahifasi — UI ni shu yerga yozing</p>
    </div>
  ) 
}
import React, { useState } from 'react';

const NavbatOlish = () => {
  // Forma elementlari uchun state-lar
  const [selectedStation, setSelectedStation] = useState('Chilonzor CTG'); // Shahopcha uchun yangi state
  const [selectedModel, setSelectedModel] = useState('Gentra');
  const [customModel, setCustomModel] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('Metan');
  const [selectedKolonka, setSelectedKolonka] = useState('3');
  const [selectedTime, setSelectedTime] = useState('14:15');

  // Shahopchalar (Zapravkalar) ro'yxati
  const stations = [
    { id: 'Chilonzor CTG', name: 'Chilonzor CTG (Metan/Propan)', location: 'Chilonzor 9-kvartal' },
    { id: 'Yunusobod Eco', name: 'Yunusobod Eco-Gas (Metan)', location: 'Yunusobod 19-kvartal' },
    { id: 'Sergeli Car', name: 'Sergeli Car Gas (Metan/Benzin)', location: 'Sergeli-5' },
    { id: 'Yashnobod Pro', name: 'Yashnobod Propan Gas', location: 'Yashnobod tuzel' },
  ];

  // JONLI NAVBAT RO'YXATI (Dastlabki mashinalarga ham shahopcha manzillari biriktirildi)
  const [userBookings, setUserBookings] = useState([
    {
      id: 1,
      type: 'current',
      label: 'HOZIRGI',
      station: 'Chilonzor CTG',
      model: 'Chevrolet Damas',
      plate: '01 S 309 MB',
      fuel: 'Metan',
      kolonka: '3',
      time: '14:00',
      status: 'waiting'
    },
    {
      id: 2,
      type: 'next',
      label: 'KEYINGI (+4 daqiqadan so\'ng)',
      station: 'Chilonzor CTG',
      model: 'BYD Chazor',
      plate: '10 W 323 JB',
      fuel: 'Propan',
      kolonka: '3',
      time: '14:04',
      status: 'waiting'
    },
    {
      id: 3,
      type: 'queue',
      label: '2-NAVBAT (+9 daqiqadan so\'ng)',
      station: 'Yunusobod Eco',
      model: 'Chevrolet Cobalt',
      plate: '10 Q 323 LA',
      fuel: 'Benzin',
      kolonka: '3',
      time: '14:09',
      status: 'waiting'
    }
  ]);

  // Avtomobillar ro'yxati
  const carModels = [
    { 
      id: 'Gentra', 
      label: 'Gentra', 
      icon: (
        <svg className="w-10 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      )
    },
    { 
      id: 'Cobalt', 
      label: 'Cobalt', 
      icon: (
        <svg className="w-10 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="11" width="16" height="6" rx="2" />
          <path d="M6 11V7c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v4" />
          <circle cx="7" cy="17" r="1" fill="currentColor" />
          <circle cx="17" cy="17" r="1" fill="currentColor" />
        </svg>
      )
    },
    { 
      id: 'Labo', 
      label: 'Labo', 
      icon: (
        <svg className="w-10 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 17h2M19 17h2" />
          <rect x="14" y="6" width="7" height="8" rx="1" />
          <rect x="3" y="10" width="11" height="7" rx="1" />
          <circle cx="7" cy="17" r="1.5" />
          <circle cx="16" cy="17" r="1.5" />
        </svg>
      )
    },
    { 
      id: 'Boshqa', 
      label: 'Boshqa', 
      icon: <span className="text-xl font-bold tracking-widest block h-6 flex items-center justify-center">•••</span>
    },
  ];

  // Yoqilg'i turlari ro'yxati
  const fuelTypes = [
    { id: 'Metan', label: 'Metan', icon: '💨' },
    { id: 'Propan', label: 'Propan', icon: '🔥' },
    { id: 'Benzin', label: 'Benzin', icon: '⚡' },
  ];

  const timeSlots = ['14:00', '14:15', '14:30', '14:45', '15:00'];
  const kolonkalar = [
    { id: '1', status: 'available' },
    { id: '2', status: 'available' },
    { id: '3', status: 'fastest' },
    { id: '4', status: 'available' },
    { id: '5', status: 'busy' },
  ];

  // Navbatni tasdiqlash
  const handleBooking = (e) => {
    e.preventDefault();
    if (!plateNumber.trim()) {
      alert("Iltimos, avtomobil davlat raqamini kiriting!");
      return;
    }

    if (selectedModel === 'Boshqa' && !customModel.trim()) {
      alert("Iltimos, avtomobil modelini yozing!");
      return;
    }

    const finalModel = selectedModel === 'Boshqa' ? customModel : selectedModel;
    const nextQueueIndex = userBookings.length + 1;

    const newBooking = {
      id: Date.now(), 
      type: 'user-added',
      label: `${nextQueueIndex}-NAVBAT`,
      station: selectedStation, // Tanlangan shahopcha
      model: finalModel,
      plate: plateNumber.toUpperCase(),
      fuel: selectedFuel,
      kolonka: selectedKolonka,
      time: selectedTime,
      status: 'waiting'
    };

    setUserBookings([...userBookings, newBooking]);
    setPlateNumber('');
    setCustomModel('');
  };

  const handleArrived = (id) => {
    setUserBookings(userBookings.map((b) => (b.id === id ? { ...b, status: 'arrived' } : b)));
  };

  const handleCancel = (id) => {
    setUserBookings(userBookings.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#071126] text-white font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CHAP TOMON: FORMA */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎫</span>
            <h2 className="text-2xl font-bold tracking-tight">Navbat band qilish</h2>
          </div>

          <form onSubmit={handleBooking} className="bg-[#0b1b3d]/40 border border-gray-800 rounded-3xl p-6 space-y-6">
            
            {/* NEW: 1. Qaysi shahopchadan quyishni tanlash */}
            <div>
              <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                ZAPRAVKA SHAHOPCHASINI TANLANG
              </label>
              <div className="relative">
                <select
                  value={selectedStation}
                  onChange={(e) => setSelectedStation(e.target.value)}
                  className="w-full bg-[#0b1b3d]/80 border border-gray-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer font-medium"
                >
                  {stations.map((station) => (
                    <option key={station.id} value={station.id} className="bg-[#071126] text-white">
                      {station.name} — ({station.location})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 2. Avtomobil Modeli */}
            <div>
              <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-3">
                AVTOMOBIL MODELI
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {carModels.map((car) => (
                  <button
                    key={car.id}
                    type="button"
                    onClick={() => setSelectedModel(car.id)}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all min-h-[100px] ${
                      selectedModel === car.id
                        ? 'bg-[#0b1b3d]/80 border-emerald-500 text-white shadow-lg shadow-emerald-500/5'
                        : 'bg-[#0b1b3d]/60 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className={selectedModel === car.id ? 'text-emerald-400' : 'text-gray-400'}>
                      {car.icon}
                    </div>
                    <span className="text-xs font-semibold text-gray-300 mt-1">{car.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dinamik Model kiritish inputi */}
            {selectedModel === 'Boshqa' && (
              <div className="animate-fadeIn">
                <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                  Avtomobil modelini yozing
                </label>
                <input
                  type="text"
                  value={customModel}
                  onChange={(e) => setCustomModel(e.target.value)}
                  placeholder="Masalan: BYD Song, Nexia 3, Spark..."
                  className="w-full bg-[#0b1b3d]/60 border border-emerald-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            )}

            {/* 3. Davlat Raqami */}
            <div>
              <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                DAVLAT RAQAMI
              </label>
              <input
                type="text"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                placeholder="Davlat raqamini kiriting (masalan: 01 A 777 AA)"
                className="w-full bg-[#0b1b3d]/60 border border-gray-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
              />
            </div>

            {/* 4. Yoqilg'i turi */}
            <div>
              <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-3">
                YOQILG'I TURI
              </label>
              <div className="grid grid-cols-3 gap-3">
                {fuelTypes.map((fuel) => (
                  <button
                    key={fuel.id}
                    type="button"
                    onClick={() => setSelectedFuel(fuel.id)}
                    className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      selectedFuel === fuel.id
                        ? 'bg-[#0b1b3d]/90 border-blue-500 text-white shadow-md'
                        : 'bg-[#0b1b3d]/40 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <span>{fuel.icon}</span>
                    <span>{fuel.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Kolonka */}
            <div>
              <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-3">
                ZAPRAVKA KOLONKASINI TANLANG
              </label>
              <div className="grid grid-cols-5 gap-3">
                {kolonkalar.map((kolonka) => {
                  const isBusy = kolonka.status === 'busy';
                  const isSelected = selectedKolonka === kolonka.id;

                  return (
                    <button
                      key={kolonka.id}
                      type="button"
                      disabled={isBusy}
                      onClick={() => setSelectedKolonka(kolonka.id)}
                      className={`py-3.5 rounded-xl border font-bold text-sm transition-all ${
                        isBusy
                          ? 'bg-red-500/5 border-red-950/40 text-red-900/40 cursor-not-allowed'
                          : isSelected
                          ? 'bg-emerald-500 border-emerald-400 text-[#071126] shadow-lg shadow-emerald-500/20'
                          : kolonka.status === 'fastest'
                          ? 'bg-[#0b1b3d]/60 border-emerald-500/40 text-emerald-400 hover:border-emerald-500'
                          : 'bg-[#0b1b3d]/60 border-gray-800 text-gray-300 hover:border-gray-700'
                      }`}
                    >
                      {kolonka.id}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Vaqt */}
            <div>
              <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-3">
                YETIB KELISH VAQTI
              </label>
              <div className="flex flex-wrap gap-2.5">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      selectedTime === time
                        ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/10'
                        : 'bg-[#0b1b3d]/60 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#071126] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10 text-sm mt-4"
            >
              <span>⚡ Navbatni tasdiqlash</span>
            </button>

          </form>
        </div>

        {/* O'NG TOMON: JONLI NAVBAT */}
        <div className="space-y-6">
          <div className="bg-[#0b1b3d]/30 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">Stantsiyalar faol</span>
            </div>
            <div className="text-xs font-bold text-gray-400">🎚️ 210 MPa</div>
          </div>

          <div className="bg-[#0b1b3d]/40 border border-gray-800 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Jonli Navbat</h3>
              <span className="bg-gray-800/60 border border-gray-800 text-[10px] text-gray-400 px-2.5 py-1 rounded-full font-medium">
                Sizdan oldin {userBookings.filter(b => b.status === 'waiting').length} mashina bor
              </span>
            </div>

            <div className="relative pl-6 border-l border-emerald-500/30 space-y-4 py-2">
              
              {/* DINAMIK JONLI NAVBATLAR RO'YXATI */}
              {userBookings.map((booking, index) => {
                const isArrived = booking.status === 'arrived';
                
                let borderCircleColor = 'border-gray-800';
                let dotColor = 'bg-gray-700';
                let cardStyle = 'bg-[#0b1b3d]/40 border-gray-800/80';
                let labelStyle = 'text-gray-500';

                const fuelColors = {
                  Metan: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                  Propan: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
                  Benzin: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                };

                if (isArrived) {
                  borderCircleColor = 'border-emerald-500';
                  dotColor = 'bg-emerald-400';
                  cardStyle = 'bg-emerald-500/10 border-emerald-500/40';
                  labelStyle = 'text-emerald-400';
                } else if (booking.type === 'current' || index === 0) {
                  borderCircleColor = 'border-emerald-500';
                  dotColor = 'bg-emerald-400';
                  cardStyle = 'bg-[#0b1b3d]/60 border-emerald-500/30';
                  labelStyle = 'text-emerald-400';
                }

                return (
                  <div key={booking.id} className="relative pt-1 animate-fadeIn">
                    <div className={`absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-[#071126] border-2 ${borderCircleColor} flex items-center justify-center`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
                    </div>
                    
                    <div className={`border rounded-2xl p-3.5 transition-all ${cardStyle}`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${labelStyle}`}>
                          {isArrived ? `${booking.label.split(' (')[0]} (KELDI)` : booking.label}
                        </span>
                        <span className="text-[10px] bg-slate-800/80 text-gray-400 px-2 py-0.5 rounded font-mono">{booking.time}</span>
                      </div>
                      
                      {/* NEW: Tanlangan Shahopcha manzili belgisi */}
                      <div className="text-[10px] text-blue-400 font-semibold mt-0.5 flex items-center gap-1">
                        <span>📍</span> {booking.station}
                      </div>
                      
                      {/* Mashina nomi va Yoqilg'i turi */}
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-sm font-bold text-white">{booking.model}</div>
                        <span className={`text-[10px] px-1.5 py-0.5 font-bold rounded border ${fuelColors[booking.fuel] || 'bg-gray-800 text-gray-400'}`}>
                          {booking.fuel === 'Metan' ? '💨 ' : booking.fuel === 'Propan' ? '🔥 ' : '⚡ ' }
                          {booking.fuel}
                        </span>
                      </div>

                      <div className="text-[11px] text-gray-400 mt-1 font-mono">{booking.plate} • Kolonka #{booking.kolonka}</div>
                      
                      {/* Boshqaruv tugmalari */}
                      {booking.status === 'waiting' && (
                        <div className="flex gap-2 mt-3 pt-2 border-t border-gray-800/40">
                          <button
                            type="button"
                            onClick={() => handleArrived(booking.id)}
                            className="flex-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-[#071126] font-bold py-1.5 px-3 rounded-lg text-xs transition-all"
                          >
                            ✓ Keldi
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCancel(booking.id)}
                            className="flex-1 bg-red-500/5 hover:bg-red-500 text-red-400 hover:text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-all"
                          >
                            ✕ Kelmadi
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {userBookings.length === 0 && (
                <div className="relative pt-2">
                  <div className="absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-[#071126] border-2 border-dashed border-blue-500"></div>
                  <div className="bg-blue-500/5 border border-dashed border-blue-500/20 rounded-2xl p-6 text-center">
                    <span className="text-sm font-bold text-blue-400 block">
                      Hozircha hech qanday navbat yo'q.
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Narxlar trendi */}
          <div className="bg-[#0b1b3d]/20 border border-gray-900 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-500">
              <span>Narxlar trendi</span>
              <span className="text-emerald-400 font-medium">+150 so'm (24s)</span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-gray-900 pt-3">
              <div>
                <div className="text-[10px] text-gray-500">Metan (M³)</div>
                <div className="text-lg font-bold text-white mt-0.5">3,800 so'm</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500">Propan (L)</div>
                <div className="text-lg font-bold text-white mt-0.5">6,200 so'm</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default NavbatOlish;