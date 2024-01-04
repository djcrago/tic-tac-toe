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

gameBoard();

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
    // let activePlayer;

// Change player
    // If activePlayer === playerOne
        // activePlayer = playerTwo;
    // Else activePlayer = playerOne

// Start turn
    // activePlayer attempts to place symbol in a location
    // Check if location already has symbol in it
        // If empty,
            // Place symbol in location
            // Check board
            // Change player
        // If occupied, 
            // Inform player to choose a different location
    // Start turn

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