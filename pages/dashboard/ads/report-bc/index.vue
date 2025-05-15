<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <!-- Header -->
    <div class="mb-8 text-center md:text-left">
      <h1 class="text-3xl font-bold text-gray-800">Baksey</h1>
      <p class="mt-2 text-xl text-gray-600">ADVERTISEMENTS REPORT</p>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-r-transparent align-[-0.125em]" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="bg-white rounded-lg shadow-sm">
      <!-- Table Controls -->
      <div class="flex flex-col md:flex-row justify-between items-center p-4 border-b">
        <div class="mb-4 md:mb-0">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search advertisements..."
              class="pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full md:w-64"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <label class="mr-2 text-sm text-gray-600">Rows per page:</label>
          <select 
            v-model="rowsPerPage" 
            class="border rounded-lg py-1 px-2 focus:ring-blue-600 focus:border-blue-600 text-sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option :value="filteredAdvertisements.length">All</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 tracking-wider">Name</th>
              <th class="py-3 px-4 text-center text-sm font-medium text-gray-700 tracking-wider">Image</th>
              <th class="py-3 px-4 text-center text-sm font-medium text-gray-700 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="advertisement in paginatedAdvertisements" :key="advertisement.slug" class="hover:bg-gray-50 transition-colors">
              <td class="py-4 px-4 text-sm md:text-base text-gray-800">{{ advertisement.name }}</td>
              <td class="py-4 px-4 text-center">
                <div class="flex justify-center">
                  <img 
                    :src="getImageUrl(advertisement.file)" 
                    :alt="`${advertisement.name} image`" 
                    class="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg bg-gray-100"
                    loading="lazy"
                    width="64"
                    height="64"
                  />
                </div>
              </td>
              <td class="py-4 px-4 text-center">
                <NuxtLink 
                  :to="`/dashboard/ads/report-bc/${advertisement.slug}`" 
                  class="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </NuxtLink>
              </td>
            </tr>
            <tr v-if="paginatedAdvertisements.length === 0">
              <td colspan="3" class="py-8 text-center text-gray-500">
                {{ loading ? 'Loading advertisements...' : 'No advertisements found.' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex flex-col md:flex-row justify-between items-center p-4 border-t">
        <div class="text-sm text-gray-600 mb-4 md:mb-0">
          Showing {{ showingStart }} to {{ showingEnd }} of {{ filteredAdvertisements.length }} entries
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="goToPage(1)" 
            :disabled="currentPage === 1" 
            :class="paginationButtonClass(currentPage === 1)"
            aria-label="First page"
          >
            First
          </button>
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1" 
            :class="paginationButtonClass(currentPage === 1)"
            aria-label="Previous page"
          >
            Prev
          </button>
          <div class="flex items-center">
            <span class="px-3 py-1 text-sm">{{ currentPage }} / {{ totalPages }}</span>
          </div>
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages" 
            :class="paginationButtonClass(currentPage === totalPages)"
            aria-label="Next page"
          >
            Next
          </button>
          <button 
            @click="goToPage(totalPages)" 
            :disabled="currentPage === totalPages" 
            :class="paginationButtonClass(currentPage === totalPages)"
            aria-label="Last page"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
definePageMeta({
  middleware: 'auth',
});
// Define the Advertisement interface
interface Advertisement {
  name: string;
  file: string;
  slug: string;
}

interface AdvertisementsResponse {
  data: Advertisement[];
}

// Constants
const API_BASE_URL_BC = 'https://business-cambodia.com/cms';
const ASSETS_PATH = '/assets/';
const DEFAULT_ROWS_PER_PAGE = 10;

// State with appropriate initial values
const advertisements = ref<Advertisement[]>([]);
const loading = ref(true);
const currentPage = ref(1);
const rowsPerPage = ref(DEFAULT_ROWS_PER_PAGE);
const searchQuery = ref('');

// Image URL helper
const getImageUrl = (img: string): string => {
  return `${API_BASE_URL_BC}${ASSETS_PATH}${img}`;
};

// Pagination button class helper to reduce template complexity
const paginationButtonClass = (isDisabled: boolean): string => {
  return [
    'px-3 py-1 rounded border',
    isDisabled 
      ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
      : 'text-gray-700 border-gray-300 hover:bg-gray-50'
  ].join(' ');
};

// Fetch advertisements data with error handling
const fetchAdvertisements = async () => {
  loading.value = true;
  try {
    const response = await $fetch<AdvertisementsResponse>(`${API_BASE_URL_BC}/items/advertisements`, {
      params: {
        'filter[status][_eq]': 'published',
        fields: 'name,file,slug',
        // Add caching parameters if supported by the API
        // timestamp: Date.now() // Use only if API doesn't support proper cache headers
      },
      headers: {
        Accept: 'application/json'
      },
      // Enable Nuxt's built-in caching
      // Adjust these options based on your needs
      cache: process.client ? 'force-cache' : undefined,
      retry: 1,
      timeout: 10000
    });
    
    if (response && response.data) {
      advertisements.value = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch advertisements:', error);
    // Consider adding a user-friendly error state
  } finally {
    loading.value = false;
  }
};

// Debounced search query
const debouncedSearchQuery = ref('');
watch(searchQuery, (newQuery) => {
  const timeout = setTimeout(() => {
    debouncedSearchQuery.value = newQuery;
  }, 300);
  return () => clearTimeout(timeout);
});

// Filter advertisements based on debounced search query for better performance
const filteredAdvertisements = computed(() => {
  if (!debouncedSearchQuery.value) return advertisements.value;
  
  const query = debouncedSearchQuery.value.toLowerCase();
  return advertisements.value.filter(ad => 
    ad.name.toLowerCase().includes(query)
  );
});

// Computed properties for pagination
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredAdvertisements.value.length / Number(rowsPerPage.value)));
});

// Memoized paginated advertisements
const paginatedAdvertisements = computed(() => {
  const start = (currentPage.value - 1) * Number(rowsPerPage.value);
  const end = start + Number(rowsPerPage.value);
  return filteredAdvertisements.value.slice(start, end);
});

const showingStart = computed(() => {
  if (filteredAdvertisements.value.length === 0) return 0;
  return (currentPage.value - 1) * Number(rowsPerPage.value) + 1;
});

const showingEnd = computed(() => {
  return Math.min(currentPage.value * Number(rowsPerPage.value), filteredAdvertisements.value.length);
});

// Pagination methods
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Watch for changes in filters to reset pagination
// Use debounced search query to avoid excessive page resets
watch([debouncedSearchQuery, rowsPerPage], () => {
  currentPage.value = 1;
});

// Initialize data
onMounted(() => {
  fetchAdvertisements();
});
</script>

