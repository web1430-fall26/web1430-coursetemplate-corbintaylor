# Notes

## DevTools Verification

1. The key does not exist.
2. I changed the theme from light to dark, which caused the key to appear.
3. The correct preferences load immediately.
4. The stored JSON changed to contain the defaults after I clicked "Reset to Defaults".
5. I replaced the JSON value with {bad json}. After reloading the page, the corrupted data is handled well and the page loads the defaults. 

## Process Reflection

Without using JSON.stringify(), the value stored when the user makes changes to their preferences is "[object Object]", which doesn't mean anything. This prevents the saved preferences from loading on refresh. To test the first visit experience, I used localStorage.clear() in the console to wipe out existing preferences. Local storage saves the data across tabs and refreshes, while session storage saves the data on refresh, but only on the same tab. Session storage would not be appropriate for storing user preferences because a user will likely use different tabs or open the website after having turned off their browser. Local storage allows a user's preferences to persist even in the event of closing down your browser or using a different tab. 