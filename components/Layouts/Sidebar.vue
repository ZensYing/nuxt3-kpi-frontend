<template>
    <div>
        <!-- Mobile Header with Hamburger Menu -->
        <div
            class="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 dark:text-white text-dark  p-4 flex items-center justify-between ">
            <div class="flex items-center space-x-3">
                <button @click="toggleSidebar" class="focus:outline-none md:hidden" aria-label="Toggle Sidebar">
                    <Icon :icon="isSidebarOpen ? 'mdi:close' : 'mdi:menu'" class="text-2xl" />
                </button>
                <h1 class="text-xl font-bold md:hidden">Sales Control</h1>
            </div>
            <div>
                <!-- user avatar -->
                <button @click="customToggleTheme" class="p-2 rounded focus:outline-none ">
                    <Icon :icon="theme === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'" class="w-6 h-6" />
                </button>
            </div>

        </div>

        <!-- Sidebar (Mobile and Desktop) -->
        <aside :class="[
            'fixed top-0 left-0 h-full w-64 transition-transform duration-300 ease-in-out z-50 shadow-md',
            'bg-white text-gray-900', // Light mode
            'dark:bg-gray-900 dark:text-gray-100', // Dark mode
            'md:translate-x-0', // Always visible on desktop
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full' // Slide in/out on mobile
        ]">
            <div class="pt-16 md:pt-5 p-2">
                <h2 class="text-2xl font-bold text-center mb-6 hidden md:block">Sales Control</h2>

                <nav>
                    <ul class="space-y-2">
                        <li v-for="item in menuItems" :key="item.to">
                            <NuxtLink :to="item.to" class="flex items-center p-3 rounded-lg transition-colors duration-300
                            hover:bg-gray-100 dark:hover:bg-gray-800
                            hover:text-black dark:hover:text-white" @click="closeSidebarOnMobile">
                                <Icon :icon="item.icon" class="mr-3 text-xl" />
                                {{ item.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>


        <!-- Overlay for mobile when sidebar is open -->
        <div v-if="isSidebarOpen" @click="closeSidebar" class="fixed inset-0 bg-black/50 z-40 md:hidden"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import useTheme from '~/composables/useTheme';


const { theme, toggleTheme } = useTheme();
const customToggleTheme = () => {
    if (theme.value === 'dark') {
        theme.value = 'light';
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');


    } else {
        theme.value = 'dark';
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
    }
};
// Sidebar menu items
const menuItems = [
    {
        to: '/',
        icon: 'mdi:view-dashboard',
        label: 'Dashboard'
    },
    {
        to: '/sales/staff',
        icon: 'mdi:account-group',
        label: 'Staff Management'
    },
    {
        to: '/sales/performance',
        icon: 'mdi:chart-line',
        label: 'Performance Tracking'
    },
    {
        to: '/sales/targets',
        icon: 'mdi:target',
        label: 'Sales Targets'
    },
    {
        to: '/sales/commissions',
        icon: 'mdi:currency-usd',
        label: 'Commissions'
    },
    {
        to: '/sales/reports',
        icon: 'mdi:file-document',
        label: 'Sales Reports'
    }
]

// Sidebar state
const isSidebarOpen = ref(false)

// Toggle sidebar
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

// Close sidebar
const closeSidebar = () => {
    isSidebarOpen.value = false
}

// Close sidebar on mobile after navigating
const closeSidebarOnMobile = () => {
    // Only close on mobile screens
    if (window.innerWidth < 768) {
        closeSidebar()
    }
}

// Handle window resize to prevent sidebar getting stuck
const handleResize = () => {
    if (window.innerWidth >= 768) {
        closeSidebar()
    }
}

// Add resize listener
onMounted(() => {
    window.addEventListener('resize', handleResize)
})

// Remove listener on unmount
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.router-link-active {
  @apply font-bold bg-gray-900 text-white dark:bg-red-500 dark:text-white;
}

</style>