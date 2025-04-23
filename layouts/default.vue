<template>
  <div class="bg-white dark:bg-dark">
    <!-- Mobile Header -->
    <div
      class="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 dark:text-white text-dark p-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <button @click="toggleSidebar" class="focus:outline-none md:hidden" aria-label="Toggle Sidebar">
          <Icon :icon="isSidebarOpen ? 'mdi:close' : 'mdi:menu'" class="text-2xl" />
        </button>
        <h1 class="text-xl font-bold md:hidden">BAKSEY System</h1>
      </div>
      <div class="flex space-x-3">
        <!-- Theme toggle -->
        <button @click="customToggleTheme" class="p-2 rounded focus:outline-none hidden md:block">
          <Icon :icon="theme === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'" class="w-6 h-6" />
        </button>
        <div class="relative" ref="dropdownContainer">
          <button @click="toggleDropdown"
            class="flex items-center px-2 py-1  rounded-lg border border-dashed border-black dark:border-light  dark:text-white focus:outline-none">
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
        <!-- User Avatar Dropdown -->
        <div class="relative" ref="userDropdownContainer">
          <button @click="toggleUserDropdown" class="flex items-center focus:outline-none group">
            <div class="relative">
              <img :src="useImg(auth.user?.avatar || '/default-avatar.png')" alt="User Avatar"
                class="w-10 h-10 rounded-full object-cover border-2 border-gray-200 transition-all duration-300 group-hover:border-primary-500 dark:border-gray-700 dark:group-hover:border-primary-400" />
              <div
                class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800">
              </div>
            </div>
          </button>

          <div v-if="userDropdownOpen"
            class="absolute right-0 mt-3 w-64 bg-white  rounded-xl shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-all duration-200 ease-in-out transform origin-top-right">
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
                <button @click="customToggleTheme" class="p-2 rounded focus:outline-none md:hidden">
                  <Icon :icon="theme === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'" class="w-6 h-6" />
                </button>
              </div>

              <div class="mt-3 py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p class="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Departments
                </p>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span v-for="(dept, index) in formatDepartments(auth.user?.departments)" :key="index"
                    class="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full dark:bg-gray-600 dark:text-gray-300">
                    {{ dept }}
                  </span>
                </div>
                <p class="text-xs font-medium text-gray-700 dark:text-gray-300 mt-1">
                  Role
                </p>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span v-for="(role, index) in formatDepartments(auth.user?.role.name)" :key="index"
                    class="px-2 py-1 text-xs bg-blue-500 text-white rounded-full dark:bg-gray-600 dark:text-gray-300">
                    {{ role }}
                  </span>
                </div>
              </div>

            </div>

            <div class="border-t border-gray-100 dark:border-gray-700">
              <ul>
                <li>
                  <NuxtLink to="/profile"
                    class="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors duration-150"
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
        <!-- user avatar and dropdown -->
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
    </aside>

    <!-- Overlay for mobile -->
    <div v-if="isSidebarOpen" @click="closeSidebar" class="fixed inset-0 bg-black/50 z-40 md:hidden"></div>

    <!-- Page content -->
    <div class="md:ml-64 pt-20 p-4 ">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import useTheme from '~/composables/useTheme'
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/store/useAuthStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

import { usePermissions } from '~/composables/usePermissions'
const { isSale, isAdmin } = usePermissions()

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
    departments.value = Array.isArray(auth.user?.departments) ? auth.user.departments : [];
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

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

onMounted(async () => {
  const hasToken = !!localStorage.getItem('refresh_token')
  if (hasToken && !auth.user) {
    await auth.refresh()
  }
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
  {
    to: '/dashboard/reports',
    icon: 'mdi:file-document',
    label: { en: 'Reports', km: 'របាយការណ៍' }
  },
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
// Create a computed array to dynamically return the correct language text
// const localizedMenuItems = computed(() =>
//   menuItems.map((item) => ({
//     ...item,
//     label: item.label[locale.value as LocaleKey], // Explicitly cast locale.value as a valid key
//   }))
// );
const dropdownOpen = ref(false);
const dropdownContainer = ref<HTMLElement | null>(null);

// Toggle dropdown visibility
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
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
});

// Clean up event listener when the component is destroyed
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('click', handleUserClickOutside);
});

// 

// Computed property to check if the form is valid
const hasChanges = computed(() => {
  return (
    firstName.value !== originalFirstName.value || // Check if first name has changed
    lastName.value !== originalLastName.value || // Check if last name has changed
    password.value.trim() !== '' || // Check if a new password has been entered
    avatarFile.value !== null // Check if a new avatar file has been selected
  );
});
// Function to handle avatar change
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];

    // Check if the file exceeds the maximum allowed size
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: 'error',
        title: 'រូបភាពធំពេក',
        text: 'រូបភាពត្រូវមានទំហំតិចជាង 2MB ។ សូមជ្រើសរើសរូបភាពដទៃទៀតដែលមានទំហំតូចជាងនេះ។',
        confirmButtonText: 'OK',
      });
      avatarFile.value = null; // Reset the file value
      avatarPreview.value = null; // Reset the preview
      return; // Exit the function to prevent further processing
    }

    avatarFile.value = file;

    // Preview the selected avatar
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

// Function to update the profile
const updateProfile = async () => {
  if (password.value && password.value !== confirmPassword.value) {
    Swal.fire({
      icon: 'error',
      title: 'លេខសម្ងាត់មិនដូចគ្នា',
      text: 'លេខសម្ងាត់និងការបញ្ជាក់លេខសម្ងាត់មិនដូចគ្នា។ សូមពិនិត្យម្តងទៀត។',
      confirmButtonText: 'OK',
    });
    return;
  }
  try {
    // Show loading alert
    Swal.fire({
      title: 'Updating Profile...',
      text: 'Please wait while your profile is being updated.',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const updateData: {
      first_name: string;
      last_name: string;
      password?: string;
    } = {
      first_name: firstName.value,
      last_name: lastName.value,
    };
    // Include the password in the update only if it's provided
    if (password.value.trim() !== '') {
      updateData.password = password.value.trim();
    }

    // Call the store's updateUserProfile method with the update data and selected file
    await auth.updateUserProfile(updateData, avatarFile.value || undefined);

    // Store the active tab in sessionStorage
    // sessionStorage.setItem("activeTab", "profile");

    // Success alert
    Swal.fire({
      icon: 'success',
      title: 'Profile Updated',
      text: 'Your profile has been updated successfully.',
      confirmButtonText: 'OK',
    }).then(() => {
      // Reload the page to apply changes and ensure the user stays on the profile tab
      window.location.reload();
    });
  } catch (error) {
    // Error alert
    Swal.fire({
      icon: 'error',
      title: 'Update Failed',
      text: 'There was an error updating your profile. Please try again.',
      confirmButtonText: 'OK',
    });
  }
};
</script>

<style scoped>
.router-link-active {
  @apply font-bold bg-gray-900 text-white dark:bg-red-500 dark:text-white;
}
</style>
