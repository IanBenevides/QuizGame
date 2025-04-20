<script>
const questions = [
  {
    question: "Qual é a função da linguagem que prioriza a informação objetiva e clara?",
    options: ["Poética", "Referencial", "Conativa", "Metalinguística"],
    answer: 1,
    level: "Fácil"
  },
  {
    question: "A função da linguagem usada para convencer ou influenciar o receptor é:",
    options: ["Emotiva", "Referencial", "Conativa", "Fática"],
    answer: 2,
    level: "Fácil"
  },
  {
    question: "Qual elemento da comunicação está mais relacionado ao canal?",
    options: ["Código", "Mensagem", "Receptor", "Fática"],
    answer: 3,
    level: "Fácil"
  },
  {
    question: "Na palavra 'infelizmente', o prefixo 'in-' indica:",
    options: ["Aumento", "Negação", "Intensidade", "Tempo"],
    answer: 1,
    level: "Médio"
  },
  {
    question: "A palavra 'felizmente' é formada por:",
    options: ["Radical e desinência", "Prefixo e radical", "Radical e sufixo", "Prefixo e sufixo"],
    answer: 2,
    level: "Médio"
  },
  {
    question: "A função metalinguística é usada quando:",
    options: [
      "Queremos convencer alguém",
      "Falamos sobre a própria linguagem",
      "Transmitimos emoção",
      "Conectamos o canal"
    ],
    answer: 1,
    level: "Médio"
  },
  {
    question: "Na comunicação, o emissor é responsável por:",
    options: ["Decodificar", "Transmitir a mensagem", "Codificar", "Ouvir"],
    answer: 2,
    level: "Fácil"
  },
  {
    question: "A função emotiva é centrada em qual elemento?",
    options: ["Mensagem", "Código", "Emissor", "Receptor"],
    answer: 2,
    level: "Fácil"
  },
  {
    question: "A palavra 'releitura' contém:",
    options: ["Prefixo e radical", "Radical e sufixo", "Prefixo, radical e sufixo", "Radical e desinência"],
    answer: 0,
    level: "Médio"
  },
  {
    question: "Em 'amávamos', a desinência verbal indica:",
    options: ["Pessoa e número", "Tempo e modo", "Grau e gênero", "Voz passiva"],
    answer: 1,
    level: "Difícil"
  }
];

let currentQuestion = 0;
let score = 0;
let perguntaAtual = 0;

const scoreValues = [100, 200, 300, 500, 800, 1200, 2000, 3000, 4000, 5000];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const retryBtn = document.getElementById("retry");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

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
    score += scoreValues[Math.min(perguntaAtual, scoreValues.length - 1)];
    perguntaAtual++;
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
  perguntaAtual = 0;
  showQuestion();
};

window.onload = showQuestion;
</script>
