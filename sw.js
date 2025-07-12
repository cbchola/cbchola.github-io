// sw.js
const CACHE_NAME = 'cbchola-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './main-app.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Anggota tambahan dan motivasi
self.daftarAnggota = [
  "GUFRON", "IMAN", "ARDI", "FHAISAL", "RIKI", "BINTANG", "ILZAM", "DEVI", "ROZAK", "BAGONG",
  "JOKO", "FIRDAUS", "NYOT", "SAHRONI", "ERIK", "BRED", "PETOK", "ANTOK", "ABBY", "WILDAN", "AKBAR",
  "GALIH", "YOGI", "RAKA", "FAJAR", "NIKO", "ZUL", "RONALD", "TOMMY", "IRFAN"
];

self.pesanMotivasi = [
  "Yuk, bagi yang belum menyetor kas, mari lengkapi kewajiban kita bersama. Sedikit dari kita, besar untuk kebersamaan!",
  "Kas bukan sekadar iuran, tapi wujud komitmen dan kebersamaan keluarga CB CHOLA. Saling jaga, saling bantu, saling kuat!",
  "CB CHOLA bukan hanya nama, tapi semangat satu hati. Mari terus tumbuh, berdaya, dan solid!",
  "Yang belum sempat bayar bulan ini, yuk semangat! Kita semua pernah sibuk, tapi bareng-bareng kita bisa saling kuatkan.",
  "Kita kuat karena saling melengkapi. Yuk, yang belum sempat bayar, mari lanjutkan semangat kebersamaan kita!",
  "Iuran kas bukan beban, tapi bentuk dukungan untuk kebaikan bersama. Semangat terus keluarga CB CHOLA!",
  "Sedikit dari masing-masing kita, besar manfaatnya untuk semua. Kasih support yuk, biar makin solid!",
  "Bersama kita bisa lebih baik. Jangan biarkan satu pun tertinggal. Ayo lengkapi iuran kas bulan ini!",
  "CB CHOLA bukan sekadar nama, tapi komitmen. Yuk jaga kekompakan, satukan langkah!",
  "Kebersamaan dimulai dari hal kecil. Kas kita, semangat kita, kekuatan kita!",
  "Yuk kita saling mengingatkan. Bukan karena lupa, tapi karena peduli. Waktunya setor kas!",
  "Jangan tunggu nanti. Sedikit hari ini untuk kekuatan besar esok hari. Setor kas yuk!"
];
