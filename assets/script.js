//Array of quiz questions and correct answers
var quizQuestions = [
    {
        question: "What is the syntax to add a hover effect on your mouse?",
    },

     answers: {
            a: ":onhover",
            b: "element.hover",
            c: ":hover",
            d: "(hover = id)",
        },
        correctAnswer: 'c'
    
    {
        question: "Question 2",
        answers: {
            a: "Question 50",
            b: "Question 2",
            c: "Question 1",
            d: "Not this one",
        },
        correctAnswer: 'b'
    },
    {
        question: "Question 4",
        answers: {
            a: "Question 50",
            b: "Question 2",
            c: "Question 1",
            d: "This one",
        },
        correctAnswer: 'd'
    },
    {
        question: "Question 5",
        answers: {
            a: "Question 5",
            b: "Question 2",
            c: "Question 1",
            d: "Don't pick this one",
        },
        correctAnswer: 'a'
    },
];

//making new keywords attached to html elements
var quizContainer = document.getElementById('quiz');
var quizAnswers = document.getElementById('answers')
var resultsContainer = document.getElementById('results');
var startButton = document.getElementById('start');
var submitButton = document.getElementById('submit');
var timerContainer = document.getElementById('timer');

//setting initial information for quiz
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;

//adds start quiz function with timer 
function startQuiz(){
    
    timerInterval = setInterval(function() {//timerInterval is described, repeats line of code
        timeLeft--; //time left is set to -- because timeleft is set to 60 so it will decrease by 1 evertime it repeats
        timerContainer.textContent = 'Time: ' + timeLeft; //displays id timer with "time:" and adds timeLeft function to display correct time

        if (timeLeft <=0|| currentQuestionIndex === quizQuestions.length) {//ends timer if time reaches 0
            endQuiz();//quiz ends when time reaches 0
        }
    }, 1000);//adds delay of 1000 milliseconds to function repeat

    showQuestion();
}

function showQuestion(){//adds function to show questions on screen
    var currentQuestion= quizQuestions[currentQuestionIndex];//creates array with questions and sets it to the curent question number youre on
    var answers = [];//sets answers to empty string

    for (var letter in currentQuestion.answers) {//selects letters of the current question in answers array
        answers.push(//adds new item to answers, and repeats for each letter
            '<label>'
            + '<input type="checkbox" name="question'+ currentQuestionIndex+'" value="'+ letter + '">'
            + letter + ': '
            + currentQuestion.answers[letter]
            + '</checkbox>'
        );
    }

    quizContainer.innerHTML = '<div class="question">' + currentQuestion.question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>';
}

function checkAnswer() {
    var selectedOption = document.querySelector('input[name="question' + currentQuestionIndex + '"]:checked');
    
    if (selectedOption) {
        var selectedAnswer = selectedOption.value;

        if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
            score++;
        } else {
            timeLeft -= 10;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex === quizQuestions.length || timeLeft <= 0) {
            endQuiz();
        } else {
            showQuestion();
        }
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    timerContainer.textContent = 'Time: ' + timeLeft;
    quizContainer.innerHTML = '';

    var finalScore = Math.max(0, score * (timeLeft > 0 ? 1 : 0));

    resultsContainer.innerHTML = 'Final Score: ' + finalScore;

    var initials = prompt('Enter your initials:');
   
    localStorage.setItem('quizScore', finalScore);
    localStorage.setItem('quizInitials', initials);
}

startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', checkAnswer);
