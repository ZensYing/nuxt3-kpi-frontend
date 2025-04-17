<template>
    <div class="container min-h-screen mx-auto p-6">
 
      <!-- Recent Requests Table -->
      <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden" v-motion-fade-visible-once data-aos="fade-down">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent KPI Requests</h2>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
                  <th class="py-3 px-4 text-left">Staff Name</th>
                  <th class="py-3 px-4 text-left">Department</th>
                  <th class="py-3 px-4 text-left">Request Date</th>
                  <th class="py-3 px-4 text-left">Status</th>
                  <th class="py-3 px-4 text-left">Actions</th>
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
  </template>
  
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { Icon } from '@iconify/vue'
  import Swal from 'sweetalert2'
  definePageMeta({
  middleware: 'auth',
});

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