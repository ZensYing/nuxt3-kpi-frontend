<template>
  <div class="absolute inset-0 overflow-hidden">
    <div
      v-for="(_, i) in horizontalLines"
      :key="'h-' + i"
      class="absolute h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent w-full"
      :style="{ top: `${20 * (i + 1)}%` }"
 
    ></div>

    <!-- Vertical Lines -->
    <div
      v-for="(_, i) in verticalLines"
      :key="'v-' + i"
      class="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"
      :style="{ left: `${12.5 * (i + 1)}%` }"

    ></div>
  </div>
</template>

<script lang="ts" setup>
const horizontalLines = Array.from({ length: 5 });
const verticalLines = Array.from({ length: 8 });
</script>

<style scoped>
/* Add any necessary styles here */
</style>
