//Array of quiz questions and correct answers
var quizQuestions = [
  {
    question: "What is the syntax to add a hover effect on your mouse?",
    options: [
      ":onhover",
      "element.hover",
      ":hover",
      "(hover = id)",
    ],
    correctAnswer: ":hover"
  },
  {
    question: "Question 2",
    options: [
      "Question 50",
      "Question 2",
      "Question 1",
      "Not this one",
    ],
    correctAnswer: "Question 2"
  },
  {
    question: "Question 4",
    options: [
      "Question 50",
      "Question 2",
      "Question 1",
      "This one",
    ],
    correctAnswer: "This one"
  },
  {
    question: "Question 5",
    options: [
      "Question 5",
      "Question 2",
      "Question 1",
      "Don't pick this one",
    ],
    correctAnswer: "Question 5"
  },
];

const startQuizButton = document.getElementById("start-quiz");
const timerElement = document.getElementById("timer");
const submitButton = document.getElementById("submit");
const questionContainer = document.getElementById("question-container");
const optionList = document.getElementById("option-list");
const feedbackText = document.getElementById("feedback-text");

let timer = 60;
let intervalId = null;
let score = 0;
let currentQuestionIndex = 0;

function updateTimer() {
  timer--;
  timerElement.textContent = timer;

  if (timer === 0) {
    stopTimer();
    endQuiz();
  }
}

function startTimer() {
  timerElement.textContent = timer;
  intervalId = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

function endQuiz() {
  questionContainer.style.display = "none";
  submitButton.style.display = "none";


  localStorage.setItem("quizScore", score);


  window.open("./assets/HighScores.html", "_blank");

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Quiz";
  restartButton.addEventListener("click", restartQuiz);
  questionContainer.appendChild(restartButton);
}

function checkAnswer(selectedOption) {
  const question = quizQuestions[currentQuestionIndex];

  if (selectedOption === question.correctAnswer) {
    score++;
    feedbackText.textContent = "Correct!";
    feedbackText.classList.add("correct");
  } else {
    timer -= 10;
    timer = Math.max(timer, 0);
    timerElement.textContent = timer;
    feedbackText.textContent = "Wrong!";
    feedbackText.classList.add("wrong");
  }

  optionList.innerHTML = "";

  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    stopTimer();
    endQuiz();
  }
}

function showQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  const options = question.options;

  questionContainer.innerHTML = "";
  optionList.innerHTML = "";

  const questionElement = document.createElement("h2");
  questionElement.textContent = question.question;
  questionContainer.appendChild(questionElement);

  options.forEach((option) => {
    const optionItem = document.createElement("li");
    optionItem.textContent = option;
    optionItem.addEventListener("click", () => checkAnswer(option));
    optionList.appendChild(optionItem);
  });
  return;
}



function startQuiz() {
  startQuizButton.style.display = "none";
  questionContainer.style.display = "block";
  submitButton.style.display = "block";

  showQuestion();
  startTimer();

}
function restartQuiz() {
 
  score = 0;
  currentQuestionIndex = 0;
  timer = 60;
  feedbackText.textContent = "";
  timerElement.textContent = "";

  questionContainer.innerHTML = "";
  optionList.innerHTML = "";

  startQuiz();
}

startQuizButton.addEventListener("click", startQuiz);
