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

    const addSymbol = (row, column, player) => {
        if(board[row][column] === ' ') {
            board[row][column] = (player.symbol);
            return true;           
        } else {
            console.log('Play somewhere else');
            return false;
        };
    }

    const printBoard = () => console.log(board);

    return {
        addSymbol,
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

    const playRound = (row, column) => {
        if (board.addSymbol(row, column, activePlayer)) {
            changePlayer();        
            console.log(`${activePlayer.name}'s turn.`)     
        };
        board.printBoard()
    }

    return {
        playRound
    }
}

const game = gameController('Dexter', 'Jodie');

// Game controller

    // Play round
        // activePlayer attempts to place symbol in a location
        // Check if location already has symbol in it
            // If empty,
                // Place symbol in location
                // Check board
                // Change player
            // If occupied, 
                // Inform player to choose a different location
        // Print updated board
        // Play round

    // Check board
        // Check for 3-in-a-row
            // If game is not ended,
                // Check for full board

    // Check for 3-in-a-row
        // If one if found,
            // End game

    // Check for full board
        // If board is full,
            // End game

    // End game
        // If 3-in-a-row
            // Display winner
        // If tie
            // Declare tie