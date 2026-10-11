// Gets all the questions in the FAQ section and puts them in an array
const faqQuestions = Array.from(document.querySelectorAll('.faq-question'));
// Gets all tabs and all panels and puts them in separate arrays
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

// Function for setting up the FAQ section
function initFaq(faqContainer) {
    faqContainer.addEventListener('click', (event) => {
        // Event.target returns the clicked element. Sets it to aria-expanded and takes of the hidden attribute
        if (event.target.matches('.faq-question')) {
            event.target.setAttribute('aria-expanded', 'true');
            event.target.nextElementSibling.toggleAttribute('hidden');

            // Runs through the questions array, hides all other questions, and sets aria-expanded to false
            faqQuestions.forEach(question => {
                if (question !== event.target) {
                    question.setAttribute('aria-expanded', 'false');
                    question.nextElementSibling.setAttribute('hidden', 'true');
                }
            });
        }
    });
}

function selectTab(tabs, panels, newIndex) {
    // Cycles through each tab. The parameters are for each tab and an index
    tabs.forEach((tab, i) => {
        // Sets selected to a Boolean depending on if the current tab is selected
        const selected = i === newIndex;
        // Uses selected to set the aria-selected attribute
        tab.setAttribute('aria-selected', String(selected));

        // Selected tabs get a tabIndex of 0; unselected tabs get -1
        if (selected) {
            tabs.tabIndex = 0;
        } else {
            tabs.tabIndex = -1;
        }

        // If the tab is selected, the corresponding panel is shown and vice versa
        panels[i].hidden = !selected;
    });

    // Sets the focus on the selected tab
    tabs[newIndex].focus();
}

function initTabs(tabListContainer) {
    // Uses selectTab for the click behavior
    tabListContainer.addEventListener('click', (event) => {
        if (event.target.getAttribute('role') === 'tab') {
            selectTab(tabs, panels, tabs.indexOf(document.activeElement));
        }
    });

    tabListContainer.addEventListener('keydown', (event) => {
        // Sets the current index value to the active tab
        const current = tabs.indexOf(document.activeElement);

        // Ends the function if the current index is -1 (unselected)
        if (current === -1) {
            return;
        }

        let next = null;

        if (event.key === 'ArrowRight') {
            // Moves the current index to the right and wraps around
            next = (current + 1) % tabs.length; 
        }

        if (event.key === 'ArrowLeft') {
            // Moves the current index to the left
            next = (current - 1 + tabs.length) % tabs.length;
        }

        if (event.key === 'Home') {
            // Sets the current index to the first tab
            next = 0;
        }

        if (event.key === 'End') {
            // Sets the current index to the last tab
            next = tabs.length - 1;
        }

        // The selected tab does not change if the wrong keys are pressed
        if (next !== null) {
            // Prevents scrolling with the arrow key
            event.preventDefault();
            // Calls the selectTab function to reset the selected tab based on the key pressed
            selectTab(tabs, panels, next);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initFaq(document.querySelector('.faq'));
    initTabs(document.querySelector('.tabs-section'));
});