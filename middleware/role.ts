import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware on server-side to prevent hydration issues
  if (process.server) return;
  
  const auth = useAuthStore();
  
  // Check if user is authenticated
  if (!auth.user) {
    return navigateTo('/login');
  }

  // Define role IDs
  const adminRoleId = "3a5cb98e-02f8-4f09-afd9-dcd43288c756";
  const writerRoleId = "bb5d4a67-a17e-4cdf-9d59-c8f95518797b";
  const creatorRoleId = "487171a6-b731-4d96-b350-3481868c8f92";
  const hrRoleId = "90feab0a-4641-44bc-91ea-806387b95230";
  
  // Check if user is an admin (admins can access all pages)
  const isAdmin = auth.user.role.id === adminRoleId;
  const isHR = auth.user.role.id === hrRoleId;
  // If user is admin, allow access to any page
  if (isAdmin) {
    return;
  }
  if (isHR) {
    return;
  }
  
  // For non-admin users, check specific page permissions
  
  // Check access for writers page
  if (to.path.includes('/dashboard/track-performance-staff/writers') && 
      auth.user.role.id !== writerRoleId) {
    return navigateTo('/access-denied');
  }

  // Check access for creators page
  if (to.path.includes('/dashboard/track-performance-staff/creators') && 
      auth.user.role.id !== creatorRoleId) {
    return navigateTo('/access-denied');
  }
});