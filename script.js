let display = document.getElementById('display');

document.addEventListener('keydown', handleKeyPress);

const darkModeOptions = {
    bottom: '90%', // Adjusted position
    right: '20px',
    left: 'unset',
    time: '0.5s',
    mixColor: '#fff',
    backgroundColor: '#fff',
    buttonColorDark: '#100f2c',
    buttonColorLight: '#fff',
    saveInCookies: true,
    label: '🌓',
    autoMatchOsTheme: true
};

const darkmode = new Darkmode(darkModeOptions);
darkmode.showWidget();

function handleKeyPress(event) {
    const key = event.key;

    if (isNumericKey(key) || isOperatorKey(key) || key === '.') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLastCharacter();
    }
}

function appendToDisplay(value) {
    if (display.value.length < 15) {
        display.value += value;
        animateButtonPress();
    }
}

function animateButtonPress() {
    display.classList.add('button-press');
    setTimeout(() => {
        display.classList.remove('button-press');
    }, 100);
}

function clearDisplay() {
    display.value = '';
}

function deleteLastCharacter() {
    display.value = display.value.slice(0, -1);
}

// Toggle the sign of the current number
function toggleSign() {
    display.value = parseFloat(display.value) * -1;
}

function toggleNegation() {
    toggleSign();
}

function calculatePercentage() {
    display.value = parseFloat(display.value) / 100;
}

function calculateResult() {
    try {
        let result = evaluateExpression(display.value);

        if (!isValidNumber(result)) {
            throw new Error('Invalid result: Please check your input');
        }

        display.value = formatResult(result);
    } catch (error) {
        display.value = `Error: ${error.message}`;
    }
}

function isValidNumber(num) {
    return typeof num === 'number' && isFinite(num) && !isNaN(num);
}

function formatResult(result) {
    const roundedResult = Math.round(result * 10000000000) / 10000000000;
    return roundedResult.toString();
}

function isNumericKey(key) {
    return !isNaN(key);
}

function isOperatorKey(key) {
    return ['+', '-', '*', '/'].includes(key);
}

function evaluateExpression(expression) {
    try {
        return math.evaluate(expression);
    } catch (error) {
        throw new Error('Invalid expression');
    }
}
