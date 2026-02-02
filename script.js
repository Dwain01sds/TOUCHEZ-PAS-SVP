const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const message = document.getElementById("message");
const music = document.getElementById("music");

let refuses = 0;
const canVibrate = "vibrate" in navigator;

// 🔴 Messages inspirés Cyberpunk / High-Rise Invasion
const messages = [
  "Le système refuse ce choix.",
  "Option bloquée par le réseau.",
  "Les données ne vont pas dans ce sens.",
  "Cette décision n'existe pas dans cette timeline.",
  "Le monde ne s'est pas construit pour ce NON.",
  "Tu essaies de fuir, mais le système te rattrape.",
  "Même au sommet, il n’y a qu’une issue.",
  "Les masques tombent quand on hésite.",
  "La survie, c’est parfois choisir le cœur.",
  "Les règles ont été écrites pour être brisées.",
  "Tu peux courir… mais le choix reste là.",
  "Les néons s’éteignent quand tu refuses.",
  "Ce monde est cruel, mais honnête.",
  "Chaque NON renforce le OUI.",
  "Les probabilités s’effondrent.",
  "Et qui a décidé ça ",
  "La réalité commence à trembler.",
  "Ce choix te suit partout.",
  "Même en haut des tours, on tombe vers le cœur.",
  "Le système doute…"
];

// 🎵 musique au premier clic (PC + mobile)
document.addEventListener("click", () => {
  music.play().catch(() => {});
}, { once: true });

noBtn.addEventListener("click", () => {
  refuses++;

  // 💬 Messages progressifs
  if (refuses <= messages.length) {
    message.textContent = messages[refuses - 1];
  }

  // 😭 au 21e clic
  if (refuses === 21) {
    message.textContent = "… en es-tu sûre ? 😭";

    // 🔔 NOTIFICATION AU 21e NON
    fetch("https://ntfy.sh/dwain-valentine", {
      method: "POST",
      body: "⚠️ Lily-rose a cliqué 21 fois sur NON 😭"
    });
  }

  // ☝️ Escanor après
  if (refuses === 24) {
    message.textContent = "Et qui a décidé ça ? ☝️";
  }

  // Boutons
  yesBtn.style.transform = `scale(${1 + refuses * 0.12})`;
  noBtn.style.transform = `scale(${Math.max(0.75, 1 - refuses * 0.08)})`;

  // 📳 vibration mobile
  if (canVibrate) {
    navigator.vibrate([80, 40, 80]);
  }
});


yesBtn.addEventListener("click", () => {

  // 🔔 notification ntfy (gratuit)
  fetch("https://ntfy.sh/dwain-valentine", {
    method: "POST",
    body: "❤️ Lily-rose a cliqué OUI ❤️"
  });

  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      background:black;
      color:#ff3333;
      text-align:center;
      padding:20px;
    ">
      <h1>❤️ ACCEPTÉ ❤️</h1>
      <p style="margin-top:10px;">Lily-rose & Dwain</p>
      <p style="margin-top:20px; font-size:0.9rem;">
        Peu importe le chemin, cette timeline restera spéciale.
      </p>
      <img src="rose1.jpg" width="200" style="margin-top:20px;">
      <img src="rose2.jpg" width="200" style="margin-top:10px;">
      <img src="rose3.jpg" width="200" style="margin-top:10px;">
    </div>
  `;
});
