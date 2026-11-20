// Akbar Motor - script.js
const akbar_nomor_wa = "6282118167775"; // GANTI dengan nomor WA asli (format 62...)
const akbar_motor = [
 {nama:"Honda Vario 125",merk:"Honda",tahun:2020,harga:15500000,km:21000,cc:125,ikon:"🛵",gambar:"foto/vario125.jpg"},
 {nama:"Yamaha NMAX 155",merk:"Yamaha",tahun:2019,harga:23500000,km:32000,cc:155,ikon:"🛵",gambar:"foto/nmax155.jpg"},
 {nama:"Honda Beat Street",merk:"Honda",tahun:2021,harga:12000000,km:14000,cc:110,ikon:"🛵",gambar:"foto/beat.jpg"},
 {nama:"Kawasaki Ninja 250",merk:"Kawasaki",tahun:2018,harga:42000000,km:27000,cc:250,ikon:"🏍️",gambar:"foto/ninja.jpg"},
 {nama:"Yamaha Aerox 155",merk:"Yamaha",tahun:2022,harga:25500000,km:9000,cc:155,ikon:"🛵",gambar:"foto/aerox.jpg"},
 {nama:"Suzuki Satria F150",merk:"Suzuki",tahun:2017,harga:14500000,km:41000,cc:150,ikon:"🏍️",gambar:"foto/f150.jpg"},
 {nama:"Honda CB150R",merk:"Honda",tahun:2020,harga:27500000,km:18000,cc:150,ikon:"🏍️",gambar:"foto/cb150.jpg"},
 {nama:"Yamaha Mio M3",merk:"Yamaha",tahun:2019,harga:9500000,km:30000,cc:125,ikon:"🛵",gambar:"foto/mio_m3.jpg"},
 {nama:"Honda ADV 160",merk:"Honda",tahun:2022,harga:30500000,km:12000,cc:160,ikon:"🛵",gambar:"foto/adv160.jpg"},
 {nama:"Honda PCX 160",merk:"Honda",tahun:2021,harga:29500000,km:15000,cc:160,ikon:"🛵",gambar:"foto/pcx160.jpg"}
];
const akbar_rp = n => "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n));

// menu mobile + link aktif
const akbar_burger = document.getElementById("akbar_burger");
const akbar_menu = document.getElementById("akbar_menu");
akbar_burger.addEventListener("click", () => akbar_menu.classList.toggle("akbar_buka"));
const akbar_hal = location.pathname.split("/").pop() || "index.html";
akbar_menu.querySelectorAll("a").forEach(a => { if (a.getAttribute("href") === akbar_hal) a.classList.add("akbar_aktif"); });

// tombol WhatsApp melayang
const akbar_wa_svg = '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-1.9 1.3-.5.1-1.1.1-3.6-.9-3-1.3-4.9-4.4-5.1-4.6-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.1.1.7-.1 1.4z"/></svg>';
const akbar_wa_link = (teks) => `https://wa.me/${akbar_nomor_wa}?text=${encodeURIComponent(teks)}`;
const akbar_float = document.createElement("a");
akbar_float.id = "akbar_wa_float"; akbar_float.target = "_blank"; akbar_float.rel = "noopener";
akbar_float.href = akbar_wa_link("Halo Akbar Motor, saya ingin bertanya tentang motor bekas."); akbar_float.innerHTML = akbar_wa_svg;
akbar_float.setAttribute("aria-label", "Chat WhatsApp");
document.body.appendChild(akbar_float);

// render kartu motor
function akbar_kartu(m){
  const teks = `Halo Akbar Motor, saya tertarik dengan ${m.nama} (${m.tahun}) harga ${akbar_rp(m.harga)}. Apakah masih tersedia?`;
  return `<div class="akbar_card akbar_muncul"><div class="akbar_motor_img">${m.gambar ? `<img src="${m.gambar}" alt="${m.nama}" loading="lazy" onerror="this.replaceWith('${m.ikon}')">` : m.ikon}</div><h3>${m.nama}</h3>
  <span class="akbar_tag">${m.tahun}</span><span class="akbar_tag">${m.km.toLocaleString("id-ID")} km</span><span class="akbar_tag">${m.cc} cc</span>
  <div class="akbar_harga">${akbar_rp(m.harga)}</div>
  <a class="akbar_btn" style="margin:.3rem 0 0;padding:.5rem 1.1rem" target="_blank" rel="noopener" href="${akbar_wa_link(teks)}">Tanya via WA</a></div>`;
}
const akbar_unggulan = document.getElementById("akbar_featured");
if (akbar_unggulan) akbar_unggulan.innerHTML = akbar_motor.slice(0,3).map(akbar_kartu).join("");

