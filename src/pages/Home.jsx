import { useState, useMemo } from 'react';
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
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Home Page</h1>
      <p className="text-gray-600 mt-2">Bosh sahifa — UI ni shu yerga yozing</p>
    </div>
  )
}

export default Home
