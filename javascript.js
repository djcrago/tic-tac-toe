function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    };
    
    const getBoard = () => board;

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => 
            row.map((cell) => cell.getSymbol()));
        
        console.log(boardWithCellValues);
    };

    printBoard();

    return {
        getBoard,
        printBoard,
    };
}

function cell() {
    let symbol = ' ';

    const addSymbol = (player) => {
        symbol = player.symbol;
    };

    const getSymbol = () => symbol;

    return {
        addSymbol,
        getSymbol
    };
}

// Start game
function gameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const board = gameBoard();

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
    // let activePlayer;
    let activePlayer = players[0];

    // Change player
        // If activePlayer === playerOne
            // activePlayer = playerTwo;
        // Else activePlayer = playerOne
    const changePlayer = () => {
        activePlayer = (activePlayer === players[0] ? players[1] : players[0]);
    };

    const getActivePlayer = activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    // Start turn
    const playRound = () => {

        // activePlayer attempts to place symbol in a location
        // Check if location already has symbol in it
            // If empty,
                // Place symbol in location
                // Check board
                // Change player
            // If occupied, 
                // Inform player to choose a different location
        
        changePlayer();

        printNewRound();
    }







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
}