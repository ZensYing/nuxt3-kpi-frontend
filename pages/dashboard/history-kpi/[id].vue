<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import { useAuthStore } from '~/store/useAuthStore';
import type { IResponse } from '~/types/api';

const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const kpiId = computed(() => route.params.id as string);

// Types
interface Reference {
  image: string | null;
  link: string;
}

interface Activity {
  name: string;
  bonusFee: number | null;
  amount: number | null;
  client: string;
  total: number | null;
  references: Reference[];
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  title?: string;
  email?: string;
}

interface Department {
  id: string;
  title: string;
}

interface KpiItem {
  id: string;
  name: string;
  department: Department;
  category: string;
  totalBonusAmount: number;
  activities: Activity[];
  requestedBy: User;
  checkedBy: User;
  verifiedBy: User;
  approvedBy: User;
  reference?: string;
  status: string;
  date_created: string;
  date_updated: string;
}

// State
const kpiDetail = ref<KpiItem | null>(null);
const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');

// Helper functions
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'km-KH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (err) {
    console.error('Error formatting date:', err);
    return dateString;
  }
};

const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined || isNaN(Number(num))) {
    return '0.00';
  }
  return Number(num).toFixed(2);
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
    'checked': 'បានត្រួតពិនិត្យ',
    'verified': 'បានផ្ទៀងផ្ទាត់',
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

const calculateTotal = (activities: Activity[]): number => {
  return activities.reduce((sum, activity) => {
    const total = activity.total !== null && activity.total !== undefined ? Number(activity.total) : 0;
    return sum + (isNaN(total) ? 0 : total);
  }, 0);
};

// Get formatted username
const formatUser = (user: User | null | undefined) => {
  if (!user) return '-';
  return `${user.first_name} ${user.last_name}${user.title ? ` (${user.title})` : ''}`;
};

// API Calls
const fetchKpiDetail = async () => {
  loading.value = true;
  error.value = false;
  console.log('Fetching KPI detail for ID:', kpiId.value);
  
  try {
    if (!auth.user?.id) {
      throw new Error('User is not authenticated');
    }
    console.log('User authenticated, making API request');

    // API request
    const response = await useApi<IResponse<KpiItem>>(
      `/items/kpi/${kpiId.value}?fields=*,` +
      `department.id,department.title,` +
      `activities.*,activities.references.*,` +
      `verifiedBy.id,verifiedBy.first_name,verifiedBy.last_name,verifiedBy.title,` +
      `requestedBy.id,requestedBy.first_name,requestedBy.last_name,requestedBy.title,` +
      `checkedBy.id,checkedBy.first_name,checkedBy.last_name,checkedBy.title,` +
      `approvedBy.id,approvedBy.first_name,approvedBy.last_name,approvedBy.title`, 
      {
        method: 'GET'
      }
    );
    console.log('API response received:', response);

    if (response && response.data) {
      // Ensure all number fields are properly parsed
      if (response.data.activities) {
        response.data.activities = response.data.activities.map(activity => ({
          ...activity,
          bonusFee: activity.bonusFee !== null ? Number(activity.bonusFee) : 0,
          amount: activity.amount !== null ? Number(activity.amount) : 0,
          total: activity.total !== null ? Number(activity.total) : 0
        }));
      }
      
      kpiDetail.value = response.data;
      console.log('KPI detail loaded successfully');
    } else {
      throw new Error('Failed to load data');
    }
  } catch (err: any) {
    console.error('Error fetching KPI detail:', err);
    error.value = true;
    errorMessage.value = err.message || 'An unexpected error occurred';
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
    await fetchKpiDetail();
  } catch (err: any) {
    console.error('Error canceling request:', err);
    Swal.fire({
      title: locale.value === 'en' ? 'Error' : 'បញ្ហា',
      text: err.message || (locale.value === 'en' ? 'Failed to cancel request' : 'បរាជ័យក្នុងការបោះបង់សំណើ'),
      icon: 'error'
    });
  }
};

