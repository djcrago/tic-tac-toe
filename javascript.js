function gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(' ');
        };
    };

    const addSymbol = (row, column, player) => 
        board[row][column] = (player.symbol);

    const getBoard = () => board;

    const printBoard = () => console.log(board);

    return {
        addSymbol,
        getBoard,
        printBoard
    };

}

function gameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const board = gameboard();

    const players = [
        {
            name: playerOneName,
            symbol: 'X'
        },
        {
            name: playerTwoName,
            symbol: 'O'
        }
    ];

    let activePlayer = players[0];

    const changePlayer = () => {
        activePlayer = (activePlayer === players[0] ? players[1] : players[0]);
    };

    const checkBoardStatus = () => {
        checkForThreeInARow();
        return checkForFullBoard();
    }

    const checkForThreeInARow = () => {
        const currentBoard = board.getBoard();
// Create arrary of all possible three in a row spots
// Check if any possibility has all three spots the same symbol
        return 'three';
    }

    const checkForFullBoard = () => {
        const currentBoard = board.getBoard();
        const isBoardEmpty = [];
        currentBoard.filter((row) => {
            row.filter((cell) => {
                if (cell === 'X' || cell === 'O') {
                    isBoardEmpty.push(cell);
                }
            });
        });
        console.log(isBoardEmpty);
        console.log(isBoardEmpty.length);
        if (isBoardEmpty.length === 9) {
            return 'tie';
        }
    }

    const playRound = (row, column) => {
        if (board.addSymbol(row, column, activePlayer)) {
            changePlayer();        
            console.log(`${activePlayer.name}'s turn.`)     
        };

        board.printBoard();

        let result = checkBoardStatus();
        console.log(result);
        if (result === 'three') {
            endGame(true);
            return;
        } else if (result === 'tie') {
            endGame(false);
            return;
        }
    }

    const endGame = (check) => {
        if(check) {
            console.log(`The winner is me!`);
        } else {
            console.log(`It's a tie game.`);
        };
        // Stop further play / reset board.
    }

    return {
        playRound
    }
}

const game = gameController('Dexter', 'Jodie');

game.playRound(0,0);
game.playRound(0,1);
game.playRound(0,2);
game.playRound(1,0);
game.playRound(1,1);
game.playRound(1,2);
game.playRound(2,0);
game.playRound(2,1);
game.playRound(2,2);

// Game controller

    // Check board
        // Check for 3-in-a-row
            // If game is not ended,
                // Check for full board

