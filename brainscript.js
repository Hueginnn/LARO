document.addEventListener('DOMContentLoaded', () => {
    const homepage = document.getElementById('homepage');
    const registrationPage = document.getElementById('registrationPage');
    const rankingPage = document.getElementById('rankingPage');
    const gameContainer = document.getElementById('gameContainer');
    const endGameScreen = document.getElementById('endGameScreen');
    const startBtn = document.getElementById('startBtn');
    const viewRankingBtn = document.getElementById('viewRankingBtn');
    const exitBtn = document.getElementById('Exit');
    const registerBtn = document.getElementById('registerBtn');
    const playerNameInput = document.getElementById('playerName');
    const registeredPlayersDiv = document.getElementById('registeredPlayers');
    const confirmPlayerCountBtn = document.getElementById('confirmPlayerCountBtn');
    const playerCountInput = document.getElementById('playerCount');
    const returnToHomeBtn = document.getElementById('returnToHomeBtn');
    const returnBtn = document.getElementById('returnBtn');
    const returnBtnEnd = document.getElementById('returnBtnEnd');
    const playAgainBtn = document.getElementById('playAgainBtn');

    let players = [];
    let maxPlayers = 2;
    let currentPlayerIndex = 0;
    let currentQuestionIndex = 0;
    let currentRound = 1;

    const roundQuestions = {
        1: [
            { question: "What is data transformation?", choices: ["Conversion", "Processing", "Transformation", "Shaping"], correctAnswer: 2 },
            { question: "Best chart for proportions?", choices: ["Line", "Bar", "Pie", "Scatter"], correctAnswer: 2 },
            { question: "What is ETL?", choices: ["Extract, Load", "Transform", "Expand", "Encode"], correctAnswer: 0 },
            { question: "Handling missing data?", choices: ["Drop", "Replace", "Fill", "All"], correctAnswer: 3 },
            { question: "Association test?", choices: ["T-test", "Chi-square", "ANOVA", "Correlation"], correctAnswer: 1 }
        ],
        2: [
            { question: "What is a T-test?", choices: ["Difference", "ANOVA", "Chi-square", "Correlation"], correctAnswer: 0 },
            { question: "Algorithm without programming?", choices: ["Supervised", "Unsupervised", "Reinforcement", "Deep"], correctAnswer: 3 },
            { question: "Non-linear structure?", choices: ["Array", "Queue", "Stack", "Tree"], correctAnswer: 3 },
            { question: "Continuous to categories?", choices: ["Regression", "Clustering", "Binning", "Normalization"], correctAnswer: 2 },
            { question: "Frequent itemsets?", choices: ["Apriori", "SVM", "K-Means", "Random"], correctAnswer: 0 }
        ],
        3: [
            { question: "High-level to machine code?", choices: ["Compilation", "Interpretation", "Execution", "Debugging"], correctAnswer: 0 },
            { question: "Constant access structure?", choices: ["Array", "List", "Hash", "Tree"], correctAnswer: 2 },
            { question: "Small program?", choices: ["App", "Function", "Routine", "Utility"], correctAnswer: 3 },
            { question: "Bjarne's language?", choices: ["Java", "Python", "C++", "JavaScript"], correctAnswer: 2 },
            { question: "Error fixing?", choices: ["Testing", "Debugging", "Profiling", "Optimizing"], correctAnswer: 1 }
        ]
    };

    startBtn.addEventListener('click', () => {
        homepage.style.display = 'none';
        registrationPage.style.display = 'block';
    });

    viewRankingBtn.addEventListener('click', () => {
        homepage.style.display = 'none';
        rankingPage.style.display = 'block';
        updateRanking();
    });

    exitBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    confirmPlayerCountBtn.addEventListener('click', () => {
        maxPlayers = parseInt(playerCountInput.value);
        if (maxPlayers >= 2 && maxPlayers <= 5) {
            alert(`Player count set to ${maxPlayers}. Please register players.`);
            playerNameInput.disabled = false;
            registerBtn.disabled = false;
        } else {
            alert('Please select a valid number of players (2-5).');
        }
    });

    registerBtn.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName && players.length < maxPlayers) {
            players.push({ name: playerName, wins: 0 });
            updateRegisteredPlayers();
            playerNameInput.value = '';
            if (players.length === maxPlayers) {
                startGame();
            }
        } else if (players.length >= maxPlayers) {
            alert(`You have reached the maximum of ${maxPlayers} players.`);
        } else {
            alert('Please enter a valid player name.');
        }
    });

    returnToHomeBtn.addEventListener('click', () => {
        resetPlayers();
        rankingPage.style.display = 'none';
        homepage.style.display = 'block';
    });

    returnBtn.addEventListener('click', () => {
        resetPlayers();
        registrationPage.style.display = 'none';
        homepage.style.display = 'block';
    });

    returnBtnEnd.addEventListener('click', () => {
        resetPlayers();
        endGameScreen.style.display = 'none';
        homepage.style.display = 'block';
    });

    playAgainBtn.addEventListener('click', () => {
        endGameScreen.style.display = 'none';
        startGame();
    });

    function updateRegisteredPlayers() {
        registeredPlayersDiv.innerHTML = players.map(player => `<p>${player.name}</p>`).join('');
    }

    function startGame() {
        registrationPage.style.display = 'none';
        gameContainer.style.display = 'block';
        currentPlayerIndex = 0;
        currentQuestionIndex = 0;
        currentRound = 1;
        players.forEach(player => player.wins = 0);
        startPlayerTurn();
    }

    function startPlayerTurn() {
        const currentPlayer = players[currentPlayerIndex];
        const questions = roundQuestions[currentRound];
        const currentQuestion = questions[currentQuestionIndex];
        
        document.getElementById('roundTitle').textContent = `Player: ${currentPlayer.name}`;
        document.getElementById('questionText').textContent = currentQuestion.question;

        const choicesContainer = document.getElementById('choicesContainer');
        choicesContainer.innerHTML = '';
        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.addEventListener('click', () => checkAnswer(index, currentQuestion.correctAnswer));
            choicesContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
        if (selectedAnswer === correctAnswer) {
            players[currentPlayerIndex].wins++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < roundQuestions[currentRound].length) {
            startPlayerTurn();
        } else {
            currentQuestionIndex = 0;
            currentPlayerIndex++;
            if (currentPlayerIndex < players.length) {
                startPlayerTurn();
            } else {
                handleRoundEnd();
            }
        }
    }

    function handleRoundEnd() {
        currentPlayerIndex = 0;
        eliminatePlayers();

        if (players.length > 1) {
            currentRound++;
            startPlayerTurn();
        } else {
            endGame();
        }
    }

    function eliminatePlayers() {
        const sortedPlayers = players.slice().sort((a, b) => a.wins - b.wins);
        const eliminations = currentRound === 1
            ? players.length >= 5 ? 2 : 1
            : 1;
        players = players.filter(player => !sortedPlayers.slice(0, eliminations).includes(player));
    }

    function endGame() {
        gameContainer.style.display = 'none';
        endGameScreen.style.display = 'block';
        const winner = players[0];
        document.getElementById('winnerDisplay').textContent = `Winner: ${winner.name}`;
        const summaryDisplay = document.getElementById('summaryDisplay');
        summaryDisplay.innerHTML = players.map(player => `<p>${player.name}: ${player.wins} wins</p>`).join('');
        localStorage.setItem('players', JSON.stringify(players));
    }

    function updateRanking() {
        const rankingTableBody = document.getElementById('rankingTable').querySelector('tbody');
        rankingTableBody.innerHTML = players
            .sort((a, b) => b.wins - a.wins)
            .map(player => `<tr><td>${player.name}</td><td>${player.wins}</td></tr>`)
            .join('');
    }

    function resetPlayers() {
        players = [];
        registeredPlayersDiv.innerHTML = '';
        playerNameInput.disabled = false;
        registerBtn.disabled = false;
        playerNameInput.value = '';
        playerCountInput.value = '';
    }
});
