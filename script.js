const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const message = document.getElementById("message");
const music = document.getElementById("music");

let refuses = 0;
const canVibrate = "vibrate" in navigator;

// 🔴 Messages progressifs pour les NON
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
  "La réalité commence à trembler.",
  "Ce choix te suit partout.",
  "Même en haut des tours, on tombe vers le cœur.",
  "Le système doute…",
  "Erreur de cohérence détectée.",
  "Les néons vacillent.",
  "Le futur insiste.",
  "Même le code résiste.",
  "Le réseau te surveille.",
  "Le système ne lâche rien."
];

// 🎵 musique au premier clic
document.addEventListener("click", () => {
  music.play().catch(() => {});
}, { once: true });

noBtn.addEventListener("click", () => {
  refuses++;

  if (refuses <= messages.length && refuses < 25) {
    message.textContent = messages[refuses - 1];
  }

  // FIN AU 25e NON
  if (refuses === 25) {
    if (canVibrate) navigator.vibrate([400, 100, 400]);

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
        font-family:Arial, sans-serif;
        padding:20px;
      ">
        <h1 style="font-size:3rem;">DÉCLINÉ 😭💧</h1>
        <p style="margin-top:20px; font-size:1.2rem;">
          Ne me le dis pas.<br>
          Je le savais.
        </p>
      </div>
    `;
  }

  if (refuses < 25) {
    yesBtn.style.transform = `scale(${1 + refuses * 0.12})`;
    noBtn.style.transform = `scale(${Math.max(0.7, 1 - refuses * 0.08)})`;
  } else if (canVibrate) {
    navigator.vibrate([100, 50, 100]);
  }
});

yesBtn.addEventListener("click", () => {

  fetch("https://ntfy.sh/dwain-valentine", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: "❤️ Lily-rose a cliqué OUI ❤️"
  }).catch(() => {});

  // Page ACCEPTÉ avec petit message
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
      <p>Lily-rose & Dwain</p>
      <p style="margin-top:15px; font-size:1rem; color:#ff6666;">
        Ne me donne pas la réponse, dis-moi juste… ta vie sera plus belle avec moi ?
      </p>
    </div>
  `;
});
