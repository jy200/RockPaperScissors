var currentRound = 0;
var totalRounds = 0;
var matchStart = false;
var animationPlaying = false;
var statsOpened = false;
var rockPlayed = 0,
  paperPlayed = 0,
  scissorsPlayed = 0;
var enemyHand = "";
// temporary
var defeats = 0,
  wins = 0,
  draws = 0;
// For stats summary: round and total
var rDefeats = 0,
  rWins = 0,
  rDraws = 0;
var tDefeats = 0,
  tWins = 0,
  tDraws = 0;

var yourWins = document.getElementById("your-wins");
var enemyWins = document.getElementById("computer-wins");
const btns = document
  .querySelector(".matchSelection")
  .querySelectorAll("button");
const score = document.querySelector(".scoreboard");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const winText = document.getElementById("win");
const loseText = document.getElementById("lose");
const drawText = document.getElementById("draw");
const rPlayedText = document.getElementById("rockPlayed");
const pPlayedText = document.getElementById("paperPlayed");
const sPlayedText = document.getElementById("scissorsPlayed");

const round_text = document.getElementById("round-text");
const match_card_1 = document.getElementById("match-card-1");
const match_img_1 = document.getElementById("match-card-img-1");
const match_card_2 = document.getElementById("match-card-2");
const match_img_2 = document.getElementById("match-card-img-2");

const stat_btn = document.getElementById("stats-btn");
stat_btn.addEventListener("click", () => {
  document.getElementById(
    "rockPlayed"
  ).textContent = `Rock Played: ${rockPlayed}`;
  document.getElementById(
    "paperPlayed"
  ).textContent = `Paper Played: ${paperPlayed}`;
  document.getElementById(
    "scissorsPlayed"
  ).textContent = `Scissors Played: ${scissorsPlayed}`;
  document.getElementById("roundWins").textContent = `Round Wins: ${rWins}`;
  document.getElementById(
    "roundDefeats"
  ).textContent = `Round Losses: ${rDefeats}`;
  document.getElementById("roundWins").textContent = `Round Draws: ${rDraws}`;
  document.getElementById(
    "totalWins"
  ).textContent = `Total Match Wins: ${tWins}`;
  document.getElementById(
    "totalDefeats"
  ).textContent = `Total Match Defeats: ${tDefeats}`;
  document.getElementById(
    "totalDraws"
  ).textContent = `Total Match Draws: ${tDraws}`;
  document.getElementById("stat-log").classList.toggle("stat-show");
});
// Best of 1/3/5/10/... buttons
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (animationPlaying) {
      return;
    }
    const btnScore = btn.textContent.replace(/[^0-9]/g, "");
    score.textContent = `0/${btnScore}`;
    newGame(btnScore);
  });
});

function createTimer(card) {
  var timeleft = 3;
  const countdown = document.getElementById("countdown");
  const names = ["", "SCISSORS", "PAPER", "ROCK"];

  var downTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downTimer);
      countdown.style.visibility = "hidden";

      match_img_1.src = `/images/${card.id}.png`;
      const img2 = handleCard(card);
      match_img_2.src = `/images/${img2}.png`;
      updateGame();
      match_card_1.classList.add("is-flipped");
      match_card_2.classList.add("is-flipped");
      animationPlaying = false;
    } else {
      countdown.style.visibility = "visible";
      countdown.innerHTML = names[timeleft];
    }
    timeleft -= 1;
  }, 1000);
}

function newGame(total) {
  matchStart = true;
  animationPlaying = false;
  countdown.style.visibility = "hidden";
  match_card_1.classList.remove("is-flipped");
  match_card_2.classList.remove("is-flipped");
  score.textContent = "Round(s) Left: " + total;
  yourWins.textContent = "0";
  enemyWins.textContent = "0";
  currentRound = 0;
  totalRounds = total;
  currentRound = 0;
  (defeats = 0), (wins = 0), (draws = 0);
  enemyHand = "";
  round_text.textContent = "You may begin the game.";
}

rock.addEventListener("click", () => useCard(rock));
paper.addEventListener("click", () => useCard(paper));
scissors.addEventListener("click", () => useCard(scissors));

function useCard(card) {
  if (!matchStart) {
    round_text.textContent = "Start a new game first";
    return;
  } else if (animationPlaying) {
    return;
  }
  animationPlaying = true;
  round_text.textContent = "";
  match_card_1.classList.remove("is-flipped");
  match_card_2.classList.remove("is-flipped");
  createTimer(card);
}
function handleCard(card) {
  enemyHand = opponentPlays();
  const hand = card.id;
  if (hand === "rock") {
    rockPlayed += 1;
    if (enemyHand === "rock") {
      draws += 1;
    } else if (enemyHand === "paper") {
      defeats += 1;
    } else {
      wins += 1;
    }
  } else if (hand === "paper") {
    paperPlayed += 1;
    if (enemyHand === "rock") {
      wins += 1;
    } else if (enemyHand === "paper") {
      draws += 1;
    } else {
      defeats += 1;
    }
  } else if (hand === "scissors") {
    scissorsPlayed += 1;
    if (enemyHand === "rock") {
      defeats += 1;
    } else if (enemyHand === "paper") {
      wins += 1;
    } else {
      draws += 1;
    }
  } else {
    console.log("error useCard");
  }
  return enemyHand;
}

function opponentPlays() {
  // random between 1 and 3 inclusive
  const random = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  if (random === 1) {
    return "rock";
  } else if (random === 2) {
    return "paper";
  } else if (random === 3) {
    return "scissors";
  } else {
    console.log("error hand type" + random);
  }
}

function updateGame() {
  winText.textContent = "Win: " + wins;
  loseText.textContent = "Lose: " + defeats;

  yourWins.textContent = wins;
  enemyWins.textContent = defeats;

  drawText.textContent = "Draw: " + draws;
  rPlayedText.textContent = "Times Rock was played: " + rockPlayed;
  pPlayedText.textContent = "Times Paper was played: " + paperPlayed;
  sPlayedText.textContent = "Times Scissors was played: " + scissorsPlayed;
  console.log(currentRound + "/" + totalRounds);
  currentRound = currentRound + 1;
  score.textContent = `Round(s) Left: ${totalRounds - currentRound}`;
  if (currentRound == totalRounds) {
    matchStart = false;
    let rText = "";
    if (parseInt(wins) > parseInt(defeats)) {
      rText = "YOU WON";
      tWins += 1;
    } else if (parseInt(wins) < parseInt(defeats)) {
      rText = "YOU LOST";
      tDefeats += 1;
    } else {
      rText = "IT'S A DRAW";
      tDraws += 1;
    }
    rWins += wins;
    rDefeats += defeats;
    rDraws += draws;
    countdown.style.visibility = "visible";
    countdown.textContent = rText;
  }
}
