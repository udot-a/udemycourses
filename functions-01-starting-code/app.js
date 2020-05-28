const startGameBtn = document.getElementById('start-game-btn');

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOICE = ROCK;

const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";

let gamesIsRunning = false;

const getPlayerChoice = () => {
    const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?: `, "").toUpperCase();
    const match = [ROCK, PAPER, SCISSORS];

    if (match.indexOf(selection) === -1) {
        alert(`Invalid choice. We chose ${DEFAULT_USER_CHOICE} for you!`);

        return DEFAULT_USER_CHOICE;
    }

    return selection;
}

const getComputerChoice = (randomValue = Math.random()) =>
    randomValue < 0.34
    ? ROCK
    : (randomValue <0.67)
    ? PAPER
    : SCISSORS;


const getWinner = (cChoice, pChoice) =>
    cChoice === pChoice
    ? RESULT_DRAW
    : (
        cChoice === ROCK && pChoice === PAPER ||
        cChoice === PAPER && pChoice === SCISSORS ||
        pChoice === SCISSORS && pChoice === ROCK
    )
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;

startGameBtn.onclick = e => {
    if (gamesIsRunning) {
        return;
    }

    gamesIsRunning = true;

    console.log("Game is starting...");

    console.log(getWinner(getComputerChoice(), getPlayerChoice()));

    gamesIsRunning = false;
}
