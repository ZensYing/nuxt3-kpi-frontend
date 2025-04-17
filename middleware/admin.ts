// middleware/admin.ts
import { useAuthStore } from '~/store/useAuthStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore()

  // Ensure token exists and user is fetched
  const hasToken = !!localStorage.getItem('refresh_token')
  if (hasToken && !auth.user) {
    await auth.fetchUser()
  }

  const adminRoleId = '3a5cb98e-02f8-4f09-afd9-dcd43288c756'
  const isAdmin = auth.user?.role?.id === adminRoleId

  // ✅ Redirect non-admins
  if (!isAdmin) {
    return navigateTo({
      path: '/unauthorized',
      query: { redirect: to.fullPath }
    })
  }
})
