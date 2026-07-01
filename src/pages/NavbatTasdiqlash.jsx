import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavbatTasdiqlash = () => {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    model: 'Gentra',
    number: '01 A 777 AA',
    fuel: 'Metan (CNG)'
  });

  return (
    <div className="flex h-screen bg-[#0b1120] text-white font-sans">
      <aside className="w-64 border-r border-[#1e293b] p-6 flex flex-col justify-between bg-[#0b1120]">
        <div>
          <h1 className="text-xl font-bold mb-10 text-white">Gaz Navbat <span className="block text-xs text-gray-500 font-normal">Elektron navbat tizimi</span></h1>
          <nav className="space-y-2">
            {['Bosh sahifa', 'Zapravkalar', 'Mening navbatim', 'Narxlar', 'Aloqa'].map((item) => (
              <div key={item} className={`p-3 rounded-lg cursor-pointer ${item === 'Mening navbatim' ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'text-gray-400 hover:bg-[#1e293b]'}`}>
                {item}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-12 flex items-center justify-center overflow-y-auto">
        {!isConfirmed ? (
          <div className="bg-[#111827] p-10 rounded-3xl border border-[#1e293b] w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Navbatga yozilish</h2>
            <div className="space-y-5">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Avtomobil modeli</label>
                <select className="w-full p-4 bg-[#0b1120] rounded-xl border border-[#1e293b] outline-none focus:border-[#22c55e]"
                        value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})}>
                  <option>Gentra</option><option>Cobalt</option><option>Lacetti</option><option>Tracker</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Davlat raqami</label>
                <input className="w-full p-4 bg-[#0b1120] rounded-xl border border-[#1e293b] uppercase outline-none focus:border-[#22c55e]"
                       placeholder="01 A 777 AA" value={formData.number} onChange={(e) => setFormData({...formData, number: e.target.value})} />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Yoqilg'i turi</label>
                <select className="w-full p-4 bg-[#0b1120] rounded-xl border border-[#1e293b] outline-none focus:border-[#22c55e]"
                        value={formData.fuel} onChange={(e) => setFormData({...formData, fuel: e.target.value})}>
                  <option>Metan (CNG)</option><option>Propan (LPG)</option><option>Benzin</option>
                </select>
              </div>
              <button onClick={() => setIsConfirmed(true)} className="w-full py-4 bg-[#22c55e] hover:bg-[#1ea64d] rounded-xl font-bold text-lg transition shadow-lg">
                Navbatni tasdiqlash
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl animate-in fade-in duration-500">
            <div className="text-center mb-10">
              <div className="bg-[#22c55e]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-[#22c55e] text-3xl">✔</span></div>
              <h2 className="text-4xl font-bold mb-2">Navbat Tasdiqlandi!</h2>
              <p className="text-gray-400">Sizning navbatingiz muvaffaqiyatli band qilindi.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#111827] p-8 rounded-2xl border border-[#1e293b]">
                <div className="flex justify-between mb-8 text-sm text-gray-400">
                  <div>ID KVITANSIYA<br/><span className="text-white font-bold text-lg">#GN-7772026</span></div>
                  <div className="text-right">SANA<br/><span className="text-white font-bold text-lg">14.05.2026</span></div>
                </div>
                <div className="bg-white p-6 rounded-xl mx-auto w-64 h-64 mb-6 flex items-center justify-center">
                    <img src="https://fragrant.mobiletransaction.org/wp-content/uploads/2019/09/qr-code-for-wikipedia.png.webp" alt="QR Code" />
                </div>
                <div className="bg-[#0b1120] p-4 rounded-xl flex justify-between items-center border border-[#1e293b]">
                  <span className="text-gray-400">Taxminiy vaqt <b className="block text-white text-lg">15:45</b></span>
                  <span className="text-[#22c55e] text-sm text-right">Kutilmoqda<br/>~18 min 41 sek</span>
                </div>
              </div>

              <div className="bg-[#111827] p-8 rounded-2xl border border-[#1e293b]">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">ⓘ Tafsilotlar</h3>
                <div className="space-y-6">
                  <div className="flex justify-between"><span>Avtomobil</span> <span className="font-bold">{formData.model}</span></div>
                  <div className="flex justify-between"><span>Davlat raqami</span> <span className="bg-white text-black px-3 py-1 rounded font-bold">{formData.number}</span></div>
                  <div className="flex justify-between"><span>Yoqilg'i quyiish joyi</span> <span className="bg-[#22c55e]/20 text-[#22c55e] px-2 rounded">Bay 3 OCHIQ</span></div>
                  <div className="flex justify-between pb-6 border-b border-[#1e293b]"><span>Yoqilg'i turi</span> <span className="font-bold">{formData.fuel}</span></div>
                </div>
                <div className="mt-8 space-y-3">
                  <button onClick={() => setIsConfirmed(false)} className="w-full py-3 bg-[#1e293b] rounded-lg font-bold">✎ O'zgartirish</button>
                  <button onClick={() => navigate('/')} className="w-full py-3 border border-red-900/50 text-red-400 rounded-lg">Bekor qilish</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NavbatTasdiqlash;