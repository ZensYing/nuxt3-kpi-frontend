// composables/usePermissions.ts
import { computed } from 'vue'
import { useAuthStore } from '~/store/useAuthStore'

export function usePermissions() {
  const auth = useAuthStore()
  const adminRoleId = '3a5cb98e-02f8-4f09-afd9-dcd43288c756'
  const saleRoleId = 'a7b9388a-9f74-4a0d-afd4-741f0f488ec2'

  const isAdmin = computed(() => {
    return auth.user?.role?.id === adminRoleId
  })
    const isSale = computed(() => {
        return auth.user?.role?.id === saleRoleId
    })

  return { isAdmin , isSale  }
}
