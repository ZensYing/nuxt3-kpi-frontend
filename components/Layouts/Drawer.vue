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
      <div class="py-4 pl-3 text-2xl ">
        <ul class=" font-medium">
          <li class="space-y-4 ">
            <a v-for="(item, index) in localizedMenuItems" :key="index" :href="item.to"
            class="flex items-center space-x-1 text-gray-700 dark:text-white hover:text-green-600 duration-500 transition-all hover:translate-x-5    ">
            <Icon :icon="item.icon" class="w-5 h-5 dark:text-white" />
            <span>{{ item.text }}</span>
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
  const localizedMenuItems = computed(() =>
  menuItems.map((item) => ({
    ...item,
    text: item.text[locale.value as LocaleKey], // Explicitly cast locale.value as a valid key
  }))
);
  type LocaleKey = 'en' | 'km';
const menuItems = [
  {
    to: '/',
    icon: 'line-md:home',
    text: { en: 'Home', km: 'ទំព័រដើម' },
  },
  {
    to: '/blog',
    icon: 'game-icons:read',
    text: { en: 'Blog', km: 'ប្លុក' },
  },
  {
    to: '/project',
    icon: 'eos-icons:project-outlined',
    text: { en: 'Project', km: 'គម្រោង' },
  },
  {
    to: '/about',
    icon: 'ix:about',
    text: { en: 'About', km: 'អំពីយើង' },
  },
];

  </script>
  
  <style scoped></style>