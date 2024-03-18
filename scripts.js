//DOM



const gameContainer = document.querySelector(".gameContainer");
let game;

const Gameboard = (function() {

    let storedValue
    

    const board = [];
    const rows = 3;
    const columns = 3;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        
        for (let j = 0; j < columns; j++) {
            board[i].push("");
            
        }
    }
    const displayBoard = function () {
        for (let i = 0; i<3; i++) {
            console.log(board[i]);
        }
    }
    
    
    const changeBoard = function(row, column, player) {
        board[row][column] = player.mark;
        
        storedValue = (board[row][column])
        
        
    }
    const checkBoardStatus = function(row, column) {
        if (board[row][column] === "") {
            return true;
        }
        else {
            return false
        }
    }
    
    const getBoardValue = function () {
        
        return storedValue;
    }
    const getBoard = function () {
        return board;
    }
    
    const checkWinner = function (board) {
        //horizontal win conditions
        if (board[0][0] != "" && board[0][0] === board[0][1] && board[0][0] === board[0][2]) {
            return true
        }
        if (board[1][0] != "" && board[1][0] === board[1][1] && board[1][0] === board[1][2]) {
            return true
        }
        if (board[2][0] != "" && board[2][0] === board[2][1] && board[2][0] === board[2][2]) {
            return true
        }
        //parallel win conditions

        //1st column
        if (board[0][0] != "" && board[0][0] === board[1][0] && board[0][0] === board[2][0]) {
            return true
        }
        //2nd column
        if (board[0][1] != "" && board[0][1] === board[1][1] && board[0][1] === board[2][1]) {
            return true
        }
        //3rd column
        if (board[0][2] != "" && board[0][2] === board[1][2] && board[0][2] === board[2][2]) {
            return true
        }

        //diagonal win conditions
        if (board[0][0] != "" && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            return true

        }
        if (board[0][2] != "" && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            return true
            
        }
        return false

    }
    
    
    
    return {
        
        changeBoard, getBoardValue, checkBoardStatus, checkWinner, getBoard, displayBoard
    };
    
})();
const GameController = ( function() {

    

    const createPlayers = function (playerOne, playerTwo) {

        
        const players = [
            {
                name: playerOne,
                mark: 'X',
                turn: true
            },
            {
                name: playerTwo,
                mark: 'O',
                turn: false
            }
        ]
        
        return players;
    }
    
    const playGame = function() {
        let playerOne;
        let playerTwo;
        let players;

        
        const form = document.getElementById("form")       
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
        playerOne = document.getElementById("playerOne").value
        playerTwo = document.getElementById("playerTwo").value 
        players = createPlayers(playerOne, playerTwo);})


        let gameOver = false;
        
        
        
        let turns = 1;

        
        
        const makeChoice = function(row, column) {
            if (gameOver === true) {
                console.log(gameOver);
                gameContainer.childNodes.forEach(e => e.removeEventListener())
                
                
                
            }
            else {
            Gameboard.displayBoard();
            turns++;
            let playerInTurn = verifyTurn(players);
            
            Gameboard.changeBoard(row, column, playerInTurn)
            if (Gameboard.checkWinner(Gameboard.getBoard()) === true) {
                gameWon(playerInTurn);
                
            }
            
            if (Gameboard.checkWinner(Gameboard.getBoard()) != true && turns == 10) {
                gameTied();
            }
            else {
            changeTurn(players);
            }}

            
            
            
            
        }
        const gameTied = function() {
            const container = document.querySelector(".container");
            
            const gameAnnouncer = document.createElement("div");
            gameAnnouncer.className = ("gameAnnouncer")
            gameAnnouncer.textContent = "It's a tie";
            
            container.appendChild(gameAnnouncer);
            
            
        }
        

        const gameWon = function (winner) {
            const container = document.querySelector(".container");
            const gameAnnouncer = document.createElement("div");
            gameAnnouncer.className = ("gameAnnouncer")
            gameAnnouncer.textContent = winner.name + " wins the game";
            gameOver = true;
            container.appendChild(gameAnnouncer);
            
           
            
            

            
        }
        const changeTurn = function(players) {
            
            if (players[0].turn === true) {
                players[0].turn = false; 
                players[1].turn = true;
            }
            else {
                players[0].turn = true; 
                players[1].turn = false;
            }
            return players;
        }
        const verifyTurn = function (players) {
            if (players[0].turn == true) {
                return players[0];
            }
            else {
                return players[1];
            }
        }
        const checkIfLegal = function (coordinates) {
            if (Gameboard.checkBoardStatus(coordinates.charAt(0), coordinates.charAt(1)) === false) {
                return false;
            }
        }
        
        return { makeChoice, changeTurn, verifyTurn, checkIfLegal }

    }
    
    
    
    
    
    
    
    
    return {playGame, createPlayers};
})();

const UserInterface = (function() {

    
    
    const displayBoardOne = (function () {
        
        for (let j = 0; j<3; j++) {
            for (let i = 0; i < 3; i++) {
                const cell = document.createElement("div");
               
                cell.className = "cell";
                cell.id = "cell_" + j + i;
                gameContainer.appendChild(cell)   
                
            }
        }
        
    })();
    const addPlayerChoice = (coordinates) => {
        if (game.checkIfLegal(coordinates) === false) {
            return;
            
        }
        else {
            game.makeChoice(coordinates.charAt(0), coordinates.charAt(1))
            modifyBoard(coordinates.charAt(0), coordinates.charAt(1))
    }
    }
    
    const createEventListeners = (function()  {
        
        gameContainer.childNodes.forEach((cell) => {
            cell.addEventListener("click", () => {
                let coordinates = (cell.id).match(/(\d+)/);
                addPlayerChoice(coordinates[0]);
            })
        })
    })();
    
    const modifyBoard = (row, column) => {
        gameContainer.childNodes.forEach((cell) => {
        if (cell.id === "cell_" + row + column) {
            cell.textContent = Gameboard.getBoardValue();
        }
    })}


    
    
    

    
        
       
    
    
    return {displayBoardOne, createEventListeners};
    
})();
   


const play = function () {
    game = GameController.playGame();

    return game
}
    









// })

