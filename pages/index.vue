<template>
  <div v-motion-fade-visible-once data-aos="fade-down">
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{{ locale === 'en' ? 'KPI Request Dashboard' : 'ផ្ទាំងគ្រប់គ្រង KPI' }}</h1>
      
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-900 border border-blue-500 shadow-md rounded-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">{{ locale === 'en'? 'Total Requests' : 'ចំនួនសរុបការស្នើសុំ' }}</h2>
              <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ totalKpiRequests }}</p>
            </div>
            <Icon icon="mdi:chart-bar" class="text-4xl text-blue-500 dark:text-blue-400" />
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 border border-red-500">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">{{ locale === 'en' ? 'Pending Requests' : 'សំណើដែលកំពុងរង់ចាំ' }}</h2>
              <p class="text-3xl font-bold text-red-600 dark:text-red-400">{{ pendingKpiRequests }}</p>
            </div>
            <Icon icon="mdi:clock-outline" class="text-4xl text-red-500 dark:text-red-400" />
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 border border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">{{ locale === 'en' ? 'Approved Requests' : 'សំណើដែលបានយល់ព្រម' }}</h2>
              <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ approvedKpiRequests }}</p>
            </div>
            <Icon icon="mdi:check-circle-outline" class="text-4xl text-green-500 dark:text-green-400" />
          </div>
        </div>
      </div>

      <!-- KPI History Component -->
      <IndexPageHistoryKpi />
    </div>

    <!-- ListUser -->
    <div v-if="isAdmin" class="mx-auto p-2 md:px-6">
      <AdministratorListuser />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/store/useAuthStore';
import { usePermissions } from '~/composables/usePermissions';
import type { IResponse } from '~/types/api';
import type { KpiItem } from '~/types/kpi';

const { isAdmin } = usePermissions();
const { locale } = useI18n();
const auth = useAuthStore();

definePageMeta({
  middleware: ['auth']
});

// State for KPI data
const kpiItems = ref<KpiItem[]>([]);
const loading = ref(true);
const error = ref(false);

// Fetch all KPI requests for the current user
const fetchKpiData = async () => {
  loading.value = true;
  error.value = false;
  
  try {
    if (!auth.user?.id) {
      throw new Error('User is not authenticated');
    }

    const response = await useApi<IResponse<KpiItem[]>>(`/items/kpi?filter[requestedBy][_eq]=${auth.user.id}&fields=*&sort=-date_created`, {
      method: 'GET'
    });

    if (response && response.data) {
      kpiItems.value = response.data;
    } else {
      throw new Error('Failed to load data');
    }
  } catch (err) {
    error.value = true;
    console.error('Error fetching KPI data:', err);
  } finally {
    loading.value = false;
  }
};

// Computed properties for dashboard metrics
const totalKpiRequests = computed(() => kpiItems.value.length);

const pendingKpiRequests = computed(() => 
  kpiItems.value.filter(item => 
    item.status === 'requested' || item.status === 'checked'
  ).length
);

const approvedKpiRequests = computed(() => 
  kpiItems.value.filter(item => 
    item.status === 'approved' || item.status === 'verified'
  ).length
);

// Fetch data on component mount
onMounted(() => {
  fetchKpiData();
});
</script>