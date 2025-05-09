<template>
  <div class="container mx-auto px-4 py-8 min-h-screen dark:bg-dark">
    <div class="grid grid-cols-1 gap-8">
      <!-- Page Header -->
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Track Staff Performance</h1>
        <p class="mb-4 text-gray-600 dark:text-gray-300">
          Add and track Facebook video performance for your team members
        </p>
      </div>

      <!-- Facebook Video Form -->
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add Facebook Video Data</h2>
        
        <div class="mb-6">
          <form @submit.prevent="addVideoData" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Facebook Video URL or ID
                </label>
                <input 
                  v-model="videoUrl" 
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="https://www.facebook.com/watch?v=123456789 or 123456789"
                  required
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Creator
                </label>
                <select
                  v-model="selectedCreator"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled>Select a creator</option>
                  <option 
                    v-for="creator in creatorsList" 
                    :key="creator.id" 
                    :value="creator.id"
                  >
                    {{ getUserName(creator.staff) || auth.user?.first_name + ' ' + auth.user?.last_name }}
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Video Title (Optional - will be fetched automatically)
              </label>
              <input 
                v-model="videoTitle" 
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Video title"
              />
            </div>
            <div class="flex items-center space-x-4">
              <button 
                type="submit" 
                class="bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                :disabled="loading || fbLoading"
              >
                <span v-if="loading || fbLoading">
                  <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
                <span v-else>Add Video</span>
              </button>
              <button 
                type="button" 
                @click="fetchFromFacebook"
                class="bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-200"
                :disabled="!isValidVideoInput || fbLoading"
              >
                <span v-if="fbLoading">
                  <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-800 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Fetching...
                </span>
                <span v-else>Fetch Data from Facebook</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Video Data Preview -->
        <div v-if="fbVideoData" class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 class="font-medium text-gray-800 dark:text-white mb-2">Video Data Preview</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-300">Title:</p>
              <p class="font-medium">{{ fbVideoData.title || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-300">Views:</p>
              <p class="font-medium">{{ formatNumber(fbVideoData.views?.toString() || '0') }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-300">Created:</p>
              <p class="font-medium">{{ formatDate(fbVideoData.created_time) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-300">Video ID:</p>
              <p class="font-medium">{{ fbVideoData.id }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Table -->
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left">
          <thead class="text-xs bg-blue-700 text-white">
            <tr>
              <th scope="col" class="py-3 px-4">Name</th>
              <th scope="col" class="py-3 px-4">Position</th>
              <th scope="col" class="py-3 px-4">Department</th>
              <th scope="col" class="py-3 px-4">Targets of views</th>
              <th scope="col" class="py-3 px-4">Status</th>
              <th scope="col" class="py-3 px-4">{{ dateRangeHeader }}</th>
              <th scope="col" class="py-3 px-4">Videos</th>
              <th scope="col" class="py-3 px-4">{{ totalViewsHeader }}</th>
              <th scope="col" class="py-3 px-4">Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(creator, index) in creatorsList" :key="creator.id" 
                :class="index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-blue-100 dark:bg-gray-700'">
              <td class="py-4 px-4">{{ getUserName(creator.staff) || auth.user?.first_name + ' ' + auth.user?.last_name }}</td>
              <td class="py-4 px-4">{{ auth.user?.title || 'N/A' }}</td>
              <td class="py-4 px-4">{{ auth.user?.department?.title || 'N/A' }}</td>
              <td class="py-4 px-4">{{ formatNumber(creator.target) }}</td>
              <td class="py-4 px-4" :class="isCompleted(creator) ? 'text-green-600 font-bold' : ''">
                {{ isCompleted(creator) ? 'Completed' : 'In Progress' }}
              </td>
              <td class="py-4 px-4" :class="index % 2 === 0 ? 'text-pink-600' : 'text-blue-600'">
                {{ getTotalViews(creator.remarks) }}
              </td>
              <td class="py-4 px-4">
                <button @click="handleRemarkClick(creator)" class="text-blue-600 hover:underline">
                  {{ creator.remarks?.length || 0 }} Videos
                </button>
              </td>
              <td class="py-4 px-4">{{ formatTotalViews(getTotalViews(creator.remarks)) }}</td>
              <td class="py-4 px-4 w-32">
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    class="h-2.5 rounded-full" 
                    :class="getProgressBarColor(calculatePercent(creator))"
                    :style="`width: ${Math.min(calculatePercent(creator), 100)}%`"
                  ></div>
                </div>
                <div class="text-xs mt-1" :class="getPercentClass(calculatePercent(creator))">
                  {{ calculatePercent(creator) }}%
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
import type { FacebookVideoData } from '~/types/facebook';

const auth = useAuthStore();
const router = useRouter();
const loading = ref(false);

// Facebook video integration
const { videoData: fbVideoData, loading: fbLoading, error: fbError, fetchVideoData } = useFacebookVideo();
const videoUrl = ref('');
const videoTitle = ref('');
const selectedCreator = ref('');

// Calculate if video URL or ID is valid for fetching
const isValidVideoInput = computed(() => {
  if (!videoUrl.value) return false;
  return true;
});

// Extract video ID from Facebook URL or use direct ID
const extractVideoId = (url: string): string => {
  // Handle direct ID input
  if (/^\d+$/.test(url)) {
    return url;
  }
  
  // Handle various Facebook URL formats
  const patterns = [
    /facebook\.com\/watch\?v=(\d+)/,
    /facebook\.com\/.*\/videos\/(\d+)/,
    /fb\.watch\/(\d+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return '';
};

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

interface IRemark {
  id: number;
  status: string;
  title: string;
  video_link: string;
  view: string | null;
  creators: number;
}

interface ICreator {
  id: number;
  status: string;
  staff: string;
  target: string;
  remarks: IRemark[];
  user_created: {
    id: string;
    first_name: string;
    last_name: string;
    department: string | null;
  };
  note?: string;
}

const creators = ref<ICreator[]>([]);
const staffMembers = ref<Record<string, string>>({});

const creatorsList = computed(() => {
  return creators.value;
});

// Date calculation for KPI period headers
const getKpiDateHeaders = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Previous month (for the range start)
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  // Format month names
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  // For the date range header: 23rd of previous month to 11th of current month
  const dateRangeHeader = `23(${monthNames[prevMonth].substring(0,3)})-11th(${monthNames[currentMonth].substring(0,3)})`;
  
  // For the total views header: "Total Amount Views on 23 Current Month"
  const totalViewsHeader = `Total Amount Views on 23 ${monthNames[currentMonth]}`;
  
  return { dateRangeHeader, totalViewsHeader };
};

const { dateRangeHeader, totalViewsHeader } = getKpiDateHeaders();

// Format date for display
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Function to format large numbers
const formatNumber = (num: string | null): string => {
  if (!num) return '0';
  const value = parseInt(num);
  if (value >= 1000000) {
    return (value / 1000000).toFixed(0) + 'M';
  }
  return value.toLocaleString();
};

// Get formatted name for a staff member
const getUserName = (staffId: string): string => {
  return staffMembers.value[staffId] || 'Unknown';
};

// Calculate total views from remarks
const getTotalViews = (remarks: IRemark[]): string => {
  if (!remarks || remarks.length === 0) return '0';
  
  let total = 0;
  remarks.forEach(remark => {
    if (remark.view) {
      total += parseInt(remark.view);
    }
  });
  
  return total.toString();
};

// Format total views for display
const formatTotalViews = (views: string): string => {
  const viewsNum = parseInt(views);
  if (viewsNum >= 1000000) {
    return (viewsNum / 1000000).toFixed(2) + 'M';
  }
  return viewsNum.toLocaleString();
};

// Check if target is completed
const isCompleted = (creator: ICreator): boolean => {
  if (creator.status === 'completed') return true;
  
  const totalViews = parseInt(getTotalViews(creator.remarks) || '0');
  const target = parseInt(creator.target || '0');
  
  return totalViews >= target;
};

// Calculate percentage of target achieved
const calculatePercent = (creator: ICreator): number => {
  const totalViews = parseInt(getTotalViews(creator.remarks) || '0');
  const target = parseInt(creator.target || '0');
  
  if (target === 0) return 0;
  return Math.round((totalViews / target) * 100);
};

// Function to determine styling for percentage values
const getPercentClass = (percent: number) => {
  if (percent >= 100) return 'text-green-600 font-bold';
  if (percent >= 75) return 'text-blue-600 font-bold';
  return 'text-pink-600 font-bold';
};

// Function to determine progress bar color
const getProgressBarColor = (percent: number) => {
  if (percent >= 100) return 'bg-green-600';
  if (percent >= 75) return 'bg-blue-600';
  return 'bg-pink-600';
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