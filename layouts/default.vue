<template>
  <div class="bg-white dark:bg-dark">
    <!-- Mobile Header -->
    <div
      class="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 dark:text-white text-dark p-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <button @click="toggleSidebar" class="focus:outline-none md:hidden" aria-label="Toggle Sidebar">
          <Icon :icon="isSidebarOpen ? 'mdi:close' : 'mdi:menu'" class="text-2xl" />
        </button>
        <h1 class="text-xl font-bold md:hidden">BAKSEY Tech Solution</h1>
      </div>
      <div class="flex items-center space-x-4">
        <!-- Theme toggle -->
        <button @click="customToggleTheme"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors hidden md:flex items-center justify-center">
          <Icon
            :icon="theme === 'dark' ? 'line-md:sunny-filled-loop-to-moon-filled-alt-loop-transition' : 'line-md:moon-filled-alt-to-sunny-filled-loop-transition'"
            class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        
        <!-- Notifications -->
        <div class="relative" ref="notificationDropdownContainer">
          <button @click="toggleNotificationDropdown" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors">
            <div class="relative">
              <Icon icon="mdi:bell" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span v-if="notifications.length > 0" class="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 text-xs bg-red-500 text-white rounded-full">{{ notifications.length }}</span>
            </div>
          </button>
          
          <!-- Notification Dropdown -->
          <div v-if="notificationDropdownOpen"
            class="absolute   right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 " v-motion-fade-visible-once >
            <div class="p-4 border-b border-gray-100 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                  {{ notifications.length }}
                </span>
              </div>
            </div>
            
            <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
              No notifications
            </div>
            
            <div v-else>
              <div v-for="(notification, index) in notifications" :key="index" 
                class="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer">
                <div class="flex items-start">
                  <div class="w-2 h-2 mt-1.5 bg-primary-500 rounded-full mr-3"></div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ notification.title }}</p>
                    <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      {{ new Date(notification.date_created).toLocaleString() }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="p-3 text-center border-t border-gray-100 dark:border-gray-700">
              <button class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                View all notifications
              </button>
            </div>
          </div>
        </div>
         
        
        <!-- Language Selector -->
        <div class="relative" ref="dropdownContainer">
          <button @click="toggleDropdown"
            class="flex items-center px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors focus:outline-none">
            <span class="mr-1">{{ locale === 'en' ? 'English' : 'Khmer' }}</span>
            <Icon icon="mdi:chevron-down" class="w-4 h-4" />
          </button>
          <div v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-fadeIn">
            <button @click="switchLanguage('en')" :class="[
              'flex items-center w-full text-left px-4 py-2.5 text-sm transition-colors',
              'hover:bg-gray-50 dark:hover:bg-gray-700',
              locale === 'en' ? 'font-medium text-primary-600 dark:text-primary-400 bg-gray-50 dark:bg-gray-700/50' : 'text-gray-700 dark:text-gray-300'
            ]">
              <Icon icon="emojione-v1:flag-for-united-states" class="w-4 h-4 mr-2" />
              English
            </button>
            <button @click="switchLanguage('km')" :class="[
              'flex items-center w-full text-left px-4 py-2.5 text-sm transition-colors',
              'hover:bg-gray-50 dark:hover:bg-gray-700',
              locale === 'km' ? 'font-medium text-primary-600 dark:text-primary-400 bg-gray-50 dark:bg-gray-700/50' : 'text-gray-700 dark:text-gray-300'
            ]">
              <Icon icon="emojione-v1:flag-for-cambodia" class="w-4 h-4 mr-2" />
              Khmer
            </button>
          </div>
        </div>

        <!-- User Avatar Dropdown -->
        <div class="relative" ref="userDropdownContainer">
          <button @click="toggleUserDropdown" class="flex items-center focus:outline-none group">
            <div class="relative">
              <img :src="useImg(auth.user?.avatar || '/default-avatar.png')" alt="User Avatar"
                class="w-9 h-9 rounded-full object-cover border-2 border-gray-200 transition-all duration-300 group-hover:border-primary-500 dark:border-gray-700 dark:group-hover:border-primary-400" />
              <div
                class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white dark:border-gray-800">
              </div>
            </div>
          </button>

          <div v-if="userDropdownOpen"
            class="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-all duration-200 ease-in-out transform origin-top-right animate-fadeIn">
            <div class="px-5 py-4">
              <div class="flex items-center space-x-3">
                <img :src="useImg(auth.user?.avatar || '/default-avatar.png')" alt="User Avatar"
                  class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700" />
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">
                    {{ auth.user?.first_name }} {{ auth.user?.last_name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ auth.user?.email }}
                  </p>
                </div>
                <button @click="customToggleTheme"
                  class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none md:hidden ml-auto">
                  <Icon :icon="theme === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'" class="w-5 h-5" />
                </button>
              </div>

              <div class="mt-4 py-3 px-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Department
                  </p>
                  <span
                    class="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full dark:bg-gray-600 dark:text-gray-300">
                    {{ auth.user?.department?.title }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Role
                  </p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="(role, index) in formatDepartments(auth.user?.role.name)" :key="index"
                      class="px-2 py-1 text-xs bg-primary-500 text-dark dark:text-white rounded-full dark:bg-primary-600">
                      {{ role }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-100 dark:border-gray-700">
              <ul>
                <li>
                  <NuxtLink to="/profile"
                    class="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30 transition-colors duration-150"
                    @click="closeUserDropdown">
                    <Icon icon="mdi:account" class="text-lg mr-3 text-gray-500 dark:text-gray-400" />
                    Profile
                  </NuxtLink>
                </li>

                <li>
                  <button @click="handleLogout"
                    class="w-full flex items-center px-5 py-3 text-sm text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 transition-colors duration-150">
                    <Icon icon="mdi:logout" class="text-lg mr-3" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  
    
    <!-- Sidebar -->
    <aside :class="[
      'fixed top-0 left-0 h-full w-64 transition-transform duration-300 ease-in-out z-50 shadow-md',
      'bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100',
      'md:translate-x-0',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]">
      <div class="pt-16 md:pt-5 p-2">
        <h2 class="text-2xl font-bold text-center mb-6 hidden md:block">BAKSEY System</h2>

        <nav>
          <ul class="space-y-2">
            <li v-for="item in localizedMenuItems" :key="item.to">
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
      <!-- sidebar buttom -->
      <div class="absolute bottom-0 left-0 right-0 p-4">
        <InternetSpeed />

        <div class="mt-2 text-left">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          BAKSEY Tech Solution © {{ new Date().getFullYear() }}
        </p>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Version 1.0
        </p>
      </div>
      </div>
    </aside>


    <!-- Overlay for mobile -->
    <div v-if="isSidebarOpen" @click="closeSidebar" class="fixed inset-0 bg-black/50 z-40 md:hidden"></div>

    <!-- Page content -->
    <div class="md:ml-64 pt-20 p-2  ">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import useTheme from '~/composables/useTheme'
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/store/useAuthStore'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { useInternetStatus } from '~/utils/useInternetStatus';
import { usePermissions } from '~/composables/usePermissions'
// Import notification type
import type { IResponse } from '~/types/api';
import type { INotification } from '~/types/notification';

const { isSale, isAdmin } = usePermissions()



// Use the Internet Status composable
const {
  connectionStatus,
  connectionQuality,
  lastChecked,
  isOnline,
  pingTime,
  downloadSpeed,
  isChecking,
  getConnectionStatusColor,
  getConnectionStatusIcon,
  checkInternetQuality
} = useInternetStatus();


const auth = useAuthStore()
const router = useRouter();
/// Form State
const firstName = ref('');
const lastName = ref('');
const departments = ref<string[]>([]);
const roles = ref<string[]>([]);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const avatarFile = ref<File | null>(null);
const avatarPreview = ref<string | null>(null);
// Original Values
const originalFirstName = ref('');
const originalLastName = ref('');
const originalEmail = ref('');
const originalPassword = ref('');
onMounted(() => {
  if (auth.user) {
    firstName.value = auth.user.first_name;
    lastName.value = auth.user.last_name;
    roles.value = auth.user?.role.name ? [auth.user.role.name] : [];
    originalFirstName.value = auth.user.first_name;
    originalLastName.value = auth.user.last_name;
  }
});

// console.log('auth user:', auth.user)

// Add this function to your script setup
const formatDepartments = (departments: any) => {
  if (!departments) return [];

  // Handle both string and array types
  const deptArray = Array.isArray(departments)
    ? departments
    : departments.split(',');

  return deptArray.map((dept: string) => {
    const trimmed = dept.trim();
    // Replace underscores with spaces and capitalize each word
    return trimmed.split('_')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  });
};

const { t, locale } = useI18n();
const { theme } = useTheme()

// Notifications
const notifications = ref<INotification[]>([]);
const notificationDropdownOpen = ref(false);
const notificationDropdownContainer = ref<HTMLElement | null>(null);

// Function to toggle notification dropdown
const toggleNotificationDropdown = () => {
  notificationDropdownOpen.value = !notificationDropdownOpen.value;
  if (notificationDropdownOpen.value) {
    // Close other dropdowns when opening notifications
    userDropdownOpen.value = false;
    dropdownOpen.value = false;
  }
};

const closeNotificationDropdown = () => {
  notificationDropdownOpen.value = false;
};

// Handle click outside for notification dropdown
const handleNotificationClickOutside = (event: MouseEvent) => {
  if (notificationDropdownContainer.value && !notificationDropdownContainer.value.contains(event.target as Node)) {
    closeNotificationDropdown();
  }
};

// Function to fetch notifications
const fetchNotificationsData = async () => {
  try {
    const response = await (<Promise<IResponse<INotification[]>>>(
      useApi(
        `/items/notifications?filter[status]=published&sort=-date_created&fields=*`,
        { method: 'GET' }
      )
    ));
    notifications.value = response.data || [];
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    notifications.value = [];
  }
};

// Close all dropdowns
const closeAllDropdowns = () => {
  notificationDropdownOpen.value = false;
  userDropdownOpen.value = false;
  dropdownOpen.value = false;
};

const customToggleTheme = () => {
  const isDark = theme.value === 'dark'
  theme.value = isDark ? 'light' : 'dark'
  localStorage.setItem('theme', theme.value)
  document.documentElement.classList.toggle('dark', !isDark)
}

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 768) {
    closeSidebar()
  }
}

