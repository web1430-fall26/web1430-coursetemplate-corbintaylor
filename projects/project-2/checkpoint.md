# Checkpoint

A large portion of the project is complete. I have not added functionality to the next and previous chapter buttons, but I have added all `localStorage` features. I also need to finish styling the app and format the Bible chapter better. 

An API quirk that I ran into was with the `normalizeBooks()` function. I was originally using the `name` attribute of the `Book` object for the reference. However, when I tried to use that value to fetch a chapter using the filter options, I ran into an error with the API request because the name is not the same as the ID for a book. I was able to fix this by accessing the `bookId` of the first chapter through the `chapters` attribute.