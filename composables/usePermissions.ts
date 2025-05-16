// composables/usePermissions.ts
import { computed } from 'vue'
import { useAuthStore } from '~/store/useAuthStore'

export function usePermissions() {
  const auth = useAuthStore()
  const adminRoleId = '3a5cb98e-02f8-4f09-afd9-dcd43288c756'
  const saleRoleId = 'a7b9388a-9f74-4a0d-afd4-741f0f488ec2'
  // hrRoleId
  const hrRoleId = '90feab0a-4641-44bc-91ea-806387b95230'

  const isAdmin = computed(() => {
    return auth.user?.role?.id === adminRoleId
  })
    const isSale = computed(() => {
        return auth.user?.role?.id === saleRoleId
    })
  const isHr = computed(() =>{
    return auth.user?.role?.id === hrRoleId
  })
  

  return { isAdmin , isSale ,isHr }
}
