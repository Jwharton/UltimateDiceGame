/*Apply game logic and flow making a JavaScript Dice Game.
Highest rolls wins you vs the computer. 
*/

const infoMsgObj = document.querySelector("#infoMsg");
const rollBttn = document.querySelector("#rollBttn");

infoMsgObj.textContent = "Roll the Dice??";

rollBttn.addEventListener("click", playGame);

/* Randomly generate the dice number for player 1 and player 2.  Determine the winner.*/
function playGame() {
  const p1DieObj = document.querySelector("#player1Dice");
  const p2DieObj = document.querySelector("#player2Dice");

  let diceStyleMap = createDiceStyleMap();

  let p1Num = rollDice(p1DieObj, diceStyleMap);

  let p2Num = rollDice(p2DieObj, diceStyleMap);

  let isPlayerWinner = checkIsPlayer1Winner(p1Num, p2Num);
  isPlayerWinner == 1
    ? (infoMsgObj.textContent = "Player 1 Wins!")
    : isPlayerWinner == 0
    ? (infoMsgObj.textContent = "Draw")
    : (infoMsgObj.textContent = "Player 2 Wins!");
}

/*Randomly determines the die number and chooses the correct html die representation. Using the 
    diceStyleMap, which has the die number as the key and an html entity as the value, find the map value 
    using the random die number as the key.*/ 
 function rollDice(diceObj, diceStyleMap) {
  let randomDiceNum = rollNum();
  
  diceObj.innerHTML = diceStyleMap.get(randomDiceNum);

  return randomDiceNum;
}

/*Creates a map where the die number is the key and an object containing the visibility style and dot positions to hide 
    is the value*/
function createDiceStyleMap() {
  let diceStyleMap = new Map();

  diceStyleMap.set(1,  "&#9856;");
  diceStyleMap.set(2, "&#9857;");
  diceStyleMap.set(3,"&#9858;");
  diceStyleMap.set(4, "&#9859;");
  diceStyleMap.set(5, "&#9860;");
  diceStyleMap.set(6, "&#9861;");

  return diceStyleMap;
}

//Returns a random number between 1 and 6
function rollNum() {
  return Math.floor(Math.random() * 6) + 1;
}

/*Returns whether the player1 is a winner.  If the player1 has a higher number than Player2 then 1 is returned, if a player1 has 
    the same number as Player2 then 0 is returned.  If Player1 has a lower number than Player2 then -1 is returned.*/
function checkIsPlayer1Winner(p1Num, p2Num) {
 return p1Num > p2Num ? 1 : p1Num < p2Num ? -1 : 0;
}
