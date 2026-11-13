# Architecture of the App

```
main.js -> events.js -> btn-handlers.js -> render.js
                                        -> api.js -> constants.js
                                                  -> render.js
                                        -> normalize.js
```

This dependency direction prevents circular imports because each file is separated cleanly. This prevents file A from depending on file B and file B from depending on file A. A circular import is almost created between `api.js` and `render.js` due to the `api.js` needing to throw an error if `response.ok` is false. 