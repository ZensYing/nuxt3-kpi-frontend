<template>
  <div class=" mx-auto px-4  min-h-screen bg-gray-50 dark:bg-gray-900" v-motion-fade-visible-once data-aos="fade-down">
    <div class="flex items-center justify-start mt-2 mb-2">
      <NuxtLink to="/dashboard/monthly-ads-video-tracker/view" class="mr-4">
        <button type="button" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg 
                   ">
          <Icon icon="mdi:eye" class="inline-block mr-2" />
          view Video Ads Tracker
        </button>
      </NuxtLink>
    </div>
    <form @submit.prevent="submitVideoAdsTracker"
      class="bg-white dark:bg-gray-800  rounded-lg px-8 pt-6 pb-8 mb-4 border-2 border-red-500 border-dashed dark:border-gray-700">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Monthly Video Ads Tracker
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Client Input (Clinent) -->
        <div class="relative">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="client">
            <Icon icon="mdi:account" class="inline-block mr-2 text-blue-500" />
            Client
          </label>
          <div class="relative">
            <input id="client" v-model="formData.client" type="text" placeholder="Enter Client Name" class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none 
                       text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 transition duration-300"
              required />
            <Icon icon="mdi:account-circle" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <!-- Creator Input -->
        <div class="relative">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="creator">
            <Icon icon="mdi:account-edit" class="inline-block mr-2 text-purple-500" />
            Creator
          </label>
          <div class="relative">
            <input id="creator" v-model="formData.creator" type="text" placeholder="Enter Creator Name" class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none 
                       text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 transition duration-300"
              required />
            <Icon icon="mdi:pencil" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <!-- Amount to be done/month Input -->
        <div class="relative">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="creator">
            <Icon icon="mdi:calendar-start" class="inline-block mr-2 text-teal-500" />

            Amount to be done/month
          </label>
          <div class="relative">
            <input id="amoutht" v-model="formData.amoutht" type="text" placeholder="Enter amoutht Name" class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none 
                       text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 transition duration-300"
              required />
            <Icon icon="mdi:calendar" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>


        <!-- Cameraman & Editor Input -->
        <div class="relative">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="cameramanEditor">
            <Icon icon="mdi:camera" class="inline-block mr-2 text-red-500" />
            Cameraman & Editor
          </label>
          <div class="relative">
            <input id="cameramanEditor" v-model="formData.cameramanEditor" type="text"
              placeholder="Enter Cameraman & Editor" class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none 
                       text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 transition duration-300" />
            <Icon icon="mdi:video" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <!-- Start Date Input -->
        <div class="relative">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="startDate">
            <Icon icon="mdi:calendar-start" class="inline-block mr-2 text-teal-500" />
            Start Date
          </label>
          <div class="relative">
            <input id="startDate" v-model="formData.startDate" type="date" class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none 
                       text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 transition duration-300"
              required />
            <Icon icon="mdi:calendar" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <!-- End Date Input -->
        <div class="relative">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="endDate">
            <Icon icon="mdi:calendar-end" class="inline-block mr-2 text-orange-500" />
            End Date
          </label>
          <div class="relative">
            <input id="endDate" v-model="formData.endDate" type="date" class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none 
                       text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 transition duration-300"
              required />
            <Icon icon="mdi:calendar-check" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <!-- Status Dropdown -->
        <div class="relative">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="status">
            <Icon icon="mdi:progress-check" class="inline-block mr-2 text-indigo-500" />
            Project Status
          </label>
          <div class="relative">
            <select id="status" v-model="formData.status" class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none 
                       text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 transition duration-300"
              required>
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <Icon icon="mdi:list-status" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <!-- Amount Video Input -->
        <div class="relative">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="amountvideo">
            <Icon icon="mdi:link" class="inline-block mr-2 text-green-500" />
            Amount Video
          </label>
          <div class="relative">
            <input id="amountvideo" v-model="formData.amountvideo" type="url" placeholder="Enter Amount Video" class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none 
                       text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 transition duration-300" />
            <Icon icon="mdi:video-link" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <!-- Link Video Input -->
        <div class="relative">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="videoLink">
            <Icon icon="mdi:link" class="inline-block mr-2 text-green-500" />
            Link Video
          </label>
          <div class="relative">
            <input id="videoLink" v-model="formData.videoLink" type="url" placeholder="Enter Video Link" class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none 
                       text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 transition duration-300" />
            <Icon icon="mdi:video-link" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <!-- Ad Resources Input -->
        <div class="relative col-span-full">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="adResources">
            <Icon icon="basil:document-solid" class="inline-block mr-2 text-yellow-500" />
            Ad Resources
          </label>
          <textarea id="adResources" v-model="formData.adResources" placeholder="Enter Ad Resources Details" rows="3"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none 
                     text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 transition duration-300"></textarea>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex items-center justify-center mt-6">
        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg 
                   focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform 
                   hover:scale-105 shadow-md dark:bg-blue-500 dark:hover:bg-blue-600">
          <Icon icon="mdi:check-circle" class="inline-block mr-2" />
          Submit Video Ads Tracker
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
definePageMeta({
  middleware: 'auth',
});

// Define interface for form data
interface VideoAdsTrackerForm {
  client: string
  creator: string
  cameramanEditor: string
  startDate: string
  endDate: string
  status: string
  videoLink: string
  amoutht: string
  amountvideo: string
  adResources: string
}

// Initialize form data
const formData = ref<VideoAdsTrackerForm>({
  client: '',
  creator: '',
  cameramanEditor: '',
  startDate: '',
  endDate: '',
  status: '',
  videoLink: '',
  amoutht: '',
  amountvideo : '',
  adResources: ''
})

// Form submission handler
const submitVideoAdsTracker = async () => {
  try {
    // Here you would typically send the data to your backend
    await Swal.fire({
      title: 'Video Ads Tracker Submitted!',
      text: 'Your video ads tracking information has been recorded.',
      icon: 'success',
      confirmButtonText: 'Cool'
    })

    // Reset form after submission
    formData.value = {
      client: '',
      creator: '',
      cameramanEditor: '',
      startDate: '',
      endDate: '',
      status: '',
      amoutht: '',
      amountvideo: '',
      videoLink: '',
      adResources: ''
    }
  } catch (error) {
    // Handle any errors
    Swal.fire({
      title: 'Error!',
      text: 'Something went wrong. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
}
</script>