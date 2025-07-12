// kas.js
let kas = JSON.parse(localStorage.getItem('kasOrganisasi')) || [];

function simpan() {
  localStorage.setItem('kasOrganisasi', JSON.stringify(kas));
}

function tambahKas(data) {
  kas.push(data);
  simpan();
}

function editKas(index, data) {
  kas[index] = data;
  simpan();
}

function hapusKas(index) {
  kas.splice(index, 1);
  simpan();
}

function getKas() {
  return kas;
}

function resetKas() {
  kas = [];
  simpan();
}

export { tambahKas, editKas, hapusKas, getKas, resetKas };
