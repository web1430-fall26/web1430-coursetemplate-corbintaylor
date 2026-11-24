# Process Reflection

Changing the `selectedDepartment.value` by clicking a button causes the template to automatically update. This means the `filter-bar` div gives the selected button the `filter-btn--active` class and `aria-pressed` is set to true. 

`ref()` is used for reactive values, or values that Vue will update automatically in the template if changes are made to it. `computed()` is used for values that depend on reactive values. If the reactive values change, values that use `computed()` will automatically update as well. 

`:key` in a `v-for` allows each item to be uniquely identified within a list. Vue will still load the list, but there will be no way for Vue to identify the items or maintain the associated state based on the list.  