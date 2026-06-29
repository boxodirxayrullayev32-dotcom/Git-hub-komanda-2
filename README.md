# Zapravka.uz — Team Project

Figma dizayn asosida 8 sahifali React loyihasi.

## Loyiha tarkibi

| # | Page | Route | Mas'ul |
|---|------|-------|--------|
| 1 | Home | `/` | Azamat |
| 2 | Zapravkalar Katalogi | `/zapravkalar` | Mansur |
| 3 | Zapravka Batafsil | `/zapravka/:id` | Aziz |
| 4 | Navbat Olish | `/navbat-olish` | Azamat |
| 5 | Mening Navbatlarim | `/mening-navbatlarim` | Boxodir |
| 6 | Navbat Tasdiqlash | `/navbat-tasdiqlash` | Mansur |
| 7 | Narxlar | `/narxlar` | Aziz |
| 8 | Aloqa | `/aloqa` | Boxodir |

## Topshiriq taqsimoti

- **Azamat** → `Azamat.md` — Home + Navbat Olish
- **Mansur** → `Mansur.md` — Zapravkalar Katalogi + Navbat Tasdiqlash
- **Aziz** → `Aziz.md` — Zapravka Batafsil + Narxlar
- **Boxodir** → `Boxodir.md` — Mening Navbatlarim + Aloqa

## Ishlash tartibi

1. `npm install` — paketlarni o'rnating
2. `npm run dev` — loyihani ishga tushiring
3. O'zingizga tegishli `.md` faylni o'qing
4. `src/pages/` papkasidagi o'z page laringizni UI sini yozing
5. **Router va header tayyor** — faqat UI ni qilishingiz kerak

## Stack

- React 19
- Vite 8
- Tailwind CSS 4
- React Router DOM 7
