/*
  PERSONALIZE AQUI:
  1) Defina a data especial em DATA_INICIAL (formato AAAA-MM-DD) para ativar o contador de dias.
  2) Adicione sua música em assets/musica.mp3.
*/
const DATA_INICIAL = ""; // Exemplo: "2026-05-14" — deixe vazio até escolher a data.

const envelope = document.getElementById("envelope");
const letterContent = document.getElementById("letterContent");
const envelopeHint = document.getElementById("envelopeHint");

envelope.addEventListener("click", () => {
  const opened = envelope.classList.toggle("open");
  letterContent.classList.toggle("show", opened);
  letterContent.setAttribute("aria-hidden", String(!opened));
  envelopeHint.textContent = opened ? "Sua cartinha está aberta 💜" : "Toque no envelope para abrir";
  if (opened) setTimeout(() => letterContent.scrollIntoView({behavior:"smooth", block:"center"}), 350);
});
document.getElementById("goLetter").addEventListener("click", () => {
  document.getElementById("cartinha").scrollIntoView({behavior:"smooth"});
});
document.getElementById("closeLetter").addEventListener("click", () => {
  envelope.classList.remove("open");
  letterContent.classList.remove("show");
  letterContent.setAttribute("aria-hidden","true");
  envelopeHint.textContent = "Toque no envelope para abrir";
});

const audio = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
musicToggle.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicLabel.textContent = "Pausar música";
    } catch (e) {
      musicLabel.textContent = "Adicione assets/musica.mp3";
    }
  } else {
    audio.pause();
    musicLabel.textContent = "Ligar música";
  }
});
audio.addEventListener("ended", () => musicLabel.textContent = "Ligar música");

// Contador de dias ao lado dela, a partir de DATA_INICIAL.
const daysCounter = document.getElementById("daysCounter");
const daysNumber = document.getElementById("daysNumber");
if (DATA_INICIAL) {
  const start = new Date(`${DATA_INICIAL}T00:00:00`);
  if (!isNaN(start)) {
    const diff = Math.max(0, Math.floor((Date.now() - start.getTime()) / 86400000));
    daysNumber.textContent = diff;
    daysCounter.setAttribute("aria-hidden", "false");
    daysCounter.classList.add("show");
  }
}

// Pequenos corações discretos, sem bloquear os botões.
function makeHeart(){
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > .5 ? "♡" : "✧";
  heart.style.left = `${Math.random()*100}vw`;
  heart.style.fontSize = `${12+Math.random()*15}px`;
  heart.style.animationDuration = `${4+Math.random()*3}s`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(),7500);
}
setInterval(makeHeart,1800);
