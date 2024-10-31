const roman = ['i', 'v', 'x', 'l', 'c', 'd', 'm'];
const values = [1, 5, 10, 50, 100, 500, 1000];
const minNumber = 1;
const maxNumber = 3999;
const inputNumber = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');
let convertedNumber = [];

function getRomanIndex(input) {
    for(let i = values.length - 1; i >= 0; i--) {
        if(values[i] <= input) {
            return i;
        }
    }
}

function checkSecondHalfSpecialRule(index, userInput) {
    const rule = values[index] + (values[index - 1] * 3);
    let specialRuleApplies = false;

    if(rule < userInput) {
        const remainingOfInput = userInput - rule;
        specialRuleApplies = remainingOfInput >= values[index - 1] ? true : false;
    }
    
    return specialRuleApplies;
}

function checkFirstHalfSpecialRule(index, userInput) {
    const rule = values[index] * 3;
    let specialRuleApplies = false;
    
    if(rule < userInput) {
        const remainingOfInput = userInput - rule;
        specialRuleApplies = remainingOfInput >= values[index] ? true : false;
    }

    return specialRuleApplies;
}

function romanNumberNormalCase(index, userInput) {
    convertedNumber.push(roman[index]);
    return userInput -= values[index];
}

function convertToRoman(userInput) {
    const index = getRomanIndex(userInput);
    
    if((userInput > 1 && userInput < 5) || (userInput > 10 && userInput < 50) || (userInput > 100 && userInput < 500)){
        const specialRule = checkFirstHalfSpecialRule(index, userInput);
        if(specialRule) {
            convertedNumber.push(roman[index]);
            convertedNumber.push(roman[index + 1]);
            userInput -= (values[index + 1] - values[index]);
        } else {
            userInput = romanNumberNormalCase(index, userInput);
        }
    } else if ((userInput > 5 && userInput < 10) || (userInput > 50 && userInput < 100) || (userInput > 500 && userInput < 1000)) {
        const specialRule = checkSecondHalfSpecialRule(index, userInput);
        if(specialRule) {
            convertedNumber.push(roman[index - 1]);
            convertedNumber.push(roman[index + 1]);
            userInput -= (values[index + 1] - values[index - 1]);
        } else {
            userInput = romanNumberNormalCase(index, userInput);
        }
    } else {
        userInput = romanNumberNormalCase(index, userInput);
    }
    
   if(userInput > 0) {
        convertToRoman(userInput);
    }
}

function showError(message) {
    output.classList.remove('output__number');
    output.classList.add('output__alert');
    output.textContent = message;
}

function startConvert() {
    const userInput = parseInt(inputNumber.value);

    if(!userInput) {
        showError('Please enter a valid number');
    } else if(userInput < minNumber) {
        showError('Please enter a number greater than or equal to 1');
    } else if (userInput > maxNumber) {
        showError('Please enter a number less than or equal to 3999');
    } else {
        convertToRoman(userInput);
        output.classList.remove('output__alert');
        output.classList.add('output__number');
        output.textContent = convertedNumber.join('').toUpperCase();
        convertedNumber = [];
    }
}

convertBtn.addEventListener('click', startConvert)
inputNumber.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        startConvert()
    }
})