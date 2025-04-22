<template>
  <NuxtLoadingIndicator  color="#089cf4" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">

import { useHead } from '#imports'; // Use Nuxt's built-in `useHead` composable
import { inject } from '@vercel/analytics';

onMounted(() => {
  inject();
});
// Add an inline script to set the theme before styles load
useHead({
  script: [
    {
      children: `
        (function() {
          try {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.classList.add(savedTheme);

            const savedLocale = localStorage.getItem('locale') || 'en';
            document.documentElement.setAttribute('lang', savedLocale);
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
