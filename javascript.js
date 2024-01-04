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
    const currentBoard = board.getBoard();

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
        if (currentBoard[row][column] === ' ') {
            board.addSymbol(row, column, activePlayer);
            changePlayer();            
        } else {
            console.log('Play somewhere else');
        }

        console.log(`${activePlayer.name}'s turn.`)     

        board.printBoard();

        let checkBoard = checkForThreeInARow();
        if (checkBoard) {
            endGame(true);
        };
        checkBoard = checkForFullBoard();
        if (checkBoard) {
            endGame(false);
        };

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
        let result;
        const isBoardEmpty = [];
        currentBoard.filter((row) => {
            row.filter((cell) => {
                if (cell === 'X' || cell === 'O') {
                    isBoardEmpty.push(cell);
                }
            });
        });
        if (isBoardEmpty.length === 9) {
            result = true;
        };
        return result;
    };

    const endGame = (check) => {
        if(check) {
            changePlayer();
            console.log(`The winner is ${activePlayer.name}!`);
        } else {
            console.log(`It's a tie game.`);
        };
        // Stop further play / reset board.
    };

    return {
        playRound
    };
}

const game = gameController('Dexter', 'Jodie');

// game.playRound(0,0);
// game.playRound(0,1);
// game.playRound(0,2);
// game.playRound(1,0);
// game.playRound(1,1);
// game.playRound(1,2);
// game.playRound(2,0);
// game.playRound(2,1);
// game.playRound(2,2);