# Katalog Olshop / Promosi WhatsApp (Sahla Store)

Landing page responsif web & mobile dengan efek 3D tilt, scroll parallax, kategori lengkap (Gamis, Baju Dewasa, Anak, Daster, Celamis, Tyso, hingga Elektronik/HP/Laptop), dan integrasi langsung tombol order WhatsApp.

## Fitur
- **Responsive Design**: Optimal di layar HP mobile, tablet, maupun laptop/desktop.
- **Efek 3D & Parallax**: Hero section dengan stack card ber-efek perspektif 3D, background parallax, dan 3D tilt interaction.
- **Kategori & Pencarian Instan**: Filter produk per kategori dengan badge stok/promo.
- **WhatsApp Direct Order**: Tombol pesan otomatis merangkai format chat WhatsApp (nama produk, harga, link/detail).
- **Modal Detail Produk**: Pop-up untuk melihat deskripsi lengkap dan pilihan ukuran.

## Cara Menjalankan Lokal

1. Buka terminal di folder project:
   cd /home/bie/development/project/katalog-olshop

2. Jalankan local server (Python 3):
   python3 -m http.server 8080

3. Buka browser di http://localhost:8080

## Cara Ganti Nomor WhatsApp
Buka file `app.js` di baris paling atas:
```js
const WA_NUMBER = "6281234567890"; // Ganti dengan nomor WhatsApp bini (format 628...)
```

## Cara Tambah / Edit Produk
Edit array `PRODUCTS` di dalam file `app.js`.
