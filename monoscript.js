// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const gameContainer = document.getElementById('game-container');
const board = document.getElementById('board');
const rollButton = document.getElementById('roll-btn');
const endGameButton = document.getElementById('end-game-btn'); // New End Game Button
const turnInfo = document.getElementById('turn-info');
const player1ScoreEl = document.getElementById('player1-score');
const player2ScoreEl = document.getElementById('player2-score');
const player3ScoreEl = document.getElementById('player3-score');
const player4ScoreEl = document.getElementById('player4-score');

let players = {};
let scores = {};
let currentPlayer = "Player 1";
const pathLength = 40;

// 100 coding questions and answers
const codingQuestions = [
    { question: "What is the keyword to declare a variable in JavaScript?", answer: "var" },
    { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
    { question: "What is the output of 2 + 2 in JavaScript?", answer: "4" },
    { question: "What CSS property changes text color?", answer: "color" },
    { question: "What is the value of Boolean(0) in JavaScript?", answer: "false" },
    { question: "What is a variable?", answer: "let" },
    { question: "What are data types?", answer: "number" },
    { question: "What is a loop?", answer: "for" },
    { question: "What is an array?", answer: "[]" },
    { question: "What is a function?", answer: "function" },
    { question: "What’s the difference between a while loop and a for loop?", answer: "condition" },
    { question: "What is recursion?", answer: "self-call" },
    { question: "What is an algorithm?", answer: "procedure" },
    { question: "What are conditional statements?", answer: "if" },
    { question: "What is a string?", answer: '""' },
    { question: "What is a syntax error?", answer: "bug" },
    { question: "What is scope?", answer: "visibility" },
    { question: "What is a compiler?", answer: "translate" },
    { question: "What is an interpreter?", answer: "execute" },
    { question: "What is a library?", answer: "collection" },
    { question: "What is an object in OOP?", answer: "instance" },
    { question: "What is a class?", answer: "blueprint" },
    { question: "What is inheritance?", answer: "extend" },
    { question: "What is polymorphism?", answer: "overload" },
    { question: "What is a stack?", answer: "LIFO" },
    { question: "What is a queue?", answer: "FIFO" },
    { question: "What is a linked list?", answer: "nodes" },
    { question: "What is a hash table?", answer: "key-value" },
    { question: "What is a binary tree?", answer: "hierarchy" },
    { question: "What is a graph?", answer: "connections" },
    { question: "What is a constructor?", answer: "initialize" },
    { question: "What is a destructor?", answer: "cleanup" },
    { question: "What is an exception?", answer: "error" },
    { question: "What is exception handling?", answer: "try-catch" },
    { question: "What is a module?", answer: "file" },
    { question: "What are comments?", answer: "notes" },
    { question: "What is debugging?", answer: "fixing" },
    { question: "What is a prototype?", answer: "template" },
    { question: "What is SDLC?", answer: "process" },
    { question: "What is version control?", answer: "tracking" },
    { question: "What is Git?", answer: "repository" },
    { question: "What is a framework?", answer: "structure" },
    { question: "What is a database?", answer: "storage" },
    { question: "What is SQL?", answer: "query" },
    { question: "What is normalization?", answer: "organization" },
    { question: "What is an API?", answer: "interface" },
    { question: "What is JSON?", answer: "data" },
    { question: "What is an IDE?", answer: "editor" },
    { question: "What is == in JavaScript?", answer: "equality" },
    { question: "What is === in JavaScript?", answer: "strict" },
    { question: "What is a Boolean?", answer: "true/false" },
    { question: "What is a syntax tree?", answer: "structure" },
    { question: "What is dynamic typing?", answer: "flexible" },
    { question: "What is a constructor in JavaScript?", answer: "new" },
    { question: "What is the this keyword?", answer: "context" },
    { question: "What is a promise?", answer: "async" },
    { question: "What is a closure?", answer: "scope" },
    { question: "What is a prototype in JavaScript?", answer: "inherit" },
    { question: "What is a RESTful API?", answer: "web" },
    { question: "What is a callback?", answer: "function" },
    { question: "What is an event?", answer: "action" },
    { question: "What is an infinite loop?", answer: "never ending" },
    { question: "What is type casting?", answer: "conversion" },
    { question: "What is a sentinel value?", answer: "marker" },
    { question: "What is the difference between a stack and a queue?", answer: "order" },
    { question: "What is binary search?", answer: "divide" },
    { question: "What is linear search?", answer: "sequential" },
    { question: "What is Big O notation?", answer: "complexity" },
    { question: "What is encapsulation?", answer: "shielding" },
    { question: "What is an interface?", answer: "contract" },
    { question: "What is a thread?", answer: "execution" },
    { question: "What is deadlock?", answer: "stalemate" },
    { question: "What is a primary key?", answer: "unique" },
    { question: "What is a foreign key?", answer: "reference" },
    { question: "What is SQL injection?", answer: "attack" },
    { question: "What is the SELECT statement?", answer: "retrieve" },
    { question: "What is a subquery?", answer: "nested" },
    { question: "What is a view?", answer: "virtual" },
    { question: "What is data abstraction?", answer: "simplification" },
    { question: "What is multithreading?", answer: "concurrent" },
    { question: "What is the singleton pattern?", answer: "one-instance" },
    { question: "What is a race condition?", answer: "conflict" },
    { question: "What is a socket?", answer: "endpoint" },
    { question: "What is the break statement?", answer: "exit" },
    { question: "What is the continue statement?", answer: "skip" },
    { question: "What is a binary file?", answer: "encoded" },
    { question: "What is a text file?", answer: "plain" },
    { question: "What is exception propagation?", answer: "forward" },
    { question: "What is a design pattern?", answer: "solution" },
    { question: "What is the switch statement?", answer: "branch" },
    { question: "What is shallow copy?", answer: "reference" },
    { question: "What is deep copy?", answer: "duplicate" },
    { question: "What is a GUI?", answer: "visual" },
    { question: "What is CLI?", answer: "text" },
    { question: "What is a shell?", answer: "command" },
    { question: "What is a buffer?", answer: "storage" },
    { question: "What is a regular expression?", answer: "pattern" },
    { question: "What is a dependency?", answer: "relation" },
    { question: "What is software testing?", answer: "evaluation" },
    { question: "What is unit testing?", answer: "individual" },
    { question: "What is integration testing?", answer: "combined" },
    { question: "What is a software framework?", answer: "foundation" },
    { question: "What is a RESTful service?", answer: "API" },
    { question: "What is a microservice?", answer: "module" },
    { question: "What is the return statement?", answer: "output" }
];
console.log(codingQuestions);


// Player selection and game start
document.querySelectorAll('.player-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const numPlayers = parseInt(btn.dataset.players);
        setupPlayers(numPlayers);
        startGame();
    });
});

