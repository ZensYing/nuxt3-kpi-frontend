<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 py-10">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="grid grid-cols-1 gap-8">
        <!-- Facebook Video Form -->
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-indigo-100 dark:border-indigo-900">
          <div class="flex items-center mb-6">
            <div class="mr-3 bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Add Facebook Video</h2>
          </div>

          <form @submit.prevent="addVideoData" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Facebook Video URL or ID
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
                    </svg>
                  </div>
                  <input v-model="videoUrl" type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-3"
                    placeholder="https://www.facebook.com/watch?v=123456789" required />
                </div>
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Creator
                </label>
                <select v-model="selectedCreator"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3"
                  required>
                  <option value="" disabled selected>Select a creator</option>
                  <option v-for="creator in creatorsList" :key="creator.id" :value="creator.id">
                    {{ getUserName(creator.staff) || (auth.user?.first_name + ' ' + auth.user?.last_name) }}
                  </option>
                </select>
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Video Title (Optional)
              </label>
              <input v-model="videoTitle" type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3"
                placeholder="Video title will be fetched automatically if left blank" />
            </div>
            
            <div class="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button type="submit"
                class="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center shadow-md hover:shadow-lg"
                :disabled="loading || fbLoading">
                <span v-if="loading || fbLoading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Processing...
                </span>
                <span v-else class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Video
                </span>
              </button>
              
              <button type="button" @click="fetchFromFacebook"
                class="w-full sm:w-auto bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-300 px-6 py-3 rounded-lg transition-all flex items-center justify-center shadow-sm hover:shadow-md"
                :disabled="!videoUrl">
                <span v-if="fbLoading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Fetching...
                </span>
                <span v-else class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Fetch Data
                </span>
              </button>
            </div>
          </form>

          <!-- Video Data Preview -->
          <div v-if="fbVideoData" class="mt-6 bg-indigo-50 dark:bg-indigo-900/30 p-5 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <div class="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="font-medium text-gray-800 dark:text-white">Video Data Preview</h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p class="text-xs text-indigo-600 dark:text-indigo-400 uppercase font-semibold">Title</p>
                <p class="font-medium text-gray-800 dark:text-white truncate">{{ fbVideoData.title || 'N/A' }}</p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p class="text-xs text-indigo-600 dark:text-indigo-400 uppercase font-semibold">Views</p>
                <p class="font-medium text-gray-800 dark:text-white">{{ formatNumber(fbVideoData.views?.toString() || '0') }}</p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p class="text-xs text-indigo-600 dark:text-indigo-400 uppercase font-semibold">Created</p>
                <p class="font-medium text-gray-800 dark:text-white">{{ formatDate(fbVideoData.created_time) }}</p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p class="text-xs text-indigo-600 dark:text-indigo-400 uppercase font-semibold">Video ID</p>
                <p class="font-medium text-gray-800 dark:text-white">{{ fbVideoData.id }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 border-l-4 border-indigo-500">
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Videos</p>
            <div class="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span class="text-2xl font-bold text-gray-800 dark:text-white">{{ getTotalVideosCount(creators) }}</span>
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 border-l-4 border-emerald-500">
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Views</p>
            <div class="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span class="text-2xl font-bold text-gray-800 dark:text-white">{{ formatNumber(getTotalViewsAcrossAll(creators)) }}</span>
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 border-l-4 border-amber-500">
            <p class="text-sm text-gray-500 dark:text-gray-400">Active Creators</p>
            <div class="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-amber-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span class="text-2xl font-bold text-gray-800 dark:text-white">{{ getActiveCreatorsCount(creators) }}</span>
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 border-l-4 border-rose-500">
            <p class="text-sm text-gray-500 dark:text-gray-400">Completed Targets</p>
            <div class="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-rose-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-2xl font-bold text-gray-800 dark:text-white">{{ getCompletedTargetsCount(creators) }}</span>
            </div>
          </div>
        </div>

        <!-- Performance Table -->
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div class="p-5 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Staff Performance</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Track video engagement metrics for each team member</p>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">
                <tr>
                  <th scope="col" class="py-4 px-6">Name</th>
                  <th scope="col" class="py-4 px-6">Position</th>
                  <th scope="col" class="py-4 px-6">Department</th>
                  <th scope="col" class="py-4 px-6">View Target</th>
                  <th scope="col" class="py-4 px-6">Status</th>
                  <th scope="col" class="py-4 px-6">{{ dateRangeHeader }}</th>
                  <th scope="col" class="py-4 px-6">Videos</th>
                  <th scope="col" class="py-4 px-6">{{ totalViewsHeader }}</th>
                  <th scope="col" class="py-4 px-6">Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(creator, index) in creatorsList" :key="creator.id"
                  class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td class="py-4 px-6 font-medium text-gray-800 dark:text-white">
                    {{ getUserName(creator.staff) || (auth.user?.first_name + ' ' + auth.user?.last_name) }}
                  </td>
                  <td class="py-4 px-6 text-gray-600 dark:text-gray-300">{{ auth.user?.title || 'N/A' }}</td>
                  <td class="py-4 px-6 text-gray-600 dark:text-gray-300">{{ auth.user?.department?.title || 'N/A' }}</td>
                  <td class="py-4 px-6 font-medium">{{ formatNumber(creator.target) }}</td>
                  <td class="py-4 px-6">
                    <span v-if="isCompleted(creator)" class="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
                      Completed
                    </span>
                    <span v-else class="px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-full text-xs font-medium">
                      In Progress
                    </span>
                  </td>
                  <td class="py-4 px-6 font-medium" :class="index % 2 === 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-rose-600 dark:text-rose-400'">
                    {{ getTotalViews(creator.remarks) }}
                  </td>
                  <td class="py-4 px-6">
                    <button @click="handleRemarkClick(creator)" 
                      class="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50
                      text-indigo-600 dark:text-indigo-400 rounded-full transition-colors">
                      {{ creator.remarks?.length || 0 }} Videos
                    </button>
                  </td>
                  <td class="py-4 px-6 font-medium">{{ formatTotalViews(getTotalViews(creator.remarks)) }}</td>
                  <td class="py-4 px-6 w-40">
                    <div class="flex items-center">
                      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                        <div class="h-2.5 rounded-full" :class="getProgressBarColor(calculatePercent(creator))"
                          :style="`width: ${Math.min(calculatePercent(creator), 100)}%`"></div>
                      </div>
                      <div class="whitespace-nowrap text-xs font-medium" :class="getPercentClass(calculatePercent(creator))">
                        {{ calculatePercent(creator) }}%
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { useAuthStore } from '~/store/useAuthStore';
import { useFacebookVideo } from '~/composables/useFacebookVideo';
import type { IResponse } from '~/types/api';
import { 
  getTotalViews, 
  isCompleted, 
  calculatePercent, 
  getPercentClass, 
  getProgressBarColor,
  getCompletedTargetsCount,
  getActiveCreatorsCount,
  getTotalViewsAcrossAll,
  getTotalVideosCount
} from '~/utils/creators';

// Import utility functions
import { extractVideoId, isValidVideoInput, buildFacebookVideoUrl } from '~/utils/facebook';
import { formatDate, formatNumber, formatTotalViews, getKpiDateHeaders } from '~/utils/format';

const auth = useAuthStore();
const router = useRouter();
const loading = ref(false);

// Facebook video integration
const { videoData: fbVideoData, loading: fbLoading, error: fbError, fetchVideoData } = useFacebookVideo();
const videoUrl = ref('');
const videoTitle = ref('');
const selectedCreator = ref('');

// Fetch video data from Facebook
const fetchFromFacebook = async () => {
  const videoId = extractVideoId(videoUrl.value);
  if (!videoId) {
    Swal.fire({
      title: 'Invalid URL',
      text: 'Could not extract a valid Facebook video ID from the provided URL',
      icon: 'error'
    });
    return;
  }

  await fetchVideoData(videoId);

  if (fbVideoData.value && fbVideoData.value.title) {
    videoTitle.value = fbVideoData.value.title;
  }

  if (fbError.value) {
    Swal.fire({
      title: 'Error',
      text: fbError.value,
      icon: 'error'
    });
  }
};

// Add video data to the system
const addVideoData = async () => {
  if (!selectedCreator.value) {
    Swal.fire({
      title: 'Missing Information',
      text: 'Please select a creator',
      icon: 'warning'
    });
    return;
  }

  const videoId = extractVideoId(videoUrl.value);
  if (!videoId) {
    Swal.fire({
      title: 'Invalid URL',
      text: 'Could not extract a valid Facebook video ID from the provided URL',
      icon: 'error'
    });
    return;
  }

  loading.value = true;

  // If we haven't fetched data yet, do it now
  if (!fbVideoData.value) {
    await fetchVideoData(videoId);
    if (fbError.value) {
      loading.value = false;
      Swal.fire({
        title: 'Error',
        text: fbError.value,
        icon: 'error'
      });
      return;
    }
  }

  try {
    // Create a new remark with the Facebook data
    const remarkData = {
      title: videoTitle.value || fbVideoData.value?.title || 'Facebook Video',
      video_link: `https://www.facebook.com/watch?v=${videoId}`,
      view: fbVideoData.value?.views?.toString() || '0',
      status: 'active',
      creators: parseInt(selectedCreator.value)
    };

    // Save the remark
    const response = await useApi('/items/remark_link', {
      method: 'POST',
      data: remarkData
    });

    Swal.fire({
      title: 'Success',
      text: 'Video data has been added successfully',
      icon: 'success'
    });

    // Reset form
    videoUrl.value = '';
    videoTitle.value = '';
    fbVideoData.value = null;

    // Refresh creator data
    await fetchCreators();

  } catch (error: any) {
    console.error('Failed to save video data:', error);
    Swal.fire({
      title: 'Error',
      text: error?.data?.message || 'Failed to save video data',
      icon: 'error'
    });
  } finally {
    loading.value = false;
  }
};

const creators = ref<ICreator[]>([]);
const staffMembers = ref<Record<string, string>>({});

const creatorsList = computed(() => {
  return creators.value;
});

const { dateRangeHeader, totalViewsHeader } = getKpiDateHeaders();

// Get formatted name for a staff member
const getUserName = (staffId: string): string => {
  return staffMembers.value[staffId] || 'Unknown';
};

// Handle remark click
const handleRemarkClick = (creator: ICreator) => {
  if (!creator.remarks || creator.remarks.length === 0) {
    Swal.fire({
      title: 'No Videos',
      text: 'No video data available for this creator',
      icon: 'info'
    });
    return;
  }

  const remarksList = creator.remarks.map(r =>
    `<div class="mb-4 p-3 border-b">
      <p class="font-bold">${r.title}</p>
      <p class="text-sm break-words"><a href="${r.video_link}" target="_blank" class="text-blue-600 hover:underline">${r.video_link}</a></p>
      <p class="text-right mt-2"><b>Views:</b> ${formatNumber(r.view)}</p>
    </div>`
  ).join('');

  Swal.fire({
    title: `Videos for ${getUserName(creator.staff) || auth.user?.first_name + ' ' + auth.user?.last_name}`,
    html: remarksList,
    width: '600px',
    confirmButtonText: 'Close'
  });
};

// Fetch creators data
const fetchCreators = async () => {
  loading.value = true;
  try {
    // Fetch creators data
    const response = await useApi('/items/creators?fields=*,remarks.*,user_created.*', {
      method: 'GET'
    }) as IResponse<ICreator[]>;

    creators.value = response.data;

    // Get staff members info for display names
    try {
      const staffResponse = await useApi('/users', { method: 'GET' });
      const staffData = (staffResponse as IResponse<any>).data;

      staffData.forEach((staff: any) => {
        staffMembers.value[staff.id] = `${staff.first_name} ${staff.last_name}`;
      });
    } catch (err) {
      console.warn('Could not fetch staff names:', err);
    }

  } catch (error) {
    console.error('Failed to fetch creators:', error);
    Swal.fire({
      title: 'Error',
      text: 'Failed to load creator data',
      icon: 'error'
    });
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  middleware: 'auth',
});

onMounted(async () => {
  await fetchCreators();
});
</script>