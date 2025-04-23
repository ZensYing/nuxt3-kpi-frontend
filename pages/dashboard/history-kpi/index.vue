<template>
  <div class="container min-h-screen mx-auto p-4 md:p-6">
    <div
      class="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
      v-motion-slide-visible-once="{
        initial: { opacity: 0, y: 50 },
        visibleOnce: { opacity: 1, y: 0, transition: { duration: 600 } }
      }"
    >
      <!-- Modern Gradient Header with Title -->
      <div class="relative overflow-hidden p-8 border-b dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/40 to-indigo-300/40 rounded-full -translate-y-1/3 translate-x-1/4 dark:from-blue-800/20 dark:to-indigo-700/20 blur-xl"></div>
        <div class="absolute bottom-0 left-0 w-44 h-44 bg-gradient-to-tr from-blue-200/30 to-indigo-200/30 rounded-full translate-y-1/2 -translate-x-1/4 dark:from-blue-800/10 dark:to-indigo-700/10 blur-lg"></div>

        <div class="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-4">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <span class="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </span>
            {{ locale === 'en' ? 'My Commission History' : 'ប្រវត្តិនៃការស្នើសុំកម្រៃជើងសារ' }}
          </h1>
          <div class="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm">
            <div class="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{{ currentDate }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Area with Enhanced Filter Controls -->
      <div class="p-6 md:p-8">
        <!-- Improved Filter Controls -->
        <div class="flex flex-col md:flex-row gap-4 mb-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              v-model="searchQuery" 
              type="text" 
              class="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm" 
              :placeholder="locale === 'en' ? 'Search by title, department...' : 'ស្វែងរកតាមចំណងជើង ដេប៉ាតឺម៉ង់...'" 
            />
          </div>
          <div class="md:w-64">
            <div class="relative">
              <select 
                v-model="statusFilter" 
                class="block w-full appearance-none pl-4 pr-12 py-3 border border-gray-200 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm"
              >
                <option value="">{{ locale === 'en' ? 'All Statuses' : 'ស្ថានភាពទាំងអស់' }}</option>
                <option value="requested">{{ locale === 'en' ? 'Requested' : 'បានស្នើសុំ' }}</option>
                <option value="checked">{{ locale === 'en' ? 'Checked' : 'បានពិនិត្យ' }}</option>
                <option value="verified">{{ locale === 'en' ? 'Verified' : 'បានបញ្ជាក់' }}</option>
                <option value="approved">{{ locale === 'en' ? 'Approved' : 'បានអនុម័ត' }}</option>
                <option value="canceled">{{ locale === 'en' ? 'Canceled' : 'បានបោះបង់' }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Improved Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-24">
          <div class="flex flex-col items-center">
            <div class="animate-spin rounded-full h-14 w-14 border-b-2 border-t-2 border-blue-500"></div>
            <p class="mt-4 text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Loading your data...' : 'កំពុងផ្ទុកទិន្នន័យរបស់អ្នក...' }}</p>
          </div>
        </div>

        <!-- Improved Error State -->
        <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 p-8 rounded-xl text-center">
          <div class="bg-red-100 dark:bg-red-800/30 rounded-full p-3 inline-flex mx-auto mb-4">
            <svg class="h-12 w-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-medium text-red-800 dark:text-red-200">{{ locale === 'en' ? 'Error Loading Data' : 'មានបញ្ហាក្នុងការផ្ទុកទិន្នន័យ' }}</h3>
          <p class="mt-2 text-red-700 dark:text-red-300">{{ errorMessage }}</p>
          <button @click="fetchKpiHistory" class="mt-6 px-6 py-3 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 rounded-xl hover:bg-red-200 dark:hover:bg-red-700 transition-colors font-medium">
            {{ locale === 'en' ? 'Try Again' : 'ព្យាយាមម្តងទៀត' }}
          </button>
        </div>

        <!-- Improved Empty State -->
        <div v-else-if="filteredHistory.length === 0" class="bg-gray-50 dark:bg-gray-800/50 p-16 rounded-xl text-center">
          <div class="bg-gray-100 dark:bg-gray-700 rounded-full p-6 inline-flex mx-auto mb-6">
            <svg class="h-16 w-16 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">{{ locale === 'en' ? 'No Commission Requests Found' : 'រកមិនឃើញការស្នើសុំកម្រៃជើងសារទេ' }}</h3>
          <p class="mt-2 text-gray-500 dark:text-gray-400">{{ searchQuery || statusFilter ? (locale === 'en' ? 'Try adjusting your filters' : 'សាកល្បងកែតម្រូវតម្រងរបស់អ្នក') : (locale === 'en' ? 'You have not submitted any commission requests yet' : 'អ្នកមិនទាន់បានដាក់ស្នើសុំកម្រៃជើងសារណាមួយនៅឡើយទេ') }}</p>
          <NuxtLink to="/dashboard/request" class="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-md">
            <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            {{ locale === 'en' ? 'Create New Request' : 'បង្កើតសំណើថ្មី' }}
          </NuxtLink>
        </div>

        <!-- Improved KPI History Cards -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(item, index) in filteredHistory" 
            :key="item.id"
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all overflow-hidden group"
            v-motion-slide-visible="{
              initial: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 300, delay: index * 100 } }
            }"
          >
            <!-- Card Header with Glass Effect -->
            <div class="relative p-6 border-b border-gray-100 dark:border-gray-700 backdrop-blur-sm">
              <div :class="`absolute -top-12 -right-12 w-36 h-36 rounded-full ${getStatusBgColor(item.status)} blur-xl opacity-70`"></div>
              
              <div class="flex justify-between items-start mb-3 relative">
                <h3 class="font-semibold text-lg text-gray-900 dark:text-white truncate mr-8">{{ item.category }}</h3>
                <span :class="`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusTextColor(item.status)}`">
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
            
            <!-- Card Content with Improved Layout -->
            <div class="p-6">
              <div class="space-y-4">
                <div class="flex justify-between items-baseline p-2 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Department' : 'ដេប៉ាតឺម៉ង់' }}:</span>
                  <span class="text-sm text-gray-900 dark:text-white font-medium">{{ item.department }}</span>
                </div>
                
                <div class="flex justify-between items-baseline p-2 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Activities' : 'សកម្មភាព' }}:</span>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 font-medium">
                    {{ item.activities.length }}
                  </span>
                </div>
                
                <div class="flex justify-between items-baseline p-2 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Total Amount' : 'ចំនួនទឹកប្រាក់សរុប' }}:</span>
                  <span class="text-sm font-bold text-blue-600 dark:text-blue-400">${{ calculateTotal(item.activities).toFixed(2) }}</span>
                </div>
              </div>
              
              <!-- Improved Actions -->
              <div class="mt-6 flex justify-between items-center">
                <NuxtLink :to="`/dashboard/history-kpi/${item.id}`" class="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 group-hover:underline">
                  {{ locale === 'en' ? 'View Details' : 'មើលព័ត៌មានលម្អិត' }}
                  <svg class="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </NuxtLink>
                
                <button 
                  v-if="item.status === 'pending'" 
                  @click="cancelRequest(item.id)"
                  class="inline-flex items-center text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
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
        
        <!-- Improved Pagination Controls -->
        <div v-if="kpiHistory.length > 0" class="mt-10 flex justify-center">
          <div class="inline-flex shadow-md rounded-xl overflow-hidden">
            <button 
              @click="changePage(currentPage - 1)" 
              :disabled="currentPage === 1"
              class="px-5 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <div class="flex items-center px-6 py-3 border-t border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium">
              {{ currentPage }} / {{ totalPages }}
            </div>
            <button 
              @click="changePage(currentPage + 1)" 
              :disabled="currentPage === totalPages"
              class="px-5 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
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