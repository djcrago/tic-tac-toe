const gameboard = (function() {
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
})();



function gameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {

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

    let currentBoard = gameboard.getBoard();

    const playRound = (row, column) => {
        if (currentBoard[row][column] === ' ') {
            gameboard.addSymbol(row, column, activePlayer);
            changePlayer();            
        } else {
            console.log('Play somewhere else');
        };

        gameboard.printBoard();

        let result;
        if (checkForThreeInARow()) {
            result = endGame(true);
        } else if (checkForFullBoard()) {
            result = endGame();
        }

        if (result === 'gameOver') {
            console.log('Start A New Game?');
        } else {
            console.log(`${activePlayer.name}'s turn.`);            
        }
    };

    const checkForThreeInARow = () => {
        let result;
        const possibleWinningRows = [
            [currentBoard[0][0], currentBoard[0][1], currentBoard[0][2]],
            [currentBoard[1][0], currentBoard[1][1], currentBoard[1][2]],
            [currentBoard[2][0], currentBoard[2][1], currentBoard[2][2]],
            [currentBoard[0][0], currentBoard[1][0], currentBoard[2][0]],
            [currentBoard[0][1], currentBoard[1][1], currentBoard[2][1]],
            [currentBoard[0][2], currentBoard[1][2], currentBoard[2][2]],
            [currentBoard[0][0], currentBoard[1][1], currentBoard[2][2]],
            [currentBoard[0][2], currentBoard[1][1], currentBoard[2][0]]
        ];
        possibleWinningRows.forEach((row) => {
            if (row[0] === 'X' || row[0] === 'O') {
                if (row[0] === row[1] && row[0] === row[2]) {
                    result = true;            
                };
            };
        });
        return result;
    };

    const checkForFullBoard = () => {
        const isBoardEmpty = [];
        currentBoard.filter((row) => {
            row.filter((cell) => {
                if (cell === 'X' || cell === 'O') {
                    isBoardEmpty.push(cell);
                }
            });
        });
        if (isBoardEmpty.length === 9) {
            return true;
        };
    };

    const endGame = (result) => {
        if(result) {
            changePlayer();
            console.log(`The winner is ${activePlayer.name}!`);
            startNewGame();
        } else {
            console.log(`It's a tie game.`);
            startNewGame();
        };
        return 'gameOver';
    };

    // Reset board
    // const startNewGame = () => {
    //     board = gameboard();
    //     currentBoard = board.getBoard();
    // }    

    console.log(`${activePlayer.name}'s turn.`);
    gameboard.printBoard();

    return {
        playRound
    };
}



function displayController() {
    // Render contents of gameboard
    const currentBoard = gameboard.getBoard();
    const boardPosition = [
        currentBoard[0][0],
        currentBoard[0][1],
        currentBoard[0][2],
        currentBoard[1][0],
        currentBoard[1][1],
        currentBoard[1][2],
        currentBoard[2][0],
        currentBoard[2][1],
        currentBoard[2][2],
    ]

    const render = () => {
        const positions = document.querySelectorAll('.position');
        let i = 0;
        positions.forEach((position) => {
            position.textContent = boardPosition[i];
            i++;
        });
    }

    render();
    // Add marks to specific spots
        // Keep logic to prevent playing in already taken spot
    // Allow players to put in names
    // Button to start and restat game
    // Display results upon game end

    return {
        render
    }
}



let game = gameController();

game.playRound(0,0);
displayController();
game.playRound(1,1);
displayController();
game.playRound(1,2);
displayController();