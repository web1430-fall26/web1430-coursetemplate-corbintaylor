<script setup>
  import { ref, computed } from 'vue';
  import SummaryPanel from './components/SummaryPanel.vue';
  import GradeTable from './components/GradeTable.vue';

  const students = ref([
    { id: 1,  name: 'Alex Nguyen',      score: 94 },
    { id: 2,  name: 'Brianna Lee',      score: 72 },
    { id: 3,  name: 'Carlos Herrera',   score: 58 },
    { id: 4,  name: 'Diana Okafor',     score: 88 },
    { id: 5,  name: 'Ethan Park',       score: 45 },
    { id: 6,  name: 'Fatima Al-Rashid', score: 91 },
    { id: 7,  name: 'Grace Kim',        score: 63 },
    { id: 8,  name: 'Hiro Yamamoto',    score: 79 },
    { id: 9,  name: 'Isabelle Martin',  score: 82 },
    { id: 10, name: 'Jordan Smith',     score: 55 },
    { id: 11, name: 'Kira Osei',        score: 97 },
    { id: 12, name: 'Leo Santos',       score: 68 },
  ]);

  const searchQuery = ref('');
  const minScore = ref(0);
  const maxScore = ref(100);
  const passFilter = ref('all');   // 'all' | 'passing' | 'failing'

  // Called when GradeTable emits 'clear-filters'. The parent owns this state,
  // so the parent is the only place that resets it.
  function resetFilters() {
    searchQuery.value = '';
    minScore.value = 0;
    maxScore.value = 100;
    passFilter.value = 'all';
  }

  function getGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  const filteredStudents = computed(() => {
    // Filters the students based on all the active filters
    return students.value
      .filter(s => s.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
      .filter(s => s.score >= minScore.value && s.score <= maxScore.value)
      .filter(s => {
        if (passFilter.value === 'passing') return s.score >= 60;
        if (passFilter.value === 'failing') return s.score < 60;
      return true;
      })
      .map(s => ({ ...s, grade: getGrade(s.score) }));
  });

  const summary = computed(() => {
    const count = filteredStudents.value.length;
    // Default response if there are no students
    if (count === 0) return { count: 0, average: 'N/A', high: 'N/A', low: 'N/A', passing: 0 };
    const scores = filteredStudents.value.map(s => s.score);
    return {
      count,
      // This function adds up the individual scores with a starting value of zero and divides 
      // by the count
      average: (scores.reduce((a, b) => a + b, 0) / count).toFixed(1),
      high: Math.max(...scores),
      low: Math.min(...scores),
      passing: filteredStudents.value.filter(s => s.score >= 60).length,
    };
});
</script>

<template>
  <div class="dashboard">
    <h1>Grade Dashboard</h1>

    <section class="filters" aria-label="Filter controls">
      <div class="filter-group">
        <label for="search">Search by name</label>
        <input id="search" type="search" v-model="searchQuery" placeholder="Student name…">
      </div>

      <div class="filter-group">
        <label for="min-score">Min score</label>
        <input id="min-score" type="number" v-model.number="minScore" min="0" max="100">
      </div>

      <div class="filter-group">
        <label for="max-score">Max score</label>
        <input id="max-score" type="number" v-model.number="maxScore" min="0" max="100">
      </div>

      <div class="filter-group">
        <label for="pass-filter">Show</label>
        <select id="pass-filter" v-model="passFilter">
          <option value="all">All students</option>
          <option value="passing">Passing only (≥60)</option>
          <option value="failing">Failing only (&lt;60)</option>
        </select>
      </div>
    </section>

    <SummaryPanel :summary="summary" />
    <!--Ties the resetFilters function from above to the emitted event-->
    <GradeTable :students="filteredStudents" @clear-filters="resetFilters" />
  </div>
</template>