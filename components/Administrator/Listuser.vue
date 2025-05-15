<template>
  <div class=" mx-auto mt-4">
    <header class="mb-2">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
    </header>

    <!-- Department Filter Tabs -->
    <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px">
        <li class="mr-2">
          <button @click="activeFilter = 'all'"
            :class="`inline-block py-3 px-4 text-sm font-medium ${activeFilter === 'all' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`">
            All Users
          </button>
        </li>
        <li v-for="dept in uniqueDepartments" :key="dept" class="mr-2">
          <button @click="activeFilter = dept"
            :class="`inline-block py-3 px-4 text-sm font-medium ${activeFilter === dept ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`">
            {{ dept }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>

    <!-- User Grid by Department -->
    <div v-else-if="activeFilter !== 'all'" class="mb-8">
      <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{{ activeFilter }} Department</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="user in filteredUsers" :key="user.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all hover:shadow-md">
          <div class="flex items-center mb-4">
            <div class="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mr-4">
              <span class="text-blue-600 dark:text-blue-400 text-lg font-bold">
                {{ getInitials(user.first_name, user.last_name) }}
              </span>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">{{ user.first_name }} {{ user.last_name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.role?.name }}</p>
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-sm flex items-center text-gray-500 dark:text-gray-400">
              <span class="mr-2">
                <Icon icon="mdi:email-outline" class="w-4 h-4" />
              </span>
              {{ user.email }}
            </p>
            <div class="flex flex-wrap mt-3 gap-2">
              <span v-for="dept in formatDepartments(user.departments)" :key="dept"
                class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs text-gray-600 dark:text-gray-300">
                {{ dept }}
              </span>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end space-x-2">
            <button class="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded-full">
              <Icon icon="mdi:pencil" class="w-5 h-5" />
            </button>
            <button class="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-full">
              <Icon icon="mdi:trash-can-outline" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- All Users Table -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
        <thead class="bg-gray-50 dark:bg-gray-750">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departments</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div
                  class="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span class="text-blue-600 dark:text-blue-400 font-medium">
                    {{ getInitials(user.first_name, user.last_name) }}
                  </span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ user.first_name }} {{ user.last_name
                    }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.role?.name }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="flex flex-wrap gap-1">
                <span v-for="dept in formatDepartments(user.departments)" :key="dept"
                  class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs text-gray-600 dark:text-gray-300">
                  {{ dept }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex space-x-2">
                <button class="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                  <Icon icon="mdi:pencil" class="w-5 h-5" />
                </button>
                <button class="text-red-600 hover:text-red-800 dark:hover:text-red-400">
                  <Icon icon="mdi:trash-can-outline" class="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Icon } from '@iconify/vue'
import useTheme from '~/composables/useTheme'
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/store/useAuthStore'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import type { User } from '~/types/user'
import { useFormatters } from '~/composables/useFormatters';

const { formatDepartments } = useFormatters();

definePageMeta({
  middleware: 'auth', 
});

const auth = useAuthStore();
const users = ref<User[]>([]);
const isLoading = ref(false);
const activeFilter = ref('all');

// Get unique departments for filter tabs
const uniqueDepartments = computed(() => {
  const allDepts = users.value.flatMap(user => formatDepartments(user.departments));
  return [...new Set(allDepts)];
});

// Filter users by selected department
const filteredUsers = computed(() => {
  if (activeFilter.value === 'all') return users.value;

  return users.value.filter(user => {
    const userDepts = formatDepartments(user.departments);
    return userDepts.includes(activeFilter.value);
  });
});

// Helper function to get user initials
const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await useApi<{ data: User[] }>('/users?fields=*,role.name,department', {
      method: 'GET'
    });
    users.value = res.data;
  } catch (err) {
    console.error('Error fetching users:', err);
    Swal.fire({
      title: 'Error',
      text: 'Failed to load users. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Additional custom styles can be added here */
</style>