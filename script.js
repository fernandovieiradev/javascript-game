'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scoreZeroEl = document.querySelector('#score--0');
const scoreOneEl = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const dicelEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scoreOneEl.textContent = 0;
    scoreZeroEl.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    dicelEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
    if (playing === true) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        dicelEl.classList.remove('hidden');
        dicelEl.src = `dice-${dice}.png`;

        if (dice !== 1) {

            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {

            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {

    if (playing === true) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 60) {

            playing = false;
            dicelEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {

            switchPlayer();

        }
    }

})

btnNew.addEventListener('click', function () {

    init();

});