// User Dropdown
const userDropdownOpen = ref(false)
const userDropdownContainer = ref<HTMLElement | null>(null)
// Toggle user dropdown
const toggleUserDropdown = () => {
  userDropdownOpen.value = !userDropdownOpen.value
  if (userDropdownOpen.value) {
    // Close other dropdowns when opening user dropdown
    notificationDropdownOpen.value = false;
    dropdownOpen.value = false;
  }
}
const closeUserDropdown = () => {
  userDropdownOpen.value = false
}
// Handle click outside for user dropdown
const handleUserClickOutside = (event: MouseEvent) => {
  if (userDropdownContainer.value && !userDropdownContainer.value.contains(event.target as Node)) {
    closeUserDropdown()
  }
}
// Logout handler
async function handleLogout() {
  try {
    await auth.logout(); // Call the logout function from useAuthStore
    location.reload(); // Reload the page
    router.push('/'); // Navigate to the root path
  } catch (error) {
    console.error('Logout failed:', error);
  }
}


const handleResize = () => {
  if (window.innerWidth >= 768) {
    closeSidebar()
  }
}

onMounted(async () => {
  const hasToken = !!localStorage.getItem('refresh_token')
  if (hasToken && !auth.user) {
    await auth.refresh()
  }
  
  // Fetch notifications on mount
  await fetchNotificationsData();
})
onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

