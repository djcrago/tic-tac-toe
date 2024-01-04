// Gameboard
    // Each 'cell' of the board is it's own array
        // This way we can push symbols into the cells easily
    // The board is a 3x3 grid
        // 3 rows, with 3 empty arrays in each row
    // Include here logic for how to push symbols into a cell
    // Be able to print board with cell values in console

function gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(' ');
        }
    }

    console.log(board);
}

gameboard();


// Game controller

    // let activePlayer;

    // Change player
        // If activePlayer === playerOne
            // activePlayer = playerTwo;
        // Else activePlayer = playerOne

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