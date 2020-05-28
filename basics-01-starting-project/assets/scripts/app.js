const defaultResult = 0;
let currentResult = defaultResult;
const logEntries = [];

class Log {
    constructor(logItem, operator) {
        this.timeCreate = new Date().toLocaleTimeString();
        this.logItem = logItem;
        this[operator] = operator ? true : false;
    }
}

function getUserNumberInput() {
    return Number(userInput.value);
}

const createAndWriteOutput = (operator, operation) =>
    () => {
        const enteredNumber = getUserNumberInput();
        const calcDescription = `${currentResult} ${operator} ${enteredNumber}`;

        switch (operator) {
            case "+":
                currentResult += Number(enteredNumber);
                break;

            case "-":
                currentResult -= Number(enteredNumber);
                break;

            case "*":
                currentResult *= Number(enteredNumber);
                break;

            case "/":
                if (!!enteredNumber) {
                    currentResult /= Number(enteredNumber);
                } else console.warn("Division dy zero!!!")
                break;

            default:
                return null;
        }

        logEntries.push(new Log(calcDescription, operation));

        outputResult(currentResult, calcDescription);

        console.log(logEntries);
    }

addBtn.addEventListener("click", createAndWriteOutput("+", "add"));
subtractBtn.addEventListener("click", createAndWriteOutput("-", "subtract"));
multiplyBtn.addEventListener("click", createAndWriteOutput("*", "multiple"));
divideBtn.addEventListener("click", createAndWriteOutput("/", "divide"));

