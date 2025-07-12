// auth.js
import { auth } from './firebase-init.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const BENDARAHA_EMAIL = "bendahara@cbchola.com";
let isBendahara = false;

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user.email === BENDARAHA_EMAIL) {
      isBendahara = true;
      document.getElementById("bendaharaArea").style.display = "block";
      alert("Login berhasil sebagai bendahara");
    } else {
      alert("Login berhasil, tapi Anda bukan bendahara.");
    }

    document.getElementById("loginDialog").style.display = "none";
    document.dispatchEvent(new CustomEvent("login-success", { detail: { isBendahara } }));
  } catch (error) {
    alert("Login gagal: " + error.message);
  }
});
