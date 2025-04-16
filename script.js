
async function carregarPergunta() {
  const response = await fetch(https://script.google.com/macros/s/AKfycbxC6kZMiC0snTVMrn0YXkCkgcateCxlundunmn7P4nsi9Po273hicOtKVpTTGHxHcbojw/exec);
  const data = await response.json();

  questionEl.innerText = data.pergunta;
  levelEl.innerText = `Nível: ${data.nivel}`;
  scoreEl.innerText = `Pontuação: R$ ${score}`;
  optionsEl.innerHTML = "";

  const opcoes = ['a', 'b', 'c', 'd'];
  opcoes.forEach(letra => {
    let btn = document.createElement("button");
    btn.innerText = data[letra];
    btn.onclick = () => verificarResposta(letra === data.correta);
    optionsEl.appendChild(btn);
  });
}

];

let currentQuestion = 0;
let score = 0;
const scoreValues = [100, 200, 300, 500, 800, 1200, 2000, 3000, 4000, 5000];
let questionEl = document.getElementById("question");
let optionsEl = document.getElementById("options");
let resultEl = document.getElementById("result");
let scoreEl = document.getElementById("score");
let levelEl = document.getElementById("level");
let retryBtn = document.getElementById("retry");
let correctSound = document.getElementById("correct-sound");
let wrongSound = document.getElementById("wrong-sound");

function showQuestion() {
  let q = questions[currentQuestion];
  questionEl.innerText = q.question;
  levelEl.innerText = `Nível: ${q.level}`;
  scoreEl.innerText = `Pontuação: R$ ${score}`;
  optionsEl.innerHTML = "";
  resultEl.innerText = "";
  retryBtn.style.display = "none";

  q.options.forEach((option, index) => {
    let btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(index, btn);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected, button) {
  const q = questions[currentQuestion];
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);

  if (selected === q.answer) {
    correctSound.play();
    resultEl.innerText = "Resposta correta!";
    button.classList.add("correct");
    score += scoreValues[currentQuestion];
    currentQuestion++;
    setTimeout(() => {
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        scoreEl.innerText = `Pontuação final: R$ ${score}`;
        resultEl.innerText = "Parabéns! Você acertou todas!";
        optionsEl.innerHTML = "";
      }
    }, 1500);
  } else {
    wrongSound.play();
    resultEl.innerText = `Errou! Pontuação final: R$ ${score}`;
    button.classList.add("wrong");
    optionsEl.querySelectorAll("button")[q.answer].classList.add("correct");
    retryBtn.style.display = "block";
  }
}

retryBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  showQuestion();
};

showQuestion();
