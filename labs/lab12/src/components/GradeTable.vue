<script setup>
// Defines the accepted props
defineProps({
  students: {
    type: Array,
    required: true,
  },
});

// Data flows down through props; this component never edits the filters itself.
// When the user wants them cleared it emits upward and lets App.vue decide.
const emit = defineEmits(['clear-filters']); 
// The grade table can emit the 'clear-filters' event
</script>

<template>
  <div class="table-wrapper">
    <div v-if="students.length === 0" class="empty-msg">
      <p>No students match the current filters.</p>
      <button type="button" @click="emit('clear-filters')">Clear all filters</button>
    </div>

    <table v-else aria-label="Student grades">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
          <th scope="col">Grade</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in students"
          :key="student.id"
          :class="student.score < 60 ? 'row--failing' : 'row--passing'"
        >
          <td>{{ student.name }}</td>
          <td>{{ student.score }}</td>
          <td>{{ student.grade }}</td>
          <td>{{ student.score >= 60 ? 'Passing' : 'Failing' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.row--failing { background-color: #fef2f2; }
.row--passing { background-color: #f0fdf4; }
</style>