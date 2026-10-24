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

A keyboard user will be able to tab between all elements on the screen. I will include a highlight around the currently selected element. For each filter in the product section, aria-describedby will be used to link to an error div that appears in the event of invalid input. aria-live="polite" will be used for the shopping cart. I will also use aria-expanded and set it to true for when the shopping cart is expanded and false for when it is not. aria-controls will be used for the div that holds the items in the shopping cart and connected to the expand/collapse button. I will ensure that the total with the shopping cart is formatted well so that it is easily understood. For the remove item buttons, I will use aria-label because it will be represented with just an x. I will include alternative text for the images as well in the event that they do not load. The page will be designed primarily for mobile users, but it will also be usable on desktop.    