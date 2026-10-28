// Provides the data and HTML elements.

// E-bike data
export const eBikeData = [
    { name: "Aventon Aventure 3",         img: "images/aventon-adventure-3.jpeg", alt: "Aventon Adventure 3 Image", price: 1999, maxDistanceMiles: 65, batteryLifeHours: 5.25 },
    { name: "Urtopia Carbon Atom",        img: "images/urtopia-carbon-atom.jpeg", alt: "Urtopia Carbon Atom Image", price: 2499, maxDistanceMiles: 93, batteryLifeHours: 7 },
    { name: "Rad Power Bikes RadWagon 5", img: "images/radwagon-5.jpeg",          alt: "Rad Wagon 5 Image",         price: 2399, maxDistanceMiles: 60, batteryLifeHours: 4.75 },
];

// HTML Elements
export const basicBikeCardContainer = document.querySelector("#basic-bike-card-container");
export const horizontalBikeCardContainer = document.querySelector("#horizontal-bike-card-container");
export const accordionQuestions = Array.from(document.querySelectorAll(".accordion-question"));
export const accordionContainer = document.querySelector("#accordion");
export const tabContainer = document.querySelector("#tabbed-interface");
export const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
export const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
export const navItems = document.querySelector('#nav-items');
export const expandBtn = document.querySelector('#expand-nav');
export const mediaQuery = window.matchMedia('(min-width: 600px');