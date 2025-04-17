<template>
    <div class="mx-auto px-4 min-h-screen bg-gray-50 dark:bg-gray-900" v-motion-fade-visible-once data-aos="fade-down">
      <div class="flex items-center justify-between mt-4 mb-4">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Video Ads Tracker List</h2>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by Client, Creator..."
          class="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none 
                 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 transition "
        />
      </div>
  
      <div class="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-red-500 text-white ">
            <tr>
              <th class="px-4 py-2">Client</th>
              <th class="px-4 py-2">Creator</th>
              <th class="px-4 py-2">Amount/Month</th>
              <th class="px-4 py-2">Cameraman & Editor</th>
              <th class="px-4 py-2">Start Date</th>
              <th class="px-4 py-2">End Date</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Video Link</th>
              <th class="px-4 py-2">Ad Resources</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in paginatedData"
              :key="item.client + item.creator"
              class="border-b dark:border-gray-700 dark:text-white"
            >
              <td class="px-4 py-2">{{ item.client }}</td>
              <td class="px-4 py-2">{{ item.creator }}</td>
              <td class="px-4 py-2">{{ item.amoutht }}</td>
              <td class="px-4 py-2">{{ item.cameramanEditor }}</td>
              <td class="px-4 py-2">{{ item.startDate }}</td>
              <td class="px-4 py-2">{{ item.endDate }}</td>
              <td class="px-4 py-2">{{ item.status }}</td>
              <td class="px-4 py-2">
                <a :href="item.videoLink" target="_blank" class="text-blue-500 hover:underline">View</a>
              </td>
              <td class="px-4 py-2">{{ item.adResources }}</td>
            </tr>
            <tr v-if="filteredData.length === 0">
              <td colspan="9" class="text-center py-4 text-gray-500 dark:text-gray-400">No data found.</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Pagination -->
      <div class="flex justify-end mt-4 space-x-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
        >
          Prev
        </button>
        <span class="px-3 py-1 dark:text-white">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  definePageMeta({
  middleware: 'auth',
});

  // Simulated data (replace with backend API later)
  const trackerData = ref([
    {
      client: 'Client A',
      creator: 'John Doe',
      amoutht: '10',
      cameramanEditor: 'Jane Smith',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'In Progress',
      videoLink: 'https://example.com/video1',
      adResources: 'Facebook, YouTube',
    },
    {
      client: 'Client B',
      creator: 'Alice',
      amoutht: '8',
      cameramanEditor: 'Bob',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'Completed',
      videoLink: 'https://example.com/video2',
      adResources: 'TikTok, IG Reels',
    },
    {
      client: 'Client A',
      creator: 'John Doe',
      amoutht: '10',
      cameramanEditor: 'Jane Smith',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'In Progress',
      videoLink: 'https://example.com/video1',
      adResources: 'Facebook, YouTube',
    },
    {
      client: 'Client B',
      creator: 'Alice',
      amoutht: '8',
      cameramanEditor: 'Bob',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'Completed',
      videoLink: 'https://example.com/video2',
      adResources: 'TikTok, IG Reels',
    },
    {
      client: 'Client A',
      creator: 'John Doe',
      amoutht: '10',
      cameramanEditor: 'Jane Smith',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'In Progress',
      videoLink: 'https://example.com/video1',
      adResources: 'Facebook, YouTube',
    },
    {
      client: 'Client B',
      creator: 'Alice',
      amoutht: '8',
      cameramanEditor: 'Bob',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'Completed',
      videoLink: 'https://example.com/video2',
      adResources: 'TikTok, IG Reels',
    },
    {
      client: 'Client A',
      creator: 'John Doe',
      amoutht: '10',
      cameramanEditor: 'Jane Smith',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'In Progress',
      videoLink: 'https://example.com/video1',
      adResources: 'Facebook, YouTube',
    },
    {
      client: 'Client B',
      creator: 'Alice',
      amoutht: '8',
      cameramanEditor: 'Bob',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'Completed',
      videoLink: 'https://example.com/video2',
      adResources: 'TikTok, IG Reels',
    },
    {
      client: 'Client A',
      creator: 'John Doe',
      amoutht: '10',
      cameramanEditor: 'Jane Smith',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'In Progress',
      videoLink: 'https://example.com/video1',
      adResources: 'Facebook, YouTube',
    },
    {
      client: 'Client B',
      creator: 'Alice',
      amoutht: '8',
      cameramanEditor: 'Bob',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'Completed',
      videoLink: 'https://example.com/video2',
      adResources: 'TikTok, IG Reels',
    },
    {
      client: 'Client A',
      creator: 'John Doe',
      amoutht: '10',
      cameramanEditor: 'Jane Smith',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'In Progress',
      videoLink: 'https://example.com/video1',
      adResources: 'Facebook, YouTube',
    },
    {
      client: 'Client B',
      creator: 'Alice',
      amoutht: '8',
      cameramanEditor: 'Bob',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'Completed',
      videoLink: 'https://example.com/video2',
      adResources: 'TikTok, IG Reels',
    },
    {
      client: 'Client A',
      creator: 'John Doe',
      amoutht: '10',
      cameramanEditor: 'Jane Smith',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'In Progress',
      videoLink: 'https://example.com/video1',
      adResources: 'Facebook, YouTube',
    },
    {
      client: 'Client B',
      creator: 'Alice',
      amoutht: '8',
      cameramanEditor: 'Bob',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'Completed',
      videoLink: 'https://example.com/video2',
      adResources: 'TikTok, IG Reels',
    },
    {
      client: 'Client A',
      creator: 'John Doe',
      amoutht: '10',
      cameramanEditor: 'Jane Smith',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'In Progress',
      videoLink: 'https://example.com/video1',
      adResources: 'Facebook, YouTube',
    },
    {
      client: 'Client B',
      creator: 'Alice',
      amoutht: '8',
      cameramanEditor: 'Bob',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'Completed',
      videoLink: 'https://example.com/video2',
      adResources: 'TikTok, IG Reels',
    },
    {
      client: 'Client A',
      creator: 'John Doe',
      amoutht: '10',
      cameramanEditor: 'Jane Smith',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'In Progress',
      videoLink: 'https://example.com/video1',
      adResources: 'Facebook, YouTube',
    },
    {
      client: 'Client B',
      creator: 'Alice',
      amoutht: '8',
      cameramanEditor: 'Bob',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'Completed',
      videoLink: 'https://example.com/video2',
      adResources: 'TikTok, IG Reels',
    },
    {
      client: 'Client A',
      creator: 'John Doe',
      amoutht: '10',
      cameramanEditor: 'Jane Smith',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'In Progress',
      videoLink: 'https://example.com/video1',
      adResources: 'Facebook, YouTube',
    },
    {
      client: 'Client B',
      creator: 'Alice',
      amoutht: '8',
      cameramanEditor: 'Bob',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'Completed',
      videoLink: 'https://example.com/video2',
      adResources: 'TikTok, IG Reels',
    },
    {
      client: 'Client A',
      creator: 'John Doe',
      amoutht: '10',
      cameramanEditor: 'Jane Smith',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      status: 'In Progress',
      videoLink: 'https://example.com/video1',
      adResources: 'Facebook, YouTube',
    },
    {
      client: 'Client B',
      creator: 'Alice',
      amoutht: '8',
      cameramanEditor: 'Bob',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'Completed',
      videoLink: 'https://example.com/video2',
      adResources: 'TikTok, IG Reels',
    },

    
    // Add more sample data as needed
  ])
  
  const searchQuery = ref('')
  const currentPage = ref(1)
  const pageSize = 5
  
  const filteredData = computed(() =>
    trackerData.value.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    )
  )
  
  const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize))
  
  const paginatedData = computed(() =>
    filteredData.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
  )
  </script>
  