<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead } from '#imports'; // Use Nuxt's built-in `useHead` composable

// Add an inline script to set the theme before styles load
useHead({
  script: [
    {
      children: `
        (function() {
          try {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.classList.add(savedTheme);
          } catch (e) {
            console.warn('Error applying theme:', e);
          }
        })();
      `,
      type: 'text/javascript',
    },
  ],
});
</script>
