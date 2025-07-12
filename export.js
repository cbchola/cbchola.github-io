// export.js
import { getKas, resetKas } from './kas.js';

const exportExcelBtn = document.getElementById('exportExcel');
const hapusSemuaBtn = document.getElementById('hapusSemua');
const printPDFBtn = document.getElementById('printPDF');

exportExcelBtn.addEventListener('click', () => {
  const data = getKas();
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Kas");
  XLSX.writeFile(wb, "kas_organisasi.xlsx");
});

hapusSemuaBtn.addEventListener('click', () => {
  if (confirm("Hapus semua data?")) {
    resetKas();
    location.reload();
  }
});

printPDFBtn.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const data = getKas();
  doc.text("Laporan Kas Organisasi", 20, 10);
  doc.autoTable({
    head: [["Tanggal", "Nama", "Tipe", "Jumlah", "Keterangan", "Kategori"]],
    body: data.map(k => [k.tanggal, k.nama, k.tipe, k.jumlah, k.keterangan || '-', k.kategori || '-'])
  });
  doc.save('laporan_kas.pdf');
});
