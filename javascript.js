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

    const board = gameboard.getBoard();

    const playRound = (row, column) => {
        if (board[row][column] === ' ') {
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
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
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
        board.filter((row) => {
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
        } else {
            console.log(`It's a tie game.`);
        };
        return 'gameOver';
    };

    console.log(`${activePlayer.name}'s turn.`);
    gameboard.printBoard();

    return {
        playRound
    };
}

let game = gameController('Dexter', 'Jodie');