// Setup players and initialize scores
function setupPlayers(numPlayers) {
    players = {};
    scores = {};
    for (let i = 1; i <= numPlayers; i++) {
        players[`Player ${i}`] = 0;
        scores[`Player ${i}`] = 0;
    }
    currentPlayer = "Player 1";
    updateScores();
}

// Start the game
function startGame() {
    welcomeScreen.style.display = 'none';
    gameContainer.style.display = 'flex';
    createBoard();
    updateBoard();
}

// Create the game board
function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 121; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (i === 0 || i === 10 || i === 110 || i === 120) {
            cell.classList.add('corner');
        } else if (isOuterPath(i)) {
            cell.classList.add('property');
        }
        board.appendChild(cell);
    }
}

// Check if a cell is part of the outer path
function isOuterPath(index) {
    const row = Math.floor(index / 11);
    const col = index % 11;
    return row === 0 || row === 10 || col === 0 || col === 10;
}

// Update the board with player positions
function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => (cell.innerHTML = ""));
    for (const [player, position] of Object.entries(players)) {
        const pathIndex = getOuterPathIndex(position);
        let pawnContainer = cells[pathIndex].querySelector('.pawn-container');

        if (!pawnContainer) {
            pawnContainer = document.createElement('div');
            pawnContainer.classList.add('pawn-container');
            cells[pathIndex].appendChild(pawnContainer);
        }

        const pawn = document.createElement('div');
        pawn.classList.add('pawn', `player${player.charAt(7)}`);
        pawn.textContent = player.charAt(7);
        pawnContainer.appendChild(pawn);
    }
}

// Get the outer path index for a given position
function getOuterPathIndex(position) {
    if (position < 11) return position;
    if (position < 21) return 10 + (position - 10) * 11;
    if (position < 31) return 120 - (position - 20);
    return 110 - (position - 30) * 11;
}

// Player turn logic with question prompt
function playerTurn() {
    const question = getRandomQuestion();
    const userAnswer = prompt(question.question);

    if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
        const steps = rollDice();
        movePlayer(steps);
    } else {
        alert("Incorrect answer! Your turn is skipped.");
    }
    switchPlayer();
}

// Get a random coding question
function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * codingQuestions.length);
    return codingQuestions[randomIndex];
}

// Roll the dice
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Move the player
function movePlayer(steps) {
    const oldPosition = players[currentPlayer];
    const newPosition = (oldPosition + steps) % pathLength;

    if (newPosition < oldPosition) { // Player passed the starting point
        scores[currentPlayer]++;
        updateScores();
        askToContinue();
    }

    players[currentPlayer] = newPosition;
    updateBoard();
}

// Ask the user if they want to continue or end the game
function askToContinue() {
    const continueGame = confirm(`${currentPlayer} scored a point! Do you want to continue?`);
    if (continueGame) {
        resetPlayerPositions();
        updateBoard();
    } else {
        endGame();
    }
}

// Reset all players to the starting point
function resetPlayerPositions() {
    for (const player in players) {
        players[player] = 0;
    }
}

// Update the scores on the scoreboard
function updateScores() {
    player1ScoreEl.textContent = scores["Player 1"] || 0;
    player2ScoreEl.textContent = scores["Player 2"] || 0;
    player3ScoreEl.textContent = scores["Player 3"] || 0;
    player4ScoreEl.textContent = scores["Player 4"] || 0;
}

// Switch to the next player
function switchPlayer() {
    const playerKeys = Object.keys(players);
    const currentIndex = playerKeys.indexOf(currentPlayer);
    currentPlayer = playerKeys[(currentIndex + 1) % playerKeys.length];
    turnInfo.textContent = `${currentPlayer}'s Turn`;
}

// Reset the game and go back to the welcome screen
function endGame() {
    welcomeScreen.style.display = 'block';
    gameContainer.style.display = 'none';
    setupPlayers(Object.keys(players).length);
}

// Event listeners
rollButton.addEventListener('click', playerTurn);
endGameButton.addEventListener('click', () => {
    const confirmEnd = confirm("Are you sure you want to end the game?");
    if (confirmEnd) {
        endGame();
    } else {
        alert("The game will continue!");
    }
});
