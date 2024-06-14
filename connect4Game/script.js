//initial references
const container = document.querySelector(".container");
const playerTurn = document.getElementById("playerTurn");
const startScreen = document.querySelector(".startScreen");
const startButton = document.getElementById("start");
const message = document.getElementById("message");

let initialMatrix = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
];

let currentPlayer;

//Random number between range
const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;


//Loop through array and check for same values
const verifyArray = (arrayElement) => {
  let bool = false;
  let elementCount = 0;
  arrayElement.forEach((element, index) => {
    if (element == currentPlayer) {
      elementCount += 1;
      if (elementCount == 4) {
        bool = true;
      }
    } else {
      elementCount = 0;
    }
  });
  return bool;
};
//Check for game over(Last step)
const gameOverCheck = () => {
  let truthCounnt = 0;
  for (let innerArray of initialMatrix) {
    if (innerArray.every((val) => val != 0)) {
      truthCounnt += 1;
    } else {
      return false;
    }
  }
  if (truthCounnt == 6) {
    message.innerText = "Game Over";
    startScreen.classList.remove("hide");
  }
};

//Check rows
const checkAdjacentRowValues = (row) => {
  return verifyArray(initialMatrix[row]);
};

//Check columns
const checkAdjacentColumnValues = (column) => {
  let colWinCount = 0,colWinBool = false;
  initialMatrix.forEach((element, index) => {
    if (element[column] == currentPlayer) {
      colWinCount += 1;
      if (colWinCount == 4) {
        colWinBool = true;
      }
    } else {
      colWinCount = 0;
    }
  });
  //no match
  return colWinBool;
};

//Get Right diagonal values
const getRightDiagonal = (row, column, rowLength, columnLength) => {
  let rowCount = row;
  let columnCount = column;
  let rightDiagonal = [];
  while (rowCount > 0) {
    if (columnCount >= columnLength - 1) {
      break;
    }  
    rowCount -= 1;
    columnCount += 1;
    rightDiagonal.unshift(initialMatrix[rowCount][columnCount]);
  }
  rowCount = row;
  columnCount = column;
  while (rowCount < rowLength) {
    if (columnCount < 0) {
      break;
    }
    rightDiagonal.push(initialMatrix[rowCount][columnCount]);
    rowCount += 1;
    columnCount -= 1;
  }
  return rightDiagonal;
};

const getLeftDiagonal = (row, column, rowLength, columnLength) => {
  let rowCount = row;
  let columnCount = column;
  let leftDiagonal = [];
  while (rowCount > 0) {
    if (columnCount <= 0) {
      break;
    }
    rowCount -= 1;
    columnCount -= 1;
    leftDiagonal.unshift(initialMatrix[rowCount][columnCount]);
  }
  rowCount = row;
  columnCount = column;
  while (rowCount < rowLength) {
    if (columnCount >= columnLength) {
      break;
    }
    leftDiagonal.push(initialMatrix[rowCount][columnCount]);
    rowCount += 1;
    columnCount += 1;
  }
  return leftDiagonal;
};


//Check diagonal
const checkAdjacentDiagonalValues = (row, column) => {
  let diagWinBool = false;
  let tempChecks = {
    leftTop: [],
    rightTop: [],
  };
  let columnLength = initialMatrix[row].length;
  let rowLength = initialMatrix.length;
  //Store left and right diagonal array
  tempChecks.leftTop = [
    ...getLeftDiagonal(row, column, rowLength, columnLength),
  ];
  tempChecks.rightTop = [
    ...getRightDiagonal(row, column, rowLength, columnLength),
  ];
  //check both arrays for similarities
  diagWinBool = verifyArray(tempChecks.rightTop);
  if (!diagWinBool) {
    diagWinBool = verifyArray(tempChecks.leftTop);
  }
  return diagWinBool;
};
//Win check logic
const winCheck = (row, column) => {
  //if any of the functions return true we return true
  return checkAdjacentRowValues(row)
    ? true
    : checkAdjacentColumnValues(column)
    ? true
    : checkAdjacentDiagonalValues(row, column)
    ? true
    : false;
};



//Win check logic
const winChcek = (row,column) =>{
  //if any of the functions return true we return true
  return checkAdjacentRowValues(row) ? true : checkAdjacentColumnValues(column) ? true : checkAdjacentDiagonalValues(row, column) ? true : false;
}

//When user clicks on a box
const fillBox = (e) => {
  //get column value
  let colValue = parseInt(e.target.getAttribute("data-value"));
  //5 bec we have 6 rows (0-5)
  setPiece(5,colValue);
  currentPlayer = currentPlayer == 1 ? 2 : 1;
  playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

//Sets circle to exact points
const setPiece = (startCount , colValue) =>{
  let rows = document.querySelectorAll(".grid-row");
  //initially it will place circles in last row else if no place avaliable we will decrement count until we fint empty slot
  if(initialMatrix[startCount][colValue] != 0){
    startCount = startCount-1;
    setPiece(startCount,colValue);
  }else{
    //place circle
    let currentRow = rows[startCount].querySelectorAll(".grid-box");
    currentRow[colValue].classList.add("filled",`player${currentPlayer}`);

    //update matrix
    initialMatrix[startCount][colValue]=currentPlayer;

    //check for wins
    if (winCheck(startCount, colValue)) {
      message.innerHTML = `Player<span> ${currentPlayer}</span> wins`;
      startScreen.classList.remove("hide");
      return false;
    }
  }
  //check if all are full
  gameOverCheck();
}
  
//Create Matrix
const matrixCreator = () => {
    for (let innerArray in initialMatrix) {
      let outerDiv = document.createElement("div");
      outerDiv.classList.add("grid-row");
      outerDiv.setAttribute("data-value", innerArray);
      //Here, it creates a new <div> element for each row in the grid. It sets a class "grid-row" to the div and an attribute "data-value" with the value of innerArray.

      for (let j in initialMatrix[innerArray]) {
        //Set all matrix values to 0
        initialMatrix[innerArray][j] = [0];
        let innerDiv = document.createElement("div");
        innerDiv.classList.add("grid-box");
        innerDiv.setAttribute("data-value", j);
        innerDiv.addEventListener(
            "click", 
            (e) => {
          fillBox(e);
        });

        //For each element in the row, it creates a new <div> element, adds a class "grid-box" to it, and sets an attribute "data-value" with the value of j. Additionally, it attaches a click event listener to the <div> element, which calls the fillBox function when clicked.

        outerDiv.appendChild(innerDiv);
        //It appends the newly created inner <div> element to the outer <div> representing the row.

      }
      container.appendChild(outerDiv);
      //it appends the outer <div> element representing the row to some container element, presumably referenced by the variable container.
    }
  };

//Initialise game

//This line attaches an asynchronous function startGame to the window.onload event. This means that when the web page finishes loading, the startGame function will be executed.
window.onload = startGame = async () => {
    //Between 1 and 2
    currentPlayer = generateRandomNumber(1, 3);
    container.innerHTML = "";
    await matrixCreator();
    //This line awaits the completion of the matrixCreator function. The await keyword is used here because matrixCreator is an asynchronous function. Once the matrixCreator function completes its execution, the code will continue to the next line.
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
  };


  //start game
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  startGame();
});