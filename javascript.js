function createGameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create a 2D 3x3 board
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

};

// This need to be accessible by both modules and we need to be able to create
// a new gameboard with the 'Start New Game' button
let gameboard = createGameboard();





const displayController = (function() {
    const positions = document.querySelectorAll('.position');

    (function addEventListeners() {
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
    };

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

    let gameOver;

    const playRound = (row, column) => {
        let currentBoard = gameboard.getBoard();        
        if (gameOver) {
            displayController.displayInfo('Start a new game.')
        } else {
            if (currentBoard[row][column] === ' ') {
                gameboard.addSymbol(row, column, activePlayer);
                changePlayer();
                displayController.render();                
                displayController.displayInfo(`${activePlayer.name}'s turn.`);
            } else {
                displayController.displayInfo('Play somewhere else.');
            };

            let result;
            if (checkForThreeInARow() || checkForFullBoard()) {
                if (checkForThreeInARow()) {
                    changePlayer();
                    result = `The winner is ${activePlayer.name}!`;
                } else if (checkForFullBoard()) {
                    result = `It's a tie game.`;
                }
                gameOver = true;                
                displayController.displayInfo(result);
            };
        };
    };

    const checkForThreeInARow = () => {
        let currentBoard = gameboard.getBoard(); 
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
        let currentBoard = gameboard.getBoard(); 
        const isBoardEmpty = [];
        currentBoard.filter((row) => {
            row.filter((cell) => {
                if (cell === 'X' || cell === 'O') {
                    isBoardEmpty.push(cell);
                };
            });
        });
        if (isBoardEmpty.length === 9) {
            return true;
        };
    };

    (function startNewGame() {
        displayController.displayInfo(`${activePlayer.name}'s turn.`);
        const newGameBtn = document.querySelector('button');
        const playerOneName = document.querySelector('input[id="playerOne"]');
        const playerTwoName = document.querySelector('input[id="playerTwo"]');
        newGameBtn.addEventListener('click', () => {
            gameboard = createGameboard();
            displayController.render();
            if (playerOneName.value !== '') {
                players[0].name = playerOneName.value;       
            };
            if (playerTwoName.value !== '') {
                players[1].name = playerTwoName.value;       
            };  
            gameOver = false;
            playerOneName.value = '';
            playerTwoName.value = '';
            displayController.displayInfo(`${activePlayer.name}'s turn.`);
        });
    })();

    return {
        playRound
    };

})();