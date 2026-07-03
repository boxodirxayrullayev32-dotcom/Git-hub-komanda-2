import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const regionCenters = {
  "Toshkent sh.": [41.2995, 69.2401],
  "Toshkent vil.": [41.2000, 69.5000],
  "Samarqand": [39.6542, 66.9750],
  "Buxoro": [39.7747, 64.4286],
  "Farg'ona": [40.3844, 71.7848],
  "Andijon": [40.7821, 72.3442],
  "Namangan": [41.0000, 71.6732],
  "Navoiy": [40.0844, 65.3792],
  "Jizzax": [40.1158, 67.8422],
  "Sirdaryo": [40.4900, 68.8000],
  "Qashqadaryo": [38.8500, 65.8000],
  "Surxondaryo": [37.9400, 67.5800],
  "Xorazm": [41.3800, 60.5000],
  "Qoraqalpog'iston": [43.6000, 59.0000]
};

const regions = Object.keys(regionCenters);
const fuelTypes = ["Metan", "Propan", "Benzin"];

const generateStations = () => {
  let list = [];
  regions.forEach((region) => {
    const [baseLat, baseLng] = regionCenters[region];
    for (let i = 1; i <= 9; i++) {
      list.push({
        id: `${region}-${i}`,
        name: `${region} Gas №${i}`,
        address: `${region}, ул. Центральная ${i}`,
        status: Math.random() > 0.3 ? "Ochiq" : "Yopiq",
        fuel: fuelTypes[Math.floor(Math.random() * fuelTypes.length)], 
        lat: baseLat + (Math.random() - 0.5) * 0.2,
        lng: baseLng + (Math.random() - 0.5) * 0.2,
        region: region
      });
    }
  });
  return list;
};

const stationsData = generateStations();

const ZapravkalarKatalogi = () => {
  const [activeTab, setActiveTab] = useState('Zapravkalar');
  const [selectedRegion, setSelectedRegion] = useState("Toshkent sh.");
  const [selectedFuel, setSelectedFuel] = useState("Barcha yonilg'i"); // Стейт для топлива
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return stationsData.filter(s => {
      const matchRegion = s.region === selectedRegion;
      const matchFuel = selectedFuel === "Barcha yonilg'i" || s.fuel === selectedFuel;
      return matchRegion && matchFuel;
    });
  }, [selectedRegion, selectedFuel]);

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Zapravkalar katalogi</h2>
          <button onClick={() => navigate('/navbat-olish')} className="bg-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-500 transition">+ Navbat olish</button>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <select className="bg-[#1a2233] p-3 rounded-lg border border-gray-600 outline-none min-w-[200px]" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          
          <select className="bg-[#1a2233] p-3 rounded-lg border border-gray-600 outline-none min-w-[200px]" value={selectedFuel} onChange={(e) => setSelectedFuel(e.target.value)}>
            <option>Barcha yonilg'i</option>
            {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          
          <span className="text-gray-400 self-center ml-auto">{filtered.length} ta zapravka topildi</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(s => (
            <div key={s.id}
                 className="bg-[#1a2233] p-5 rounded-xl border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg group-hover:text-blue-400 transition">{s.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${s.status === 'Ochiq' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{s.status}</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">📍 {s.address}</p>
              <div className="flex items-center gap-2">
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">⛽ {s.fuel}</span>
                <span className="text-gray-500 text-xs">{s.region}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-xl">Hech qanday zapravka topilmadi</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZapravkalarKatalogi;