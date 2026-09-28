const mealTotal = document.getElementById('meal-total');
const tipPercentage = document.getElementById('tip-percentage');
const numPeople = document.getElementById('num-people');
const calcBtn = document.getElementById('calc-share');
const outputDiv = document.getElementById('output');
const errorSpan = document.getElementById('error');

function calcShare(total, tipPerc, people) {
    return calcTotal(total, tipPerc) / people;
}

function calcTotal(total, tipPerc) {
    return total * ((tipPerc + 100) / 100);
}

function validInputs(total, tipPerc, people) {
    if (Number.isNaN(total)) {
        mealTotal.setAttribute('aria-invalid', 'true');
        return 'Meal total cannot be blank and must be a valid number.';
    } else {
        mealTotal.removeAttribute('aria-invalid');
    }
    if (Number.isNaN(tipPerc)) {
        tipPercentage.setAttribute('aria-invalid', 'true');
        return 'Tip percentage cannot be blank and must be a valid number.';
    } else {
        tipPercentage.removeAttribute('aria-invalid');
    }
    if (Number.isNaN(people)) {
        numPeople.setAttribute('aria-invalid', 'true');
        return 'Number of people cannot be blank and must be a valid number.';
    } else {
        numPeople.removeAttribute('aria-invalid');
    }
    if (!Number.isInteger(people)) {
        numPeople.setAttribute('aria-invalid', 'true');
        return 'Number of people must be a whole number.';
    } else {
        numPeople.removeAttribute('aria-invalid');
    }
    if (total <= 0) {
        mealTotal.setAttribute('aria-invalid', 'true');
        return 'Meal total must be positive.';
    } else {
        mealTotal.removeAttribute('aria-invalid');
    }
    if (tipPerc < 0 || tipPerc > 100) {
        tipPercentage.setAttribute('aria-invalid', 'true');
        return 'Tip percentage must be between 0 and 100.';
    } else {
        tipPercentage.removeAttribute('aria-invalid');
    }
    if (people < 1) {
        numPeople.setAttribute('aria-invalid', 'true');
        return 'Number of people must be at least 1.';
    } else {
        numPeople.removeAttribute('aria-invalid');
    }

    return null;
}

function renderInputError(message) {
    outputDiv.innerHTML = '';
    errorSpan.innerHTML = '';

    const errMsg = document.createElement('p');
    errMsg.textContent = message;
    errorSpan.append(errMsg);
}

function renderOutput(total, share) {
    outputDiv.innerHTML = '';
    errorSpan.innerHTML = '';

    const totalMsg = document.createElement('p');
    const shareMsg = document.createElement('p'); 

    totalMsg.textContent = `Total bill: $${total.toFixed(2)}`;
    shareMsg.textContent = `Amount per person: $${share.toFixed(2)}`;

    outputDiv.append(totalMsg);
    outputDiv.append(shareMsg);
}

function displayResults() {
    const total = parseFloat(mealTotal.value);
    const tipPerc = parseFloat(tipPercentage.value);
    const people = Number(numPeople.value);
    const error = validInputs(total, tipPerc, people);

    if (!error) {
        renderOutput(calcTotal(total, tipPerc), calcShare(total, tipPerc, people));
    } else {
        renderInputError(error);
    }
}

calcBtn.addEventListener('click', displayResults);