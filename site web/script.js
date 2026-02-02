const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const message = document.getElementById("message");
const music = document.getElementById("music");

let refuses = 0;
const canVibrate = "vibrate" in navigator;

const messages = [
  "Le système refuse ce choix.",
  "Cette option est indisponible.",
  "Erreur critique.",
  "Il ne reste qu'une option ❤️"
];

// musique au premier clic
document.addEventListener("click", () => {
  music.play().catch(()=>{});
}, { once: true });

noBtn.addEventListener("click", () => {
  refuses++;
  message.textContent = messages[Math.min(refuses-1, messages.length-1)];

  yesBtn.style.transform = `scale(${1 + refuses*0.15})`;
  noBtn.style.transform = `scale(${Math.max(0.8,1-refuses*0.1)})`;

  if (canVibrate) navigator.vibrate(120);
});

yesBtn.addEventListener("click", () => {

  // 🔔 NOTIFICATION POUR TOI
  fetch("https://ntfy.sh/dwain-valentine", {
    method: "POST",
    body: "❤️ Lily-rose a cliqué OUI ❤️"
  }); 

  document.body.innerHTML = `
    <div style="color:red;text-align:center;">
      <h1>❤️ ACCEPTÉ ❤️</h1>
      <p>Lily-rose & Dwain</p>
      <img src="rose1.jpg" width="200"><br><br>
      <img src="rose2.jpg" width="200"><br><br>
      <img src="rose3.jpg" width="200">
    </div>
  `;
});
