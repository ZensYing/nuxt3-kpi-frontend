<template>
  <div class="container mx-auto px-6 py-10 max-w-5xl">
    <!-- Platform selector cards -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Select Platform</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="platform in platforms"
          :key="platform.id"
          @click="selectPlatform(platform.id)"
          class="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
          :class="selectedPlatform === platform.id ? 'ring-4' : ''"
          :style="`--platform-color: ${platform.project_color}; border-color: ${platform.project_color}`"
        >
          <div class="absolute top-0 left-0 w-full h-1" :style="`background-color: ${platform.project_color}`"></div>
          <div class="p-6">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center mr-3" :style="`background-color: ${platform.project_color}`">
                <span class="text-white font-bold text-lg">{{ platform.project_name.charAt(0) }}</span>
              </div>
              <h3 class="text-lg font-semibold" :style="`color: ${platform.project_color}`">{{ platform.project_name }}</h3>
            </div>
            <p class="text-gray-600 text-sm">{{ platform.project_descriptor }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Platform details -->
    <div v-if="platformSettings" class="bg-white shadow-xl rounded-xl p-8 transition-all duration-300">
      <div class="flex flex-col md:flex-row items-start md:items-center mb-8 gap-6">
        <div 
          class="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white"
          :style="`background-color: ${platformSettings.project_color}`"
        >
          {{ platformSettings.project_name.charAt(0) }}
        </div>
        <div>
          <h1 class="text-3xl font-bold mb-2" :style="`color: ${platformSettings.project_color}`">
            {{ platformSettings.project_name }}
          </h1>
          <p class="text-gray-600">{{ platformSettings.project_descriptor }}</p>
        </div>
      </div>
      
      <div class="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h2 class="font-semibold text-xl mb-4">Platform Information</h2>
        
        <NuxtLink
          :to="`/dashboard/ads/report-${selectedPlatform}`"
          class="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-white mb-6 transition-all hover:opacity-90"
          :style="`background-color: ${platformSettings.project_color}`"
        >
          <span>View Reports for {{ platformSettings.project_name }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </NuxtLink>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 rounded-lg bg-white shadow-sm border border-gray-100">
            <p class="text-gray-500 text-sm mb-1">Website URL</p>
            <a :href="platformSettings.website_url" target="_blank" class="text-blue-600 hover:underline flex items-center gap-1">
              {{ platformSettings.website_url }}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
          <div class="p-4 rounded-lg bg-white shadow-sm border border-gray-100">
            <p class="text-gray-500 text-sm mb-1">CMS URL</p>
            <a :href="platformSettings.directusUrl" target="_blank" class="text-blue-600 hover:underline flex items-center gap-1">
              {{ platformSettings.directusUrl }}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Define platform settings types
interface PlatformSetting {
  id: string;
  project_name: string;
  project_color: string;
  project_logo?: string;
  project_descriptor: string;
  website_url: string;
  directusUrl: string;
}

// Define static data for platforms
const platforms = [
  { 
    id: 'bc', 
    project_name: 'Business Cambodia', 
    project_color: '#ED1C24',
    project_descriptor: 'Premier business news and insights platform for Cambodia',
    website_url: 'https://business-cambodia.com',
    directusUrl: 'https://business-cambodia.com/cms'
  },
  { 
    id: 'tc', 
    project_name: 'Tech Cambodia', 
    project_color: '#089CF4',
    project_descriptor: 'Latest technology news and innovations from Cambodia',
    website_url: 'https://tech-cambodia.com',
    directusUrl: 'https://tech-cambodia.com/cms'
  },
  { 
    id: 'hc', 
    project_name: 'Healthy Cambodia', 
    project_color: '#049900',
    project_descriptor: 'Health and wellness resources for Cambodians',
    website_url: 'https://healthy-cambodia.com',
    directusUrl: 'https://healthy-cambodia.com/cms'
  }
];

const router = useRouter();
const selectedPlatform = ref('bc'); // Default to Business Cambodia
const platformSettings = ref<PlatformSetting>(platforms[0]);

// Function to select platform
const selectPlatform = (platformId: string) => {
  selectedPlatform.value = platformId;
  const platform = platforms.find(p => p.id === platformId);
  if (platform) {
    platformSettings.value = {
      id: platform.id,
      project_name: platform.project_name,
      project_color: platform.project_color,
      project_descriptor: platform.project_descriptor,
      website_url: platform.website_url,
      directusUrl: platform.directusUrl
    };
  }
};
</script>

<style scoped>
.ring-4 {
  --tw-ring-color: var(--platform-color);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
</style>