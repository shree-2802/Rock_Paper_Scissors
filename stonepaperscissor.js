let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  lose: 0,
  ties: 0,
};
document.querySelector(".js-rock-button").addEventListener("click", () => {
  result("Rock");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  result("Paper");
});
document.querySelector(".js-scissors-button").addEventListener("click", () => {
  result("Scissors");
});
document.querySelector(".js-interval").addEventListener("click", () => {
  autoPlay();
});
document.querySelector(".js-reset").addEventListener("click", () => {
  (score.wins = 0), (score.lose = 0), (score.ties = 0);
  scoreUpdate();
  localStorage.removeItem("score");
  document.querySelector(".js-results").innerHTML = "";
  document.querySelector(".js-moves").innerHTML = "";
});
document.body.addEventListener("keydown", (event) => {
  let val = event.key.toLowerCase();
  console.log(val);
  if (val === "r") {
    result("Rock");
  } else if (val === "p") {
    result("Paper");
  } else if (val === "s") {
    result("Scissors");
  } else {
    alert("Invalid Key");
  }
});
function scoreUpdate() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.lose}, Ties: ${score.ties}`;
}
let results = "";
function computersMove() {
  let computerMove = "";
  let rand = Math.random();
  console.log(rand);
  if (rand >= 0 && rand < 1 / 3) computerMove = "Rock";
  else if (rand >= 1 / 3 && rand < 2 / 3) computerMove = "Paper";
  else computerMove = "Scissors";
  return computerMove;
}
function result(choice) {
  let cmove = computersMove();
  if (choice == "Rock") {
    if (cmove == "Rock") results = `Tie:|`;
    else if (cmove == "Paper") results = "You lose :(";
    else results = `You win :)`;
  } else if (choice == "Paper") {
    if (cmove == "Paper") results = `Tie:|`;
    else if (cmove == "Scissors") results = "You lose :(";
    else results = `You win :)`;
  } else {
    if (cmove == "Paper") results = `You win :)`;
    else if (cmove == "Scissors") results = `Tie:|`;
    else results = "You lose :(";
  }

  if (results === "You lose :(") score["lose"] += 1;
  else if (results === `You win :)`) score["wins"] += 1;
  else score["ties"] += 1;

  localStorage.setItem("score", JSON.stringify(score));
  document.querySelector(".js-results").innerHTML = `${results}`;
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="./images/${choice}-emoji.png" class="move"/>  <img src="./images/${cmove}-emoji.png" class="move"/> Computer`;
  scoreUpdate();
}
let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    confirm("Auto Playing...");
    intervalId = setInterval(function () {
      let cmove = computersMove();
      result(cmove);
    }, 2000);
    isAutoPlaying = true;
  } else {
    confirm("Do you wanna stop auto play?");
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
