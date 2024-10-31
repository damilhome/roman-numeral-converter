const romanos = ['i', 'v', 'x', 'l', 'c', 'd', 'm'];
const valores = [1, 5, 10, 50, 100, 500, 1000];
const convertedNumber = [];

let userInput = 84;

function getRomanIndex(input) {
    let index = 0;

    if(input > 1000) {
        index = valores.length - 1;
    } else {
        for (let i = 0; i < valores.length; i++) {
            
            if(valores[i] === input) {
                index = i;
            } else if(valores[i] > input) {
                index = i - 1;
            }
        }
    }
    
    return index;

}

function converter() {
    index = getRomanIndex(userInput)
    const ruleOfThree = valores[index] * 3

    if(ruleOfThree > userInput) {
        convertedNumber.push(romanos[index]);
        userInput -= valores[index];
    } else {
        convertedNumber.push(romanos[index]);
        convertedNumber.push(romanos[index + 1]);
        userInput -= (valores[index + 1] - valores[index]);
    }
    
   if(userInput > 0) {
        converter();
    } else {
        return;
    }
}