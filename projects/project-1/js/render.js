// Provides the card rendering functions.

// Product card render function
export function renderBasicBikeCard(bike) {
    // Add elements
    const bikeCard = document.createElement('article');
    bikeCard.classList.add('basic-bike-card');
    // Adds the bike image to the card from the array
    const bikeImg = document.createElement('img');
    bikeImg.classList.add('card-img');
    bikeImg.src = bike.img;
    bikeImg.alt = bike.alt;

    const bikeName = document.createElement('h3');
    bikeName.textContent = bike.name;

    const price = document.createElement('p');
    price.textContent = `Price: $${bike.price}`;

    const maxDistance = document.createElement('p');
    maxDistance.textContent = `Maximum Distance: ${bike.maxDistanceMiles} miles`;

    const batteryLife = document.createElement('p');
    batteryLife.textContent = `Maximum Battery Life (pedal-assisted): ${bike.batteryLifeHours} hours`;

    const buyBtn = document.createElement('button');
    buyBtn.classList.add('primary-button');
    buyBtn.textContent = `Buy Now`;

    // Append everything to the card
    bikeCard.append(bikeName, bikeImg, price, maxDistance, batteryLife, buyBtn);

    return bikeCard;
}

export function renderHorizontalBikeCard(bike) {
    // Add elements
    const bikeCard = document.createElement('article');
    bikeCard.classList.add('horizontal-bike-card');
    // Add a div for the text
    const textDiv = document.createElement('div');
    textDiv.classList.add('card-text-container');

    const bikeName = document.createElement('h3');
    bikeName.textContent = bike.name;

    const price = document.createElement('p');
    price.textContent = `Price: $${bike.price}`;

    const maxDistance = document.createElement('p');
    maxDistance.textContent = `Maximum Distance: ${bike.maxDistanceMiles} miles`;

    const batteryLife = document.createElement('p');
    batteryLife.textContent = `Maximum Battery Life (pedal-assisted): ${bike.batteryLifeHours} hours`;

    const buyBtn = document.createElement('button');
    buyBtn.classList.add('primary-button');
    buyBtn.textContent = `Buy Now`;

    const bikeImg = document.createElement('img');
    bikeImg.classList.add('card-img');
    bikeImg.src = bike.img;
    bikeImg.alt = bike.alt;

    // Appends the text to a div specifically for the text to style it separately
    textDiv.append(bikeName, price, maxDistance, batteryLife, buyBtn);
    bikeCard.append(textDiv, bikeImg);

    return bikeCard;
}