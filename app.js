/*Apply game logic and flow making a JavaScript Dice Game.
Highest rolls wins you vs the computer. 
*/

const infoMsgObj = document.querySelector("#infoMsg");
const rollBttn = document.querySelector("#rollBttn");

infoMsgObj.textContent = "Roll the Dice??";

rollBttn.addEventListener("click", playGame);

/* Randomly generate the dice number for player 1 and player 2.  Determine the winner.*/
function playGame() {
  const p1dotsObj = document.querySelectorAll(".p1dots");
  const p2DotsObj = document.querySelectorAll(".p2dots");

  let diceStyleMap = createDiceStyleMap();

  //Ensure all dots are visibile so when the dice is rolled, only the correct dots become hidden
  resetDice(p1dotsObj);
  let p1Num = rollDice(p1dotsObj, diceStyleMap);

  resetDice(p2DotsObj);
  let p2Num = rollDice(p2DotsObj, diceStyleMap);

  let isPlayerWinner = checkIsPlayer1Winner(p1Num, p2Num);
  isPlayerWinner == 1
    ? (infoMsgObj.textContent = "Player 1 Wins!")
    : isPlayerWinner == 0
    ? (infoMsgObj.textContent = "Draw")
    : (infoMsgObj.textContent = "Player 2 Wins!");
}

/*Randomly determines the die number and hides the approprate dots so that number is displayed on the die.
    Each dot element on the die element have an String id that ends in the index position the dot has on the die. Using the 
    diceStyleMap, which has the die number as the key and an object containing the visibility style and dot positions to hide 
    as the value, find the map value using the random die number as the key.  Then determine if the String id from the dot 
    element ends with the number contained in the map value list.  If so, then hide that dot element.*/ 
 function rollDice(diceObj, diceStyleMap) {
  let randomDiceNum = rollNum();
  let dotsToHide = diceStyleMap.get(randomDiceNum).dots;
  let visibility = diceStyleMap.get(randomDiceNum).visibility;

   
  for (let i = 0; i < diceObj.length; i++) {
    let dotID = diceObj[i].id;
    for (let index in dotsToHide) {
      if (dotID.endsWith(dotsToHide[index])) {
        diceObj[i].style.visibility = visibility;
      }
    }
  }
  return randomDiceNum;
}

/*Creates a map where the die number is the key and an object containing the visibility style and dot positions to hide 
    is the value*/
function createDiceStyleMap() {
  let diceStyleMap = new Map();

  diceStyleMap.set(1, {
    visibility: "hidden",
    dots: ["One", "Two", "Three", "Four", "Six", "Seven", "Eight", "Nine"],
  });
  diceStyleMap.set(2, {
    visibility: "hidden",
    dots: ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight"],
  });
  diceStyleMap.set(3, {
    visibility: "hidden",
    dots: ["Two", "Three", "Four", "Six", "Seven", "Eight"],
  });
  diceStyleMap.set(4, {
    visibility: "hidden",
    dots: ["Two", "Four", "Five", "Six", "Eight"],
  });
  diceStyleMap.set(5, {
    visibility: "hidden",
    dots: ["Two", "Four", "Six", "Eight"],
  });
  diceStyleMap.set(6, { visibility: "hidden", dots: ["Two", "Five", "Eight"] });

  return diceStyleMap;
}

//Resets the die so that all dots are visible
function resetDice(diceObj) {
  for (let i = 0; i < diceObj.length; i++) {
    diceObj[i].style.visibility = "visible";
  }
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
