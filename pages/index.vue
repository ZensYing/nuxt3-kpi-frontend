<template>
  <div v-motion-fade-visible-once data-aos="fade-down">
    <div class="container  mx-auto " >
    <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{{ locale === 'en' ? 'KPI Request Dashboard' : 'ផ្ទាំងគ្រប់គ្រង KPI' }}</h1>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-900 border border-blue-500 shadow-md rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">{{ locale === 'en'? 'Total Requests' : 'ចំនួនសរុបការស្នើសុំ' }}</h2>
            <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ totalRequests }}</p>
          </div>
          <Icon icon="mdi:chart-bar" class="text-4xl text-blue-500 dark:text-blue-400" />
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 border border-red-500">
        <div class="flex items-center justify-between ">
          <div>
            <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">{{  locale === 'en' ? 'Pending Requests' : 'សំណើដែលកំពុងរង់ចាំ' }}</h2>
            <p class="text-3xl font-bold text-red-600 dark:text-red-400">{{ pendingRequests }}</p>
          </div>
          <Icon icon="mdi:clock-outline" class="text-4xl text-red-500 dark:text-red-400" />
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 border border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">{{ locale === 'en' ? 'Approved Requests' : 'សំណើដែលបានយល់ព្រម' }}</h2>
            <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ approvedRequests }}</p>
          </div>
          <Icon icon="mdi:check-circle-outline" class="text-4xl text-green-500 dark:text-green-400" />
        </div>
      </div>
    </div>
    <!-- Recent Requests Table -->
    <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
      <div class="">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{{ locale === 'en' ? 'Recent KPI Requests' : 'សំណើ KPI ថ្មីៗ' }}</h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
                <th class="py-3 px-4 text-left">{{ locale === 'en' ? 'Staff Name' : 'ឈ្មោះបុគ្គលិក' }}</th>
                <th class="py-3 px-4 text-left">{{ locale === 'en' ? 'Department' : 'ដេប៉ាតឺម៉ង់' }}</th>
                <th class="py-3 px-4 text-left">{{  locale === 'en' ? 'Request Date' : 'កាលបរិច្ឆេទស្នើសុំ' }}</th>
                <th class="py-3 px-4 text-left">{{ locale === 'en' ? 'Status' : 'ស្ថានភាព' }}</th>
                <th class="py-3 px-4 text-left">{{ locale === 'en' ? 'Actions' : 'សកម្មភាព' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="request in recentRequests"
                :key="request.id"
                class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td class="py-3 px-4 text-gray-800 dark:text-white">{{ request.staffName }}</td>
                <td class="py-3 px-4 text-gray-800 dark:text-white">{{ request.department }}</td>
                <td class="py-3 px-4 text-gray-800 dark:text-white">{{ formatDate(request.requestDate) }}</td>
                <td class="py-3 px-4">
                  <span
                    :class="{
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-300/20 dark:text-yellow-300': request.status === 'Pending',
                      'bg-green-100 text-green-800 dark:bg-green-300/20 dark:text-green-300': request.status === 'Approved',
                      'bg-red-100 text-red-800 dark:bg-red-300/20 dark:text-red-300': request.status === 'Rejected'
                    }"
                    class="px-3 py-1 rounded-full text-xs"
                  >
                    {{ request.status }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <button
                    @click="viewRequestDetails(request.id)"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- ListUser -->
   <div v-if="isAdmin" class="mx-auto p-2 md:px-6">
    <AdministratorListuser />
   </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/store/useAuthStore';
import { useRouter } from 'vue-router';
import { usePermissions } from '~/composables/usePermissions'
const { isAdmin } = usePermissions()
const { t, locale } = useI18n();

const router = useRouter();
const auth = useAuthStore();

definePageMeta({
  middleware: ['auth']  // 'auth' first if needed
})
// Interface for KPI Request
interface KPIRequest {
  id: number
  staffName: string
  department: string
  requestDate: Date
  status: 'Pending' | 'Approved' | 'Rejected'
}

// Reactive state for dashboard data
const totalRequests = ref(0)
const pendingRequests = ref(0)
const approvedRequests = ref(0)
const recentRequests = ref<KPIRequest[]>([])

// Fetch KPI requests
const fetchKPIRequests = async () => {
  try {
    // TODO: Replace with actual API call
    const mockRequests: KPIRequest[] = [
      {
        id: 1,
        staffName: 'John Doe',
        department: 'Sales',
        requestDate: new Date('2024-03-15'),
        status: 'Pending'
      },
      {
        id: 2,
        staffName: 'Jane Smith',
        department: 'Marketing',
        requestDate: new Date('2024-03-10'),
        status: 'Approved'
      }
    ]

    recentRequests.value = mockRequests
    totalRequests.value = mockRequests.length
    pendingRequests.value = mockRequests.filter(r => r.status === 'Pending').length
    approvedRequests.value = mockRequests.filter(r => r.status === 'Approved').length
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to fetch KPI requests'
    })
  }
}

// Format date utility
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

// View request details
const viewRequestDetails = (requestId: number) => {
  // TODO: Implement navigation or modal to show request details
  Swal.fire({
    title: `KPI Request #${requestId}`,
    text: 'Detailed view coming soon!',
    icon: 'info'
  })
}

// Fetch data on component mount
onMounted(() => {
  fetchKPIRequests()
})
</script>

<style scoped>
/* Additional custom styles can be added here */
</style>