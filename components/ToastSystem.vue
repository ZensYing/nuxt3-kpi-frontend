<!-- ToastSystem.vue -->
<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-4 w-80">
    <transition-group
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transform transition duration-200 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 w-full"
        :class="{
          'border-l-4 border-green-500': toast.type === 'success',
          'border-l-4 border-red-500': toast.type === 'error',
          'border-l-4 border-yellow-500': toast.type === 'warning',
          'border-l-4 border-blue-500': toast.type === 'info'
        }"
      >
        <div class="flex p-4">
          <!-- Icon -->
          <div 
            class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full mr-3"
            :class="{
              'bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-300': toast.type === 'success',
              'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300': toast.type === 'error',
              'bg-yellow-100 text-yellow-500 dark:bg-yellow-900 dark:text-yellow-300': toast.type === 'warning',
              'bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300': toast.type === 'info'
            }"
          >
            <Icon 
              :name="getIconName(toast.type)" 
              class="h-5 w-5" 
            />
          </div>
          
          <!-- Content -->
          <div class="flex-1">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ toast.title }}
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ toast.message }}
            </p>
          </div>
          
          <!-- Close button -->
          <div class="ml-3 flex-shrink-0 flex">
            <button
              @click="dismiss(toast.id)"
              class="inline-flex rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span class="sr-only">Close</span>
              <Icon name="heroicons:x-mark" class="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <!-- Progress bar -->
        <div
          class="h-1"
          :class="{
            'bg-green-500': toast.type === 'success',
            'bg-red-500': toast.type === 'error',
            'bg-yellow-500': toast.type === 'warning',
            'bg-blue-500': toast.type === 'info'
          }"
          :style="{
            animation: `progress ${toast.duration}ms linear`
          }"
        ></div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useToast } from '@/composables/useToast';

const { toasts, dismiss } = useToast();

/**
 * Returns the appropriate icon name based on toast type
 */
function getIconName(type: string): string {
  switch (type) {
    case 'success':
      return 'heroicons:check-circle';
    case 'error':
      return 'heroicons:exclamation-circle';
    case 'warning':
      return 'heroicons:exclamation-triangle';
    case 'info':
    default:
      return 'heroicons:information-circle';
  }
}
</script>

<style scoped>
@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}
</style>