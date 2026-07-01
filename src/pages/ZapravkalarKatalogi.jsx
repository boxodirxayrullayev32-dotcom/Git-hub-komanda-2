import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

function MapController({ center }) {
  const map = useMap();
  useEffect(() => { map.flyTo(center, 9); }, [center, map]);
  return null;
}

const ZapravkalarKatalogi = () => {
  const [activeTab, setActiveTab] = useState('Zapravkalar');
  const [selectedRegion, setSelectedRegion] = useState("Toshkent sh.");
  const [selectedFuel, setSelectedFuel] = useState("Barcha yonilg'i"); // Стейт для топлива
  const [mapCenter, setMapCenter] = useState(regionCenters["Toshkent sh."]);

  const filtered = useMemo(() => {
    return stationsData.filter(s => {
      const matchRegion = s.region === selectedRegion;
      const matchFuel = selectedFuel === "Barcha yonilg'i" || s.fuel === selectedFuel;
      return matchRegion && matchFuel;
    });
  }, [selectedRegion, selectedFuel]);

  return (
    <div className="flex h-screen bg-[#0b1120] text-white overflow-hidden">
      <aside className="w-64 border-r border-gray-700 p-6 flex flex-col justify-between">
        <h1 className="text-xl font-bold text-blue-400 mb-10">Gaz Navbat Tizimi</h1>
        <nav className="space-y-4">
          {['Zapravkalar', 'Mening navbatim', 'Narxlar', 'Aloqa'].map(tab => (
            <div key={tab} onClick={() => setActiveTab(tab)} 
                 className={`cursor-pointer p-2 rounded ${activeTab === tab ? 'bg-green-600/20 text-green-400' : 'text-gray-400 hover:bg-gray-800'}`}>
              {tab}
            </div>
          ))}
        </nav>
        <button className="bg-blue-600 w-full py-3 rounded-lg font-bold hover:bg-blue-500 transition">+ Navbat olish</button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">{activeTab}</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <select className="bg-[#1a2233] p-3 rounded border border-gray-600 outline-none" value={selectedRegion} onChange={(e) => { setSelectedRegion(e.target.value); setMapCenter(regionCenters[e.target.value]); }}>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          
          <select className="bg-[#1a2233] p-3 rounded border border-gray-600 outline-none" value={selectedFuel} onChange={(e) => setSelectedFuel(e.target.value)}>
            <option>Barcha yonilg'i</option>
            {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          
          <button className="bg-[#1a2233] py-2 rounded border border-gray-600 hover:bg-gray-700">Saralash</button>
          <button className="bg-[#1a2233] py-2 rounded border border-gray-600 hover:bg-gray-700">Filtrlar</button>
        </div>

        <div className="space-y-4">
          {filtered.map(s => (
            <div key={s.id} onClick={() => setMapCenter([s.lat, s.lng])}
                 className="bg-[#1a2233] p-4 rounded-xl border border-gray-700 cursor-pointer hover:border-blue-500 transition">
              <div className="flex justify-between font-bold">
                {s.name} <span className={s.status === 'Ochiq' ? 'text-green-400' : 'text-red-400'}>{s.status}</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">📍 {s.address}</p>
              <p className="text-blue-400 text-xs font-semibold">⛽ {s.fuel}</p>
            </div>
          ))}
        </div>
      </main>

      <section className="w-1/3 border-l border-gray-700">
        <MapContainer center={mapCenter} zoom={9} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapController center={mapCenter} />
          {filtered.map(s => (
            <Marker key={s.id} position={[s.lat, s.lng]}>
              <Popup><b>{s.name}</b><br/>{s.fuel}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>
    </div>
  );
};

export default ZapravkalarKatalogi;