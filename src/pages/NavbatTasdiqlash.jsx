import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueue } from '../context/QueueContext';

const NavbatTasdiqlash = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addQueue } = useQueue();
  const [confirmed, setConfirmed] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const booking = location.state?.booking;

  useEffect(() => {
    if (!booking) {
      navigate('/navbat-olish', { replace: true });
    }
  }, [booking, navigate]);

  if (!booking) return null;

  const handleConfirm = () => {
    addQueue(booking);
    setConfirmed(true);
    setIsRedirecting(true);
    setTimeout(() => {
      navigate('/mening-navbatlarim');
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/navbat-olish', { replace: true });
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#071126] flex items-center justify-center p-6">
        <div className="text-center animate-fadeIn">
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Navbat tasdiqlandi!</h2>
          <p className="text-gray-400 mb-8">
            {isRedirecting ? "Navbatlaringiz sahifasiga o'tkazilmoqda..." : 'Sizning navbatingiz muvaffaqiyatli band qilindi.'}
          </p>
          <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  const fuelEmojis = {
    Metan: '💨',
    Propan: '🔥',
    Benzin: '⚡',
  };

  const fuelColors = {
    Metan: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
    Propan: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400',
    Benzin: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
  };

  const stationImages = {
    'Chilonzor CTG': '🏪',
    'Yunusobod Eco': '🌿',
    'Sergeli Car': '🚗',
    'Yashnobod Pro': '🏭',
  };

  const bookingId = `#NB-${String(booking.id).slice(-6)}`;
  const currentDate = new Date().toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const waitMinutes = Math.floor(Math.random() * 14) + 2;
  const estimatedTime = new Date();
  estimatedTime.setMinutes(estimatedTime.getMinutes() + waitMinutes);
  const estimatedTimeStr = estimatedTime.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-[#071126] text-white font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-8 md:py-12">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span className="text-sm font-medium">Orqaga</span>
        </button>

        <div className="text-center mb-8 md:mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Navbatni tasdiqlang
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Ma'lumotlaringizni tekshirib, navbatni tasdiqlang
          </p>
        </div>

        <div className="bg-gradient-to-b from-[#0e1a33] to-[#0b1428] rounded-3xl border border-gray-800/60 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-6 md:p-8 border-b border-gray-800/40">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                {stationImages[booking.station] || '⛽'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{booking.station}</h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  {booking.station === 'Chilonzor CTG' && 'Chilonzor 9-kvartal'}
                  {booking.station === 'Yunusobod Eco' && 'Yunusobod 19-kvartal'}
                  {booking.station === 'Sergeli Car' && 'Sergeli-5'}
                  {booking.station === 'Yashnobod Pro' && 'Yashnobod tuzel'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center bg-[#071126]/50 rounded-xl px-4 py-3 border border-gray-800/40">
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Navbat ID</span>
                <p className="text-white font-bold text-lg tracking-wider">{bookingId}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Sana</span>
                <p className="text-white font-semibold text-sm">{currentDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#071126]/30 rounded-xl p-4 border border-gray-800/30">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold block mb-1">Avtomobil</span>
                <p className="text-white font-bold text-lg flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  {booking.model}
                </p>
              </div>

              <div className="bg-[#071126]/30 rounded-xl p-4 border border-gray-800/30">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold block mb-1">Davlat raqami</span>
                <p className="text-white font-bold text-lg tracking-wider bg-gradient-to-r from-yellow-400/20 to-yellow-600/10 border border-yellow-500/20 px-3 py-1 rounded-lg inline-block font-mono">
                  {booking.plate}
                </p>
              </div>

              <div className={`bg-gradient-to-br rounded-xl p-4 border ${fuelColors[booking.fuel] || 'from-gray-500/20 to-gray-600/10 border-gray-500/30 text-gray-400'}`}>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold block mb-1">Yoqilg'i</span>
                <p className="font-bold text-lg flex items-center gap-2">
                  <span>{fuelEmojis[booking.fuel] || '⛽'}</span>
                  {booking.fuel}
                </p>
              </div>

              <div className="bg-[#071126]/30 rounded-xl p-4 border border-gray-800/30">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold block mb-1">Kolonka</span>
                <p className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-sm text-emerald-400 font-bold">
                    {booking.kolonka}
                  </span>
                  <span className="text-sm text-emerald-400 font-medium">Tez</span>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-5 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold block mb-1">Yetib kelish vaqti</span>
                  <p className="text-2xl font-bold text-white">{booking.time}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold block mb-1">Taxminiy navbat</span>
                  <p className="text-lg font-bold text-emerald-400">{estimatedTimeStr}</p>
                  <p className="text-xs text-gray-500 mt-0.5">~{waitMinutes} min kutish</p>
                </div>
              </div>
              <div className="mt-4 w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full animate-pulse" style={{ width: `${Math.min(100, waitMinutes * 7)}%` }}></div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleConfirm}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-4 rounded-xl text-base transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Navbatni tasdiqlash
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 font-semibold py-3.5 rounded-xl text-sm transition-all border border-gray-700/50 hover:border-gray-600/50"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-[#0b1b3d]/60 hover:bg-[#0b1b3d] text-blue-400 font-semibold py-3.5 rounded-xl text-sm transition-all border border-blue-500/20 hover:border-blue-500/30"
                >
                  O'zgartirish
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Navbatni tasdiqlash orqali siz xizmat ko'rsatish qoidalariga rozilik bildirasiz
        </p>
      </div>
    </div>
  );
};

export default NavbatTasdiqlash;
