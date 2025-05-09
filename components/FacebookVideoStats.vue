<template>
    <div class="bg-white container mx-auto dark:bg-dark rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">{{ videoData?.title || 'Video Statistics' }}</h2>
        <button 
          @click="refreshData" 
          class="text-blue-600 hover:text-blue-800"
          :disabled="loading"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded mb-4">
        {{ error }}
      </div>
      
      <div v-if="videoData" class="grid grid-cols-2  gap-4">
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-blue-700">{{ formatNumber(videoData.views) }}</div>
          <div class="text-sm text-gray-600">Views</div>
        </div>
        <div class="bg-green-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-green-700">{{ formatNumber(videoData.post_views) }}</div>
          <div class="text-sm text-gray-600">Post Views</div>
        </div>
        <div class="bg-yellow-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-yellow-700">{{ videoData.post_id }}</div>
          <div class="text-sm text-gray-600">Post ID</div>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-purple-700">{{ formatDate(videoData.created_time) }}</div>
          <div class="text-sm text-gray-600">Posted</div>
        </div>
      </div>
      
      <div v-if="!videoData && !loading && !error" class="text-center py-8 text-gray-500">
        Enter a Facebook video ID to see statistics
      </div>
      
      <div v-if="loading" class="flex justify-center py-8">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
      </div>
      
      <div class="mt-6">
        <label for="videoId" class="block mb-2 text-sm font-medium text-gray-900">Facebook Video ID</label>
        <div class="flex">
          <input 
            type="text" 
            id="videoId" 
            v-model="videoIdInput" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Enter Facebook video ID"
          >
          <button 
            @click="fetchData" 
            class="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            :disabled="loading"
          >
            Fetch
          </button>
        </div>
      </div>
    </div>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useFacebookVideo } from '~/composables/useFacebookVideo';
  import type { FacebookVideoData } from '~/types/facebook';
  
  const props = defineProps({
    initialVideoId: {
      type: String,
      default: ''
    }
  });
  
  const { videoData, loading, error, fetchVideoData } = useFacebookVideo();
  const videoIdInput = ref(props.initialVideoId);
  
  const fetchData = () => {
    if (videoIdInput.value.trim()) {
      fetchVideoData(videoIdInput.value.trim());
    } else {
      error.value = 'Video ID is required';
    }
  };
  
  const refreshData = () => {
    if (videoIdInput.value.trim()) {
      fetchVideoData(videoIdInput.value.trim());
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const formatNumber = (num: number | undefined) => {
    if (num === undefined) return 'N/A';
    return num.toLocaleString();
  };
  
  // Fetch initial data if video ID is provided
  if (props.initialVideoId) {
    fetchVideoData(props.initialVideoId);
  }
  </script>