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
    question: "How do you comment and add notes in JavaScript?",
    options: [
      "<!--comment>",
      "//comment",
      "/comment",
      "*comment*",
    ],
    correctAnswer: "//comment"
  },
  {
    question: "What HTML tag is used for a style sheet?",
    options: [
      "<script>",
      "<sylesheet>",
      "<color>",
      "<style>",
    ],
    correctAnswer: "<style>"
  },
  {
    question: "How do you store items in your javascript?",
    options: [
      "Object",
      "Boolean",
      "script",
      "HTML",
    ],
    correctAnswer: "Object"
  },
];

const startQuizButton = document.getElementById("start-quiz");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restart");
const questionContainer = document.getElementById("question-container");
const optionList = document.getElementById("option-list");
const feedbackText = document.getElementById("feedback-text");

let timer = 60; //timer is set to 60 constantant
let intervalId = null; //lets variable be empty until uppdated
let score = 0; //score equals 0 and updates per correct answer
let scoreTime = 0; //setting up recorder for time left on quiz
let currentQuestionIndex = 0; //sets currentQuestionIndex to start at 0 and we can update it to another question

function startQuiz() {
  startQuizButton.style.display = "none";//starting quiz removes button 
  questionContainer.style.display = "block";//sets container to block
  restartButton.style.display = "none";//changes restart button to hide

  showQuestion();//starts questions
  startTimer();//starts timer

}
function updateTimer() {//timer function, timer starts at constant 60 then updates minus 1 each time its called
  timer--;
  timerElement.textContent = timer;//selecting ID of timer, calling it and adding text to it in which the cuurent time on the timer is displayed

  if (timer === 0) { //when timer hits 0 the endquiz function and stoptimer function stop.
    stopTimer();
    endQuiz();
  }
}

function startTimer() { //timer start function calls update timer function every 1000 miliseconds
  timerElement.textContent = timer;
  intervalId = setInterval(updateTimer, 1000);
}

function stopTimer() {//stop timer function with clearInterval
  clearInterval(intervalId);
}

function endQuiz() { //endquiz function to hide questions and button
  // questionContainer.style.display = "none";
  restartButton.style.display = "block";
  
  localStorage.setItem("quizScore", score); //grabs quiz score and stores it locally under score
  localStorage.setItem("timeLeft", scoreTime);
  
  let promptini = prompt("please enter initials...", "harry potter");
  localStorage.setItem("initials", promptini);

  const storedScore = localStorage.getItem("quizScore");
  const storedTimeLeft = localStorage.getItem("timeLeft");
  const storedInintialsid = localStorage.getItem("initials");
  if (storedInintialsid) {
      const scoreList = document.getElementById("score-list");
      const scoreItem = document.createElement("li");
      scoreItem.textContent = "initials: " + storedInintialsid;
      scoreList.appendChild(scoreItem);
  }

  if (storedScore) {
      const scoreList = document.getElementById("score-list");
      const scoreItem = document.createElement("li");
      scoreItem.textContent = "Score: " + storedScore;
      scoreList.appendChild(scoreItem);
  }

  if (storedTimeLeft) {
      const scoreList = document.getElementById("score-list");
      const scoreItem = document.createElement("li");
      scoreItem.textContent = "Time: " + storedTimeLeft;
      scoreList.appendChild(scoreItem);
  }
  // window.open("./assets/HighScores.html", "_blank"); //when quiz is over opens new tab with scores stored in local
  
}

function checkAnswer(selectedOption) { //defines checkAnswer under the selected question
  const question = quizQuestions[currentQuestionIndex]; //the number the index is on is the question

  if (selectedOption === question.correctAnswer) { //if user inputed option is equal to the current questions correct answer 
    score++;//then the score will be updated to +1 of current value of score
    scoreTime = timer;
    feedbackText.textContent = "Correct!";//places a nice correct string text
    feedbackText.classList.add("correct");//adds element correct list and displays it
  } else {//or else if the answer was wrong it minus's 10 seconds of the timers current time
    timer -= 10;
    timer = Math.max(timer, 0); //stops timer from going below 0
    timerElement.textContent = timer;//specifies to use current time
    scoreTime = timer;
    feedbackText.textContent = "Wrong!";//adds list and text saying wrong
    feedbackText.classList.add("wrong");
  }

  optionList.innerHTML = "";//removes text/question

  if (currentQuestionIndex < quizQuestions.length - 1) { //determines if current index is less than the length of the questions -1 
     currentQuestionIndex++;//update to next question in index
    showQuestion();//repeat show function unless all questions are answered
  } else {//then it stops the timer and quiz
    endQuiz();
    stopTimer();
    
    }
  }

function showQuestion() { //updates show Question 
  const question = quizQuestions[currentQuestionIndex];//const of question is the current question in index
  const options = question.options;//options equal all the options for answering the question

  questionContainer.innerHTML = ""; //clearstext of questions
  optionList.innerHTML = "";//clears text of options

  const questionElement = document.createElement("h2"); //creates element h2 and assign the question to it in string form
  questionElement.textContent = question.question;
  questionContainer.appendChild(questionElement);//puts it onto the page in the questions container

  options.forEach((option) => { //similar to the last but where making a list of the available options 
    const optionItem = document.createElement("li");
    optionItem.textContent = option; 
    optionItem.addEventListener("click", () => checkAnswer(option));//adds event listener onto option items with click function and we call to check the answer of which option clicked
    optionList.appendChild(optionItem);//appends it to the page
  });
  
}







function restartQuiz() {//defines the restart function 
  localStorage.removeItem("timeLeft");
  score = 0;//sets all elements back to default no matter where youre at
  currentQuestionIndex = 0;
  timer = 60;
  feedbackText.textContent = "";//empties the correct or wrong text
  timerElement.textContent = "";//emptys the timer

  questionContainer.innerHTML = "";//empties questions
  optionList.innerHTML = "";//empties options

  startQuiz(); //starts up startQuiz again
}



restartButton.addEventListener("click", restartQuiz);//adds click funstion to restart quiz when u click restart, then calls the restatQuiz function
startQuizButton.addEventListener("click", startQuiz);//adds click event to The start quiz button, then runs the startQuiz function
