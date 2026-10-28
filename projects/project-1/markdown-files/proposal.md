# Project Proposal

## Project Context

The fictional company that I will be building a website for is called EB Cycling. They sell e-bikes to those who are looking for cheaper alternatives for commuting than cars. College students make up a large part of their market because they are often looking for ways to save money.

## Color Palette

White and blue:
- #EDEEFC: white
- #0741B5: dark blue
- Contrast Ratio: 7.49:1

Gray and a really light blue:
- #363636: dark gray
- #DEE9FF: light blue
- Contrast Ratio: 9.9:1

## Typography Plan

Font Families:
- Helvetica
- Arial

Spacing:
- Small: 0.75rem
- Medium: 1.5rem
- Large: 3rem
- Extra Large: 4rem

Font Size:
- Small: 0.75rem
- Medium: 1rem
- Large: 1.75rem
- Extra Large: 2.5rem

## Components

1. Navigation bar
    - Includes each of the sections below.
2. Why ride e-bikes/about the company 
    - A quick hook to keep the user on the website
3. Tips for riding safely
    - An informational section to educate riders about safety
4. E-bike catalog
    - Section to organize the e-bikes for sale and allows the user to search based on criteria such as maximum distance, battery life, and maximum price
5. Shopping cart/place an order
    - Allows the user to see what is in their shopping cart and submit their order

## Rough Sketch

See the attached document.

## Accessibility Plan

A keyboard user will be able to tab between all elements on the screen. I will include a highlight around the currently selected element. For the accordion, each question will have the aria-expanded attribute, which will initially be set to false. When a user selects a question, the attribute will update to be true and display the correpsonding answer. I will also use aria-controls to connect the question to the answer. As for the tabs, each one will have an aria-selected attribute that will be set to false unless the it is the first tab, which will be true initially. Each tab corresponds to a panel, so aria-controls will be used to connect each tab to its panel. Each tab will have role='tab' and each panel will have role='tabpanel'. I will use aria-labeledby on the tab panels to connect them to their corresponding tab. For both the accordion and the tabs, a user will be able to tab over all elements and select elements with the keyboard. While on the tabs, the left and right arrow keys can be used to move between tabs. The "Home" button can be used to go to the first element, and the "End" button can be used to go to the last element. I will include alternative text for the images as well in the event that they do not load. The page will be designed primarily for mobile users, but it will also be usable on desktop.    