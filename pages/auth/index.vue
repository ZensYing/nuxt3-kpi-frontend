<template>
    <div class="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

        <div class="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <!-- Login Card with Motion and AOS Animations -->
            <div 
                class=" border-2  border-red-500 rounded-2xl p-8 space-y-6 transform transition-all duration-500 hover:scale-105">
                <img src="/logo.png" alt="Bakseys Media Logo" class="h-12" />

                <div class="text-center">
                    <div class="flex items-center justify-center">
                        <h2 class="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
                            BAKSEY System
                        </h2>
                    </div>
                    <p class="text-gray-500 mb-6">
                        Sign in to continue to your dashboard
                    </p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-6">
                    <div class="relative">
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                                <Icon icon="mdi:email-outline" class="h-5 w-5 text-gray-400" />
                            </span>
                            <input id="email" type="email" v-model="email" required
                                class="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
                                placeholder="Enter your email" />
                        </div>
                    </div>

                    <div class="relative">
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                                <Icon icon="mdi:lock-outline" class="h-5 w-5 text-gray-400" />
                            </span>
                            <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password" required
                                class="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
                                placeholder="Enter your password" />
                            <button type="button" @click="togglePasswordVisibility"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors">
                                <Icon :icon="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
                                    class="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" type="checkbox" v-model="rememberMe"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <!-- <div class="text-sm">
                <NuxtLink 
                  to="/forgot-password" 
                  class="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </NuxtLink>
              </div> -->
                    </div>

                    <div>
                        <button type="submit" :disabled="isLoading"
                            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
                            <span v-if="isLoading" class="flex items-center">
                                <Icon icon="mdi:loading" class="h-5 w-5 mr-2 animate-spin" />
                                Signing in...
                            </span>
                            <span v-else>Sign In</span>
                        </button>
                    </div>
                </form>
                <div class="text-center mt-6">
                    <p class="text-sm text-gray-600">
                        Don't have an account?
                        <NuxtLink to="#" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                            Contact Admin
                        </NuxtLink>
                    </p>
                </div>
            </div>

            <!-- Animated Login Illustration -->
            <div v-motion-fade-visible-once data-aos="fade-left" class="hidden md:block relative">
                <div class="flex  justify-center items-center">
                    <img src="/login-gif.gif" alt="Login Illustration"
                        class="  object-contain transform transition-all duration-500 hover:scale-105 " />
                </div>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { ref } from 'vue'
import Swal from 'sweetalert2'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '~/store/useAuthStore'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const showPassword = ref(false)

const auth = useAuthStore()

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}


definePageMeta({
  middleware: [
    function (to, from) {
      if (import.meta.client) {
        if (useAuthStore().user) {
          return navigateTo('/');
        }
      }
    },
  ],
});

onMounted(async () => {
  const token = new URLSearchParams(window.location.search).get('key');
  if (token) {
    localStorage.setItem('refresh_token', token);
    await useAuthStore().refresh();
    if (!useAuthStore().user?.cart) {
      await useApi('/users/' + useAuthStore().user?.id, {
        method: 'PATCH',
        data: { cart: { create: [{}], update: [], delete: [] } },
      });
    }
    document.getElementById('back')?.click();
  }
});

const handleLogin = async () => {
  if (!email.value || !password.value) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'Please enter both email and password',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    })
    return
  }

  isLoading.value = true

  try {
    await auth.login({
      email: email.value,
      password: password.value
    })

    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'Redirecting to dashboard...',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500
    })

    navigateTo('/')
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error?.response?.data?.errors?.[0]?.message || 'Invalid email or password',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    })
  } finally {
    isLoading.value = false
  }
}

// console.log('auth store:', auth)
// console.log('handleLogin type:', typeof handleLogin)

definePageMeta({
  layout: 'custom',
})
</script>


<style scoped>
/* Additional custom styles */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
}
</style>