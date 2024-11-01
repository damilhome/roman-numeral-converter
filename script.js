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
    console.log(`Started the conversion function`)
    const arrNumbers = userInput.split('');
    console.log(arrNumbers);
    
    for(let i = 0; i < arrNumbers.length; i++) {
        const numberIndex = roman.indexOf(arrNumbers[i]);
        console.log(`numberIndex = ${numberIndex}`)
        const numberValue = values[numberIndex];
        console.log(`numberValue = ${numberValue}`)
    
        if(i < arrNumbers.length - 1) {
            console.log(`Ainda tem um número à frente`)
            const nextNumberIndex = roman.indexOf(arrNumbers[i + 1]);
            console.log(`nextNumberIndex = ${nextNumberIndex}`)
            const nextNumberValue = values[nextNumberIndex]
            console.log(`nextNumberValue = ${nextNumberValue}`)

            if(numberValue < nextNumberValue) {
                console.log(`numberValue menor que próximo número`)
                decimal += nextNumberValue - numberValue;
                console.log(`Decimal value = ${decimal}`)
                i++;
            } else {
                console.log(`numberValue maior que próximo número`)
                decimal += numberValue;
                console.log(`Decimal value = ${decimal}`)
            }
        } else {
            console.log(`Não há outro número à frente`)
            decimal += numberValue;
            console.log(`Decimal value = ${decimal}`)
        }
    }
}

function showError(message) {
    output.classList.remove('hidden');
    output.classList.remove('output__number');
    output.classList.add('output__alert');
    output.textContent = message;
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
        output.classList.remove('hidden');
        output.classList.remove('output__alert');
        output.classList.add('output__number');
        output.textContent = convertedNumber.join('').toUpperCase();
        convertedNumber = [];
    }
}

function startConvertToDecimal() {
    console.log(`Start to convert`)
    const userInput = inputRomanNumber.value;

    if(userInput === '') {
        output.classList.remove('hidden');
        output.classList.remove('output__number');
        output.classList.add('output__alert');
        output.textContent = 'Please enter a valid number';
    } else {
        convertToDecimal(userInput);
        console.log(`Ended conversion function`)
        output.classList.remove('hidden');
        output.classList.remove('output__alert');
        output.classList.add('output__number');
        output.textContent = decimal;
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

document.addEventListener('DOMContentLoaded', () => {
    if(decimalToRoman.classList.contains('selected')) {
        converterRoman.classList.remove('hidden');
        converterDecimal.classList.add('hidden');

        convertBtn.addEventListener('click', startConvertToRoman)
        inputNumber.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                startConvertToRoman()
            }
        })
    } else {
        converterRoman.classList.add('hidden');
        converterDecimal.classList.remove('hidden')

        inputRomanNumber.addEventListener('keydown', (e) => checkInvalidLetter(e));
        inputRomanNumber.addEventListener('input', (e) => letterToUpperCase(e));
        inputRomanNumber.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                startConvertToDecimal()
            }
        })
        convertBtnRoman.addEventListener('click', startConvertToDecimal)
    }
})

decimalToRoman.addEventListener('click', () => {
    decimalToRoman.classList.add('selected');
    romanToDecimal.classList.remove('selected');
    converterRoman.classList.remove('hidden');
    converterDecimal.classList.add('hidden');
    output.classList.add('hidden');

    convertBtn.addEventListener('click', startConvertToRoman)
    inputNumber.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            startConvertToRoman()
        }
    })
})

romanToDecimal.addEventListener('click', () => {
    romanToDecimal.classList.add('selected');
    decimalToRoman.classList.remove('selected');
    converterRoman.classList.add('hidden');
    converterDecimal.classList.remove('hidden')
    output.classList.add('hidden');

    inputRomanNumber.addEventListener('keydown', (e) => checkInvalidLetter(e));
    inputRomanNumber.addEventListener('input', (e) => letterToUpperCase(e));
    inputRomanNumber.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            startConvertToDecimal()
        }
    })
    convertBtnRoman.addEventListener('click', startConvertToDecimal)
})