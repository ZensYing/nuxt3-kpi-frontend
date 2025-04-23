<template>
    <div class="container min-h-screen mx-auto p-4 md:p-6">
      <div
        class="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
        v-motion-slide-visible-once="{
          initial: { opacity: 0, y: 50 },
          visibleOnce: { opacity: 1, y: 0, transition: { duration: 600 } }
        }"
      >
        <!-- Header with Title -->
        <div class="relative overflow-hidden p-6 border-b dark:border-gray-800">
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-indigo-200/30 rounded-full -translate-y-1/2 translate-x-1/3 dark:from-blue-900/10 dark:to-indigo-800/10"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100/20 to-indigo-100/20 rounded-full translate-y-1/2 -translate-x-1/3 dark:from-blue-900/5 dark:to-indigo-800/5"
          ></div>
  
          <div class="flex justify-between items-center relative z-10">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {{ locale === 'en' ? 'My Commission History' : 'ប្រវត្តិនៃការស្នើសុំកម្រៃជើងសារ' }}
            </h1>
            <div class="flex items-center gap-3">
              <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <span class="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{{ currentDate }}</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Content Area -->
        <div class="p-6">
          <!-- Filter Controls -->
          <div class="flex flex-col md:flex-row gap-4 mb-6">
            <div class="relative flex-1">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                v-model="searchQuery" 
                type="text" 
                class="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500" 
                :placeholder="locale === 'en' ? 'Search by title, department...' : 'ស្វែងរកតាមចំណងជើង ដេប៉ាតឺម៉ង់...'" 
              />
            </div>
            <div class="md:w-48">
              <select 
                v-model="statusFilter" 
                class="block w-full p-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{{ locale === 'en' ? 'All Statuses' : 'ស្ថានភាពទាំងអស់' }}</option>
                <option value="requested">{{ locale === 'en' ? 'Requested' : 'បានស្នើសុំ' }}</option>
                <option value="checked">{{ locale === 'en' ? 'Checked' : 'បានពិនិត្យ' }}</option>
                <option value="verified">{{ locale === 'en' ? 'Verified' : 'បានបញ្ជាក់' }}</option>
                <option value="approved">{{ locale === 'en' ? 'Approved' : 'បានអនុម័ត' }}</option>
                <option value="canceled">{{ locale === 'en' ? 'Canceled' : 'បានបោះបង់' }}</option>
               
              </select>
            </div>
          </div>
  
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
  
          <!-- Error State -->
          <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl text-center">
            <svg class="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <h3 class="mt-4 text-lg font-medium text-red-800 dark:text-red-200">{{ locale === 'en' ? 'Error Loading Data' : 'មានបញ្ហាក្នុងការផ្ទុកទិន្នន័យ' }}</h3>
            <p class="mt-2 text-red-700 dark:text-red-300">{{ errorMessage }}</p>
            <button @click="fetchKpiHistory" class="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 rounded-md hover:bg-red-200 dark:hover:bg-red-700 transition-colors">
              {{ locale === 'en' ? 'Try Again' : 'ព្យាយាមម្តងទៀត' }}
            </button>
          </div>
  
          <!-- Empty State -->
          <div v-else-if="filteredHistory.length === 0" class="bg-gray-50 dark:bg-gray-800/50 p-12 rounded-xl text-center">
            <svg class="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">{{ locale === 'en' ? 'No Commission Requests Found' : 'រកមិនឃើញការស្នើសុំកម្រៃជើងសារទេ' }}</h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">{{ searchQuery || statusFilter ? (locale === 'en' ? 'Try adjusting your filters' : 'សាកល្បងកែតម្រូវតម្រងរបស់អ្នក') : (locale === 'en' ? 'You have not submitted any commission requests yet' : 'អ្នកមិនទាន់បានដាក់ស្នើសុំកម្រៃជើងសារណាមួយនៅឡើយទេ') }}</p>
            <NuxtLink to="/dashboard/request" class="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              {{ locale === 'en' ? 'Create New Request' : 'បង្កើតសំណើថ្មី' }}
            </NuxtLink>
          </div>
  
          <!-- KPI History Cards -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(item, index) in filteredHistory" 
              :key="item.id"
              class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all overflow-hidden"
              v-motion-slide-visible="{
                initial: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 300, delay: index * 100 } }
              }"
            >
              <!-- Card Header -->
              <div class="relative p-5 border-b border-gray-100 dark:border-gray-700">
                <div :class="`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${getStatusBgColor(item.status)}`"></div>
                
                <div class="flex justify-between items-start mb-2 relative">
                  <h3 class="font-semibold text-lg text-gray-900 dark:text-white truncate mr-8">{{ item.category }}</h3>
                  <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusTextColor(item.status)}`">
                    {{ locale === 'en' ? formatStatus(item.status) : formatStatusKhmer(item.status) }}
                  </span>
                </div>
                
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg class="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {{ formatDate(item.date_created) }}
                </div>
              </div>
              
              <!-- Card Content -->
              <div class="p-5">
                <div class="space-y-3">
                  <div class="flex justify-between items-baseline">
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Department' : 'ដេប៉ាតឺម៉ង់' }}:</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ item.department }}</span>
                  </div>
                  
                  <div class="flex justify-between items-baseline">
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Activities' : 'សកម្មភាព' }}:</span>
                    <span class="text-sm text-gray-900 dark:text-white">{{ item.activities.length }}</span>
                  </div>
                  
                  <div class="flex justify-between items-baseline">
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Total Amount' : 'ចំនួនទឹកប្រាក់សរុប' }}:</span>
                    <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">${{ calculateTotal(item.activities).toFixed(2) }}</span>
                  </div>
                </div>
                
                <!-- Actions -->
                <div class="mt-5 flex justify-between">
                  <NuxtLink :to="`/dashboard/history-kpi/${item.id}`" class="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    {{ locale === 'en' ? 'View Details' : 'មើលព័ត៌មានលម្អិត' }}
                    <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </NuxtLink>
                  
                  <button 
                    v-if="item.status === 'pending'" 
                    @click="cancelRequest(item.id)"
                    class="inline-flex items-center text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    {{ locale === 'en' ? 'Cancel' : 'បោះបង់' }}
                    <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination Controls -->
          <div v-if="kpiHistory.length > 0" class="mt-8 flex justify-center">
            <div class="inline-flex shadow-sm">
              <button 
                @click="changePage(currentPage - 1)" 
                :disabled="currentPage === 1"
                class="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ locale === 'en' ? 'Previous' : 'មុន' }}
              </button>
              <div class="flex items-center px-4 py-2 border-t border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                {{ currentPage }} / {{ totalPages }}
              </div>
              <button 
                @click="changePage(currentPage + 1)" 
                :disabled="currentPage === totalPages"
                class="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-r-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ locale === 'en' ? 'Next' : 'បន្ទាប់' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import Swal from 'sweetalert2';
  import { useAuthStore } from '~/store/useAuthStore';
  import type { IResponse } from '~/types/api';
  
  const { t, locale } = useI18n();
  const router = useRouter();
  const auth = useAuthStore();
  
  // Format date as "26th March, 2025"
  const currentDate = computed(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
  
    // Add ordinal suffix
    const getOrdinal = (n: number) => {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
  
    return `${getOrdinal(day)} ${month}, ${year}`;
  });
  
  // Types
  interface Reference {
    image: string | null;
    link: string;
  }
  
  interface Activity {
    name: string;
    bonusFee: number;
    amount: number;
    client: string;
    total: number;
    references: Reference[];
  }
  
  interface KpiItem {
    id: string;
    name: string;
    department: string;
    category: string;
    totalBonusAmount: number;
    activities: Activity[];
    requestedBy: string;
    checkedBy: string;
    verifiedBy: string;
    approvedBy: string;
    reference?: string;
    status: string;
    date_created: string;
    date_updated: string;
  }
  
  // Pagination and filtering state
  const kpiHistory = ref<KpiItem[]>([]);
  const loading = ref(true);
  const error = ref(false);
  const errorMessage = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 9;
  const searchQuery = ref('');
  const statusFilter = ref('');
  
  // Computed properties for filtering and pagination
  const filteredHistory = computed(() => {
    let filtered = [...kpiHistory.value];
  
    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(item => 
        item.category.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query)
      );
    }
  
    // Apply status filter
    if (statusFilter.value) {
      filtered = filtered.filter(item => item.status === statusFilter.value);
    }
  
    // Return paginated results
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  });
  
  const totalPages = computed(() => {
    let filtered = [...kpiHistory.value];
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(item => 
        item.category.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query)
      );
    }
    
    if (statusFilter.value) {
      filtered = filtered.filter(item => item.status === statusFilter.value);
    }
    
    return Math.ceil(filtered.length / itemsPerPage) || 1;
  });
  
  // Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'km-KH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const formatStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'requested': 'Requested',
      'checked': 'Checked',
      'Verified': 'verified',
      'approved': 'Approved',
      'canceled': 'Canceled'
    };
    return statusMap[status] || status;
  };
  
  const formatStatusKhmer = (status: string) => {
    const statusMap: Record<string, string> = {
      'requested': 'បានស្នើសុំ',
      'checked': 'បានពិនិត្យ',
      'verified': 'បានបញ្ជាក់',
      'approved': 'បានអនុម័ត',
      'canceled': 'បានបោះបង់'
     
    };
    return statusMap[status] || status;
  };
  
  const getStatusTextColor = (status: string) => {
    const colorMap: Record<string, string> = {

      'requested': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      'checked': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
      'verified': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'approved': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'canceled': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'

      
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };
  
  const getStatusBgColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'requested': 'bg-blue-100/30 dark:bg-blue-900/10',
      'checked': 'bg-yellow-100/30 dark:bg-yellow-900/10',
      'verified': 'bg-green-100/30 dark:bg-green-900/10',
      'approved': 'bg-green-100/30 dark:bg-green-900/10',
      'canceled': 'bg-gray-100/40 dark:bg-gray-700/20'
    };
    return colorMap[status] || 'bg-gray-100/40 dark:bg-gray-700/20';
  };
  
  const calculateTotal = (activities: Activity[]) => {
    return activities.reduce((sum, activity) => sum + (activity.total || 0), 0);
  };
  
  const changePage = (page: number) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
  };
  
  // API Calls
  const fetchKpiHistory = async () => {
    loading.value = true;
    error.value = false;
    
    try {
      if (!auth.user?.id) {
        throw new Error('User is not authenticated');
      }
  
      // Filter by the current user's ID as requestedBy
      const response = await useApi<IResponse<KpiItem[]>>(`/items/kpi?filter[requestedBy][_eq]=${auth.user.id}&fields=*,activities.*,activities.references.*&sort=-date_created`, {
        method: 'GET'
      });
  
      if (response && response.data) {
        kpiHistory.value = response.data;
      } else {
        throw new Error('Failed to load data');
      }
    } catch (err: any) {
      error.value = true;
      errorMessage.value = err.message || 'An unexpected error occurred';
      console.error('Error fetching KPI history:', err);
    } finally {
      loading.value = false;
    }
  };
  
  const cancelRequest = async (id: string) => {
    try {
      // Confirm cancellation
      const result = await Swal.fire({
        title: locale.value === 'en' ? 'Cancel Request?' : 'បោះបង់សំណើ?',
        text: locale.value === 'en' ? 'Are you sure you want to cancel this commission request?' : 'តើអ្នកពិតជាចង់បោះបង់សំណើកម្រៃជើងសារនេះមែនទេ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: locale.value === 'en' ? 'Yes, cancel it!' : 'បាទ/ចាស បោះបង់វា!',
        cancelButtonText: locale.value === 'en' ? 'No, keep it' : 'ទេ រក្សាទុកវា'
      });
  
      if (!result.isConfirmed) return;
  
      // Show loading
      Swal.fire({
        title: locale.value === 'en' ? 'Processing...' : 'កំពុងដំណើរការ...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      // Update the request status to 'canceled'
      await useApi(`/items/kpi/${id}`, {
        method: 'PATCH',
        data: {
          status: 'canceled'
        }
      });
  
      // Show success
      Swal.fire({
        title: locale.value === 'en' ? 'Canceled!' : 'បានបោះបង់!',
        text: locale.value === 'en' ? 'Your request has been canceled.' : 'សំណើរបស់អ្នកត្រូវបានបោះបង់។',
        icon: 'success'
      });
  
      // Refresh data
      await fetchKpiHistory();
    } catch (err: any) {
      console.error('Error canceling request:', err);
      Swal.fire({
        title: locale.value === 'en' ? 'Error' : 'បញ្ហា',
        text: err.message || (locale.value === 'en' ? 'Failed to cancel request' : 'បរាជ័យក្នុងការបោះបង់សំណើ'),
        icon: 'error'
      });
    }
  };
  
  // Initialize
  onMounted(() => {
    fetchKpiHistory();
  });
  
  definePageMeta({
    middleware: 'auth',
  });
  </script>