# Rationale

The hardest dependency was the event handlers within the monolithic file. I had initially created `handleSubmit()` because two different event handlers needed the same code, but I also had some logic for the expand/collapse buttons. I decided to create `handleExpand()` and put it in a new file, called `btn-handlers.js`, with `handleSubmit()`. This meant that `btn-handlers.js` required the bulk of the imports rather than `events.js`, which only imported from `btn-handlers.js`. 

Deciding which functions belonged in `api.js` and `render.js` wasn't too difficult. Any function that manipulated the DOM went into `render.js`, and any function that made an API call (which was just one) went into `api.js`. I didn't have any other utility functions, so I deleted `utils.js`. 

The `dist/` folder only contains three files: one JavaScript file, one CSS file, and one HTML file. The different modules that I created to organize the code got condensed into single files, likely for performance reasons.

If this project were to grow to ten files, I think I would handle the DOM references differently. It might make more sense to pass them in as parameters instead of initializing them for every file that needs them. That way, they can be initialized once in `main.js`, or a different file that imports from the files that require the DOM references. 