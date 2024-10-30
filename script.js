const romanos = ['i', 'v', 'x', 'l', 'c', 'd', 'm'];
const valores = [1, 5, 10, 50, 100, 500, 1000];
const convertedNumber = [];

let userInput = 84;

function getRomanIndex(input) {
    let index = 0;

    if(input > 1000) {
        index = valores.length - 1;
        return index;
    }

    for (let i = 0; i < valores.length; i++) {
        
        if(valores[i] === input) {
            index = i;
        } else if(valores[i] > input) {
            index = i - 1;
        }
    }

    return index;
}

function converter() {
    index = getRomanIndex(userInput)
    convertedNumber.push(romanos[index]);
    userInput -= valores[index];

    /* TODO: Fazer um if para multiplicar o valores[index] por 3 e ver se é maior que
    o userInput atual. Se for, então o número romano será adicionado na frente, normalmente.
    Caso não for maior, então vou adicionar somente um do valores[index] e adicionar outro do
    valores[index + 1], para poder fazer essa subtração e ter o valor que eu espero ter.
    */
    if(userInput > 0) {
        converter();
    } else {
        return;
    }
}