// katalog: cari, filter merk, urutkan
const akbar_grid = document.getElementById("akbar_grid");
if (akbar_grid){
  const cari = document.getElementById("akbar_cari"), merk = document.getElementById("akbar_merk"), urut = document.getElementById("akbar_urut");
  const tampil = () => {
    let d = akbar_motor.filter(m => m.nama.toLowerCase().includes(cari.value.toLowerCase()) && (!merk.value || m.merk === merk.value));
    if (urut.value === "murah") d.sort((a,b) => a.harga - b.harga);
    if (urut.value === "mahal") d.sort((a,b) => b.harga - a.harga);
    if (urut.value === "baru") d.sort((a,b) => b.tahun - a.tahun);
    akbar_grid.innerHTML = d.length ? d.map(akbar_kartu).join("") : "<p>Motor tidak ditemukan.</p>";
    akbar_amati();
  };
  [cari,merk,urut].forEach(e => e.addEventListener("input", tampil));
  tampil();
}

// simulasi kredit (bunga flat)
const akbar_kredit = document.getElementById("akbar_form_kredit");
if (akbar_kredit){
  akbar_kredit.addEventListener("submit", e => {
    e.preventDefault();
    const h = +document.getElementById("akbar_k_harga").value, dp = +document.getElementById("akbar_k_dp").value,
          t = +document.getElementById("akbar_k_tenor").value, b = +document.getElementById("akbar_k_bunga").value;
    const out = document.getElementById("akbar_k_hasil");
    if (!h || h < 1000000) { out.innerHTML = "Masukkan harga motor yang valid."; return; }
    const pokok = h - h * dp / 100, total = pokok + pokok * (b / 100) * (t / 12);
    out.innerHTML = `Cicilan: <span class="akbar_hasil">${akbar_rp(total / t)}</span> / bulan<br><small>DP ${akbar_rp(h*dp/100)} | Tenor ${t} bulan | Total bayar ${akbar_rp(total + h*dp/100)}</small>`;
  });
}

// form -> validasi lalu kirim ke WhatsApp
document.querySelectorAll("form.akbar_form[data-wa]").forEach(f => {
  f.addEventListener("submit", e => {
    e.preventDefault();
    const pesan = f.querySelector(".akbar_pesan");
    const hp = f.querySelector("[name=hp]");
    if (hp && !/^(\+62|62|0)8\d{7,12}$/.test(hp.value.replace(/[\s-]/g,""))) {
      pesan.className = "akbar_pesan akbar_err"; pesan.textContent = "Nomor HP tidak valid (contoh: 08123456789)."; return;
    }
    let teks = f.dataset.wa + "\n";
    f.querySelectorAll("input,select,textarea").forEach(i => { teks += `- ${i.dataset.label || i.name}: ${i.value}\n`; });
    pesan.className = "akbar_pesan akbar_ok"; pesan.textContent = "Terima kasih! Pesan Anda disiapkan, WhatsApp akan terbuka...";
    window.open(akbar_wa_link(teks), "_blank"); f.reset();
  });
});

// animasi muncul saat scroll + hitung angka
function akbar_amati(){
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting){ x.target.classList.add("akbar_tampil"); io.unobserve(x.target);} }), {threshold:.15});
  document.querySelectorAll(".akbar_muncul:not(.akbar_tampil)").forEach(el => io.observe(el));
}
akbar_amati();
document.querySelectorAll("[data-hitung]").forEach(el => {
  const target = +el.dataset.hitung; let n = 0;
  const step = setInterval(() => { n += Math.ceil(target / 60); if (n >= target){ n = target; clearInterval(step);} el.textContent = n.toLocaleString("id-ID") + (el.dataset.plus || ""); }, 25);
});
