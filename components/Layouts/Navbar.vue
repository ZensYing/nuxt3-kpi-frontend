<template>
    <nav class="bg-light dark:bg-dark dark:text-white py-4 shadow-md px-2 sticky top-0 z-[20]">
        <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <button v-if="!isHomePage" @click="goBack"
                    class="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-300">
                    <Icon icon="ic:baseline-arrow-back" class="w-5 h-5" />
                </button>
                <NuxtLink to="/" class="flex items-center">
                    <img src="" alt="Logo" class="w-12" />
                </NuxtLink>

            </div>
            <div class="hidden md:flex space-x-6 items-center">
                <NuxtLink href="/"
                    class="flex items-center space-x-1 text-gray-700 dark:text-white hover:text-green-600 transition-colors duration-300">
                    <Icon icon="line-md:home" class="w-5 h-5 dark:text-white" />
                    <span>{{ $t('home') }}</span>
                </NuxtLink>
            </div>
            <div class="flex space-x-3">
                <button type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example"
                    data-drawer-backdrop="true" aria-controls="drawer-example" class="md:hiddens">
                    <Icon icon="ci:hamburger-md" class="w-6 h-6" />
                </button>
                <button @click="toggleTheme" class="p-2 rounded focus:outline-none">
                    <Icon :icon="theme === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'" class="w-6 h-6" />
                </button>
                <div class="relative dropdown-container">
                    <button @click="toggleDropdown"
                        class="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none">
                        {{ locale === 'en' ? 'English' : 'Khmer' }}
                        <Icon icon="mdi:chevron-down" class="w-5 h-5 ml-2" />
                    </button>
                    <div v-if="dropdownOpen"
                        class="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600">
                        <button @click="switchLanguage('en')" :class="[
                            'block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600',
                            locale === 'en' ? 'bg-gray-100 dark:bg-gray-600' : ''
                        ]">
                            English
                        </button>
                        <button @click="switchLanguage('km')" :class="[
                            'block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600',
                            locale === 'km' ? 'bg-gray-100 dark:bg-gray-600' : ''
                        ]">
                            Khmer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <LayoutsDrawer :logout="logout" :openLoginDialog="openLoginDialog" />

</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRouter, useRoute } from 'vue-router';
import LayoutsDrawer from '~/components/Layouts/Drawer.vue';
import useTheme from '~/composables/useTheme';

const router = useRouter();
const route = useRoute();
const { theme, toggleTheme } = useTheme();

const isHomePage = computed(() => route.name === 'index');

import { useI18n } from 'vue-i18n';


const { locale } = useI18n();
// Function to switch languages
const switchLanguage = (lang: string) => {
  // Change locale using vue-i18n
  locale.value = lang;  // <-- Corrected here, locale is now reactive, so we can directly change it
  // Save to localStorage for persistence
  if (process.client) {
    localStorage.setItem('locale', lang);
  }
};

const dropdownOpen = ref(false);

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
    dropdownOpen.value = false;
};
const handleClickOutside = (event: MouseEvent) => {
    const dropdown = document.querySelector('.dropdown-container'); // Replace with your dropdown container class
    if (dropdown && !dropdown.contains(event.target as Node)) {
        closeDropdown();
    }
};

// Add event listener to close dropdown on outside click
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

// Clean up event listener when the component is destroyed
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

const goBack = () => {
    router.back();
};

const openLoginDialog = () => {
    console.log('Login dialog opened');
};

const logout = () => {
    console.log('Logged out');
};
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Smooth slide-in transition */
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.5s ease-in-out;
}

.slide-right-enter {
    transform: translateX(100%);
}

.slide-right-leave-to {
    transform: translateX(100%);
}

/* Custom styling */
nav {
    font-family: 'Poppins', sans-serif;
    border-bottom: 1px solid #eaeaea;
}

.nav-link {
    padding: 8px 12px;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: #1dbf73;
}

.nav-link-active {
    color: #1dbf73;
}

/* Adjusting hover effect for smooth color transition */
.wrapper ul li a {
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 5px;
    display: inline-block;
    position: relative;
    transition: color 0.3s ease-in-out;
    color: inherit;
}

.wrapper ul li a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: currentColor;
    transition: width 0.3s ease-in-out;
}

.wrapper ul li a:hover::after {
    width: 100%;
}

/* Mega Menu styling */
.mega-menu {
    display: none;
    width: 950px;
}

.group:hover .mega-menu {
    display: block;
    transition: all 0.3s ease-in-out;
}

/* Centering the mega menu on hover */
.group .mega-menu {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
}
</style>