'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const name0 = document.getElementById('name--0');
const name1 = document.getElementById('name--1');


const diceEl = document.querySelector('.dice');
const dice2El = document.querySelector('.dice2');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  dice2El.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--active');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  
};
init();

const nextPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {

    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    const dice2 = Math.trunc(Math.random() * 6) + 1;

    

    // 2. Display dice
    diceEl.classList.remove('hidden');
    dice2El.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    dice2El.src = `dice-${dice2}.png`;

   

    // 3. Check for rolled 1

    if (dice === 6 && dice2 ===6){
      scores[activePlayer] = 0;
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      nextPlayer();
    }else

    if (dice !== 1 && dice2 !== 1) {
      // Add dice to current score
      currentScore += dice + dice2;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      

      
    } else {
      // next to next player
      nextPlayer();
    }
    
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;

    if (input){
      winningScore = input;
    }
    else{
      winningScore = 100;
    }


    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= winningScore) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
        document.querySelector('#name--' + activePlayer).textContent = 'WINNER!'
    } else {
      // next to the next player
      nextPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
