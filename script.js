const questions = [
  {
    question: "Quanto é 6 dividido por 2?",
    options: ["2", "3", "4", "5"],
    answer: 1,
    level: "Fácil"
  },
  {
    question: "Qual é o resultado de 9 ÷ 3?",
    options: ["3", "6", "9", "2"],
    answer: 0,
    level: "Fácil"
  },
  {
    question: "12 dividido por 1 é igual a:",
    options: ["12", "1", "11", "13"],
    answer: 0,
    level: "Fácil"
  },
  {
    question: "8 ÷ 2 resulta em:",
    options: ["2", "3", "4", "5"],
    answer: 2,
    level: "Fácil"
  },
  {
    question: "Dividir 15 por 3 dá:",
    options: ["6", "5", "4", "3"],
    answer: 1,
    level: "Fácil"
  },
  {
    question: "Quanto é 10 ÷ 2?",
    options: ["2", "4", "5", "6"],
    answer: 2,
    level: "Fácil"
  },
  {
    question: "1 dividido por 1 é:",
    options: ["0", "1", "2", "3"],
    answer: 1,
    level: "Fácil"
  },
  {
    question: "20 ÷ 2 é igual a:",
    options: ["10", "5", "20", "2"],
    answer: 0,
    level: "Fácil"
  },
  {
    question: "9 dividido por 1 resulta em:",
    options: ["9", "1", "0", "3"],
    answer: 0,
    level: "Fácil"
  },
  {
    question: "18 ÷ 3 é igual a:",
    options: ["6", "3", "9", "5"],
    answer: 0,
    level: "Fácil"
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
