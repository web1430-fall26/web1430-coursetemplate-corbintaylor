<script setup>
defineProps({
  summary: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section class="summary-panel" aria-label="Summary statistics" aria-live="polite">
    <div class="summary-stat">
      <span class="stat-label">Students shown</span>
      <span class="stat-value">{{ summary.count }}</span>
    </div>
    <div class="summary-stat">
      <span class="stat-label">Average score</span>
      <span class="stat-value">{{ summary.average }}</span>
    </div>
    <div class="summary-stat">
      <span class="stat-label">High score</span>
      <span class="stat-value">{{ summary.high }}</span>
    </div>
    <div class="summary-stat">
      <span class="stat-label">Low score</span>
      <span class="stat-value">{{ summary.low }}</span>
    </div>
    <div class="summary-stat">
      <span class="stat-label">Passing</span>
      <span class="stat-value">{{ summary.passing }}</span>
    </div>
  </section>
</template>