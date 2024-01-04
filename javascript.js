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
        let currentBoard = board.getBoard();
        console.log(currentBoard);
    }

    const checkForThreeInARow = () => {
        // If one is found end game
        return 'three';
    }

    const checkForFullBoard = () => {
        // If board is full and no three in a row end game
        return 'tie';
    }

    const playRound = (row, column) => {
        if (board.addSymbol(row, column, activePlayer)) {
            changePlayer();        
            console.log(`${activePlayer.name}'s turn.`)     
        };

        board.printBoard();

        checkBoardStatus();

        (function() {
            let check = checkForThreeInARow();
            if(check === 'three') {
                endGame(true);
                return;
            };
            check = checkForFullBoard();
            if(check === 'tie') {
                endGame(false);
                return;
            };
        })();
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

// Game controller

    // Check board
        // Check for 3-in-a-row
            // If game is not ended,
                // Check for full board