type LocaleKey = 'en' | 'km';
const menuItems = [
  {
    to: '/',
    icon: 'mdi:view-dashboard',
    label: { en: 'Dashboard', km: 'ផ្ទាំងគ្រប់គ្រង' }
  },
  {
    to: '/dashboard/request',
    icon: 'material-symbols:edit-document',
    label: { en: 'Form Request KPI', km: 'ទម្រង់ស្នើសុំ KPI' }
  },
  {
    to: '/dashboard/history-kpi/',
    icon: 'emojione-v1:document',
    label: { en: 'History of Request KPI', km: 'ប្រវត្តិការស្នើសុំ KPI' }
  },
  {
    to: '/dashboard/pr-tracking',
    icon: 'mdi:target',
    label: { en: 'PR Tracking', km: 'ការតាមដាន PR' }
  },
  {
    to: '/dashboard/monthly-ads-video-tracker',
    icon: 'mdi:currency-usd',
    label: { en: 'Monthly Video Ads Tracker', km: 'កម្មវិធីតាមដានការផ្សាយពាណិជ្ជកម្មវីដេអូប្រចាំខែ' }
  },
  // Track Performance Staff
  {
    to: '/dashboard/track-performance-staff',
    icon: 'mdi:account-check',
    label: { en: 'Track Performance Staff', km: 'តាមដានការប្រកួតប្រជែងរបស់បុគ្គលិក' }
  },
  // {
  //   to: '/dashboard/reports',
  //   icon: 'mdi:file-document',
  //   label: { en: 'Reports', km: 'របាយការណ៍' }
  // },
  // for sales only 
  {
    to: '/dashboard/commissions',
    icon: 'mdi:cash',
    label: { en: 'Commissions', km: 'កម្រៃជើងសារ' },
    role: 'sales'
  },
  // clients
  {
    to: '/dashboard/clients',
    icon: 'mdi:account-multiple',
    label: { en: 'Clients', km: 'អតិថិជន' },
    role: 'sales'
  },

]


const localizedMenuItems = computed(() =>
  menuItems
    .filter(item => {
      if (!item.role) return true // Public item
      if (item.role === 'sales') return isSale.value
      if (item.role === 'admin') return isAdmin.value
      return false
    })
    .map((item) => ({
      ...item,
      label: item.label[locale.value as LocaleKey]
    }))
);

// 
const { setFontClass } = useI18nConfig();

const switchLanguage = (newLocale: string) => {
  locale.value = newLocale; // Change the active locale
  if (process.client) {
    localStorage.setItem('locale', newLocale); // Save the new locale to localStorage
    setFontClass(newLocale); // Update the font class
  }
};

const dropdownOpen = ref(false);
const dropdownContainer = ref<HTMLElement | null>(null);

// Toggle dropdown visibility
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
  if (dropdownOpen.value) {
    // Close other dropdowns when opening language dropdown
    notificationDropdownOpen.value = false;
    userDropdownOpen.value = false;
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
    dropdownOpen.value = false;
  }
};
// Add event listener to close dropdown on outside click
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('click', handleUserClickOutside);
  document.addEventListener('click', handleNotificationClickOutside);
});

// Clean up event listener when the component is destroyed
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('click', handleUserClickOutside);
  document.removeEventListener('click', handleNotificationClickOutside);
});

</script>

<style scoped>
.router-link-active {
  @apply font-bold bg-gray-900 text-white dark:bg-red-500 dark:text-white;
}
</style>