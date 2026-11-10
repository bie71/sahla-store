# Panduan Penggunaan Katalog Online Sahla Store

Selamat! Web katalog produk sudah siap. Web ini didesain agar mudah dikelola langsung dari HP lewat **Halaman Admin**.

## 1. Alamat Web & Admin
- **Web Pelanggan:** `https://sahla-store.vercel.app` (Link yang disebar ke status WA)
- **Halaman Admin:** `https://sahla-store.vercel.app/sahla-panel.html` (Tempat edit produk/banner)

---

## 2. Cara Kelola Katalog dari HP
Buka halaman `/sahla-panel.html` di browser HP, masukkan PIN: **sahla@**.

### A. Menambah / Edit Produk
1. Klik tombol **"➕ Tambah Produk Baru"** atau klik **"✏️ Edit"** pada barang yang sudah ada.
2. Klik kotak foto untuk ambil foto langsung dari **Kamera HP** atau galeri. Foto otomatis dikompres agar hemat kuota dan web cepat dibuka.
3. Isi Nama, Harga, Ukuran, dan Kategori.
4. Klik **"Simpan Produk"**. Barang akan muncul di daftar admin dan web (preview lokal).

### B. Mengganti Banner & Info Toko
1. Buka tab **"🏪 Banner & Toko"**.
2. Di sini bisa ganti Nomor WhatsApp, Nama Toko, Slogan, dan Foto Banner Promo.
3. Klik **"Simpan Pengaturan Toko"**.

### C. Publikasi ke Web (Agar Live Dilihat Semua Orang)
Agar perubahan yang dibuat di HP bisa dilihat oleh pelanggan di internet, tekan tombol **"Publikasikan Sekarang"** di tab ke-3.

1. Buka tab **"🚀 Publikasi ke Web"**.
2. (Hanya sekali) Isi **GitHub Token** (lihat cara buat di bawah).
3. Klik tombol **"🚀 Publikasikan Sekarang ke Web"**.
4. Tunggu ~30 detik, web live otomatis ter-update!

---

## 3. Cara Setup Sekali Saja (Setup Token GitHub)
Agar tombol "Publikasikan Sekarang" berfungsi, lakukan langkah ini:

### Step 1: Upload ke GitHub
Jalankan perintah ini di terminal folder project:
```bash
git init
git add .
git commit -m "Initial commit Sahla Store"
git remote add origin git@github.com:bie71/sahla-store.git
git branch -M main
git push -u origin main
```
*(Pastikan sudah buat repo kosong bernama `sahla-store` di akun GitHub bie71)*.

### Step 2: Sambungkan Vercel ke GitHub
1. Buka [Vercel Dashboard](https://vercel.com/dashboard).
2. Pilih project `sahla-store`.
3. Masuk ke **Settings** -> **Git**.
4. Klik **"Connect"** ke repository `bie71/sahla-store`.
5. Sekarang, setiap klik "Publikasikan" dari Admin, Vercel akan otomatis update webnya.

### Step 3: Buat GitHub Token untuk Admin
Token ini dibutuhkan untuk disimpan di Halaman Admin:
1. Buka [GitHub Token Settings](https://github.com/settings/tokens).
2. Klik **"Generate new token (classic)"**.
3. Beri nama: "Katalog Sahla Admin".
4. Centang kotak **`repo`** (Full control of private repositories).
5. Klik **"Generate token"**.
6. **SALIN TOKENNYA** (contoh: `ghp_xxxxxxxx`) untuk dimasukkan ke halaman Admin tab Publikasikan.

---

## 4. Tips Jualan
- **Foto Produk**: Pastikan cahaya terang saat memotret baju agar warna asli kelihatan.
- **Kategori**: Kategori baru yang diketik di Admin otomatis akan jadi tab pilihan di web pelanggan.
- **Promo**: Manfaatkan banner promo untuk stok yang lagi cuci gudang/promo Jumat Berkah.

---
*Dibuat dengan ❤️ oleh Hermes Agent untuk Sahla Store.*
