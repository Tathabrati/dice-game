// index.js

document.getElementById('start-game-btn').addEventListener('click', () => {
  const player1Name = document.getElementById('player1-name-input').value || 'Player 1';
  const player2Name = document.getElementById('player2-name-input').value || 'Player 2';
  
  document.getElementById('player1-name').textContent = player1Name;
  document.getElementById('player2-name').textContent = player2Name;
  
  document.getElementById('player-names').style.display = 'none';
  document.querySelectorAll('.dice').forEach(dice => dice.style.display = 'inline-block');
  document.getElementById('roll-btn').style.display = 'inline-block';
  document.getElementById('reset-btn').style.display = 'inline-block';
  document.getElementById('instructions').style.display = 'block';
  document.getElementById('history').style.display = 'block';
  document.getElementById('winner-status').style.display = 'block';
});

document.getElementById('roll-btn').addEventListener('click', rollDice);
document.getElementById('reset-btn').addEventListener('click', resetGame);
document.getElementById('instructions-btn').addEventListener('click', () => {
  const instructions = document.getElementById('instructions');
  instructions.style.display = instructions.style.display === 'none' ? 'block' : 'none';
});

const SCORE_LIMIT = 20;
let highScore = 0;
const rollHistory = [];

function rollDice() {
  const diceImages = ['dice1.png', 'dice2.png', 'dice3.png', 'dice4.png', 'dice5.png', 'dice6.png'];
  
  const randomNumber1 = Math.floor(Math.random() * 6) + 1;
  const randomNumber2 = Math.floor(Math.random() * 6) + 1;
  
  animateDiceRoll();
  
  setTimeout(() => {
    updateDiceImages(randomNumber1, randomNumber2);
    updateScores(randomNumber1, randomNumber2);
    updateHistory(randomNumber1, randomNumber2);
    determineWinner();
  }, 1000);
}

function animateDiceRoll() {
  const diceImages = document.querySelectorAll('.dice-img');
  
  diceImages.forEach(dice => dice.classList.add('rolling'));
  
  setTimeout(() => {
    diceImages.forEach(dice => dice.classList.remove('rolling'));
  }, 1000);
}

function updateDiceImages(num1, num2) {
  const diceImages = ['dice1.png', 'dice2.png', 'dice3.png', 'dice4.png', 'dice5.png', 'dice6.png'];
  
  const diceImage1 = `images/${diceImages[num1 - 1]}`;
  const diceImage2 = `images/${diceImages[num2 - 1]}`;
  
  document.getElementById('dice1').src = diceImage1;
  document.getElementById('dice2').src = diceImage2;
}

function updateScores(num1, num2) {
  const player1Score = parseInt(document.getElementById('player1-score').textContent) + num1;
  const player2Score = parseInt(document.getElementById('player2-score').textContent) + num2;
  
  document.getElementById('player1-score').textContent = player1Score;
  document.getElementById('player2-score').textContent = player2Score;
  
  if (player1Score > highScore) {
    highScore = player1Score;
    document.getElementById('high-score').textContent = `High Score: ${highScore}`;
  }
  if (player2Score > highScore) {
    highScore = player2Score;
    document.getElementById('high-score').textContent = `High Score: ${highScore}`;
  }
}

function updateHistory(num1, num2) {
  rollHistory.unshift(`Player 1: ${num1}, Player 2: ${num2}`);
  if (rollHistory.length > 5) {
    rollHistory.pop();
  }
  const historyList = document.getElementById('roll-history');
  historyList.innerHTML = rollHistory.map(roll => `<li>${roll}</li>`).join('');
}

function determineWinner() {
  const player1Score = parseInt(document.getElementById('player1-score').textContent);
  const player2Score = parseInt(document.getElementById('player2-score').textContent);
  
  let resultText = '';
  let resultColor = '#333';
  
  if (player1Score >= SCORE_LIMIT) {
    resultText = 'Player 1 Wins!';
    resultColor = '#ff6f61';
    disableButtons();
  } else if (player2Score >= SCORE_LIMIT) {
    resultText = 'Player 2 Wins!';
    resultColor = '#4caf50';
    disableButtons();
  } else if (player1Score > player2Score) {
    resultText = 'Player 1 is Leading!';
    resultColor = '#ff6f61';
  } else if (player1Score < player2Score) {
    resultText = 'Player 2 is Leading!';
    resultColor = '#4caf50';
  } else {
    resultText = 'It\'s a Tie!';
    resultColor = '#2196f3';
  }
  
  document.getElementById('result').textContent = resultText;
  document.getElementById('result').style.color = resultColor;
  
  updateWinnerStatus(player1Score, player2Score);
}

function updateWinnerStatus(player1Score, player2Score) {
  let winnerStatusText = '';
  if (player1Score > player2Score) {
    winnerStatusText = 'Player 1 is currently winning!';
    document.getElementById('winner-status').style.color = '#ff6f61';
  } else if (player1Score < player2Score) {
    winnerStatusText = 'Player 2 is currently winning!';
    document.getElementById('winner-status').style.color = '#4caf50';
  } else {
    winnerStatusText = 'It\'s a tie!';
    document.getElementById('winner-status').style.color = '#2196f3';
  }
  
  document.getElementById('winner-status').textContent = winnerStatusText;
}

function disableButtons() {
  document.getElementById('roll-btn').disabled = true;
  document.getElementById('reset-btn').disabled = false;
}

function resetGame() {
  document.querySelectorAll('.dice-img').forEach(dice => dice.src = 'images/dice6.png');
  
  document.getElementById('player1-score').textContent = '0';
  document.getElementById('player2-score').textContent = '0';
  
  document.getElementById('result').textContent = '';
  document.getElementById('result').style.color = '#333';
  
  document.getElementById('winner-status').textContent = '';
  document.getElementById('winner-status').style.color = '#333';
  
  document.getElementById('roll-btn').disabled = false;
  document.getElementById('reset-btn').disabled = true;
  
  document.getElementById('player-names').style.display = 'block';
  document.querySelectorAll('.dice').forEach(dice => dice.style.display = 'none');
  document.getElementById('instructions').style.display = 'none';
  document.getElementById('history').style.display = 'none';
  document.getElementById('winner-status').style.display = 'none';
}
