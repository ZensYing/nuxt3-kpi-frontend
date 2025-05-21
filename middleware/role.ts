import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware on server-side to prevent hydration issues
  if (process.server) return;
  
  const auth = useAuthStore();
  
  // Check if user is authenticated
  if (!auth.user) {
    return navigateTo('/login');
  }
  
  // Check if the user has the required role for writers page
  const requiredWriterRole = "bb5d4a67-a17e-4cdf-9d59-c8f95518797b";
  
  // The path is specifically for the writers page
  if (to.path.includes('/dashboard/track-performance-staff/writers') && 
      auth.user.role.id !== requiredWriterRole) {
    // User doesn't have the required role, show access denied page or redirect
    return navigateTo('/access-denied');
  }

//   check if the user has the require role for creator page
    const requiredCreatorRole = "487171a6-b731-4d96-b350-3481868c8f92";
    // The path is specifically for the creators page
    if (to.path.includes('/dashboard/track-performance-staff/creators') && 
        auth.user.role.id !== requiredCreatorRole) {
      // User doesn't have the required role, show access denied page or redirect
      return navigateTo('/access-denied');
    }
});