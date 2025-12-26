class Calculator {
    constructor(prevElement, currElement) {
        this.prevElement = prevElement;
        this.currElement = currElement;
        this.clear();
    }

    clear() {
        this.curr = '0';
        this.prev = '';
        this.op = undefined;
    }

    delete() {
        if (this.curr === '0') return;
        this.curr = this.curr.toString().slice(0, -1);
        if (this.curr === '') this.curr = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.curr.includes('.')) return;
        if (this.curr === '0' && number !== '.') {
            this.curr = number.toString();
        } else {
            this.curr = this.curr.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.curr === '') return;
        if (this.prev !== '') this.compute();
        this.op = operation;
        this.prev = this.curr;
        this.curr = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prev);
        const current = parseFloat(this.curr);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.op) {
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case '×': case '*': computation = prev * current; break;
            case '÷': case '/': computation = prev / current; break;
            default: return;
        }
        this.curr = computation;
        this.op = undefined;
        this.prev = '';
    }

    updateDisplay() {
        this.currElement.innerText = this.curr;
        if (this.op != null) {
            this.prevElement.innerText = `${this.prev} ${this.op}`;
        } else {
            this.prevElement.innerText = '';
        }
    }
}

// Initialization
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-clear]');
const prevElement = document.getElementById('previous-operand');
const currElement = document.getElementById('current-operand');

const calculator = new Calculator(prevElement, currElement);

// Click Listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// KEYBOARD SUPPORT
window.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <= 9) calculator.appendNumber(e.key);
    if (e.key === '.') calculator.appendNumber(e.key);
    if (e.key === '=' || e.key === 'Enter') calculator.compute();
    if (e.key === 'Backspace') calculator.delete();
    if (e.key === 'Escape') calculator.clear();
    if (['+', '-', '*', '/'].includes(e.key)) {
        let op = e.key;
        if (op === '*') op = '×';
        if (op === '/') op = '÷';
        calculator.chooseOperation(op);
    }
    calculator.updateDisplay();
});