var currentRound = 0;
var totalRounds = 0;
var matchStart = false;
var rockPlayed = 0, paperPlayed = 0, scissorsPlayed = 0;
var defeats = 0, wins = 0, draws = 0;
var enemyHand = '';

const btns = document.querySelectorAll('button');
const score = document.querySelector('.scoreboard')
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const resultText = document.getElementById('gameResult');
const winText = document.getElementById('win');
const loseText = document.getElementById('lose');
const drawText = document.getElementById('draw');
const rPlayedText = document.getElementById('rockPlayed');
const pPlayedText = document.getElementById('paperPlayed');
const sPlayedText = document.getElementById('scissorsPlayed');
const enemyPlayed = document.querySelector('.opponentHand');
const youPlayed = document.querySelector('.myHand');

// Best of 1/3/5/10 buttons
btns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        if (confirm(btn.textContent + "?")){
            const btnScore = btn.textContent.replace(/[^0-9]/g, '');
            score.textContent = `0/${btnScore}`;
            newGame(btnScore);
        };
    });
});

// Best of {custom number}
const custom = document.getElementById('customSubmit');
const customNumber = document.querySelector('.matchInput');
custom.addEventListener('click', ()=>{
    if (parseInt(customNumber.value)>999){
        alert("Please set a number less than 999.");
    }else{
        if (confirm("Best of "+ customNumber.value + "?")){
            const btnScore = customNumber.value;
            score.textContent = `0/${btnScore}`;
            newGame(btnScore);
        };
    };
});

function newGame(total){
    matchStart = true;
    currentRound = 0;
    totalRounds = total;
    currentRound = 0;
    rockPlayed = 0, paperPlayed = 0, scissorsPlayed = 0;
    defeats = 0, wins = 0, draws = 0;
    enemyHand = '';
    // resultText.textContent = "Result: "
};


rock.addEventListener('click', () => useCard(rock));
paper.addEventListener('click', ()=> useCard(paper));
scissors.addEventListener('click', ()=>useCard(scissors));

function useCard(card){
    if (!matchStart){
        return;
    }
    enemyHand = opponentPlays();
    const hand = card.id;
    youPlayed.textContent = "You Played: " + hand.toUpperCase();
    if (hand === 'rock'){
        rockPlayed += 1;
        if (enemyHand === 'rock'){
            draws += 1;
        } else if (enemyHand === 'paper'){
            defeats += 1;
        } else {
            wins += 1;
        }
    } else if (hand === "paper"){
        paperPlayed += 1;
        if (enemyHand === 'rock'){
            wins += 1;
        } else if (enemyHand === 'paper'){
            draws += 1;
        } else {
            defeats += 1;
        }
    } else if (hand === "scissors"){
        scissorsPlayed += 1;
        if (enemyHand === 'rock'){
            defeats += 1;
        } else if (enemyHand === 'paper'){
            wins += 1;
        } else {
            draws += 1;
        }
    }else{
        console.log("error useCard");
    }
    updateGame();
};

function opponentPlays(){
    // random between 1 and 3 inclusive
    const random = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if (random === 1){
        return 'rock';
    } else if (random === 2){
        return 'paper';
    } else if (random === 3){
        return 'scissors';
    }else{
        console.log('error hand type'+random);
    }
};

function updateGame(){
    enemyPlayed.textContent = "Opponent Played: " + enemyHand.toUpperCase();
    winText.textContent = "Win: "+wins;
    loseText.textContent = "Lose: "+defeats;
    drawText.textContent = "Draw: "+draws;
    rPlayedText.textContent = "Times Rock was played: "+rockPlayed;
    pPlayedText.textContent = "Times Paper was played: "+paperPlayed;
    sPlayedText.textContent = "Times Scissors was played: "+scissorsPlayed;
    console.log(currentRound +"/" + totalRounds)
    currentRound = currentRound + 1;
    score.textContent = currentRound + "/" + totalRounds
    if (currentRound == totalRounds){
        matchStart = false;
        let rText = '';
        if (parseInt(wins) > parseInt(defeats)){
            rText = 'YOU WON';
        } else if (parseInt(wins) < parseInt(defeats)){
            rText = "YOU LOST";
        }else{
            rText = "IT'S A DRAW";
        }
        score.textContent = rText;
    };
};