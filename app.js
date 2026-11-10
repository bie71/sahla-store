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

  const bEye = document.querySelector(".banner .eyebrow");
  if (bEye && settings.bannerEyebrow) bEye.textContent = settings.bannerEyebrow;
  const bTitle = document.querySelector(".banner h2");
  if (bTitle && settings.bannerTitle) bTitle.innerHTML = settings.bannerTitle;
  const bBtn = document.querySelector(".banner [data-wa]");
  if (bBtn && settings.bannerMsg) bBtn.dataset.msg = settings.bannerMsg;
  const bBg = document.querySelector(".banner-bg");
  if (bBg && settings.bannerBg) {
    bBg.style.backgroundImage = `linear-gradient(rgba(31,59,45,.55), rgba(31,59,45,.75)), url("${settings.bannerBg}")`;
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

    UI.grid.innerHTML = filtered.map((p, i) => `
      <article class="card reveal" style="transition-delay: ${i % 4 * 0.1}s">
        <button class="card-img" onclick="window.openProduct(${p.id})">
          ${p.badge ? `<span class="badge ${p.badge === 'Promo' ? 'hot' : ''}">${p.badge}</span>` : ""}
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
    `).join("");

    if (UI.empty) UI.empty.hidden = filtered.length > 0;

    requestAnimationFrame(() => {
      UI.grid.querySelectorAll(".card").forEach(c => c.classList.add("in"));
    });
  }

  // 3D Ring Carousel
  function initRing() {
    if (!UI.ring) return;
    const items = products.slice(0, 8); // show top 8
    const count = items.length;
    const isMobile = window.innerWidth < 640;
    const r = isMobile ? 180 : 360; // radius proporsional mobile & desktop
    UI.ring.innerHTML = items.map((p, i) => `
      <div class="ring-item" style="transform: rotateY(${i * (360/count)}deg) translateZ(${r}px)">
        <img src="${p.img}" alt="">
        <div><b>${p.name}</b>Rp ${p.price.toLocaleString("id-ID")}</div>
      </div>
    `).join("");
  }

  function rotateRing(dir) {
    if (!UI.ring) return;
    ringAngle += dir * (360 / Math.min(products.length, 8));
    UI.ring.style.transform = `rotateY(${ringAngle}deg)`;
  }
  if (UI.ringNext) UI.ringNext.onclick = () => rotateRing(-1);
  if (UI.ringPrev) UI.ringPrev.onclick = () => rotateRing(1);

  // External APIs
  window.openProduct = (id) => {
    const p = products.find(x => x.id === id);
    if (!p || !UI.modalBody || !UI.modal) return;
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
            ${p.sizes.map(s => `<span>${s}</span>`).join("")}
          </div>
        ` : ""}
        <a href="#" class="btn btn-wa" style="margin-top: 1rem" onclick="window.orderWA(event, ${p.id})">
          Chat WhatsApp Mau Order
        </a>
      </div>
    `;
    UI.modal.showModal();
  };

  window.orderWA = (e, id) => {
    e.preventDefault();
    const p = products.find(x => x.id === id);
    if (!p) return;
    const msg = `Halo kak, saya mau order produk ini:
*${p.name}*
Harga: Rp ${p.price.toLocaleString("id-ID")}
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
