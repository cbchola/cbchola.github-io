// main-app.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const config = {
  apiKey: "AIzaSyDeKvLsBqZ-kXIcopKyqkqQnBFc4PD_wE0",
  authDomain: "cbchola-kas.firebaseapp.com",
  projectId: "cbchola-kas",
  storageBucket: "cbchola-kas.firebasestorage.app",
  messagingSenderId: "988391521907",
  appId: "1:988391521907:web:4b681dd787af12894b7406"
};

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);
const BENDARAHA_EMAIL = "bendahara@cbchola.com";

const loginBtn = document.getElementById("loginBtn");
const loginDialog = document.getElementById("loginDialog");
const openLogin = document.getElementById("openLogin");
const formKas = document.getElementById("formKas");
const tabelKas = document.getElementById("tabelKas");
const masuk = document.getElementById("masuk");
const keluar = document.getElementById("keluar");
const saldo = document.getElementById("saldo");
const grafikKas = document.getElementById("grafikKas").getContext('2d');
const filterBulan = document.getElementById("filterBulan");
const filterNama = document.getElementById("filterNama");
const exportExcel = document.getElementById("exportExcel");
const printPDF = document.getElementById("printPDF");
const filterArea = document.getElementById("filterArea");

let isBendahara = false;
let kasData = [];

const chart = new Chart(grafikKas, {
  type: 'bar',
  data: { labels: [], datasets: [
    { label: 'Masuk', data: [], backgroundColor: '#22c55e' },
    { label: 'Keluar', data: [], backgroundColor: '#ef4444' }
  ] },
  options: {
    responsive: true,
    plugins: { legend: { labels: { color: getComputedStyle(document.body).getPropertyValue('--text') } } },
    scales: {
      x: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text') } },
      y: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text') } }
    }
  }
});

openLogin.addEventListener("click", () => loginDialog.style.display = "block");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential.user.email === BENDARAHA_EMAIL) {
      isBendahara = true;
      formKas.style.display = "block";
      filterArea.style.display = "flex";
    }
    loginDialog.style.display = "none";
    loadDataKas();
  } catch (err) {
    alert("Login gagal: " + err.message);
  }
});

formKas.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    nama: document.getElementById("nama").value,
    tanggal: document.getElementById("tanggal").value,
    tipe: document.getElementById("tipe").value,
    jumlah: parseInt(document.getElementById("jumlah").value),
    keterangan: document.getElementById("keterangan").value,
    kategori: document.getElementById("kategori").value
  };
  await addDoc(collection(db, "kas"), data);
  formKas.reset();
  loadDataKas();
});

async function loadDataKas() {
  const snapshot = await getDocs(collection(db, "kas"));
  kasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  renderTable();
}

function renderTable() {
  const bulan = filterBulan.value;
  const nama = filterNama.value.toLowerCase();
  const filtered = kasData.filter(k => {
    const matchBulan = !bulan || k.tanggal.startsWith(bulan);
    const matchNama = !nama || k.nama.toLowerCase().includes(nama);
    return matchBulan && matchNama;
  });

  let totalMasuk = 0;
  let totalKeluar = 0;
  tabelKas.innerHTML = filtered.map(k => {
    if (k.tipe === "Masuk") totalMasuk += k.jumlah;
    else totalKeluar += k.jumlah;
    return `<tr>
      <td>${k.tanggal}</td><td>${k.nama}</td><td>${k.tipe}</td>
      <td>Rp ${k.jumlah.toLocaleString()}</td>
      <td>${k.keterangan}</td><td>${k.kategori}</td>
      <td>${isBendahara ? `<button onclick="hapusTransaksi('${k.id}')">Hapus</button>` : ''}</td>
    </tr>`;
  }).join('');

  masuk.textContent = `Rp ${totalMasuk.toLocaleString()}`;
  keluar.textContent = `Rp ${totalKeluar.toLocaleString()}`;
  saldo.textContent = `Rp ${(totalMasuk - totalKeluar).toLocaleString()}`;
  updateChart(filtered);
}

async function hapusTransaksi(id) {
  if (!confirm("Yakin hapus?")) return;
  await deleteDoc(doc(db, "kas", id));
  loadDataKas();
}

function updateChart(data) {
  const perBulan = {};
  data.forEach(i => {
    const key = i.tanggal.slice(0, 7);
    if (!perBulan[key]) perBulan[key] = { Masuk: 0, Keluar: 0 };
    perBulan[key][i.tipe] += i.jumlah;
  });
  const labels = Object.keys(perBulan).sort();
  chart.data.labels = labels;
  chart.data.datasets[0].data = labels.map(b => perBulan[b].Masuk);
  chart.data.datasets[1].data = labels.map(b => perBulan[b].Keluar);
  chart.update();
}

exportExcel.addEventListener("click", () => {
  const ws = XLSX.utils.json_to_sheet(kasData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Kas");
  XLSX.writeFile(wb, "kas_cbchola.xlsx");
});

printPDF.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Laporan Kas CB CHOLA", 20, 10);
  doc.autoTable({
    head: [["Tanggal", "Nama", "Tipe", "Jumlah", "Keterangan", "Kategori"]],
    body: kasData.map(k => [k.tanggal, k.nama, k.tipe, k.jumlah, k.keterangan, k.kategori])
  });
  doc.save("laporan_cbchola.pdf");
});

filterBulan.addEventListener("change", renderTable);
filterNama.addEventListener("input", renderTable);

document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

window.addEventListener('DOMContentLoaded', () => {
  loadDataKas(); // otomatis muat kas saat halaman dibuka
});

