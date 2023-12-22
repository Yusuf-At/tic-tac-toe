window.onload = function() {
     setGame();
}

const rows = 3;
const columns = 3;

const playerOne = 'X';
const playerTwo = 'O';

let currPlayer = playerOne;

const board = [];

gameOver = false;

function setGame() {

    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let grid = document.createElement('div');
            grid.classList.add('tile');
            grid.id = r.toString() + '-' + c.toString();
            grid.addEventListener('click', setPiece);
            document.getElementById('board').append(grid);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    //get coord of tile that clicked
    let coord = this.id.split('-')
    let r = parseInt(coord[0]);
    let c = parseInt(coord[1]);

    if (board[r][c] != ' ') {
        return;
    }

    board[r][c] = currPlayer;

    function turnMessege() {
        const turnHandle = document.querySelector('.turn');
        turnHandle.innerText = `${currPlayer}'s turn` 
    }

    let tile = document.getElementById(r.toString() + '-' + c.toString())
    if (currPlayer == playerOne) {
        tile.classList.add(`${currPlayer}`);
        tile.innerHTML = 'X';
        currPlayer = playerTwo;
        turnMessege()

    } else {
        tile.classList.add(`${currPlayer}`);
        tile.innerHTML = 'O';
        currPlayer = playerOne;
        turnMessege()
    }

    checkWinner();
}

function checkWinner() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) { // horizontal and vertical
            if (board[r][c] != ' '){
                if ((board[r][0] == board[r][1] && board[r][1] == board[r][2]) ||
                (board[0][c] == board[1][c] && board[1][c] == board[2][c])) {
                    setWinner(r, c);
                    return
                }
            }
            if (board[0][2] != ' '){ //anti diagonal
                if (board[0][2] == board[1][1] && board[1][1] == board[2][0]){
                    setWinner(0, 2);
                    return
                }
            }
            if (board[0][0] != ' '){ //diagonal
                if (board[0][0] == board[1][1] && board[1][1] == board[2][2]){
                    setWinner(0, 0);
                    return
                }
            }
        }
    }
}

function setWinner (r, c) {
    const winner = document.getElementById('winner');
    if (board[r][c] == playerOne) {
        winner.innerText = 'Player One Wins';
    } else {
        winner.innerText = 'Player Two Wins'
    }
    gameOver = true;
}