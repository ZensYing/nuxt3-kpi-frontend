import { useAuthStore } from '~/store/useAuthStore';

export default defineNuxtPlugin(async (nuxtApp) => {
  // Check if the code is running on the client side
  if (import.meta.client) {
    await useAuthStore().refresh();
    setInterval(() => {
      useAuthStore().refresh();
    }, 850000);
  }
});