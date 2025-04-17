import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
  // Check if user is authenticated
  if (import.meta.client) {
    if (!useAuthStore().accessToken) {
      return navigateTo('/auth');
    }
  }
});