<template>
    <div class="absolute inset-0 overflow-hidden">
      <!-- Horizontal Lines -->
      <div
        v-for="(_, i) in horizontalLines"
        :key="'h-' + i"
        class="absolute h-px w-full"
        :style="{ top: `${20 * (i + 1)}%` }"
      >
        <div class="relative w-full h-full">
          <!-- Static line -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <!-- Animated light -->
          <div :class="`absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-flow-x delay-${i}`"></div>
        </div>
      </div>
  
      <!-- Vertical Lines -->
      <div
        v-for="(_, i) in verticalLines"
        :key="'v-' + i"
        class="absolute w-px h-full"
        :style="{ left: `${12.5 * (i + 1)}%` }"
      >
        <div class="relative w-full h-full">
          <!-- Static line -->
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
          <!-- Animated light -->
          <div :class="`absolute inset-0 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-flow-y delay-${i}`"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  const horizontalLines = Array.from({ length: 5 });
  const verticalLines = Array.from({ length: 8 });
  </script>
  
  <style scoped>
  .absolute { position: absolute; }
  .relative { position: relative; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .overflow-hidden { overflow: hidden; }
  .h-px { height: 1px; }
  .w-full { width: 100%; }
  .h-full { height: 100%; }
  
  /* Gradients */
  .bg-gradient-to-r {
    background: linear-gradient(to right, transparent, rgba(59, 130, 246, 0.3), transparent);
  }
  .bg-gradient-to-b {
    background: linear-gradient(to bottom, transparent, rgba(168, 85, 247, 0.3), transparent);
  }
  
  /* Animations */
  @keyframes flowX {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  
  @keyframes flowY {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(100%);
    }
  }
  
  .animate-flow-x {
    animation: flowX 3s infinite;
  }
  
  .animate-flow-y {
    animation: flowY 3s infinite;
  }
  
  /* Individual delays for each line */
  .delay-0 { animation-delay: 0s; }
  .delay-1 { animation-delay: 0.2s; }
  .delay-2 { animation-delay: 0.4s; }
  .delay-3 { animation-delay: 0.6s; }
  .delay-4 { animation-delay: 0.8s; }
  .delay-5 { animation-delay: 1s; }
  .delay-6 { animation-delay: 1.2s; }
  .delay-7 { animation-delay: 1.4s; }
  
  /* Animated light gradients */
  .animate-flow-x.bg-gradient-to-r {
    background: linear-gradient(to right, transparent, rgba(59, 130, 246, 0.6), transparent);
  }
  
  .animate-flow-y.bg-gradient-to-b {
    background: linear-gradient(to bottom, transparent, rgba(168, 85, 247, 0.6), transparent);
  }
  </style>