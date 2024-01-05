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

    const addSymbol = (row, column, player) => {
        board[row][column] = player.symbol;
    }

    const getBoard = () => board;

    return {
        addSymbol,
        getBoard,
    };

})();



const displayController = (function() {

    let currentBoard = gameboard.getBoard();

    const positions = document.querySelectorAll('.position');

    const addEventListener = (function() {
        let i = 0;
        let j = 0;
        positions.forEach((position) => {
            if (j === 3) {
                j = 0;
                i++;
            }
            const row = i;
            const column = j;
            j++;
            position.addEventListener('click', () => {
                gameController.playRound(row, column);
            });
        });
    })();

    const render = () => {
        const boardPosition = [
            currentBoard[0][0],
            currentBoard[0][1],
            currentBoard[0][2],
            currentBoard[1][0],
            currentBoard[1][1],
            currentBoard[1][2],
            currentBoard[2][0],
            currentBoard[2][1],
            currentBoard[2][2]
        ];

        let i = 0;
        positions.forEach((position) => {
            position.textContent = boardPosition[i];
            i++;
        });
    };

    const display = document.querySelector('.display');

    const displayInfo = (info) => {
        display.textContent = info;
    };

    return {
        render,
        displayInfo
    }
})();



const gameController = (function(
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
            displayController.render();
            changePlayer();
            displayController.displayInfo(`${activePlayer.name}'s turn.`);
        } else {
            alert('Play somewhere else');
        };



        let result;
        if (checkForThreeInARow()) {
            changePlayer();
            result = `The winner is ${activePlayer.name}!`;
            displayController.displayInfo(result);
        } else if (checkForFullBoard()) {
            result = `It's a tie game.`;
            displayController.displayInfo(result);
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

    // Reset board
    // const startNewGame = () => {
    //     board = gameboard();
    //     currentBoard = board.getBoard();
    // }    
    

    return {
        playRound
    };
})();




    // Add marks to specific spots
        // Keep logic to prevent playing in already taken spot
    // Allow players to put in names
    // Button to start and restart game
    // Display results upon game end