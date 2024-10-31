const roman = ['i', 'v', 'x', 'l', 'c', 'd', 'm'];
const values = [1, 5, 10, 50, 100, 500, 1000];
const minNumber = 1;
const maxNumber = 3999;
const inputNumber = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');
let convertedNumber = [];

function getRomanIndex(input) {
    let index = 0;

    if(input > values[values.length - 1]) {
        index = values.length - 1;
    } else {
        for (let i = 0; i < values.length; i++) {
            if(values[i] === input) {
                index = i;
                break;
            } else if(values[i] > input) {
                index = i - 1;
                break;
            }
        }
    }
    return index;
}

function ruleOfThree(index, userInput) {
    const ruleOfThree = values[index] * 3;
    let ruleOfThreeApplies = true;

    if(ruleOfThree < userInput) {
        const remainingOfInput = userInput - ruleOfThree;
        ruleOfThreeApplies = remainingOfInput >= values[index] ? false : true;
    }

    return ruleOfThreeApplies;
}

function convertToRoman(userInput) {
    const index = getRomanIndex(userInput);
    const ruleOfThreeApplies = ruleOfThree(index, userInput);

    if(ruleOfThreeApplies) {
        convertedNumber.push(roman[index]);
        userInput -= values[index];
    } else {
        convertedNumber.push(roman[index]);
        convertedNumber.push(roman[index + 1]);
        userInput -= (values[index + 1] - values[index]);
    }
    
   if(userInput > 0) {
        return convertToRoman();
    } else {
        return;
    }
}

function startConvert() {
    const userInput = inputNumber.value;
    inputNumber.value = '';

    if(userInput === '') {
        output.classList.remove('output__number');
        output.classList.add('output__alert');
        output.textContent = 'Please enter a valid number';
    } else if(userInput < minNumber) {
        output.classList.remove('output__number');
        output.classList.add('output__alert');
        output.textContent = 'Please enter a number greater than or equal to 1';
    } else if (userInput > maxNumber) {
        output.classList.remove('output__number');
        output.classList.add('output__alert');
        output.textContent = 'Please enter a number less than or equal to 3999';
    } else {
        convertToRoman(userInput);
        output.classList.remove('output__alert');
        output.classList.add('output__number');
        output.innerText = convertedNumber.join('').toUpperCase();
        convertedNumber = [];
    }
}

convertBtn.addEventListener('click', startConvert)
inputNumber.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        startConvert()
    }
})