const xClass = 'x';
const circleClass = 'circle';
const board = document.getElementById('board');
const cellElements = document.querySelectorAll('[data-cell]');
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const winningTextElement = document.querySelector('[data-winning-text]');
const winningElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restart');
let circleTurn;

const game = {
    startGame: function startGame() {
        circleTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(xClass)
            cell.classList.remove(circleClass)
            cell.removeEventListener('click', this.handleClick)
            cell.addEventListener('click', this.handleClick, { once: true })
        });
        this.setBoardHoverClass();
        winningElement.classList.remove('show')
    },
    handleClick: function (e) {
        const cell = e.target;
        const currentClass = circleTurn ? circleClass : xClass
        game.placeMark(cell, currentClass)
        if (game.checkWin(currentClass)) {
            game.endGame(false)
        }else if (game.isDraw()) {
            game.endGame(true)
        }else{
            game.swapTurns();
            game.setBoardHoverClass();
        }
    },
    endGame: function (draw) {
        if (draw) {
            winningTextElement.innerText = 'draw'
        }else {
            winningTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
        }
        winningElement.classList.add('show')
    },
    isDraw: function () {
        return [...cellElements].every(cell => {
            return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
        });
    },
    placeMark: function (cell, currentClass) {
        cell.classList.add(currentClass)
    },
    swapTurns: function () {
        circleTurn = !circleTurn;
    },
    setBoardHoverClass: function () {
        board.classList.remove(xClass);
        board.classList.remove(circleClass);
        if (circleTurn) {
            board.classList.add(circleClass)
        }else {
            board.classList.add(xClass)
        }
    },
    checkWin: function (currentClass) {
        return winningCombos.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass)
            })
        })
    },
    restartButton: this.addEventListener('click', this.startGame)
}

game.startGame();
// startGame();

// restartButton.addEventListener('click', startGame)

// function startGame() {
//     circleTurn = false;
//     cellElements.forEach(cell => {
//         cell.classList.remove(xClass)
//         cell.classList.remove(circleClass)
//         cell.removeEventListener('click', handleClick)
//         cell.addEventListener('click', handleClick, { once: true })
//     });
//     setBoardHoverClass();
//     winningElement.classList.remove('show')
// }

// function handleClick(e) {
//     const cell = e.target;
//     const currentClass = circleTurn ? circleClass : xClass
//     placeMark(cell, currentClass)
//     if (checkWin(currentClass)) {
//         endGame(false)
//     }else if (isDraw()) {
//         endGame(true)
//     }else{
//         swapTurns();
//         setBoardHoverClass();
//     }
// }

// function endGame(draw) {
//     if (draw) {
//         winningTextElement.innerText = 'draw'
//     }else {
//         winningTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
//     }
//     winningElement.classList.add('show')
// }

// function isDraw() {
//     return [...cellElements].every(cell => {
//         return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
//     });
// }
//
// function placeMark(cell, currentClass) {
//     cell.classList.add(currentClass)
// }

// function swapTurns() {
//     circleTurn = !circleTurn;
// }

// function setBoardHoverClass() {
//     board.classList.remove(xClass);
//     board.classList.remove(circleClass);
//     if (circleTurn) {
//         board.classList.add(circleClass)
//     }else {
//         board.classList.add(xClass)
//     }
// }

// function checkWin(currentClass) {
//     return winningCombos.some(combination => {
//         return combination.every(index => {
//             return cellElements[index].classList.contains(currentClass)
//         })
//     })
// }
