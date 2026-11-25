# Process Reflection

`v-model.number` is needed because by default, the returned value would be a string. The `.number` automatically converts it to a number.

The `SummaryPanel` stays synchronized because it defines a prop that allows it to receive an object. Within `App.vue`, `summary` is passed to the `SummaryPanel`, which is a `computed()` value that shows the summary statistics of the filtered students. The `computed()` function allows the `summary` to be dynamically updated based on the reactive `student` array.

If all the students are filtered out, a default object is returned. Within the `summary` value, line 59 handles it:
```
if (count === 0) return { count: 0, average: 'N/A', high: 'N/A', low: 'N/A', passing: 0 };
```

`GradeTable` emits an event to clear the filters instead of clearing them within itself because the parent component (`App`) owns the filter data. If `GradeTable` were to change the data, the data and states of itself and `App` would drift apart. 