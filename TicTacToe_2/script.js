const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)  //restart button 

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)  //clears the board
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true }) //click once in each cell
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show') //sting board for new game
}

function handleClick(e) {
  const cell = e.target //whichever cell is been clicked on is the target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS //return X/O as per their turns
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {  //shows the results
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'  //is draw
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!` //prints the msg
  }
  winningMessageElement.classList.add('show')  //shows the usr the msg
}

function isDraw() {
  return [...cellElements].every(cell => {  //every single cell is filled with either X or O
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass) //when clicked on target cell, marks it with X/O as per their turns
}

function swapTurns() {
  circleTurn = !circleTurn //switching turns every single time
}

function setBoardHoverClass() { //hover X/O as per their turns 
  board.classList.remove(X_CLASS) //remove the classes from the board
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) { //check all wining combinations to see if some of them matches current combinations
  return WINNING_COMBINATIONS.some(combination => {  //some will loop over all of the comnonations
    return combination.every(index => {  //check if all of the cell elements have the same class
      return cellElements[index].classList.contains(currentClass)  //checks if the current class of all theses 3 elements is inside the current combination then we win. Every element inside of the combination is correct for atleast 1 given combination, then it's a win
    })
  })
}