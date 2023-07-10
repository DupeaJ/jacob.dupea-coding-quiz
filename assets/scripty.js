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