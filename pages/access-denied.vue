<template>
  <div class="min-h-screen flex items-center justify-center dark:from-gray-900 dark:to-indigo-950 py-10 bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-indigo-950">
    <div class="container mx-auto px-4 max-w-2xl">
      <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 border border-indigo-100 dark:border-indigo-900 text-center">
        <div class="flex justify-center mb-6">
          <div class="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
            <Icon icon="heroicons:lock-closed" class="h-16 w-16 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Bro! Access Denied</h1>
        
        <p class="text-gray-600 dark:text-gray-300 text-lg mb-6">
          You don't have permission to access this page. This content is restricted to authorized users only.
        </p>
        
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <NuxtLink to="/dashboard" 
            class="inline-flex items-center px-5 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md">
            <Icon icon="heroicons:arrow-left" class="mr-2 h-5 w-5" />
            Back to Dashboard
          </NuxtLink>
          
          <button @click="contactSupport" 
            class="inline-flex items-center px-5 py-3 rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Icon icon="heroicons:chat-bubble-left-right" class="mr-2 h-5 w-5" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/useAuthStore';
import Swal from 'sweetalert2';

const auth = useAuthStore();

const contactSupport = () => {
  Swal.fire({
    title: 'Contact Support',
    html: `
      <div class="text-left">
        <p class="mb-4">If you believe you should have access to this page, please contact your administrator:</p>
        <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p>Email: <a href="mailto:support@example.com" class="text-blue-600 dark:text-blue-400">support@example.com</a></p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
    `,
    icon: 'info',
    confirmButtonText: 'Close',
    confirmButtonColor: '#4f46e5'
  });
};
</script>