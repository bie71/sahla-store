(() => {
  // Cek apakah ada data preview lokal dari Admin
  let settings = typeof STORE_SETTINGS !== "undefined" ? STORE_SETTINGS : {};
  let products = typeof PRODUCTS !== "undefined" ? PRODUCTS : [];

  const localSaved = localStorage.getItem("sahla_catalog_data");
  if (localSaved) {
    try {
      const parsed = JSON.parse(localSaved);
      if (parsed.settings) settings = parsed.settings;
      if (parsed.products && parsed.products.length) products = parsed.products;
    } catch (e) {
      console.warn("Gagal membaca preview lokal:", e);
    }
  }

  if (!settings.waNumber && settings.waNumberEnc) {
    try { settings.waNumber = atob(settings.waNumberEnc); } catch(e) {}
  }

  const WA_NUMBER = settings.waNumber || "6281234567890";

  // Terapkan Pengaturan Toko ke DOM
  if (settings.storeName) {
    document.querySelectorAll(".brand").forEach(b => {
      b.innerHTML = `<span class="brand-mark">${settings.storeName.charAt(0)}</span>${settings.storeName}`;
    });
    document.title = `${settings.storeName} — Katalog Gamis, Daster & Elektronik`;
  }
  const hEye = document.querySelector(".hero-copy .eyebrow");
  if (hEye && settings.heroEyebrow) hEye.textContent = settings.heroEyebrow;
  const hTitle = document.querySelector(".hero-copy h1");
  if (hTitle && settings.heroTitle) hTitle.innerHTML = settings.heroTitle;
  const hLead = document.querySelector(".hero-copy .lead");
  if (hLead && settings.heroLead) hLead.innerHTML = settings.heroLead;

  const hTag = document.querySelector(".hero-stage .tag-float");
  if (hTag) {
    if (settings.heroTag !== undefined) {
      if (settings.heroTag.trim() === "") {
        hTag.style.display = "none";
      } else {
        hTag.style.display = "";
        hTag.textContent = settings.heroTag;
      }
    }
  }

  if (settings.heroCards && Array.isArray(settings.heroCards)) {
    const cardEls = document.querySelectorAll("#stack .card3d");
    settings.heroCards.slice(0, 3).forEach((card, idx) => {
      if (cardEls[idx]) {
        const img = cardEls[idx].querySelector("img");
        const cap = cardEls[idx].querySelector("figcaption");
        if (img && card.img) img.src = card.img;
        if (cap && card.caption) cap.textContent = card.caption;
      }
    });
  }

  // Promo Banners Setup & Slider
  let promoBanners = [];
  if (Array.isArray(settings.promoBanners) && settings.promoBanners.length > 0) {
    promoBanners = settings.promoBanners;
  } else if (settings.bannerTitle || settings.bannerBg) {
    promoBanners = [{
      bg: settings.bannerBg || "img/banner.jpg",
      eyebrow: settings.bannerEyebrow || "Promo Jumat Berkah",
      title: settings.bannerTitle || "Beli 2 daster,<br>gratis 1 celamis.",
      msg: settings.bannerMsg || "Halo kak, mau tanya promo toko.",
      btnText: "Ambil Promo"
    }];
  }

  const bannerSliderEl = document.getElementById("bannerSlider");
  const bannerDotsEl = document.getElementById("bannerDots");
  const bannerPrevEl = document.getElementById("bannerPrev");
  const bannerNextEl = document.getElementById("bannerNext");

  if (bannerSliderEl && promoBanners.length > 0) {
    bannerSliderEl.innerHTML = promoBanners.map((b, i) => `
      <div class="banner-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
        <div class="banner-bg" style="background-image: linear-gradient(rgba(31,59,45,.55), rgba(31,59,45,.75)), url('${b.bg || 'img/banner.jpg'}');"></div>
        <div class="banner-copy">
          ${b.eyebrow ? `<p class="eyebrow light">${b.eyebrow}</p>` : ''}
          <h2>${b.title || ''}</h2>
          <a href="#" data-wa data-msg="${b.msg || 'Halo kak, mau tanya promo toko.'}" class="btn btn-light">${b.btnText || 'Ambil Promo'}</a>
        </div>
      </div>
    `).join("");

    if (promoBanners.length > 1) {
      if (bannerDotsEl) {
        bannerDotsEl.innerHTML = promoBanners.map((_, i) => `
          <button class="banner-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>
        `).join("");
      }
      if (bannerPrevEl) bannerPrevEl.style.display = "";
      if (bannerNextEl) bannerNextEl.style.display = "";

      let curBanner = 0;
      let bannerTimer = null;

      function goToBanner(idx) {
        curBanner = (idx + promoBanners.length) % promoBanners.length;
        const slides = bannerSliderEl.querySelectorAll(".banner-slide");
        slides.forEach((sl, i) => sl.classList.toggle("active", i === curBanner));
        if (bannerDotsEl) {
          const dots = bannerDotsEl.querySelectorAll(".banner-dot");
          dots.forEach((d, i) => d.classList.toggle("active", i === curBanner));
        }
      }

      function startBannerAutoPlay() {
        stopBannerAutoPlay();
        bannerTimer = setInterval(() => {
          goToBanner(curBanner + 1);
        }, 5000);
      }

      function stopBannerAutoPlay() {
        if (bannerTimer) clearInterval(bannerTimer);
      }

      startBannerAutoPlay();

      if (bannerPrevEl) bannerPrevEl.onclick = () => { goToBanner(curBanner - 1); startBannerAutoPlay(); };
      if (bannerNextEl) bannerNextEl.onclick = () => { goToBanner(curBanner + 1); startBannerAutoPlay(); };

      if (bannerDotsEl) {
        bannerDotsEl.onclick = e => {
          const dot = e.target.closest(".banner-dot");
          if (!dot) return;
          goToBanner(Number(dot.dataset.index));
          startBannerAutoPlay();
        };
      }

      const bannerSection = document.getElementById("promoBannerSection");
      if (bannerSection) {
        bannerSection.addEventListener("mouseenter", stopBannerAutoPlay);
        bannerSection.addEventListener("mouseleave", startBannerAutoPlay);

        // Touch swipe on mobile
        let tStartX = 0;
        bannerSection.addEventListener("touchstart", e => {
          tStartX = e.changedTouches[0].clientX;
          stopBannerAutoPlay();
        }, { passive: true });
        bannerSection.addEventListener("touchend", e => {
          const diff = e.changedTouches[0].clientX - tStartX;
          if (Math.abs(diff) > 40) {
            goToBanner(diff > 0 ? curBanner - 1 : curBanner + 1);
          }
          startBannerAutoPlay();
        }, { passive: true });
      }
    } else {
      if (bannerDotsEl) bannerDotsEl.style.display = "none";
      if (bannerPrevEl) bannerPrevEl.style.display = "none";
      if (bannerNextEl) bannerNextEl.style.display = "none";
    }
  }

  // 3D Carousel Section
  const secUnggulan = document.getElementById("unggulan");
  const navUnggulan = document.querySelector('.nav-links a[href="#unggulan"]');
  const isCarouselEnabled = settings.carouselEnabled !== false;

  if (secUnggulan) {
    if (!isCarouselEnabled) {
      secUnggulan.style.display = "none";
    } else {
      secUnggulan.style.display = "";
      const eye = secUnggulan.querySelector(".eyebrow");
      const title = secUnggulan.querySelector("h2");
      if (eye && settings.carouselEyebrow) eye.textContent = settings.carouselEyebrow;
      if (title && settings.carouselTitle) title.innerHTML = settings.carouselTitle;
    }
  }
  if (navUnggulan) {
    navUnggulan.style.display = isCarouselEnabled ? "" : "none";
  }

  // Marquee Ticker
  const marqueeTrack = document.querySelector(".marquee-track");
  const marqueeWrap = document.querySelector(".marquee-wrap");
  if (marqueeTrack) {
    const rawItems = settings.marqueeItems;
    let items = [];
    if (Array.isArray(rawItems) && rawItems.length > 0) {
      items = rawItems;
    } else if (typeof rawItems === "string" && rawItems.trim()) {
      items = rawItems.split(",").map(s => s.trim()).filter(Boolean);
    }

    if (rawItems !== undefined && items.length === 0) {
      if (marqueeWrap) marqueeWrap.style.display = "none";
    } else {
      if (marqueeWrap) marqueeWrap.style.display = "";
      if (items.length > 0) {
        const itemSpans = items.map(t => `<span>${t}</span>`).join("");
        // Duplicate once for infinite CSS scroll
        marqueeTrack.innerHTML = itemSpans + itemSpans;
      }
    }
  }

  const UI = {
    nav: document.getElementById("nav"),
    grid: document.getElementById("grid"),
    chips: document.getElementById("chips"),
    q: document.getElementById("q"),
    empty: document.getElementById("empty"),
    modal: document.getElementById("modal"),
    modalBody: document.getElementById("modalBody"),
    closeModal: document.getElementById("closeModal"),
    statCount: document.getElementById("statCount"),
    parallax: document.querySelectorAll("[data-speed]"),
    stack: document.getElementById("stack"),
    ring: document.getElementById("ring"),
    ringNext: document.getElementById("next"),
    ringPrev: document.getElementById("prev"),
    yr: document.getElementById("yr")
  };

  let filter = "Semua";
  let search = "";
  let ringAngle = 0;
  let selectedSize = "";

  // Init
  if (UI.yr) UI.yr.textContent = new Date().getFullYear();
  if (UI.statCount) UI.statCount.textContent = products.length;
  renderChips();
  renderGrid();
  initRing();

  // Events
  window.addEventListener("scroll", () => {
    const s = window.scrollY;
    if (UI.nav) UI.nav.classList.toggle("scrolled", s > 50);
    UI.parallax.forEach(el => {
      const sp = parseFloat(el.dataset.speed);
      el.style.transform = `translateY(${s * sp}px)`;
    });
    const bn = document.querySelector(".banner");
    if (bn && bn.firstElementChild) {
      const r = bn.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        bn.firstElementChild.style.transform = `translateY(${(r.top + r.height / 2 - innerHeight / 2) * -0.25}px)`;
      }
    }
    // Scroll Reveal
    document.querySelectorAll(".reveal:not(.in)").forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add("in");
    });
  });

  // Hero Mouse Parallax
  window.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    if (UI.stack) {
      UI.stack.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    }
  });

  if (UI.q) {
    UI.q.addEventListener("input", e => {
      search = e.target.value.toLowerCase();
      renderGrid();
    });
  }

  if (UI.closeModal && UI.modal) {
    UI.closeModal.onclick = () => UI.modal.close();
    UI.modal.onclick = e => e.target === UI.modal && UI.modal.close();
  }

  // Grid Logic
  function renderChips() {
    if (!UI.chips) return;
    const cats = ["Semua", ...new Set(products.map(p => p.cat))];
    UI.chips.innerHTML = cats.map(c => {
      const count = c === "Semua" ? products.length : products.filter(p => p.cat === c).length;
      return `<button class="chip" role="tab" aria-selected="${c === filter}" data-cat="${c}">${c} <small>${count}</small></button>`;
    }).join("");

    UI.chips.onclick = e => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      filter = btn.dataset.cat;
      renderChips();
      renderGrid();
    };
  }

  function renderGrid() {
    if (!UI.grid) return;
    const filtered = products.filter(p => {
      const matchCat = filter === "Semua" || p.cat === filter;
      const matchSearch = p.name.toLowerCase().includes(search) || p.cat.toLowerCase().includes(search);
      return matchCat && matchSearch;
    });

    UI.grid.innerHTML = filtered.map((p, i) => {
      let badges = [];
      if (Array.isArray(p.badge)) {
        badges = p.badge;
      } else if (typeof p.badge === "string" && p.badge.trim()) {
        badges = p.badge.split(",").map(b => b.trim()).filter(Boolean);
      }
      const badgesHtml = badges.length ? `
        <div class="badges-wrap">
          ${badges.map(b => {
            const bl = b.toLowerCase();
            const cls = bl.includes('promo') || bl.includes('hot') ? 'hot' : (bl.includes('baru') || bl.includes('new') ? 'new' : (bl.includes('diskon') || bl.includes('sale') ? 'sale' : ''));
            return `<span class="badge ${cls}">${b}</span>`;
          }).join("")}
        </div>
      ` : "";

      return `
      <article class="card reveal" style="transition-delay: ${i % 4 * 0.1}s">
        <button class="card-img" onclick="window.openProduct(${p.id})">
          ${badgesHtml}
          <img src="${p.img}" alt="${p.name}" loading="lazy">
        </button>
        <div class="card-body">
          <span class="card-cat">${p.cat}</span>
          <h3>${p.name}</h3>
          <div class="price">
            <b>Rp ${p.price.toLocaleString("id-ID")}</b>
            ${p.old ? `<s>Rp ${p.old.toLocaleString("id-ID")}</s>` : ""}
          </div>
          <a href="#" class="btn btn-wa btn-sm" onclick="window.orderWA(event, ${p.id})">Pesan via WA</a>
        </div>
      </article>
    `;
    }).join("");

    if (UI.empty) UI.empty.hidden = filtered.length > 0;

    requestAnimationFrame(() => {
      UI.grid.querySelectorAll(".card").forEach(c => c.classList.add("in"));
    });
  }

  // 3D Ring Carousel
  function getRingConfig() {
    const isMobile = window.innerWidth < 640;
    let items = [];
    if (settings.carouselProductIds && Array.isArray(settings.carouselProductIds) && settings.carouselProductIds.length > 0) {
      items = settings.carouselProductIds
        .map(id => products.find(p => p.id === id))
        .filter(Boolean);
    }
    if (!items.length) {
      items = products.slice(0, 8);
    }
    const count = items.length;
    const r = isMobile ? 195 : 360;
    return { isMobile, items, count, r };
  }

  function updateRingCards() {
    if (!UI.ring) return;
    const { isMobile, count, r } = getRingConfig();
    const cards = UI.ring.querySelectorAll(".ring-item");
    const step = 360 / count;

    cards.forEach((card, i) => {
      const baseAngle = i * step;
      let diff = ((baseAngle + ringAngle) % 360 + 360) % 360;
      if (diff > 180) diff -= 360;
      const absDiff = Math.abs(diff);

      if (isMobile) {
        if (absDiff < 25) {
          card.style.opacity = "1";
          card.style.transform = `rotateY(${baseAngle}deg) translateZ(${r}px) scale(1.04)`;
          card.style.pointerEvents = "auto";
          card.style.filter = "none";
          card.style.zIndex = "10";
        } else if (absDiff < 80) {
          card.style.opacity = "0.72";
          card.style.transform = `rotateY(${baseAngle}deg) translateZ(${r}px) scale(0.88)`;
          card.style.pointerEvents = "auto";
          card.style.filter = "brightness(0.88)";
          card.style.zIndex = "5";
        } else {
          card.style.opacity = "0";
          card.style.transform = `rotateY(${baseAngle}deg) translateZ(${r}px) scale(0.7)`;
          card.style.pointerEvents = "none";
          card.style.zIndex = "1";
        }
      } else {
        if (absDiff > 115) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
        } else {
          card.style.opacity = absDiff < 25 ? "1" : "0.75";
          card.style.transform = `rotateY(${baseAngle}deg) translateZ(${r}px) scale(${absDiff < 25 ? 1.05 : 0.92})`;
          card.style.pointerEvents = "auto";
        }
      }
    });
  }

  function initRing() {
    if (!UI.ring) return;
    const { items, count, r } = getRingConfig();
    UI.ring.innerHTML = items.map((p, i) => `
      <div class="ring-item" data-index="${i}" onclick="window.onRingCardClick(${i}, ${p.id})" style="transform: rotateY(${i * (360/count)}deg) translateZ(${r}px); transition: transform .6s cubic-bezier(.2,.7,.2,1), opacity .4s ease, filter .4s ease; cursor: pointer;">
        <img src="${p.img}" alt="${p.name}">
        <div><b>${p.name}</b>Rp ${p.price.toLocaleString("id-ID")}</div>
      </div>
    `).join("");
    updateRingCards();
  }

  function rotateRing(dir) {
    if (!UI.ring) return;
    const { count } = getRingConfig();
    if (count <= 0) return;
    const step = 360 / count;
    ringAngle += dir * step;
    UI.ring.style.transform = `rotateY(${ringAngle}deg)`;
    updateRingCards();
  }
  if (UI.ringNext) UI.ringNext.onclick = () => rotateRing(-1);
  if (UI.ringPrev) UI.ringPrev.onclick = () => rotateRing(1);

  window.onRingCardClick = (idx, id) => {
    const { count } = getRingConfig();
    if (count <= 0) return;
    const step = 360 / count;
    const baseAngle = idx * step;
    let diff = ((baseAngle + ringAngle) % 360 + 360) % 360;
    if (diff > 180) diff -= 360;
    if (Math.abs(diff) < 25) {
      window.openProduct(id);
    } else {
      rotateRing(diff > 0 ? -1 : 1);
    }
  };

  // Touch swipe gesture for mobile ring
  const ringWrap = document.querySelector(".ring-wrap");
  if (ringWrap) {
    let touchStartX = 0;
    ringWrap.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    ringWrap.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 30) {
        rotateRing(diff > 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  window.addEventListener("resize", () => {
    initRing();
  });

  // External APIs
  window.openProduct = (id) => {
    const p = products.find(x => x.id === id);
    if (!p || !UI.modalBody || !UI.modal) return;
    selectedSize = ""; // Reset size on open
    UI.modalBody.innerHTML = `
      <img src="${p.img}" alt="">
      <div class="modal-info">
        <span class="card-cat">${p.cat}</span>
        <h3>${p.name}</h3>
        <div class="price">
          <b>Rp ${p.price.toLocaleString("id-ID")}</b>
          ${p.old ? `<s>Rp ${p.old.toLocaleString("id-ID")}</s>` : ""}
        </div>
        <p>${p.desc || ""}</p>
        ${p.sizes && p.sizes.length ? `
          <div class="sizes">
            <strong>Size:</strong>
            ${p.sizes.map(s => `<button class="size-btn" onclick="window.selectSize(this, '${s}')">${s}</button>`).join("")}
          </div>
        ` : ""}
        <a href="#" class="btn btn-wa" style="margin-top: 1rem" onclick="window.orderWA(event, ${p.id})">
          Chat WhatsApp Mau Order
        </a>
      </div>
    `;
    UI.modal.showModal();
  };

  window.selectSize = (btn, size) => {
    document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedSize = size;
  };

  window.orderWA = (e, id) => {
    e.preventDefault();
    const p = products.find(x => x.id === id);
    if (!p) return;

    if (p.sizes && p.sizes.length && !selectedSize) {
      alert("Pilih ukuran dulu ya kak :)");
      return;
    }

    const msg = `Halo kak, saya mau order produk ini:
*${p.name}*
${selectedSize ? `Ukuran: *${selectedSize}*\n` : ""}Harga: Rp ${p.price.toLocaleString("id-ID")}
Kategori: ${p.cat}

Apakah masih ready?`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Handle generic WA links
  document.querySelectorAll("[data-wa]").forEach(el => {
    el.onclick = (e) => {
      e.preventDefault();
      const msg = el.dataset.msg || "Halo kak, mau tanya stok produk yang lagi ready.";
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    };
  });

})();
