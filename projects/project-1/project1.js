// HTML Elements
const nameInput = document.querySelector("#bike-name");
const priceInput = document.querySelector("#max-price");
const distanceInput = document.querySelector("#min-distance");
const batteryInput = document.querySelector("#min-battery");
const searchBtn = document.querySelector("#search-btn");
const catalogErrorDiv = document.querySelector("#catalog-errors");
const bikeCardContainer = document.querySelector("#bike-card-container");

// E-bike data
const eBikeData = [
    { name: "Aventon Aventure 3", price: 1999, maxDistanceMiles: 65, batteryLifeHours: 5.25 },
    { name: "Urtopia Carbon Atom", price: 2499, maxDistanceMiles: 93, batteryLifeHours: 7 },
    { name: "Rad Power Bikes RadWagon 5", price: 2399, maxDistanceMiles: 60, batteryLifeHours: 4.75 },
    { name: "Philodo Falcon Step-Thru", price: 1599, maxDistanceMiles: 100, batteryLifeHours: 8 },
    { name: "Segway Muxi Cargo", price: 1699.99, maxDistanceMiles: 80, batteryLifeHours: 6.25 },
    { name: "Retrospec Valen Rev+", price: 1299.99, maxDistanceMiles: 68, batteryLifeHours: 5.25 },
    { name: "Rad Power Bikes RadExpand 5 Plus", price: 1899, maxDistanceMiles: 60, batteryLifeHours: 4.75 },
    { name: "Cybervelo EK2", price: 699, maxDistanceMiles: 80, batteryLifeHours: 6.25 },
    { name: "Actbest Core ST 2.0", price: 599, maxDistanceMiles: 55, batteryLifeHours: 4 },
    { name: "GoTrax Accord", price: 548, maxDistanceMiles: 40, batteryLifeHours: 3 }
];

// Product card render function
function renderBikeCard(bike) {
    // Add elements
    const bikeCard = document.createElement('article');
    bikeCard.classList.add('bike-card');

    const bikeName = document.createElement('h3');
    bikeName.textContent = bike.name;

    const price = document.createElement('p');
    price.textContent = `Price: $${bike.price}`;

    const maxDistance = document.createElement('p');
    maxDistance.textContent = `Maximum Distance: ${bike.maxDistanceMiles} miles`;

    const batteryLife = document.createElement('p');
    batteryLife.textContent = `Maximum Battery Life (pedal-assisted): ${bike.batteryLifeHours} hours`;

    const buyBtn = document.createElement('button');
    buyBtn.classList.add('buy-bike-btn');
    buyBtn.textContent = `Buy Now`;

    // Append everything to the card
    bikeCard.append(bikeName, price, maxDistance, batteryLife, buyBtn);

    return bikeCard;
}

function renderBikeList(bikeData, bikeCards, name, price, miles, battery) {
    // A count is kept to be able to access the corresponding bike card
    let count = 0;

    // Only runs if there is bike data loaded
    if (bikeData.length > 0) {
        // Loops through each bike in the bike object array
        bikeData.forEach(bike => {
            // Stores the current bike card to not have to re-access it
            const bikeCard = bikeCards[count];

            // The name, price, distance, and battery must all match
            if (bike.name.toLowerCase().includes(name.toLowerCase())
                && bike.price <= price && bike.maxDistanceMiles >= miles
                && bike.batteryLifeHours >= battery) {
                
                // Shows cards that meet the criteria
                bikeCard.hidden = false;
                bikeCard.classList.add('visible');
            } else {
                // Hides cards that don't
                bikeCard.hidden = true;
                bikeCard.classList.toggle('visible');
            }

            ++count; // Update the count for the next round
        });
    }
}

// Helper function to determine if a number field is truly empty
function isNumberInputEmpty(inputEl) {
    return inputEl.value === '' && !inputEl.validity.badInput;
}

function initBikeCards(bikesList, container) {
    // Initial creation of the bike cards
    bikesList.forEach(bike => container.append(renderBikeCard(bike)));

    // Creates an array of the bike cards
    const bikeCards = Array.from(container.querySelectorAll('.bike-card'));

    // Checks all inputs and makes matches visible
    searchBtn.addEventListener('click', () => {
        renderBikeList(eBikeData, bikeCards, nameInput.value, priceInput.value, distanceInput.value, batteryInput.value);

        // If all inputs are empty, the whole list is displayed
        if (nameInput.value === '' && isNumberInputEmpty(priceInput) 
            && isNumberInputEmpty(distanceInput) && isNumberInputEmpty(batteryInput)) {
            bikeCards.forEach(bikeCard => {
                bikeCard.classList.add('visible');
                bikeCard.hidden = false;
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initBikeCards(eBikeData, bikeCardContainer);
});