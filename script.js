const romanos = ['i', 'v', 'x', 'l', 'c', 'd', 'm'];
const valores = [1, 5, 10, 50, 100, 500, 1000];
let convertedNumber = [];
const inputNumber = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');
let userInput = null;

function getRomanIndex(input) {
    let index = 0;

    if(input > 1000) {
        index = valores.length - 1;
    } else {
        for (let i = 0; i < valores.length; i++) {
            if(valores[i] === input) {
                index = i;
                break;
            } else if(valores[i] > input) {
                index = i - 1;
                break;
            }
        }
    }
    return index;
}

function converter() {
    index = getRomanIndex(userInput)
    let ruleOfThree = true

    if(valores[index] * 3 < userInput) {
        const newInput = userInput - valores[index] * 3;
        ruleOfThree = newInput >= valores[index] ? false : true;
    }

    if(ruleOfThree) {
        convertedNumber.push(romanos[index]);
        userInput -= valores[index];
    } else {
        convertedNumber.push(romanos[index]);
        convertedNumber.push(romanos[index + 1]);
        userInput -= (valores[index + 1] - valores[index]);
    }
    
   if(userInput > 0) {
        return converter();
    } else {
        return;
    }
}

convertBtn.addEventListener('click', () => {
    userInput = inputNumber.value;
    inputNumber.value = '';

    if(userInput === '') {
        output.classList.add('output__alert');
        output.textContent = 'Please enter a valid number';
    } else if(userInput < 0) {
        output.classList.add('output__alert');
        output.textContent = 'Please enter a number greater than or equal to 1';
    } else if (userInput > 3999) {
        output.classList.add('output__alert');
        output.textContent = 'Please enter a number less than or equal to 3999';
    } else {
        converter();
        output.classList.add('output__number');
        output.innerText = convertedNumber.join('').toUpperCase();
        convertedNumber = [];
    }
})