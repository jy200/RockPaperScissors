var cards = document.querySelectorAll(".flip-card-container");

[...cards].forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("is-flipped");
    createTimer();
  });
});

function createTimer() {
  var timeleft = 3;
  const countdown = document.getElementById("countdown");
  const names = ["", "SCISSORS", "PAPER", "ROCK"];
  var downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      countdown.style.visibility = "hidden";
      // countdown.innerHTML = "0";
    } else {
      countdown.style.visibility = "visible";
      // countdown.innerHTML = timeleft;
      countdown.innerHTML = names[timeleft];
    }
    timeleft -= 1;
  }, 1000);
}