const downloadAsPdf = () => {
  // This is a placeholder - in a real app, you'd implement PDF generation
  // using a library like jsPDF or call an API endpoint that generates PDFs
  Swal.fire({
    title: locale.value === 'en' ? 'Download Started' : 'ការទាញយកបានចាប់ផ្តើម',
    text: locale.value === 'en' ? 'Your PDF is being generated.' : 'ឯកសារ PDF របស់អ្នកកំពុងត្រូវបានបង្កើត។',
    icon: 'info',
    timer: 2000,
    showConfirmButton: false
  });
};

// Initialize
onMounted(() => {
  fetchKpiDetail();
});

definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <div class="container min-h-screen mx-auto p-4 md:p-6">
    <div
      class="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
      v-motion-slide-visible-once="{
        initial: { opacity: 0, y: 50 },
        visibleOnce: { opacity: 1, y: 0, transition: { duration: 600 } }
      }"
    >
      <!-- Back Button -->
      <div class="p-6 border-b border-gray-100 dark:border-gray-800">
        <NuxtLink 
          to="/dashboard/history-kpi" 
          class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          {{ locale === 'en' ? 'Back to History' : 'ត្រឡប់ទៅប្រវត្តិ' }}
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl text-center m-6">
        <svg class="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <h3 class="mt-4 text-lg font-medium text-red-800 dark:text-red-200">{{ locale === 'en' ? 'Error Loading Data' : 'មានបញ្ហាក្នុងការផ្ទុកទិន្នន័យ' }}</h3>
        <p class="mt-2 text-red-700 dark:text-red-300">{{ errorMessage }}</p>
        <button @click="fetchKpiDetail" class="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 rounded-md hover:bg-red-200 dark:hover:bg-red-700 transition-colors">
          {{ locale === 'en' ? 'Try Again' : 'ព្យាយាមម្តងទៀត' }}
        </button>
      </div>

      <!-- Content -->
      <div v-else-if="kpiDetail" class="p-6">
        <!-- Header with Status -->
        <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div class="flex items-center mb-2">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white mr-3">{{ kpiDetail.category }}</h1>
              <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusTextColor(kpiDetail.status)}`">
                {{ locale === 'en' ? formatStatus(kpiDetail.status) : formatStatusKhmer(kpiDetail.status) }}
              </span>
            </div>
            <p class="text-gray-500 dark:text-gray-400">{{ kpiDetail.department?.title || '' }}</p>
          </div>
          <div class="mt-4 md:mt-0">
            <div class="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{{ formatDate(kpiDetail.date_created) }}</span>
            </div>
          </div>
        </div>

        <!-- Summary Card -->
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
          <h2 class="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4">{{ locale === 'en' ? 'Summary' : 'សង្ខេប' }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Activities' : 'សកម្មភាព' }}</p>
              <p class="text-xl font-bold text-gray-900 dark:text-white mt-1">{{ kpiDetail.activities?.length || 0 }}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Total Amount' : 'ចំនួនទឹកប្រាក់សរុប' }}</p>
              <p class="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">${{ calculateTotal(kpiDetail.activities || []).toFixed(2) }}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Last Updated' : 'បានធ្វើបច្ចុប្បន្នភាពចុងក្រោយ' }}</p>
              <p class="text-xl font-bold text-gray-900 dark:text-white mt-1">{{ formatDate(kpiDetail.date_updated) }}</p>
            </div>
          </div>
        </div>

        <!-- Activities Table -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ locale === 'en' ? 'Activities' : 'សកម្មភាព' }}</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {{ locale === 'en' ? 'Activity Name' : 'ឈ្មោះសកម្មភាព' }}
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {{ locale === 'en' ? 'Client' : 'អតិថិជន' }}
                  </th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {{ locale === 'en' ? 'Amount' : 'ចំនួន' }}
                  </th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {{ locale === 'en' ? 'Bonus Fee' : 'ប្រាក់រង្វាន់' }}
                  </th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {{ locale === 'en' ? 'Total' : 'សរុប' }}
                  </th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {{ locale === 'en' ? 'References' : 'ឯកសារយោង' }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="(activity, index) in kpiDetail.activities" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td class="px-4 py-4 text-sm text-gray-900 dark:text-white">{{ activity.name }}</td>
                  <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{{ activity.client }}</td>
                  <td class="px-4 py-4 text-sm text-gray-900 dark:text-white text-right">{{ activity.amount }}</td>
                  <td class="px-4 py-4 text-sm text-gray-900 dark:text-white text-right">${{ activity.bonusFee }}</td>
                  <td class="px-4 py-4 text-sm font-medium text-blue-600 dark:text-blue-400 text-right">${{ activity.total }}</td>
                  <td class="px-4 py-4 text-sm text-center">
                    <div class="flex justify-center space-x-2">
                      <template v-if="activity.references && activity.references.length">
                        <a 
                          v-for="(ref, refIndex) in activity.references" 
                          :key="refIndex" 
                          :href="ref.link" 
                          target="_blank" 
                          class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                          </svg>
                        </a>
                      </template>
                      <span v-else class="text-gray-400 dark:text-gray-500">-</span>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <td colspan="4" class="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white text-right">
                    {{ locale === 'en' ? 'Grand Total:' : 'សរុបរួម:' }}
                  </td>
                  <td class="px-4 py-3 text-sm font-bold text-blue-600 dark:text-blue-400 text-right">
                    ${{ calculateTotal(kpiDetail.activities || []).toFixed(2) }}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <!-- Approval Information -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ locale === 'en' ? 'Approvals' : 'ការអនុម័ត' }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Requested By -->
            <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
              <div class="flex items-center">
                <div class="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                  <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Requested By' : 'ស្នើសុំដោយ' }}</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ formatUser(kpiDetail.requestedBy) }}</p>
                </div>
              </div>
            </div>
            
            <!-- Checked By -->
            <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
              <div class="flex items-center">
                <div :class="`p-2 rounded-full mr-3 ${kpiDetail.checkedBy ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`">
                  <svg :class="`w-5 h-5 ${kpiDetail.checkedBy ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Checked By' : 'ត្រួតពិនិត្យដោយ' }}</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ formatUser(kpiDetail.checkedBy) }}</p>
                </div>
              </div>
            </div>
            
            <!-- Verified By -->
            <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
              <div class="flex items-center">
                <div :class="`p-2 rounded-full mr-3 ${kpiDetail.verifiedBy ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`">
                  <svg :class="`w-5 h-5 ${kpiDetail.verifiedBy ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Verified By' : 'ផ្ទៀងផ្ទាត់ដោយ' }}</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ formatUser(kpiDetail.verifiedBy) }}</p>
                </div>
              </div>
            </div>
            
            <!-- Approved By -->
            <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
              <div class="flex items-center">
                <div :class="`p-2 rounded-full mr-3 ${kpiDetail.approvedBy ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`">
                  <svg :class="`w-5 h-5 ${kpiDetail.approvedBy ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Approved By' : 'អនុម័តដោយ' }}</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ formatUser(kpiDetail.approvedBy) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
          <div class="flex flex-col md:flex-row justify-between">
            <div>
              <NuxtLink to="/dashboard/history-kpi" class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                {{ locale === 'en' ? 'Back to History' : 'ត្រឡប់ទៅប្រវត្តិ' }}
              </NuxtLink>
            </div>
            <div class="mt-4 md:mt-0 flex space-x-3">
              <button 
                v-if="kpiDetail.status === 'pending'"
                @click="cancelRequest(kpiDetail.id)"
                class="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-700 rounded-md shadow-sm text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                {{ locale === 'en' ? 'Cancel Request' : 'បោះបង់សំណើ' }}
                </button>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <button 
            @click="downloadAsPdf" 
            class="inline-flex items-center px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-md shadow-sm text-sm font-medium text-blue-700 dark:text-blue-400 bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m7 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{ locale === 'en' ? 'Download as PDF' : 'ទាញយកជាឯកសារ PDF' }}
          </button>
        </div>
        </div>
        </div>
        </div>
</template>        