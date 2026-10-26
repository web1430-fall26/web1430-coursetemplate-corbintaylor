// Initializes the patterns used.

import {eBikeData, basicBikeCardContainer, horizontalBikeCardContainer,
        accordionQuestions, accordionContainer, tabContainer, tabs, 
        panels} from "./data.js";
import {renderBasicBikeCard, renderHorizontalBikeCard} from "./render.js";

function initBikeCards(bikesList, normContain, horiContain) {
    // Renders the cards in the normal format
    bikesList.forEach(bike => {
        normContain.append(renderBasicBikeCard(bike));
    });
    // Renders the cards in the horizontal format
    bikesList.forEach(bike => {
        horiContain.append(renderHorizontalBikeCard(bike));
    });
}

function initAccordion(accordionContainer) {
    // Event delegation for the accordion questions
    accordionContainer.addEventListener('click', (event) => {
        if (event.target.matches('.accordion-question')) {
            // Sets the aria-expanded attribute based on the hidden attribute and then
            // changes it, essentially alternating aria-expaneded and hidden
            event.target.setAttribute('aria-expanded', 
                                      String(event.target.nextElementSibling.hidden));
            event.target.nextElementSibling.toggleAttribute('hidden');
            
            // Hides unselected questions
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
        // If the current index is the newIndex, that tab's aria-selected
        // attribute is set to true, while the others become false
        const selected = i === newIndex;
        tab.setAttribute('aria-selected', String(selected));

        // Sets the selected tab's tabIndex to 0
        if (selected) {
            tab.tabIndex = 0;
        } else {
            tab.tabIndex = -1;
        }

        // The selected tab is shown, while unselected tabs are hidden
        panels[i].hidden = !selected;
    });

    // Puts the focus on the selected tab
    tabs[newIndex].focus();
}

function initTabs(tabListContainer) {
    // Initializes the tabs
    selectTab(tabs, panels, 0);

    // Allows click to work
    tabListContainer.addEventListener('click', (event) => {
        if (event.target.getAttribute('role') === 'tab') {
            selectTab(tabs, panels, tabs.indexOf(document.activeElement));
        }
    });

    // Event listener for key presses
    tabListContainer.addEventListener('keydown', (event) => {
        // Initializes the index of the current tab
        const current = tabs.indexOf(document.activeElement);

        // -1 means unselected, so this ends the function
        if (current === -1) {
            return;
        }

        let next = null;

        if (event.key === 'ArrowRight') {
            next = (current + 1) % tabs.length;
        }

        if (event.key === 'ArrowLeft') {
            next = (current - 1 + tabs.length) % tabs.length;
        }

        if (event.key === 'Home') {
            next = 0;
        }

        if (event.key === 'End') {
            next = tabs.length - 1;
        }

        // Prevents scrolling with arrows and selects the new tab
        if (next !== null) {
            event.preventDefault();
            selectTab(tabs, panels, next);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initBikeCards(eBikeData, basicBikeCardContainer, horizontalBikeCardContainer);
    initAccordion(accordionContainer);
    initTabs(tabContainer);
});