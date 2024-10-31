const roman = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
const values = [1, 5, 10, 50, 100, 500, 1000];
const minNumber = 1;
const maxNumber = 3999;
let convertedNumber = [];

// Função para encontrar o índice correspondente ao valor mais próximo menor ou igual ao número do usuário
function getRomanIndex(input) {
    let index = 0;
    for (let i = 0; i < values.length; i++) {
        if (values[i] > input) break;
        index = i;
    }
    return index;
}

// Função principal para conversão
function convertToRoman(userInput) {
    if (userInput === 0) return; // Caso base para a recursão

    const index = getRomanIndex(userInput);

    // Verificação para aplicar a regra de subtração
    if (index > 0 && userInput >= values[index] - values[index - 1] && userInput < values[index]) {
        // Adiciona o símbolo subtraído
        convertedNumber.push(roman[index - 1]);
        convertedNumber.push(roman[index]);
        userInput -= values[index] - values[index - 1];
    } else {
        // Caso comum: adiciona o símbolo correspondente e subtrai o valor
        convertedNumber.push(roman[index]);
        userInput -= values[index];
    }

    // Chamamos a função recursivamente até `userInput` se tornar zero
    convertToRoman(userInput);
}

// Função de início e formatação da entrada
function startConvert(inputNumber) {
    if (inputNumber < minNumber || inputNumber > maxNumber) {
        return 'Please enter a number between 1 and 3999';
    }
    
    convertedNumber = []; // Reset para nova conversão
    convertToRoman(inputNumber);
    return convertedNumber.join('');
}

// Exemplo de chamada
console.log(startConvert(1989)); // Deve exibir "MCMLXXXIX"
