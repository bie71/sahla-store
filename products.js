// KONFIGURASI TOKO & BANNER
const STORE_SETTINGS = {
  "storeName": "Sahla Store",
  "waNumberEnc": "NjI4MTIzNDU2Nzg5Mg==",
  "heroEyebrow": "Ready stock • Update tiap hari",
  "heroTitle": "Cantik, nyaman, harga bersahabat.",
  "heroLead": "Gamis, daster, baju anak sampai HP & laptop — semua yang lagi ready ada di sini. Tinggal pilih, klik, chat.",
  "bannerEyebrow": "Promo Jumat Berkah",
  "bannerTitle": "Beli 2 daster, gratis 1 celamis.",
  "bannerMsg": "Halo kak, mau ikut promo Jumat Berkah (beli 2 daster gratis 1 celamis)",
  "bannerBg": "img/banner.jpg",
  "promoBanners": [
    {
      "bg": "img/banner.jpg",
      "eyebrow": "Promo Jumat Berkah",
      "title": "Beli 2 daster,<br>gratis 1 celamis.",
      "msg": "Halo kak, mau ikut promo Jumat Berkah (beli 2 daster gratis 1 celamis)",
      "btnText": "Ambil Promo"
    }
  ],
  "adminPinHash": "4e8d8cfd34b1ab90b4eb0ab5a9fb5974d9c4dbcc22a1a699bb0e93e3f73a763d",
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
    "old": 350000,
    "img": "img/1.jpg",
    "badge": "Best Seller",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "desc": "Bahan Ceruty Babydoll lapis furing, adem dan jatuh. Busui friendly (resleting depan)."
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
