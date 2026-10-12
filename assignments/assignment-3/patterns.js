const accordionQuestions = Array.from(document.querySelectorAll('.accordion-question'));

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

const textInput = document.querySelector('#text-input');
const counter = document.querySelector('#counter');
const noCardsMsg = document.querySelector('#error');

const cards = [
    {name: "Red Apple"},
    {name: "Green Apple"},
    {name: "Orange Peach"},
    {name: "Red Peach"},
    {name: "Yellow Banana"},
    {name: "Green Banana"},
    {name: "Orange Apricot"},
    {name: "Yellow Pineapple"}
];

function initAccordion(accordionContainer) {
    accordionContainer.addEventListener('click', (event) => {
        if (event.target.matches('.accordion-question')) {
            // Sets the selected question's aria-expanded to true and makes the answer visible
            event.target.setAttribute('aria-expanded', 'true');
            event.target.nextElementSibling.toggleAttribute('hidden');

            // Loops through the questions and hides unselected questions
            accordionQuestions.forEach(question => {
                if (question !== event.target) {
                    question.setAttribute('aria-expanded', 'false');
                    question.nextElementSibling.hidden = true;
                }
            });
        }
    });
}

function selectTab(tabs, panels, newIndex) {
    tabs.forEach((tab, i) => {
        // Checks if the current index is the newIndex
        const selected = i === newIndex;
        tab.setAttribute('aria-selected', String(selected));

        // Sets the tabIndex to 0 if the tab is selected and -1 if it is not
        if (selected) {
            tab.tabIndex = 0;
        } else {
            tab.tabIndex = -1;
        }

        // Shows the selected tab and hides the unselected tabs
        panels[i].hidden = !selected;
    });

    tabs[newIndex].focus();
}

function initTabs(tabListContainer) {
    // Initializes an click event listener for the tabs
    tabListContainer.addEventListener('click', (event) => {
        if (event.target.getAttribute('role') === 'tab') {
            selectTab(tabs, panels, tabs.indexOf(document.activeElement));
        }
    });

    // Initializes a key press event listener for the tabs
    tabListContainer.addEventListener('keydown', (event) => {
        // Gets the index of the current tab
        const current = tabs.indexOf(document.activeElement);

        // If the index of the current tab is -1, the function ends
        if (current === -1) {
            return;
        }

        let next = null;

        // Moves the index to the right
        if (event.key === 'ArrowRight') {
            next = (current + 1) % tabs.length;
        }

        // Moves the index to the left
        if (event.key === 'ArrowLeft') {
            next = (current - 1 + tabs.length) % tabs.length;
        }

        // Moves the index to the first tab
        if (event.key === 'Home') {
            next = 0;
        }

        // Moves the index to the last tab
        if (event.key === 'End') {
            next = tabs.length - 1;
        }

        // If an appropriate key was pressed, arrow scrolling is disabled and 
        // the new tab is selected
        if (next !== null) {
            event.preventDefault();
            selectTab(tabs, panels, next);
        }
    });
}

function renderCard(card) {
    // Creates a card that is just an h3 element and returns it
    const fruitCard = document.createElement('h3');
    fruitCard.textContent = card.name;
    fruitCard.id = 'fruit-card';
    fruitCard.classList.add('visible');
    return fruitCard;
}

function renderCardList(elementArray, input, container) {
    let count = 0;

    if (elementArray.length > 0) {
        elementArray.forEach(card => {
            // Checks if the h3 element contains the typed input and makes the card visible
            if (card.textContent.toLowerCase().includes(input.toLowerCase())) {
                card.hidden = false;
                card.classList.add('visible');
                ++count; // Updates the count
            } else {
                // If the card does not contain the input, it is hidden
                card.hidden = true;
                card.classList.toggle('visible');
            }
        });
    } 

    // Shows the error message if no cards are found
    if (count === 0) {
        noCardsMsg.hidden = false;
    } else {
        noCardsMsg.hidden = true;
    }

    // For showing the count
    showCount(count, elementArray.length);
}

function showCount(count, total) {
    // Clears the div
    counter.textContent = '';

    // Creates and appends the new count message
    const countDisplay = document.createElement('p');
    countDisplay.textContent = `Showing ${count} of ${total}`;
    counter.append(countDisplay);
}

function initFilter(cardList, filterContainer) {
    // Renders the cards
    cardList.forEach(card => filterContainer.append(renderCard(card)));
    // Sets up an array for the cards
    const fruitCards = Array.from(filterContainer.querySelectorAll('#fruit-card'));
    // Shows the initial count
    showCount(fruitCards.length, fruitCards.length);

    // When the search bar changes, the cards are shown/hidden
    textInput.addEventListener('input', () => {
        renderCardList(fruitCards, textInput.value, filterContainer);
        
        // If the search bar is empty, then all cards are shown
        if (textInput.value === '') {
            fruitCards.forEach(card => {
                card.classList.add('visible');
                card.hidden = false;
            })
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initAccordion(document.querySelector('#accordion'));
    initTabs(document.querySelector('#tabbed-interface'));
    initFilter(cards, document.querySelector('#results'));
});