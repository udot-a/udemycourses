const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const battleLog =[];
let chosenMaxLife;
try {
    chosenMaxLife = Number(prompt("Type maximum life player and monster:", "100"));

    if (!chosenMaxLife || chosenMaxLife <= 0) {
        throw ({message: "invalid user input. Must be a number type."})
    }
} catch(error) {
    console.warn(error.message);
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let gameCounter = 1;

adjustHealthBars(chosenMaxLife);

const writeLog = (event, value, target, monsterHealth, playerHealth) => {
    battleLog.push({
        target,
        event,
        value,
        time: new Date().toLocaleTimeString(),
        monsterHealth,
        playerHealth
    });
}


const endRound = () => {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);

    currentPlayerHealth -= playerDamage;

    writeLog(
        "MONSTER ATTACK",
        playerDamage,
        "MONSTER",
        currentMonsterHealth,
        currentPlayerHealth
    );


    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;

        removeBonusLife();

        currentPlayerHealth = initialPlayerHealth;

        alert("You would be dead but the bonus life save you!!!");

        setPlayerHealth(initialPlayerHealth);
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You won!!!");

        writeLog(
            "GAME OVER",
            "PLAYER WIN!!!",
            "PLAYER",
            currentMonsterHealth,
            currentPlayerHealth
        );

    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("Monster won!!!");

        writeLog(
            "GAME OVER",
            "MONSTER WIN !!!",
            "MONSTER",
            currentMonsterHealth,
            currentPlayerHealth
        );

    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("You have a draw!!!");

        writeLog(
            "GAME OVER",
            "WE HAVE A DRAW!!!",
            "BOTH",
            currentMonsterHealth,
            currentPlayerHealth
        );

    }
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

const reset = () => {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    addBonusLife(hasBonusLife);
    hasBonusLife = true;
    resetGame(chosenMaxLife);
    gameCounter++;
}

const attack = mode => () => {
    const damage = dealMonsterDamage(mode);

    currentMonsterHealth -= damage;

    writeLog(
        mode===ATTACK_VALUE ? "PLAYER ATTACK" : mode === STRONG_ATTACK_VALUE ? "PLAYER STRONG ATTACK VALUE" : null ,
        damage,
        "PLAYER",
        currentMonsterHealth,
        currentPlayerHealth
    );


    endRound();
}

attackBtn.onclick = attack(ATTACK_VALUE);

strongAttackBtn.onclick = attack(STRONG_ATTACK_VALUE);

healBtn.onclick = (e) => {
    increasePlayerHealth(HEAL_VALUE);

    currentPlayerHealth += HEAL_VALUE;

    writeLog(
        "PLAYER HEAL",
        HEAL_VALUE,
        "PLAYER",
        currentMonsterHealth,
        currentPlayerHealth
    );


    if (currentPlayerHealth > chosenMaxLife) {
        alert("You can't heal any more. Your health is 100%");
        currentPlayerHealth = chosenMaxLife;
    }

    endRound();
}

logBtn.onclick = (e) => {
    for (let i = 0; i < battleLog.length; i++ ){
        console.log(`========================= LOG # ${i+1} ===============================`);

        for (const key in battleLog[i]) {
            console.log(`${key}: ${battleLog[i][key]}`);
        }

        console.log("**********************************************************************");
    }
}


