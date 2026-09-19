# Notes

## Console Exercise Findings

1. `'5' + 3` 
    -  Result: 53
    -  The addition operator is also used for string concatenation, so the 3 was converted to a string, resulting in the values being sandwiched together.
2. `'5' - 3`
    - Result: 2
    - Subtraction is not defined for strings, so the '5' was converted to a number to allow subtraction to occur.
3. `'5' == 5`
    - Result: true
    - The == operator performs type conversion before comparing, so either the '5' became a number or the 5 became a string to make the expression true.
4. `'5' === 5`
    - Result: false
    - The === operator does not perform type conversion before comparing, resulting this expression being evaluated to false because a string is not the same as a number.
5. `0 == false`
    - Result: true
    - The == operator converts the 0 to false, making the statement true (0 is off, while 1 is on).
6. `0 === false`
    - Result: false
    - The === does not convert the 0 in this case, resulting in the types not being equal.
7. `null == undefined`
    - Result: true
    - Null and undefined are not the same, but the == operator converts one of them to the other to make the statement true.
8. `null === undefined`
    - Result: false
    - The === operator does not convert one of the values to make the expression true. 
9. `typeof 'hello'`
    - Result: string
    - Characters wrapped in single quotes are strings.
10. `typeof 42`
    - Result: number
    - The number 42 by itself is a number.
11. `typeof true`
    - Result: boolean
    - The values true and false are booleans by themselves.
12. `typeof undefined`
    - Result: undefined
    - Undefined is undefined.
13. `typeof null`
    - Result: object
    - This is a JavaScript quirk.
14. `typeof []`
    - Result: object
    - An array is an object, even if it is empty.
15. `typeof {}`
    - Result: object
    - The curly braces are used to create an object. It is still an object even if it is empty.
16. `'  hello world  '.trim()`
    - Result: 'hello world'
    - The function, `.trim()`, removes the spaces before and after the characters in a string.
17. `'hello world'.includes('world')`
    - Result: true
    - The function, `.include`, returns a boolean based on if the original string contains the specified string.
18. `'hello world'.toUpperCase()`
    - Result: 'HELLO WORLD'
    - The functino, `.toUpperCase()` returns a string with all the letters capitalized.
19. `'hello world'.replace('world', 'JavaScript')`
    - Result: 'hello JavaScript'
    - The `.replace()` function replaces the specified string within the original string with a different string.
20. `'hello'.length`
    - Result: 5
    - The length of strings are stored in JavaScript, so the `.length` property accessor returns the length of the string. 

## Debugging Exercise

Error 1:
1. Line 12, typo: `${nextYeer}`
2. Fixed: `${nextYear}`
3. The error message said, `ReferenceError: nextYeer is not defined`. This helped me to understand that the nextYear variable was typed incorrectly.

Error 2:
1. Line 16, typo: `console.log(mesage);`
2. Fixed: `console.log(message);`
3. The error message said, `ReferenceError: mesage is not defined`, meaning that `mesage` was not a variable and that the variable `message` was typed incorrectly.

Error 3:
1. Line 18, the `==` operator was used instead of the `===` operator
2. Fixed: `userAge === 28`
3. I fixed the comparison because it was simpler to fix and aligns with the message that displays if the expression evaluates to true. 

## Process Reflection

The type coercion for `null === undefined` surprised me the most because I didn't know that they were different before this week's content. The hardest bug to find was the last one with the missing `=`. There was no error message for this bug, but the string message states, "Age matched with strict equality", if the expression evaluates to true. The "strict equality" part clued me in to the use of `==` instead of `===`. 