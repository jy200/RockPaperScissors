var currentRound = 0;
var totalRounds = 0;
var matchStarted = false;

const btns = document.querySelectorAll('button');
const score = document.querySelector('.scoreboard')
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');

// Best of 1/3/5/10 buttons
btns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        if (confirm(btn.textContent + "?")){
            const btnScore = btn.textContent.replace(/[^0-9]/g, '');
            score.textContent = `0/${btnScore}`;
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
        };
    };
});

