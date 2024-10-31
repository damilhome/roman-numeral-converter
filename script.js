const romanos = ['i', 'v', 'x', 'l', 'c', 'd', 'm'];
const valores = [1, 5, 10, 50, 100, 500, 1000];
const convertedNumber = [];
const inputNumber = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');
let userInput = null;

function getRomanIndex(input) {
    console.log('Entrou no pegar index')
    let index = 0;

    if(input > 1000) {
        console.log('entrou no if do 1000')
        index = valores.length - 1;
    } else {
        console.log('entrou no else do for')
        for (let i = 0; i < valores.length; i++) {
            console.log('ciclo atual do for ' + i)
            
            if(valores[i] === input) {
                console.log('input é igual a valores ' + valores[i])
                index = i;
                break;
            } else if(valores[i] > input) {
                console.log('input é menor que valores ' + valores[i - 1])
                index = i - 1;
                break;
            }
        }
    }
    console.log(valores[index])
    return index;

}

function converter() {
    console.log('entrou no converter')
    index = getRomanIndex(userInput)
    console.log('saiu do pegar index')
    let ruleOfThree = true

    if(valores[index] * 3 < userInput) {
        console.log('ENTROU NO IF PARA VERFICAR REGRA DO TRÊS')
        const newInput = userInput - valores[index] * 3;
        ruleOfThree = newInput >= valores[index] ? false : true    
    }
    console.log('Regra do três: ' + ruleOfThree)
    console.log('User input antes do if: ' + userInput)

    if(ruleOfThree) {
        console.log('primeiro if converter')
        console.log(valores[index])
        convertedNumber.push(romanos[index]);
        userInput -= valores[index];
        console.log('User input: ' + userInput)
    } else {
        console.log('segundo if converter')
        console.log(valores[index + 1] - valores[index])
        convertedNumber.push(romanos[index]);
        convertedNumber.push(romanos[index + 1]);
        userInput -= (valores[index + 1] - valores[index]);
        console.log('User input: ' + userInput)
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
        output.textContent = convertedNumber.join('').toUpperCase();
    }
})