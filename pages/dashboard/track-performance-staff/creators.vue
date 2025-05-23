<template>
  <div class="min-h-screen  dark:from-gray-900 dark:to-indigo-950 py-10">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="grid grid-cols-1 gap-8">
        <!-- Facebook Video Form -->
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-indigo-100 dark:border-indigo-900">
          <div class="flex items-center mb-6">
            <div class="mr-3 bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
              <Icon icon="basil:add-solid" class="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
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
                    <Icon icon="logos:facebook" class="h-5 w-5 text-gray-400" />
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
                class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center shadow-md hover:shadow-lg"
                :disabled="loading || fbLoading">
                <span v-if="loading || fbLoading" class="flex items-center">
                  <Icon icon="basil:add-solid" class="h-6 w-6 text-white dark:text-indigo-400" />
                  Processing...
                </span>
                <span v-else class="flex items-center">
                  <Icon icon="basil:add-solid" class="h-6 w-6 text-white dark:text-indigo-400" />
                  Add Video
                </span>
              </button>

              <button type="button" @click="fetchFromFacebook"
                class="w-full sm:w-auto bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-300 px-6 py-3 rounded-lg transition-all flex items-center justify-center shadow-sm hover:shadow-md"
                :disabled="!videoUrl">
                <span v-if="fbLoading" class="flex items-center">
                  <Icon icon="line-md:download-loop" class="h-5 w-5 mr-2" />
                  Fetching...
                </span>
                <span v-else class="flex items-center">
                  <Icon icon="line-md:download-loop" class="h-5 w-5 mr-2" />
                  Fetch Data
                </span>
              </button>
            </div>
          </form>

          <!-- Video Data Preview -->
          <div v-if="fbVideoData"
            class="mt-6 bg-indigo-50 dark:bg-indigo-900/30 p-5 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="font-medium text-gray-800 dark:text-white">Video Data Preview</h3>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p class="text-xs text-indigo-600 dark:text-indigo-400 uppercase font-semibold">Title</p>
                <p class="font-medium text-gray-800 dark:text-white truncate">{{ fbVideoData.title || 'N/A' }}</p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p class="text-xs text-indigo-600 dark:text-indigo-400 uppercase font-semibold">Views</p>
                <p class="font-medium text-gray-800 dark:text-white">{{ formatNumber(fbVideoData.views?.toString() ||
                  '0') }}</p>
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 border-l-4 border-indigo-500">
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Videos</p>
            <div class="flex items-center mt-2">
              <Icon icon="fluent-color:video-16" class="h-8 w-8 text-indigo-500 mr-3" />
              <span class="text-2xl font-bold text-gray-800 dark:text-white">{{ getTotalVideosCount(creators) }}</span>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 border-l-4 border-emerald-500">
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Views</p>
            <div class="flex items-center mt-2">
              <Icon icon="icon-park:preview-open" class="h-8 w-8 text-emerald-500 mr-3" />
              <span class="text-2xl font-bold text-gray-800 dark:text-white">{{
                formatNumber(getTotalViewsAcrossAll(creators)) }}</span>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 border-l-4 border-rose-500">
            <p class="text-sm text-gray-500 dark:text-gray-400">Completed Targets</p>
            <div class="flex items-center mt-2">
              <Icon icon="fluent-mdl2:completed" class="h-8 w-8 text-rose-500 mr-3" />
              <span class="text-2xl font-bold text-gray-800 dark:text-white">{{ getCompletedTargetsCount(creators)
              }}</span>
            </div>
          </div>
        </div>

        <!-- Performance Table -->
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div class="p-5 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Staff Performance</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Track video engagement metrics for each team member</p>
          </div>
          <!-- Add this button after the Performance Summary Cards section -->
          <div class="flex justify-end space-x-2 mb-4 mt-2">
            <button @click="refreshAllVideos"
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-3 rounded-lg transition-all flex items-center justify-center shadow-md hover:shadow-lg"
              :disabled="globalRefreshLoading">
              <span v-if="globalRefreshLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                Refreshing All Videos...
              </span>
              <span v-else class="flex items-center">
                <Icon icon="ion:refresh-circle" class="h-5 w-5 mr-2" />
                Reload views
              </span>
            </button>
            <div class="relative">
              <button @click="isExportDropdownOpen = !isExportDropdownOpen"
                class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-3 rounded-lg transition-all flex items-center justify-center shadow-md hover:shadow-lg">
                <span class="flex items-center">
                  <Icon icon="material-symbols:download" class="h-5 w-5 mr-2" />
                  Export Data
                  <Icon icon="material-symbols:arrow-drop-down" class="h-5 w-5 ml-1" />
                </span>
              </button>

              <!-- Dropdown Menu -->
              <div v-if="isExportDropdownOpen"
                class="absolute right-0 mt-2  w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <button @click="exportToCSV(); isExportDropdownOpen = false"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span class="flex items-center">
                      <Icon icon="mdi:file-delimited-outline" class="h-5 w-5 mr-2" />
                      Export Summary CSV
                    </span>
                  </button>
                  <button @click="exportDetailedCSV(); isExportDropdownOpen = false"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span class="flex items-center">
                      <Icon icon="mdi:file-delimited-outline" class="h-5 w-5 mr-2" />
                      Export Detailed CSV
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead
                class="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">
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
                  <td class="py-4 px-6 text-gray-600 dark:text-gray-300">{{creator.user_created?.title || 'N/A' }}</td>
                  <td class="py-4 px-6 text-gray-600 dark:text-gray-300">{{creator.user_created?.department?.title || 'N/A' }}
                  </td>
                  <td class="py-4 px-6 font-medium">{{ formatNumber(creator.target) }}</td>
                  <td class="py-4 px-6">
                    <span v-if="isCompleted(creator)"
                      class="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
                      Completed
                    </span>
                    <span v-else
                      class="px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-full text-xs font-medium">
                      In Progress
                    </span>
                  </td>
                  <td class="py-4 px-6 font-medium"
                    :class="index % 2 === 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-rose-600 dark:text-rose-400'">
                    {{ getTotalViews(creator.remarks) }}
                  </td>
                  <td class="py-4 px-6">
                    <button @click="handleRemarkClick(creator)" class="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50
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
                      <div class="whitespace-nowrap text-xs font-medium"
                        :class="getPercentClass(calculatePercent(creator))">
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
const globalRefreshLoading = ref(false);

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

    // Check if the video already exists
    const checkExisting = await useApi(`/items/remark_link?filter[video_link][_eq]=https://www.facebook.com/watch?v=${videoId}`, {
      method: 'GET'
    }) as IResponse<any>;

    if (checkExisting.data && checkExisting.data.length > 0) {
      Swal.fire({
        title: 'Duplicate Video',
        text: 'This video has already been uploaded.',
        icon: 'warning'
      });
      loading.value = false;
      return;
    }

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



// Fetch creators data
const fetchCreators = async () => {
  loading.value = true;
  try {
    // Fetch creators data 
    const response = await useApi('/items/creators?fields=*,remarks.*,user_created.*,user_created.department.title', {
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
// Function to update a video record
const updateVideo = async (remarkId: string, data: {
  title?: string,
  video_link?: string,
  view?: string,
  status?: string
}) => {
  try {
    loading.value = true;

    // If video link was updated, extract the new video ID
    if (data.video_link) {
      const videoId = extractVideoId(data.video_link);
      if (!videoId) {
        Swal.fire({
          title: 'Invalid URL',
          text: 'Could not extract a valid Facebook video ID from the provided URL',
          icon: 'error'
        });
        loading.value = false;
        return false;
      }

      // Format the link to ensure consistency
      data.video_link = buildFacebookVideoUrl(videoId);

      // If no view count is provided, try to fetch from Facebook
      if (!data.view) {
        await fetchVideoData(videoId);
        if (fbVideoData.value && fbVideoData.value.views) {
          data.view = fbVideoData.value.views.toString();
        }
      }
    }

    // Update the record
    const response = await useApi(`/items/remark_link/${remarkId}`, {
      method: 'PATCH',
      data: data
    });

    Swal.fire({
      title: 'Success',
      text: 'Video data has been updated successfully',
      icon: 'success'
    });

    // Refresh creator data
    await fetchCreators();
    return true;
  } catch (error: any) {
    console.error('Failed to update video data:', error);
    Swal.fire({
      title: 'Error',
      text: error?.data?.message || 'Failed to update video data',
      icon: 'error'
    });
    return false;
  } finally {
    loading.value = false;
  }
};

// Function to delete a video record
const deleteVideo = async (remarkId: string, creatorName: string, videoTitle: string) => {
  try {
    // Ask for confirmation before deleting
    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `You are about to delete the video:<br><strong>${videoTitle}</strong><br>from <strong>${creatorName}</strong>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      loading.value = true;

      // Delete the record
      await useApi(`/items/remark_link/${remarkId}`, {
        method: 'DELETE'
      });

      Swal.fire({
        title: 'Deleted!',
        text: 'The video has been removed successfully.',
        icon: 'success'
      });

      // Refresh creator data
      await fetchCreators();
      return true;
    }
    return false;
  } catch (error: any) {
    console.error('Failed to delete video:', error);
    Swal.fire({
      title: 'Error',
      text: error?.data?.message || 'Failed to delete the video',
      icon: 'error'
    });
    return false;
  } finally {
    loading.value = false;
  }
};

// Function to open edit modal for a video
const editVideo = async (remark: any) => {
  // Create a copy of the data to edit
  const editData = {
    title: remark.title,
    video_link: remark.video_link,
    view: remark.view,
    status: remark.status
  };

  const { value: formValues } = await Swal.fire({
    title: 'Edit Video Data',
    html: `
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
        <input id="swal-title" class="w-full p-2 border rounded" value="${remark.title || ''}">
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Facebook Video URL</label>
        <input id="swal-url" class="w-full p-2 border rounded" readonly value="${remark.video_link || ''}">
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">View Count</label>
        <input id="swal-views" class="w-full p-2 border rounded"  disabled value="${remark.view || '0'}">
      </div>
     
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Update',
    preConfirm: () => {
      return {
        title: (document.getElementById('swal-title') as HTMLInputElement).value,
        video_link: (document.getElementById('swal-url') as HTMLInputElement).value,
        view: (document.getElementById('swal-views') as HTMLInputElement).value,
        status: (document.getElementById('swal-status') as HTMLSelectElement).value
      };
    }
  });
  //  <div class="mb-4">
  //         <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
  //         <select id="swal-status" class="w-full p-2 border rounded">
  //           <option value="active" ${remark.status === 'active' ? 'selected' : ''}>Active</option>
  //           <option value="inactive" ${remark.status === 'inactive' ? 'selected' : ''}>Inactive</option>
  //         </select>
  //       </div>
  if (formValues) {
    return await updateVideo(remark.id, formValues);
  }

  return false;
};

// Update handleRemarkClick function to include edit and delete options
const handleRemarkClick = (creator: ICreator) => {
  if (!creator.remarks || creator.remarks.length === 0) {
    Swal.fire({
      title: 'No Videos',
      text: 'No video data available for this creator',
      icon: 'info'
    });
    return;
  }

  const creatorName = getUserName(creator.staff) || (auth.user?.first_name + ' ' + auth.user?.last_name);

  // <!-- Modify the handleRemarkClick function's HTML output to include a refresh button -->
  const remarksList = creator.remarks.map(r =>
    `<div class="mb-4 p-3 border-b">
    <div class="md:flex justify-between items-start">
      <div>
        <p class="font-bold">${r.title}</p>
        <p class="text-sm break-words">
          <a href="${r.video_link}" target="_blank" class="text-blue-600 hover:underline">${r.video_link}</a>
        </p>
        <p class="mt-2"><b>Views:</b> ${formatNumber(r.view)}</p>
        <p class="text-xs mt-1"><b>Status:</b> 
          <span class="${r.status === 'active' ? 'text-green-600' : 'text-red-600'}">${r.status}</span>
        </p>
      </div>
      <div class="flex flex-col space-y-2">
        <button onclick="window.editRemark('${r.id}')" class="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
          Edit
        </button>
        <button onclick="window.deleteRemark('${r.id}', '${creatorName}', '${r.title.replace(/'/g, "\\'")}')" 
          class="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">
          Delete
        </button> 
      </div>
    </div>
  </div>`
  ).join('');
  // Create global handlers for the edit and delete buttons
  window.editRemark = async (remarkId: string) => {
    const remark = creator.remarks?.find(r => r.id.toString() === remarkId);
    if (remark) {
      Swal.close();
      await editVideo(remark);
      // Re-open the modal after edit
      handleRemarkClick(creator);
    }
  };

  window.deleteRemark = async (remarkId: string, creatorName: string, videoTitle: string) => {
    Swal.close();
    await deleteVideo(remarkId, creatorName, videoTitle);
    // Re-open the modal after deletion if there are still videos
    await fetchCreators();
    const updatedCreator = creators.value.find(c => c.id === creator.id);
    if (updatedCreator && updatedCreator.remarks && updatedCreator.remarks.length > 0) {
      handleRemarkClick(updatedCreator);
    }
  };

  Swal.fire({
    title: `Videos for ${creatorName}`,
    html: remarksList,
    width: '900px',
    showConfirmButton: false,
    showCloseButton: true
  });
};

// Add to the top of your script to declare the global types
declare global {
  interface Window {
    editRemark: (remarkId: string) => Promise<void>;
    deleteRemark: (remarkId: string, creatorName: string, videoTitle: string) => Promise<void>;
    refreshViewCount: (remarkId: string) => Promise<void>;
  }
}


// Function to handle form submission

// Function to refresh all videos for all creators
const refreshAllVideos = async () => {
  try {
    globalRefreshLoading.value = true;

    // Show loading toast
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 0,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    toast.fire({
      icon: 'info',
      title: 'Refreshing all video view counts...'
    });

    // Collect all remarks from all creators
    const allRemarks = [];
    for (const creator of creators.value) {
      if (creator.remarks && creator.remarks.length > 0) {
        allRemarks.push(...creator.remarks);
      }
    }

    if (allRemarks.length === 0) {
      Swal.fire({
        title: 'No Videos',
        text: 'No video data available to refresh',
        icon: 'info'
      });
      return;
    }

    // Track progress
    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;
    const totalCount = allRemarks.length;

    // Update status message
    const updateStatus = (current: number, total: number) => {
      toast.update({
        title: `Refreshing videos (${current}/${total})...`,
        html: `<div class="text-xs mt-1">
                 Success: ${successCount} | Errors: ${errorCount} | Skipped: ${skippedCount}
               </div>`
      });
    };

    // Process each remark sequentially to avoid API rate limits
    for (let i = 0; i < allRemarks.length; i++) {
      const remark = allRemarks[i];
      updateStatus(i + 1, totalCount);

      // Extract the video ID from the link
      const videoId = extractVideoId(remark.video_link);
      if (!videoId) {
        console.warn(`Invalid URL for video: ${remark.title}`);
        skippedCount++;
        continue;
      }

      try {
        // Fetch the latest video data from Facebook
        await fetchVideoData(videoId);

        if (fbError.value || !fbVideoData.value || !fbVideoData.value.views) {
          console.warn(`Couldn't get view count for: ${remark.title}`);
          errorCount++;
          continue;
        }

        const oldViewCount = parseInt(remark.view ?? '') || 0;
        const newViewCount = parseInt(fbVideoData.value.views.toString()) || 0;

        // Only update if the view count has changed
        if (newViewCount !== oldViewCount) {
          // Update the record with the new view count
          await useApi(`/items/remark_link/${remark.id}`, {
            method: 'PATCH',
            data: { view: newViewCount.toString() }
          });
          successCount++;
        } else {
          skippedCount++;
        }

        // Small delay to prevent API throttling
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`Error refreshing view count for ${remark.title}:`, error);
        errorCount++;
      }
    }

    // Refresh creator data to reflect the changes
    await fetchCreators();

    // Show completion message
    Swal.fire({
      title: 'Refresh Complete',
      html: `<div class="space-y-2">
              <p>Processed ${totalCount} videos:</p>
              <div class="flex justify-between px-4">
                <span class="text-green-600">Updated: ${successCount}</span>
                <span class="text-yellow-600">Skipped: ${skippedCount}</span>
                <span class="text-red-600">Errors: ${errorCount}</span>
              </div>
            </div>`,
      icon: 'success'
    });

  } catch (error: any) {
    console.error('Failed to refresh videos:', error);
    Swal.fire({
      title: 'Error',
      text: error?.data?.message || 'Failed to refresh videos',
      icon: 'error'
    });
  } finally {
    globalRefreshLoading.value = false;
  }
};


import { saveAs } from 'file-saver';
import Papa from 'papaparse';
// Add these imports to your setup script if not already there
import { onUnmounted } from 'vue';

// Add these to your existing ref declarations
const isExportDropdownOpen = ref(false);

// Add this function to handle clicking outside the dropdown
const closeDropdowns = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (isExportDropdownOpen.value && !target.closest('.relative')) {
    isExportDropdownOpen.value = false;
  }
};

// Add these lifecycle hooks to handle clicks outside the dropdown
onMounted(() => {
  document.addEventListener('click', closeDropdowns);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns);
});
/**
 * Generates and downloads a CSV file with creator performance data
 */
const exportToCSV = () => {
  if (!creatorsList.value || creatorsList.value.length === 0) {
    Swal.fire({
      title: 'No Data',
      text: 'There is no data available to export',
      icon: 'warning'
    });
    return;
  }

  // Create CSV data structure
  const csvData = creatorsList.value.map(creator => {
    // Get the staff member name
    const name = getUserName(creator.staff) || (auth.user?.first_name + ' ' + auth.user?.last_name);

    // Get their position and department
    const position = auth.user?.title || 'N/A';
    const department = auth.user?.department?.title || 'N/A';

    // Get their view target and status
    const viewTarget = creator.target || 0;
    const status = isCompleted(creator) ? 'Completed' : 'In Progress';

    // Get number of videos and total views
    const numVideos = creator.remarks?.length || 0;
    const totalViews = getTotalViews(creator.remarks);

    // Get all video links as a single string (comma separated)
    const videoLinks = creator.remarks?.map(r => r.video_link).join(', ') || '';

    return {
      Name: name,
      Position: position,
      Department: department,
      "View Target": viewTarget,
      Status: status,
      "Number of Videos": numVideos,
      "Total Views": totalViews,
      "Video Links": videoLinks
    };
  });

  // Convert to CSV format
  const csv = Papa.unparse(csvData);

  // Create a Blob and download the file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `video-performance-${new Date().toISOString().slice(0, 10)}.csv`);

  Swal.fire({
    title: 'Success',
    text: 'CSV file has been generated and downloaded',
    icon: 'success',
    timer: 2000,
    showConfirmButton: false
  });
};

// For more detailed CSV that includes individual video data
const exportDetailedCSV = () => {
  if (!creatorsList.value || creatorsList.value.length === 0) {
    Swal.fire({
      title: 'No Data',
      text: 'There is no data available to export',
      icon: 'warning'
    });
    return;
  }

  // Create a more detailed CSV with one row per video
  const detailedData: any[] = [];

  creatorsList.value.forEach(creator => {
    const name = getUserName(creator.staff) || (auth.user?.first_name + ' ' + auth.user?.last_name);
    const position = auth.user?.title || 'N/A';
    const department = auth.user?.department?.title || 'N/A';
    const viewTarget = creator.target || 0;
    const status = isCompleted(creator) ? 'Completed' : 'In Progress';
    const totalViews = getTotalViews(creator.remarks);

    // If creator has no videos, add a single row
    if (!creator.remarks || creator.remarks.length === 0) {
      detailedData.push({
        Name: name,
        Position: position,
        Department: department,
        "View Target": viewTarget,
        Status: status,
        "Video Title": "N/A",
        "Video Link": "N/A",
        "Views": 0,
        "Total Views": totalViews
      });
    } else {
      // Add one row per video
      creator.remarks.forEach(video => {
        detailedData.push({
          Name: name,
          Position: position,
          Department: department,
          "View Target": viewTarget,
          Status: status,
          "Video Title": video.title || "Untitled",
          "Video Link": video.video_link || "N/A",
          "Views": formatNumber(video.view) || 0,
          "Total Views": totalViews
        });
      });
    }
  });

  // Convert to CSV format
  const csv = Papa.unparse(detailedData);

  // Create a Blob and download the file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `detailed-video-performance-${new Date().toISOString().slice(0, 10)}.csv`);

  Swal.fire({
    title: 'Success',
    text: 'Detailed CSV file has been generated and downloaded',
    icon: 'success',
    timer: 2000,
    showConfirmButton: false
  });
};

definePageMeta({
 middleware: ['auth', 'role'],
});

onMounted(async () => {
  await fetchCreators();
});
</script>