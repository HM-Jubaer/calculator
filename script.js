const display = document.getElementById('display');
const keys = document.querySelectorAll('.key');

let currentInput = '';
let previousInput = '';
let operator = '';
let resultDisplayed = false;

function updateDisplay(value) {
    display.value = value || '0';
}

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    resultDisplayed = false;
    updateDisplay('=');
}

function deleteLast() {
    if (!resultDisplayed) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    }
}

function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case 'x':
            result = prev * curr;
            break;
        case '/':
            result = curr === 0 ? 'Error' : prev / curr;
            break;
        case '%':
            result = (prev * curr) / 100;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    resultDisplayed = true;
    updateDisplay(currentInput);
}

function toggleSign() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }
}

keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyContent = key.textContent;

        if (key.id === 'clear') {
            clearCalculator();
        } else if (key.id === 'delete') {
            deleteLast();
        } else if (key.id === 'posNeg') {
            toggleSign();
        } else if (key.id === 'key-equal') {
            calculate();
        } else if (['+', '-', 'x', '/', '%'].includes(keyContent)) {
            if (!currentInput) return;
            if (currentInput && previousInput && operator) {
                calculate();
            }
            operator = keyContent;
            previousInput = currentInput;
            currentInput = '';
            resultDisplayed = false;
        } else {
            if (resultDisplayed) {
                currentInput = keyContent;
                resultDisplayed = false;
            } else {
                if (keyContent === '.' && currentInput.includes('.')) return;
                currentInput += keyContent;
            }
            updateDisplay(currentInput || '0');
        }
    });
});

clearCalculator();