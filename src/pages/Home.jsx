import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Search, MapPin, Globe, Share2, X } from 'lucide-react';

// ============================================================
// O'ZBEKISTON BO'YLAB 100+ METAN VA BENZIN SHOXOBCHALARI
// ============================================================
const stationsData = [
  // ═══ TOSHKENT SHAHRI (10 ta) ═══
  { id: 1,  name: 'UNIGAZ Metan (Chilonzor)',   type: 'Metan',  address: "Toshkent sh., Chilonzor t., Bunyodkor ko'chasi",     coordinates: [41.2858, 69.2195], viloyat: 'Toshkent shahri' },
  { id: 2,  name: 'MUSTANG (Mirobod)',           type: 'Benzin', address: "Toshkent sh., Mirobod t., Farg'ona yo'li",            coordinates: [41.2845, 69.2925], viloyat: 'Toshkent shahri' },
  { id: 3,  name: 'JEYRON Gaz (Sergeli)',        type: 'Metan',  address: 'Toshkent sh., Sergeli t., Yangi Sergeli',             coordinates: [41.2312, 69.2141], viloyat: 'Toshkent shahri' },
  { id: 4,  name: 'POYTAXT Gaz (Yashnobod)',     type: 'Metan',  address: "Toshkent sh., Yashnobod t., Amir Temur ko'chasi",     coordinates: [41.2987, 69.3124], viloyat: 'Toshkent shahri' },
  { id: 5,  name: 'LUKOIL (Yunusobod)',          type: 'Benzin', address: "Toshkent sh., Yunusobod t., Ahmad Donish ko'chasi",   coordinates: [41.3642, 69.2882], viloyat: 'Toshkent shahri' },
  { id: 6,  name: 'NEFT GAZ (Olmazor)',          type: 'Metan',  address: "Toshkent sh., Olmazor t., Zulfiyaxonim ko'chasi",    coordinates: [41.3124, 69.2156], viloyat: 'Toshkent shahri' },
  { id: 7,  name: 'BENZIN PRO (Shayxontohur)',   type: 'Benzin', address: "Toshkent sh., Shayxontohur t., Navoiy ko'chasi",      coordinates: [41.3152, 69.2358], viloyat: 'Toshkent shahri' },
  { id: 8,  name: 'METAN PLUS (Yakkasaroy)',     type: 'Metan',  address: "Toshkent sh., Yakkasaroy t., Shota Rustaveli ko'chasi", coordinates: [41.2742, 69.2524], viloyat: 'Toshkent shahri' },
  { id: 9,  name: 'UZBEKNEFT (Uchtepa)',         type: 'Benzin', address: "Toshkent sh., Uchtepa t., G'afur G'ulom ko'chasi",   coordinates: [41.2851, 69.1856], viloyat: 'Toshkent shahri' },
  { id: 10, name: 'GLOBAL GAZ (Bektemir)',       type: 'Metan',  address: "Toshkent sh., Bektemir t., Farobiy ko'chasi",         coordinates: [41.2524, 69.3452], viloyat: 'Toshkent shahri' },

  // ═══ TOSHKENT VILOYATI (8 ta) ═══
  { id: 11, name: 'GAZPROM (Olmaliq)',           type: 'Metan',  address: "Toshkent vil., Olmaliq sh., Do'stlik ko'chasi",      coordinates: [40.8512, 69.5954], viloyat: 'Toshkent viloyati' },
  { id: 12, name: 'NEFT PRO (Chirchiq)',         type: 'Benzin', address: 'Toshkent vil., Chirchiq sh., Toshkent ko\'chasi',   coordinates: [41.4682, 69.5841], viloyat: 'Toshkent viloyati' },
  { id: 13, name: 'UZTRANS GAZ (Angren)',        type: 'Metan',  address: 'Toshkent vil., Angren sh., Navoiy ko\'chasi',       coordinates: [41.0012, 70.1456], viloyat: 'Toshkent viloyati' },
  { id: 14, name: 'BENZIN MARKAZI (Bekobod)',    type: 'Benzin', address: "Toshkent vil., Bekobod sh., Mustaqillik ko'chasi",   coordinates: [40.2214, 69.2254], viloyat: 'Toshkent viloyati' },
  { id: 15, name: 'METAN SERVIS (Nurafshon)',    type: 'Metan',  address: "Toshkent vil., Nurafshon sh., Markaziy ko'cha",       coordinates: [40.9885, 69.3512], viloyat: 'Toshkent viloyati' },
  { id: 16, name: 'OHANGARON NEFT (Ohangaron)',  type: 'Benzin', address: 'Toshkent vil., Ohangaron sh., Ko\'kcha ko\'chasi',  coordinates: [40.9085, 69.6415], viloyat: 'Toshkent viloyati' },
  { id: 17, name: 'PARKENT GAZ (Parkent)',       type: 'Metan',  address: "Toshkent vil., Parkent t., Bog' ko'chasi",           coordinates: [41.2945, 69.6752], viloyat: 'Toshkent viloyati' },
  { id: 18, name: "BO'STON NEFT (Bo'stonliq)",   type: 'Benzin', address: "Toshkent vil., Bo'stonliq t., Gazalkent",             coordinates: [41.5685, 69.7712], viloyat: 'Toshkent viloyati' },

  // ═══ SAMARQAND (7 ta) ═══
  { id: 19, name: 'SAM GAZ (Samarqand)',         type: 'Metan',  address: "Samarqand sh., Registon ko'chasi",                    coordinates: [39.6542, 66.9598], viloyat: 'Samarqand' },
  { id: 20, name: 'LUKOIL (Samarqand)',          type: 'Benzin', address: "Samarqand sh., Buyuk Turon ko'chasi",                coordinates: [39.6272, 66.9745], viloyat: 'Samarqand' },
  { id: 21, name: 'METAN SERVIS (Samarqand)',    type: 'Metan',  address: "Samarqand sh., Mirzo Ulug'bek ko'chasi",            coordinates: [39.6412, 66.9412], viloyat: 'Samarqand' },
  { id: 22, name: 'KATTAQO\'RG\'ON NEFT',        type: 'Benzin', address: "Samarqand vil., Kattaqo'rg'on sh.",                  coordinates: [39.9012, 66.2541], viloyat: 'Samarqand' },
  { id: 23, name: 'URGUT GAZ (Urgut)',           type: 'Metan',  address: "Samarqand vil., Urgut sh., Ipak yo'li ko'chasi",     coordinates: [39.4012, 67.2514], viloyat: 'Samarqand' },
  { id: 24, name: 'ISHTIXON NEFT (Ishtixon)',    type: 'Benzin', address: "Samarqand vil., Ishtixon t., Markaziy ko'cha",        coordinates: [39.9712, 66.4812], viloyat: 'Samarqand' },
  { id: 25, name: 'AKTOSH GAZ (Oqtosh)',         type: 'Metan',  address: "Samarqand vil., Oqtosh sh.",                         coordinates: [39.9145, 66.3524], viloyat: 'Samarqand' },

  // ═══ BUXORO (6 ta) ═══
  { id: 26, name: 'BUXORO NEFT (Buxoro)',        type: 'Metan',  address: "Buxoro sh., M. Iqbol ko'chasi",                      coordinates: [39.7742, 64.4226], viloyat: 'Buxoro' },
  { id: 27, name: 'BUX GAZ (Kogon)',             type: 'Benzin', address: "Buxoro vil., Kogon sh., Markaziy ko'cha",             coordinates: [39.7228, 64.5486], viloyat: 'Buxoro' },
  { id: 28, name: 'QORAKO\'L NEFT (Qorako\'l)',  type: 'Metan',  address: "Buxoro vil., Qorako'l sh.",                          coordinates: [39.5024, 63.8512], viloyat: 'Buxoro' },
  { id: 29, name: 'GIJDUVON GAZ (Gijduvon)',     type: 'Metan',  address: "Buxoro vil., Gijduvon sh.",                          coordinates: [40.1012, 64.6812], viloyat: 'Buxoro' },
  { id: 30, name: 'VOLID NEFT (Vobkent)',        type: 'Benzin', address: "Buxoro vil., Vobkent t.",                            coordinates: [40.0214, 64.5214], viloyat: 'Buxoro' },
  { id: 31, name: 'ROMITAN GAZ (Romitan)',       type: 'Metan',  address: "Buxoro vil., Romitan t.",                             coordinates: [39.9314, 64.3814], viloyat: 'Buxoro' },

  // ═══ FARG'ONA (8 ta) ═══
  { id: 32, name: "FARG'ONA NEFT (Farg'ona)",    type: 'Metan',  address: "Farg'ona sh., Navoiy ko'chasi",                      coordinates: [40.3842, 71.7845], viloyat: "Farg'ona" },
  { id: 33, name: "FARG'ONA GAZ (Qo'qon)",       type: 'Benzin', address: "Farg'ona vil., Qo'qon sh., Istiqlol ko'chasi",       coordinates: [40.5287, 70.9425], viloyat: "Farg'ona" },
  { id: 34, name: "MARG'ILON METAN (Marg'ilon)", type: 'Metan',  address: "Farg'ona vil., Marg'ilon sh.",                       coordinates: [40.4712, 71.7214], viloyat: "Farg'ona" },
  { id: 35, name: "RISHTON NEFT (Rishton)",      type: 'Benzin', address: "Farg'ona vil., Rishton t.",                          coordinates: [40.3612, 71.2814], viloyat: "Farg'ona" },
  { id: 36, name: "QUVASOY GAZ (Quvasoy)",       type: 'Metan',  address: "Farg'ona vil., Quvasoy sh.",                         coordinates: [40.3012, 71.8914], viloyat: "Farg'ona" },
  { id: 37, name: "BESHARIQ NEFT (Beshariq)",    type: 'Benzin', address: "Farg'ona vil., Beshariq t.",                         coordinates: [40.4412, 70.6114], viloyat: "Farg'ona" },
  { id: 38, name: "SOX METAN (Sox)",             type: 'Metan',  address: "Farg'ona vil., Sox t.",                               coordinates: [39.9612, 71.1314], viloyat: "Farg'ona" },
  { id: 39, name: "O'ZBEKISTON NEFT (Farg'ona)", type: 'Benzin', address: "Farg'ona sh., Mustaqillik ko'chasi",                 coordinates: [40.3912, 71.7714], viloyat: "Farg'ona" },

  // ═══ ANDIJON (6 ta) ═══
  { id: 40, name: 'AND GAZ (Andijon)',           type: 'Metan',  address: "Andijon sh., Bobur ko'chasi",                         coordinates: [40.7832, 72.3478], viloyat: 'Andijon' },
  { id: 41, name: 'AND NEKT (Xonobod)',          type: 'Benzin', address: "Andijon vil., Xonobod sh., Mustaqillik ko'chasi",    coordinates: [40.8112, 72.9785], viloyat: 'Andijon' },
  { id: 42, name: "ASAKA METAN (Asaka)",         type: 'Metan',  address: "Andijon vil., Asaka sh.",                             coordinates: [40.6412, 72.2414], viloyat: 'Andijon' },
  { id: 43, name: "SHAHRICON NEFT (Shahrixon)",  type: 'Benzin', address: "Andijon vil., Shahrixon sh.",                        coordinates: [40.7212, 72.0514], viloyat: 'Andijon' },
  { id: 44, name: "JALOQUDUQ GAZ (Jalolquduq)",  type: 'Metan',  address: "Andijon vil., Jalolquduq t.",                        coordinates: [40.6912, 72.6114], viloyat: 'Andijon' },
  { id: 45, name: "BO'Z NEFT (Bo'z)",            type: 'Benzin', address: "Andijon vil., Bo'z t.",                               coordinates: [40.6912, 71.9214], viloyat: 'Andijon' },

  // ═══ NAMANGAN (6 ta) ═══
  { id: 46, name: 'NAM GAZ (Namangan)',          type: 'Metan',  address: "Namangan sh., Kosonsoy ko'chasi",                     coordinates: [41.0012, 71.6725], viloyat: 'Namangan' },
  { id: 47, name: 'NAM PRO (Chortoq)',           type: 'Benzin', address: 'Namangan vil., Chortoq t., Markaz',                   coordinates: [41.0772, 71.8225], viloyat: 'Namangan' },
  { id: 48, name: "MINGBULOQ METAN (Mingbuloq)", type: 'Metan',  address: "Namangan vil., Mingbuloq t.",                        coordinates: [40.9812, 71.5514], viloyat: 'Namangan' },
  { id: 49, name: "KOSONSOY NEFT (Kosonsoy)",    type: 'Benzin', address: "Namangan vil., Kosonsoy sh.",                        coordinates: [41.2514, 71.5514], viloyat: 'Namangan' },
  { id: 50, name: "TO'RAQO'RG'ON GAZ",           type: 'Metan',  address: "Namangan vil., To'raqo'rg'on t.",                    coordinates: [40.9912, 71.4814], viloyat: 'Namangan' },
  { id: 51, name: "CHUST NEFT (Chust)",          type: 'Benzin', address: "Namangan vil., Chust sh.",                            coordinates: [41.0012, 71.2414], viloyat: 'Namangan' },

  // ═══ QASHQADARYO (6 ta) ═══
  { id: 52, name: 'QARSHI GAZ (Qarshi)',         type: 'Metan',  address: "Qarshi sh., Nasaf ko'chasi",                          coordinates: [38.8612, 65.7915], viloyat: 'Qashqadaryo' },
  { id: 53, name: 'QASH NEFT (Shahrisabz)',      type: 'Benzin', address: "Shahrisabz sh., Amir Temur ko'chasi",                coordinates: [39.0572, 66.8345], viloyat: 'Qashqadaryo' },
  { id: 54, name: "KITOB METAN (Kitob)",         type: 'Metan',  address: "Qashqadaryo vil., Kitob sh.",                         coordinates: [39.1212, 66.8814], viloyat: 'Qashqadaryo' },
  { id: 55, name: "YAKKABOG' NEFT (Yakkabog')",  type: 'Benzin', address: "Qashqadaryo vil., Yakkabog' t.",                     coordinates: [38.9712, 66.6814], viloyat: 'Qashqadaryo' },
  { id: 56, name: "G'UZOR GAZ (G'uzor)",         type: 'Metan',  address: "Qashqadaryo vil., G'uzor sh.",                       coordinates: [38.6212, 65.7914], viloyat: 'Qashqadaryo' },
  { id: 57, name: "NISHON NEFT (Nishon)",        type: 'Benzin', address: "Qashqadaryo vil., Nishon t.",                        coordinates: [38.7112, 65.6814], viloyat: 'Qashqadaryo' },

  // ═══ SURXONDARYO (5 ta) ═══
  { id: 58, name: 'TERMIZ GAZ (Termiz)',         type: 'Metan',  address: "Termiz sh., Alisher Navoiy ko'chasi",                 coordinates: [37.2242, 67.2865], viloyat: 'Surxondaryo' },
  { id: 59, name: 'SURXON NEFT (Denov)',         type: 'Benzin', address: "Surxondaryo vil., Denov sh., Bog'ko'l ko'chasi",    coordinates: [38.2682, 67.8935], viloyat: 'Surxondaryo' },
  { id: 60, name: "BOYSUN METAN (Boysun)",       type: 'Metan',  address: "Surxondaryo vil., Boysun t.",                        coordinates: [38.2112, 67.2014], viloyat: 'Surxondaryo' },
  { id: 61, name: "SHEROBOD NEFT (Sherobod)",    type: 'Benzin', address: "Surxondaryo vil., Sherobod t.",                     coordinates: [37.6712, 67.0414], viloyat: 'Surxondaryo' },
  { id: 62, name: "JARQO'RG'ON GAZ",             type: 'Metan',  address: "Surxondaryo vil., Jarqo'rg'on t.",                   coordinates: [37.5212, 67.4214], viloyat: 'Surxondaryo' },

  // ═══ NAVOIY (5 ta) ═══
  { id: 63, name: 'NAVOIY NEFT (Navoiy)',        type: 'Metan',  address: "Navoiy sh., Zarafshon ko'chasi",                     coordinates: [40.0892, 65.3785], viloyat: 'Navoiy' },
  { id: 64, name: 'ZARAFSHON GAZ (Zarafshon)',   type: 'Benzin', address: "Navoiy vil., Zarafshon sh., Konchilar ko'chasi",    coordinates: [41.5922, 64.2015], viloyat: 'Navoiy' },
  { id: 65, name: "NURATA NEFT (Nurata)",        type: 'Metan',  address: "Navoiy vil., Nurata t.",                              coordinates: [40.5912, 65.6914], viloyat: 'Navoiy' },
  { id: 66, name: "QIZILTEPA GAZ (Qiziltepa)",   type: 'Benzin', address: "Navoiy vil., Qiziltepa t.",                          coordinates: [40.0312, 64.8514], viloyat: 'Navoiy' },
  { id: 67, name: "TOMDI METAN (Tomdi)",         type: 'Metan',  address: "Navoiy vil., Tomdi t.",                               coordinates: [41.7512, 64.6114], viloyat: 'Navoiy' },

  // ═══ JIZZAX (4 ta) ═══
  { id: 68, name: 'JIZZAX GAZ (Jizzax)',         type: 'Metan',  address: "Jizzax sh., Sharof Rashidov ko'chasi",                coordinates: [40.1122, 67.8405], viloyat: 'Jizzax' },
  { id: 69, name: "DO'STLIK NEFT (Do'stlik)",    type: 'Benzin', address: "Jizzax vil., Do'stlik t.",                           coordinates: [40.5212, 67.8414], viloyat: 'Jizzax' },
  { id: 70, name: "ZOMIN METAN (Zomin)",         type: 'Metan',  address: "Jizzax vil., Zomin t.",                               coordinates: [39.9712, 68.3914], viloyat: 'Jizzax' },
  { id: 71, name: "BAXMAL NEFT (Baxmal)",        type: 'Benzin', address: "Jizzax vil., Baxmal t.",                             coordinates: [39.7512, 67.6314], viloyat: 'Jizzax' },

  // ═══ SIRDARYO (4 ta) ═══
  { id: 72, name: 'GULISTON NEFT (Guliston)',    type: 'Metan',  address: "Guliston sh., Mustaqillik ko'chasi",                  coordinates: [40.4892, 68.7845], viloyat: 'Sirdaryo' },
  { id: 73, name: "YANGIYER GAZ (Yangiyer)",     type: 'Benzin', address: "Sirdaryo vil., Yangiyer sh.",                         coordinates: [40.2712, 68.8214], viloyat: 'Sirdaryo' },
  { id: 74, name: "BOYOVUT METAN (Boyovut)",     type: 'Metan',  address: "Sirdaryo vil., Boyovut t.",                           coordinates: [40.3012, 68.9314], viloyat: 'Sirdaryo' },
  { id: 75, name: "SAYD NEFT (Sayd)",            type: 'Benzin', address: "Sirdaryo vil., Sayd t.",                              coordinates: [40.4112, 68.6514], viloyat: 'Sirdaryo' },

  // ═══ XORAZM (5 ta) ═══
  { id: 76, name: 'URGANCH GAZ (Urganch)',       type: 'Metan',  address: "Urganch sh., Al-Xorazmiy ko'chasi",                   coordinates: [41.5512, 60.6325], viloyat: 'Xorazm' },
  { id: 77, name: 'XIVA NEFT (Xiva)',            type: 'Benzin', address: "Xorazm vil., Xiva sh., Ichan-Qal'a ko'chasi",        coordinates: [41.3787, 60.3605], viloyat: 'Xorazm' },
  { id: 78, name: "BOG'OT GAZ (Bog'ot)",         type: 'Metan',  address: "Xorazm vil., Bog'ot t.",                              coordinates: [41.3512, 60.8214], viloyat: 'Xorazm' },
  { id: 79, name: "SHOVOT NEFT (Shovot)",        type: 'Benzin', address: "Xorazm vil., Shovot t.",                              coordinates: [41.6612, 60.3014], viloyat: 'Xorazm' },
  { id: 80, name: "YANGIARIQ GAZ (Yangibozor)",  type: 'Metan',  address: "Xorazm vil., Yangibozor t.",                         coordinates: [41.4812, 60.5514], viloyat: 'Xorazm' },

  // ═══ QORAQALPOG'ISTON (5 ta) ═══
  { id: 81, name: 'NUKUS GAZ (Nukus)',           type: 'Metan',  address: "Nukus sh., Qaraqalpaqstan ko'chasi",                  coordinates: [42.4642, 59.6125], viloyat: "Qoraqalpog'iston" },
  { id: 82, name: "TAXIATASH NEFT (Taxiatosh)",  type: 'Benzin', address: "Qoraqalpog'iston, Taxiatosh sh., Markaziy ko'cha",    coordinates: [42.3342, 59.5725], viloyat: "Qoraqalpog'iston" },
  { id: 83, name: "CHIMBOY METAN (Chimboy)",     type: 'Metan',  address: "Qoraqalpog'iston, Chimboy t.",                        coordinates: [42.9312, 59.7814], viloyat: "Qoraqalpog'iston" },
  { id: 84, name: "MO'YNOQ NEFT (Mo'ynoq)",     type: 'Benzin', address: "Qoraqalpog'iston, Mo'ynoq t.",                        coordinates: [43.7712, 59.0314], viloyat: "Qoraqalpog'iston" },
  { id: 85, name: "QO'NG'IRAT GAZ (Qo'ng'irot)",type: 'Metan',  address: "Qoraqalpog'iston, Qo'ng'irot t.",                     coordinates: [43.0512, 58.8514], viloyat: "Qoraqalpog'iston" },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [selectedStation, setSelectedStation] = useState(null);
  const [mapCenter, setMapCenter] = useState([41.0, 65.5]);
  const [mapZoom, setMapZoom] = useState(6.5);

  const filteredStations = useMemo(() => {
    let result = stationsData;
    if (selectedFuel !== 'all') {
      result = result.filter(s => s.type === selectedFuel);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().replace(/'/g, '').replace(/['']/g, '');
      result = result.filter(s =>
        s.name.toLowerCase().replace(/'/g, '').includes(q) ||
        s.address.toLowerCase().replace(/'/g, '').includes(q) ||
        s.viloyat.toLowerCase().replace(/'/g, '').includes(q)
      );
    }
    return result;
  }, [selectedFuel, searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() && filteredStations.length > 0) {
      setMapCenter(filteredStations[0].coordinates);
      setMapZoom(9);
    } else if (!searchQuery.trim() && selectedFuel === 'all') {
      setMapCenter([41.0, 65.5]);
      setMapZoom(6.5);
    }
  }, [searchQuery]);

  const getMarkerOptions = (type) => ({
    preset: type === 'Metan' ? 'islands#greenCircleIcon' : 'islands#orangeCircleIcon',
    iconImageSize: [36, 36],
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedStation(null);
  };

  const clearSearch = (resetMap) => {
    setSearchQuery('');
    setSelectedStation(null);
    if (resetMap) {
      setMapCenter([41.0, 65.5]);
      setMapZoom(6.5);
    }
  };

  const getViloyatSuggestion = (query) => {
    const q = query.toLowerCase().replace(/'/g, '');
    const viloyatlar = [...new Set(stationsData.map(s => s.viloyat))];
    return viloyatlar.filter(v => v.toLowerCase().replace(/'/g, '').includes(q)).slice(0, 5);
  };

  const suggestions = searchQuery.trim() ? getViloyatSuggestion(searchQuery) : [];

  const statsByViloyat = useMemo(() => {
    const stats = {};
    stationsData.forEach(s => {
      if (!stats[s.viloyat]) stats[s.viloyat] = { jami: 0, Metan: 0, Benzin: 0 };
      stats[s.viloyat].jami++;
      stats[s.viloyat][s.type]++;
    });
    return stats;
  }, []);

  return (
    <div className="min-h-screen bg-[#071126] text-white font-sans">

      {/* ===== HERO ===== */}
      <section className="max-w-7xl mx-auto pt-12 pb-5 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {stationsData.length} ta shoxobcha • 14 ta viloyat • Onlayn
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          O'zbekiston yoqilg'i xaritasi
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
          O'zbekistondagi barcha metan va benzin quyish shoxobchalari — {stationsData.length} ta
        </p>
      </section>

      {/* ===== FILTER TABS ===== */}
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => { setSelectedFuel('all'); clearSearch(true); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFuel === 'all' ? 'bg-gray-500/30 text-white border border-gray-500/40' : 'bg-gray-800/40 text-gray-400 hover:text-white border border-transparent'
            }`}>
            Barchasi ({stationsData.length})
          </button>
          <button onClick={() => { setSelectedFuel('Metan'); setSelectedStation(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedFuel === 'Metan' ? 'border text-emerald-300' : 'bg-gray-800/40 text-gray-400 hover:text-white border border-transparent'
            }`}
            style={{ backgroundColor: selectedFuel === 'Metan' ? 'rgba(16,185,129,0.15)' : undefined, borderColor: selectedFuel === 'Metan' ? 'rgba(16,185,129,0.4)' : undefined }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Metan ({stationsData.filter(s => s.type === 'Metan').length})
          </button>
          <button onClick={() => { setSelectedFuel('Benzin'); setSelectedStation(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedFuel === 'Benzin' ? 'border text-orange-300' : 'bg-gray-800/40 text-gray-400 hover:text-white border border-transparent'
            }`}
            style={{ backgroundColor: selectedFuel === 'Benzin' ? 'rgba(249,115,22,0.15)' : undefined, borderColor: selectedFuel === 'Benzin' ? 'rgba(249,115,22,0.4)' : undefined }}>
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            Benzin ({stationsData.filter(s => s.type === 'Benzin').length})
          </button>
        </div>
      </div>

      {/* ===== YANDEX MAP ===== */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="bg-gradient-to-b from-[#0f1f3d] to-[#0b1b3d]/60 border border-gray-800/70 rounded-3xl p-4 md:p-5 shadow-2xl shadow-black/30">

          {/* SEARCH */}
          <div className="relative mb-3">
            <div className="relative flex items-center bg-[#0a1628]/90 border border-gray-700/60 hover:border-gray-600/60 focus-within:border-emerald-500/50 rounded-xl transition-all">
              <Search className="absolute left-3.5 w-4 h-4 text-gray-500 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Viloyat yoki shahar nomini kiriting..."
                className="w-full bg-transparent pl-10 pr-20 py-3 text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <div className="flex items-center gap-1 pr-2">
                {searchQuery && (
                  <button onClick={() => clearSearch(false)}
                    className="text-gray-500 hover:text-white bg-gray-800/60 hover:bg-gray-700/60 px-2 py-1 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1">
                    <X className="w-3 h-3" /> Tozalash
                  </button>
                )}
                <span className="text-[10px] text-gray-500 bg-gray-800/60 px-2 py-1 rounded-lg whitespace-nowrap">
                  {filteredStations.length} ta
                </span>
              </div>
            </div>

            {/* Search suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#0a1628]/95 border border-gray-700/60 rounded-xl z-30 shadow-2xl overflow-hidden">
                {suggestions.map((v) => {
                  const st = statsByViloyat[v];
                  return (
                    <button key={v} onClick={() => { setSearchQuery(v); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors text-left border-b border-gray-800/40 last:border-0">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-white">{v}</span>
                        <span className="text-[10px] text-gray-500 ml-2">
                          {st.Metan} Metan • {st.Benzin} Benzin • {st.jami} ta
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Map header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white">O'zbekiston xaritasi</h2>
            </div>
            <div className="flex items-center gap-2.5 text-[10px]">
              <span className="flex items-center gap-1 text-emerald-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>Metan</span>
              <span className="flex items-center gap-1 text-orange-400"><span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>Benzin</span>
              <span className="w-px h-3 bg-gray-700"></span>
              <button onClick={() => { setMapCenter([41.0, 65.5]); setMapZoom(6.5); setSelectedStation(null); }}
                className="text-gray-400 hover:text-white bg-gray-800/60 px-2.5 py-1 rounded-lg transition-colors">
                Butun O'zbekiston
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="w-full rounded-2xl overflow-hidden border border-gray-700/50 relative" style={{ height: '540px' }}>
            <div className="absolute inset-0 bg-[#071126]/30 z-10 pointer-events-none"></div>
            <YMaps query={{ lang: 'ru_RU' }}>
              <Map
                state={{ center: mapCenter, zoom: mapZoom }}
                width="100%"
                height="100%"
                modules={['control.ZoomControl', 'control.FullscreenControl']}
                options={{ suppressMapOpenBlock: true }}
              >
                {filteredStations.map((station) => (
                  <Placemark
                    key={station.id}
                    geometry={station.coordinates}
                    properties={{ hintContent: `${station.name} — ${station.type}` }}
                    options={getMarkerOptions(station.type)}
                    onClick={() => setSelectedStation(station)}
                  />
                ))}
              </Map>
            </YMaps>

            {/* Station popup */}
            {selectedStation && (
              <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-[#071126]/95 border border-gray-700/70 p-4 rounded-xl z-20 shadow-2xl backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0"
                    style={{ backgroundColor: `${fuelColors[selectedStation.type]}20` }}>
                    <span style={{ color: fuelColors[selectedStation.type] }}>
                      {selectedStation.type === 'Metan' ? '\u{1F4A8}' : '\u26A1'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: `${fuelColors[selectedStation.type]}20`, color: fuelColors[selectedStation.type] }}>
                      {selectedStation.type}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{selectedStation.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-1">📍 {selectedStation.address}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">📍 {selectedStation.viloyat}</p>
                    <button onClick={() => navigate('/navbat-olish')}
                      className="mt-3 w-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 text-[10px] font-bold py-2 rounded-lg transition-all">
                        Navbat olish →
                    </button>
                  </div>
                  <button onClick={() => setSelectedStation(null)}
                    className="text-gray-500 hover:text-white text-xs shrink-0">✕</button>
                </div>
              </div>
            )}
          </div>

          {/* Map footer */}
          <div className="mt-3 flex items-center justify-between px-1">
            <div className="flex items-center gap-3 text-[10px] text-gray-500">
              <span>📍 {filteredStations.length} ta ko'rsatilmoqda</span>
              {(selectedFuel !== 'all' || searchQuery) && (
                <button onClick={() => { setSelectedFuel('all'); clearSearch(); }}
                  className="text-blue-400 hover:text-blue-300 underline">Filterni tozalash</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== VILOYATLAR STATISTIKASI ===== */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {Object.entries(statsByViloyat).map(([viloyat, stats]) => (
            <button key={viloyat} onClick={() => setSearchQuery(viloyat)}
              className="bg-[#0b1b3d]/30 border border-gray-800/60 hover:border-gray-600/60 rounded-xl p-3 text-center transition-all hover:bg-[#0b1b3d]/50 cursor-pointer">
              <div className="text-xs font-bold text-white truncate">{viloyat}</div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-[9px] text-emerald-400">{stats.Metan}M</span>
                <span className="text-[9px] text-orange-400">{stats.Benzin}B</span>
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">Jami: {stats.jami}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ===== STATS ROW ===== */}
      <section className="max-w-7xl mx-auto px-4 pb-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#0b1b3d]/30 border border-gray-800/60 rounded-2xl p-4 text-center">
          <div className="text-2xl font-extrabold text-emerald-400">{stationsData.length}</div>
          <div className="text-[9px] text-gray-500 mt-0.5">JAMI SHOXOBCHALAR</div>
        </div>
        <div className="bg-[#0b1b3d]/30 border border-gray-800/60 rounded-2xl p-4 text-center">
          <div className="text-2xl font-extrabold text-blue-400">14</div>
          <div className="text-[9px] text-gray-500 mt-0.5">VILOYAT</div>
        </div>
        <div className="bg-[#0b1b3d]/30 border border-gray-800/60 rounded-2xl p-4 text-center">
          <div className="text-2xl font-extrabold text-emerald-400">{stationsData.filter(s => s.type === 'Metan').length}</div>
          <div className="text-[9px] text-gray-500 mt-0.5">METAN</div>
        </div>
        <div className="bg-[#0b1b3d]/30 border border-gray-800/60 rounded-2xl p-4 text-center">
          <div className="text-2xl font-extrabold text-orange-400">{stationsData.filter(s => s.type === 'Benzin').length}</div>
          <div className="text-[9px] text-gray-500 mt-0.5">BENZIN</div>
        </div>
      </section>

      {/* ===== TICKER ===== */}
      <section className="border-y border-gray-800 bg-[#071126] py-2.5 overflow-hidden text-[10px] text-gray-400 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-8 whitespace-nowrap overflow-x-auto [scrollbar-width:none]">
          <span className="flex items-center gap-1.5 shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{stationsData.length} ta shoxobcha</span>
          <span className="flex items-center gap-1.5 shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{stationsData.filter(s => s.type === 'Metan').length} ta Metan</span>
          <span className="flex items-center gap-1.5 shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>{stationsData.filter(s => s.type === 'Benzin').length} ta Benzin</span>
          <span className="flex items-center gap-1.5 shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>14 ta viloyat</span>
          <span className="flex items-center gap-1.5 shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Real vaqt rejimi</span>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#050c1b] text-gray-500 text-[10px] py-10 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-white mb-1">Gaz Navbat Tizimi</div>
            <div>© 2026 • {stationsData.length} ta shoxobcha, 14 ta viloyat</div>
          </div>
          <div className="flex items-center gap-5 font-medium">
            <a href="#" className="hover:text-white transition-colors">Xavfsizlik</a>
            <a href="#" className="hover:text-white transition-colors">Yordam</a>
            <a href="#" className="hover:text-white transition-colors">Shartlar</a>
          </div>
          <div className="flex gap-3 text-gray-400">
            <Globe className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
            <Share2 className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
