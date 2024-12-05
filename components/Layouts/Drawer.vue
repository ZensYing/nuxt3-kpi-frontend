<template>
    <!-- drawer component -->
    <div id="drawer-example"
      class="fixed top-0 left-0 h-screen w-[80vw] md:w-96 z-40 p-3 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
      tabindex="-1" aria-labelledby="drawer-label">
      <!-- <h5
        id="drawer-example-label"
        class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        Menu
      </h5> -->
      <div class="px-3 py-2">
        <button type="button" data-drawer-hide="drawer-example" aria-controls="drawer-example">
          <Icon icon="radix-icons:cross-2" class="w-6 h-6 dark:text-white" />
        </button>
      </div>
      <div class="py-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
          <li>
            <a href="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <div
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                <Icon icon="icon-park-outline:people" />
              </div>
              <span class="ms-3">{{ $t('profile') }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { useI18n } from 'vue-i18n';
  
//   defineProps<{
//     openLoginDialog: Function;
//     logout: Function;
//   }>();
//   const user = useUser() // Replace with your user state or composable
  const { locale } = useI18n();
  // Function to switch languages
  const switchLanguage = (lang: string) => {
    locale.value = lang; // Set the locale
    if (process.client) {
      localStorage.setItem('locale', lang); // Save to localStorage
    }
  };
  
  // Logout logic
//   const logout = () => {
//     user.value = null; // Clear the user state
//     localStorage.removeItem('user'); // Remove from localStorage
//   };
  </script>
  
  <style scoped></style>