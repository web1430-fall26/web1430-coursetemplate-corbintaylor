const mealTotal = document.getElementById('meal-total');
const tipPercentage = document.getElementById('tip-percentage');
const numPeople = document.getElementById('num-people');
const calcBtn = document.getElementById('calc-share');
const outputDiv = document.getElementById('output');
const errorsDiv = document.getElementById('errors');

function calcShare(total, tipPerc, people) {
    return calcTotal(total, tipPerc) / people;
}

function calcTotal(total, tipPerc) {
    return total * ((tipPerc + 100) / 100);
}

function validInputs(total, tipPerc, people) {
    if (!total) {
        renderInputError('Meal total cannot be blank and must be a valid number.');
        return false;
    }
    if (!tipPerc) {
        renderInputError('Tip percentage cannot be blank and must be a valid number.');
        return false;
    }
    if (!people) {
        renderInputError('Number of people cannot be blank and must be a valid number.');
        return false;
    }
    if (total <= 0) {
        renderInputError('Meal total must be positive.');
        return false;
    }
    if (tipPerc < 0 || tipPerc > 100) {
        renderInputError('Tip percentage must be between 0 and 100.');
        return false;
    }
    if (people < 1) {
        renderInputError('Number of people must be at least 1.');
        return false;
    }

    return true;
}

function renderInputError(message) {
    errorsDiv.innerHTML = '';
    outputDiv.innerHTML = '';

    const errMsg = document.createElement('p');
    errMsg.textContent = message;
    errorsDiv.setAttribute('aria-invalid', 'true');
    errorsDiv.append(errMsg);
}

function renderOutput(total, share) {
    outputDiv.innerHTML = '';
    errorsDiv.innerHTML = '';

    errorsDiv.removeAttribute('aria-invalid');

    const totalMsg = document.createElement('p');
    const shareMsg = document.createElement('p'); 

    totalMsg.textContent = `Total bill: $${total.toFixed(2)}`;
    shareMsg.textContent = `Amount per person: $${share.toFixed(2)}`;

    outputDiv.append(totalMsg);
    outputDiv.append(shareMsg);
}

calcBtn.addEventListener('click', () => {
    const total = parseFloat(mealTotal.value);
    const tipPerc = parseFloat(tipPercentage.value);
    const people = Number(numPeople.value);

    if (validInputs(total, tipPerc, people)) {
        renderOutput(calcTotal(total, tipPerc), calcShare(total, tipPerc, people));
    }
});