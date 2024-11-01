const roman = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
const values = [1, 5, 10, 50, 100, 500, 1000];
const minNumber = 1;
const maxNumber = 3999;
const inputRomanNumber = document.getElementById('text');
const convertBtnRoman = document.getElementById('convert-btn-roman');
const output = document.getElementById('output');
let decimal = 0;

/* 
TODO:
- integrar esse script ao script inicial (de converter decimal para romano)
- Converti todas as letras desse código para maiúscula, verificar se isso causa conflito
na hora da integração com o outro script
- com essa integração, toda vez que converter de romano para decimal,
pegar esse decimal e chamar o script de conversão de decimal para romano
e atualizar o valor que está sendo mostrado no input.value para esse novo romano,
para garantir que o valor mostrado está escrito corretamente.
- colocar um verificador para que, ao converter de romano para decimal, só chamar
a outra conversão se o número for menor que 4000, caso contrário, mostrar a mensagem
de alerta na tela
- Veriificar se tem outros alertas para mostrar na tela
*/

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

function startConvertToDecimal() {
    console.log(`Start to convert`)
    const userInput = inputNumber.value;

    if(userInput === '') {
        output.classList.remove('output__number');
        output.classList.add('output__alert');
        output.textContent = 'Please enter a valid number';
    } else {
        convertToDecimal(userInput);
        console.log(`Ended conversion function`)
        output.classList.remove('output__alert');
        output.classList.add('output__number');
        output.textContent = decimal;
        decimal = 0;
    }
}

function checkInvalidLetter(e) {
    let invalidLetter = true;

    roman.forEach(letter => {
        if(e.key === letter) {
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


inputRomanNumber.addEventListener('keydown', (e) => checkInvalidLetter(e));
inputRomanNumber.addEventListener('input', (e) => letterToUpperCase(e));

convertBtnRoman.addEventListener('click', startConvertToDecimal)
inputRomanNumber.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        startConvertToDecimal()
    }
})