<script>
let score = 0;
let scoreEl = document.getElementById("score");
let levelEl = document.getElementById("level");
let resultEl = document.getElementById("result");
let optionsEl = document.getElementById("options");
let questionEl = document.getElementById("question");
let retryBtn = document.getElementById("retry");
let correctSound = document.getElementById("correct-sound");
let wrongSound = document.getElementById("wrong-sound");

const scoreValues = [100, 200, 300, 500, 800, 1200, 2000, 3000, 4000, 5000];
let perguntaAtual = 0;

async function carregarPergunta() {
  const url = "https://script.google.com/macros/s/AKfycbyf18g5z8nJb23bsQTTVnPpu7Qat3EwOWHioCCY3nPSZiZrTAhAAPMdos11x-yh60J0dw/exec"; 
  const response = await fetch(url);
  const data = await response.json();

  if (data.erro) {
    alert(data.erro);
    return;
  }

  questionEl.innerText = data.pergunta;
  levelEl.innerText = `Tema: ${data.tema} | Nível: ${data.nivel}`;
  scoreEl.innerText = `Pontuação: R$ ${score}`;
  optionsEl.innerHTML = "";
  resultEl.innerText = "";
  retryBtn.style.display = "none";

  const opcoes = ['a', 'b', 'c', 'd'];
  opcoes.forEach(op => {
    const btn = document.createElement("button");
    btn.innerText = data[op];
    btn.onclick = () => verificarResposta(op === data.correta);
    optionsEl.appendChild(btn);
  });
}

function verificarResposta(acertou) {
  const botoes = optionsEl.querySelectorAll("button");
  botoes.forEach(b => b.disabled = true);

  if (acertou) {
    correctSound.play();
    resultEl.innerText = "Resposta correta!";
    score += scoreValues[Math.min(perguntaAtual, scoreValues.length - 1)];
    perguntaAtual++;
    setTimeout(() => {
      carregarPergunta();
    }, 1500);
  } else {
    wrongSound.play();
    resultEl.innerText = `Errou! Pontuação final: R$ ${score}`;
    retryBtn.style.display = "block";
  }
}

retryBtn.onclick = () => {
  score = 0;
  perguntaAtual = 0;
  carregarPergunta();
};

window.onload = carregarPergunta;
</script>
