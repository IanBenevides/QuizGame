
const questions = [
  {
    question: "Qual era a principal base econômica do Brasil durante a Primeira República?",
    options: ["Café", "Açúcar", "Minério de ferro", "Indústria"],
    answer: 0,
    level: "Fácil"
  },
  {
    question: "O que foi a política do 'café com leite'?",
    options: ["Uma união entre fazendeiros e operários", "A alternância de poder entre SP e MG", "A abolição da escravidão", "Um plano de industrialização"],
    answer: 1,
    level: "Fácil"
  },
  {
    question: "Qual grupo social teve mais influência política durante a Primeira República?",
    options: ["Operários", "Militares", "Coronéis e oligarquias rurais", "Imigrantes"],
    answer: 2,
    level: "Fácil"
  },
  {
    question: "Qual movimento questionou a estrutura da República Oligárquica no início do século XX?",
    options: ["Revolta da Armada", "Revolução Constitucionalista", "Revolta de Canudos", "Diretas Já"],
    answer: 2,
    level: "Médio"
  },
  {
    question: "O que foi a Revolta da Vacina (1904)?",
    options: ["Um protesto contra a escravidão", "Uma campanha a favor da vacinação", "Uma revolta popular contra vacinação obrigatória", "Um motim militar"],
    answer: 2,
    level: "Médio"
  },
  {
    question: "Qual cidade foi o foco da modernização urbana durante a chamada Belle Époque brasileira?",
    options: ["Salvador", "Belo Horizonte", "São Paulo", "Rio de Janeiro"],
    answer: 3,
    level: "Fácil"
  },
  {
    question: "O que caracterizou a Belle Époque brasileira?",
    options: ["Início da agricultura de subsistência", "Influência europeia na arte, arquitetura e comportamento", "Fim do coronelismo", "Reformas agrárias"],
    answer: 1,
    level: "Médio"
  },
  {
    question: "Qual autor criticou a desigualdade social da Primeira República em sua obra?",
    options: ["Lima Barreto", "Carlos Drummond", "Machado de Assis", "Cecília Meireles"],
    answer: 0,
    level: "Difícil"
  },
  {
    question: "A modernização urbana do Rio de Janeiro resultou em:",
    options: ["Melhoria imediata para os pobres", "Expulsão de moradores das áreas centrais", "Industrialização da cidade", "Redução das doenças"],
    answer: 1,
    level: "Médio"
  },
  {
    question: "O termo 'Bela Época' era usado para:",
    options: ["Definir o crescimento rural", "Criticar o governo militar", "Exaltar os avanços tecnológicos e culturais da elite urbana", "Falar sobre o Império"],
    answer: 2,
    level: "Médio"
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
