// KONFIGURASI TOKO & BANNER
const STORE_SETTINGS = {
  "storeName": "Sahla Store",
  "heroEyebrow": "Ready stock • Update tiap hari",
  "heroTitle": "Cantik, nyaman, harga bersahabat.",
  "heroLead": "Gamis, daster, baju anak sampai HP & laptop — semua yang lagi ready ada di sini. Tinggal pilih, klik, chat.",
  "bannerEyebrow": "Promo Jumat Berkah",
  "bannerTitle": "Beli 2 daster, gratis 1 celamis.",
  "bannerMsg": "Halo kak, mau ikut promo Jumat Berkah (beli 2 daster gratis 1 celamis)",
  "bannerBg": "https://sahla-store.vercel.app/img/banner.jpg",
  "adminPin": "sahla@",
  "heroTag": "New Arrival",
  "heroCards": [
    {
      "img": "img/h1.jpg",
      "caption": "Gamis Syari New"
    },
    {
      "img": "img/h2.jpg",
      "caption": "Baju Anak"
    },
    {
      "img": "img/h3.jpg",
      "caption": "Laptop Second"
    }
  ],
  "carouselEnabled": true,
  "carouselEyebrow": "Unggulan",
  "carouselTitle": "Paling banyak ditanya",
  "carouselProductIds": [],
  "marqueeItems": [
    "Gamis",
    "Baju Dewasa",
    "Baju Anak",
    "Daster",
    "Celamis",
    "Tyso"
  ],
  "waNumberEnc": "NjI4MTIzNDU2Nzg5Mg==",
  "promoBanners": [
    {
      "eyebrow": "Promo Jumat Berkah",
      "title": "Beli 2 daster, gratis 1 celamis.",
      "msg": "Halo kak, mau ikut promo Jumat Berkah (beli 2 daster gratis 1 celamis)",
      "btnText": "Ambil Promo",
      "bg": "https://sahla-store.vercel.app/img/banner.jpg"
    },
    {
      "eyebrow": "Promo Baru",
      "title": "Judul Promo Tambahan",
      "msg": "Halo kak, mau tanya promo baru ini",
      "btnText": "Ambil Promo",
      "bg": "https://sahla-store.vercel.app/img/banner.jpg"
    }
  ]
};

function getStoreWaNumber() {
  if (typeof STORE_SETTINGS === "undefined") return "6281234567892";
  if (STORE_SETTINGS.waNumberEnc) {
    try {
      return atob(STORE_SETTINGS.waNumberEnc);
    } catch (e) {
      return STORE_SETTINGS.waNumber || "6281234567892";
    }
  }
  return STORE_SETTINGS.waNumber || "6281234567892";
}

const WA_NUMBER = getStoreWaNumber();

// DAFTAR PRODUK KATALOG
const PRODUCTS = [
  {
    "id": 1,
    "cat": "Gamis",
    "name": "Gamis Syari Ceruty Babydoll Premium",
    "price": 285000,
    "img": "data:image/jpeg;base64,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AgSAgSAjhSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=",
    "badge": "Best Seller",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "desc": "Bahan Ceruty Babydoll lapis furing, adem dan jatuh. Busui friendly (resleting depan).",
    "old": 350000
  },
  {
    "id": 2,
    "cat": "Daster",
    "name": "Daster Arab Rayon Renda Busui",
    "price": 85000,
    "img": "img/2.jpg",
    "badge": "Ready",
    "sizes": [
      "All Size"
    ],
    "desc": "Daster jumbo muat BB 80kg. Bahan rayon super adem, motif renda mewah."
  },
  {
    "id": 3,
    "cat": "Baju Anak",
    "name": "Setelan Piyama Anak Katun Combed",
    "price": 55000,
    "old": 75000,
    "img": "img/3.jpg",
    "badge": "Promo",
    "sizes": [
      "2th",
      "4th",
      "6th"
    ],
    "desc": "Kaos katun combed 30s, nyaman dipakai tidur atau harian. Motif lucu."
  },
  {
    "id": 4,
    "cat": "Celamis",
    "name": "Celamis Rayon Premium Anti Gerah",
    "price": 35000,
    "img": "img/4.jpg",
    "sizes": [
      "Standar",
      "Jumbo"
    ],
    "desc": "Celana dalaman gamis. Ringan, tidak ngetat, tidak panas. Wajib punya buat yang suka pakai gamis."
  },
  {
    "id": 5,
    "cat": "Elektronik",
    "name": "iPhone 13 128GB Second Mulus",
    "price": 8250000,
    "old": 9000000,
    "img": "img/5.jpg",
    "badge": "Like New",
    "desc": "Ex-Inter, Face ID On, True Tone On, Battery Health 92%. Kelengkapan fullset."
  },
  {
    "id": 6,
    "cat": "Tyso",
    "name": "Tisu Wajah Facial Tissue 1000g",
    "price": 22000,
    "img": "img/6.jpg",
    "badge": "Murah",
    "desc": "Tisu kering 1kg. Serat lembut, tidak mudah sobek saat kena air."
  },
  {
    "id": 7,
    "cat": "Gamis",
    "name": "Abaya Dress Silk Polos Mewah",
    "price": 320000,
    "img": "img/7.jpg",
    "sizes": [
      "M",
      "L"
    ],
    "desc": "Bahan silk premium berkilau elegan. Cocok untuk kondangan atau acara formal."
  },
  {
    "id": 8,
    "cat": "Baju Dewasa",
    "name": "Tunik Linen Oversize Casual",
    "price": 125000,
    "old": 150000,
    "img": "img/8.jpg",
    "badge": "Hot",
    "sizes": [
      "All Size"
    ],
    "desc": "Tunik model kemeja bahan linen bangkok. Cutting oversize kekinian."
  },
  {
    "id": 9,
    "cat": "Elektronik",
    "name": "Laptop Lenovo ThinkPad X270",
    "price": 3450000,
    "img": "img/9.jpg",
    "badge": "Stok 1",
    "desc": "Intel Core i5, RAM 8GB, SSD 256GB. Fisik 90% mulus. Baterai awet."
  },
  {
    "id": 10,
    "cat": "Baju Anak",
    "name": "Gamis Anak Set Hijab Pastel",
    "price": 110000,
    "img": "img/10.jpg",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "desc": "Satu set gamis dan jilbab untuk si kecil. Bahan kaos adem warna pastel."
  },
  {
    "id": 11,
    "cat": "Daster",
    "name": "Daster Manohara Bali Motif Etnik",
    "price": 45000,
    "img": "img/11.jpg",
    "sizes": [
      "All Size"
    ],
    "desc": "Daster tali pundak khas Bali. Bahan adem lemes."
  },
  {
    "id": 12,
    "cat": "Tyso",
    "name": "Tisu Basah Antiseptic Non-Alkohol",
    "price": 12000,
    "img": "img/12.jpg",
    "sizes": [
      "Isi 50"
    ],
    "desc": "Tisu basah aman untuk bayi dan kulit sensitif. Wangi segar."
  }
];
