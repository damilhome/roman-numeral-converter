const roman = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
const values = [1, 5, 10, 50, 100, 500, 1000];
const minNumber = 1;
const maxNumber = 3999;
const inputNumber = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');
const selectorButtons = document.querySelectorAll('.selector__button');
const converterRoman = document.getElementById('converter-roman');
const converterDecimal = document.getElementById('converter-decimal');
const inputRomanNumber = document.getElementById('text');
const convertBtnRoman = document.getElementById('convert-btn-roman');
const decimalToRoman = document.getElementById('decimal-to-roman');
const romanToDecimal = document.getElementById('roman-to-decimal');
let convertedNumber = [];
let decimal = 0;

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

function convertToDecimal(userInput) {
    const arrNumbers = userInput.split('');
    
    for(let i = 0; i < arrNumbers.length; i++) {
        const numberIndex = roman.indexOf(arrNumbers[i]);
        const numberValue = values[numberIndex];
    
        if(i < arrNumbers.length - 1) {
            const nextNumberIndex = roman.indexOf(arrNumbers[i + 1]);
            const nextNumberValue = values[nextNumberIndex]

            if(numberValue < nextNumberValue) {
                decimal += nextNumberValue - numberValue;
                i++;
            } else {
                decimal += numberValue;
            }
        } else {
            decimal += numberValue;
        }
    }
}

function outputClasslistHandler(classToRemove, classToAdd, textContent) {
    output.classList.remove('hidden');
    output.classList.remove(classToRemove);
    output.classList.add(classToAdd);
    output.textContent = textContent;
}

function showError(message) {
    outputClasslistHandler('output__number', 'output__alert', message)
    output.classList.remove('hidden');
}

function startConvertToRoman() {
    const userInput = parseInt(inputNumber.value);

    if(!userInput) {
        showError('Please enter a valid number');
    } else if(userInput < minNumber) {
        showError('Please enter a number greater than or equal to 1');
    } else if (userInput > maxNumber) {
        showError('Please enter a number less than or equal to 3999');
    } else {
        convertToRoman(userInput);
        outputClasslistHandler('output__alert', 'output__number', convertedNumber.join('').toUpperCase())
        convertedNumber = [];
    }
}

function startConvertToDecimal() {
    const userInput = inputRomanNumber.value;

    if(userInput === '') {
        outputClasslistHandler('output__number', 'output__alert', 'Please enter a valid number');
    } else {
        convertToDecimal(userInput);

        if(decimal < maxNumber) {
            outputClasslistHandler('output__alert', 'output__number', decimal)
            convertToRoman(decimal);
            inputRomanNumber.value = convertedNumber.join('').toUpperCase();
            convertedNumber = [];
        } else {
            showError('Please enter a number less than or equal to 3999');
        }
        decimal = 0;
    }
}

function checkInvalidLetter(e) {
    let invalidLetter = true;

    roman.forEach(letter => {
        if(e.key.toUpperCase() === letter || e.key === 'Backspace') {
            invalidLetter = false;
        }
    })

    if(invalidLetter) {
        e.preventDefault();
    }
}

function letterToUpperCase(e) {
    e.target.value = e.target.value.toUpperCase();
}

function initialClasslistHandler(selectedToAdd, selectedToRemove, hiddenToAdd, hiddenToRemove, output) {
    selectedToAdd.classList.add('selected');
    selectedToRemove.classList.remove('selected');
    hiddenToAdd.classList.add('hidden');
    hiddenToRemove.classList.remove('hidden');
    output.classList.add('hidden');
    inputNumber.value = '';
    inputRomanNumber.value = '';
}

function decimalToRomanEventHandler(convertBtn, inputNumber) {
    convertBtn.addEventListener('click', startConvertToRoman)
    inputNumber.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            startConvertToRoman()
        }
    })
}

function romanToDecimalEventHandler(convertBtnRoman, inputRomanNumber) {
    inputRomanNumber.addEventListener('keydown', (e) => checkInvalidLetter(e));
    inputRomanNumber.addEventListener('input', (e) => letterToUpperCase(e));
    inputRomanNumber.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            startConvertToDecimal()
        }
    })
    convertBtnRoman.addEventListener('click', startConvertToDecimal)
}

document.addEventListener('DOMContentLoaded', () => {
    if(decimalToRoman.classList.contains('selected')) {
        decimalToRomanEventHandler(convertBtn, inputNumber);
    }
})

decimalToRoman.addEventListener('click', () => {
    initialClasslistHandler(decimalToRoman, romanToDecimal, converterDecimal, converterRoman, output,inputNumber, inputRomanNumber);

    decimalToRomanEventHandler(convertBtn, inputNumber);
})

romanToDecimal.addEventListener('click', () => {
    initialClasslistHandler(romanToDecimal, decimalToRoman, converterRoman, converterDecimal, output, inputNumber, inputRomanNumber);

    romanToDecimalEventHandler(convertBtnRoman, inputRomanNumber);
})

/* 
TODO:
- colocar um verificador para que, ao converter de romano para decimal, só chamar
a outra conversão se o número for menor que 4000, caso contrário, mostrar a mensagem
de alerta na tela
- Veriificar se tem outros alertas para mostrar na tela
*/