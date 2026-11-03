# Kantin 88 - Universitas Tarumanagara (React + Bootstrap)

Versi React dari proyek PHP `kantin88`.

## Menjalankan
```bash
npm install
npm run dev      # buka http://localhost:5173
npm run build    # hasil di folder dist/
```

## Struktur
| PHP lama                     | React                                   |
|------------------------------|-----------------------------------------|
| includes/data.php            | src/data/data.js + src/utils/format.js  |
| includes/header.php          | src/components/Header.jsx               |
| includes/navbar.php          | src/components/Navbar.jsx               |
| includes/footer.php          | src/components/Footer.jsx + CartDrawer.jsx |
| assets/js/keranjang.js       | src/context/CartContext.jsx             |
| index.php                    | src/pages/Home.jsx (+ Nota.jsx)         |
| menu.php                     | src/pages/Menu.jsx                      |
| tentang.php / kontak.php     | src/pages/Tentang.jsx / Kontak.jsx      |
| latihan-php.php              | src/pages/Latihan.jsx                   |

Bootstrap dipasang lewat npm (bukan CDN). Routing memakai HashRouter,
jadi bisa dibuka dari hosting statis tanpa konfigurasi server.
