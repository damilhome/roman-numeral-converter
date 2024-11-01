const roman = ['i', 'v', 'x', 'l', 'c', 'd', 'm'];
const values = [1, 5, 10, 50, 100, 500, 1000];
const minNumber = 1;
const maxNumber = 3999;
const inputNumber = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');
let decimal = 0;

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

function startConvert() {
    console.log(`Start to convert`)
    const userInput = inputNumber.value;

    convertToDecimal(userInput);
    console.log(`Ended conversion function`)
    output.classList.add('output__number');
    output.textContent = decimal;
    decimal = 0;
}

inputNumber.addEventListener('keydown', (e) => {
    let invalidLetter = true;

    roman.forEach(letter => {
        if(e.key === letter) {
            invalidLetter = false;
        }
    })

    if(invalidLetter) {
        e.preventDefault();
    }
})

convertBtn.addEventListener('click', startConvert)
inputNumber.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        startConvert()
    }
})