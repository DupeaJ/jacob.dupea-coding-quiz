const storedScore = localStorage.getItem("quizScore");

if (storedScore) {
  const scoreList = document.getElementById("score-list");
  const scoreItem = document.createElement("li");
  scoreItem.textContent = "Score: " + storedScore;
  scoreList.appendChild(scoreItem);
}