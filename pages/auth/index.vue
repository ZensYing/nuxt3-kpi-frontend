<template>
  <div class="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <BackgroundAbstractPattern />
    
    <div class="container mx-auto grid md:grid-cols-12 gap-8 items-center bg-white rounded-2xl py-10 px-2">
      <!-- Login Form Section -->
      <div class="md:col-span-5 bg-white/80 backdrop-blur-md rounded-3xl p-8  border border-slate-100 transition-all duration-500 hover:shadow-blue-100">
        <div class="flex items-center mb-6">
          <img src="/logo.png" alt="Bakseys Media Logo" class="h-10" />
          <h2 class="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">BAKSEY</h2>
        </div>

        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-800 tracking-tight">
            Welcome back
          </h2>
          <p class="text-gray-500 mt-2">
            Sign in to continue to your dashboard
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div class="relative group">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Icon icon="heroicons:envelope" class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
              </span>
              <input 
                id="email" 
                type="email" 
                v-model="email" 
                required
                class="pl-11 block w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                placeholder="name@company.com" 
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <NuxtLink to="#" class="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Forgot password?
              </NuxtLink>
            </div>
            <div class="relative group">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Icon icon="heroicons:lock-closed" class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
              </span>
              <input 
                id="password" 
                :type="showPassword ? 'text' : 'password'" 
                v-model="password" 
                required
                class="pl-11 block w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                placeholder="••••••••" 
              />
              <button 
                type="button" 
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Icon 
                  :icon="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" 
                  class="h-5 w-5" 
                />
              </button>
            </div>
          </div>

          <div class="flex items-center">
            <div class="relative inline-flex items-center">
              <input 
                id="remember-me" 
                type="checkbox" 
                v-model="rememberMe"
                class="peer h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-offset-0" 
              />
              <label for="remember-me" class="ml-2.5 text-sm text-gray-700">
                Remember me for 30 days
              </label>
            </div>
          </div>

          <div class="pt-2">
            <button 
              type="submit" 
              :disabled="isLoading"
              class="relative w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-white font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden"
            >
              <span v-if="isLoading" class="flex items-center">
                <Icon icon="svg-spinners:6-dots-scale" class="h-5 w-5 mr-2" />
                Signing in...
              </span>
              <span v-else class="flex items-center">
                Sign in
                <Icon icon="heroicons:arrow-right" class="ml-2 h-4 w-4" />
              </span>
              <span class="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 ease-out transform translate-y-full group-hover:translate-y-0 group-focus:translate-y-0"></span>
            </button>
          </div>

          <div class="relative flex py-3 items-center">
            <div class="flex-grow border-t border-gray-200"></div>
            <span class="flex-shrink mx-3 text-sm text-gray-400">or</span>
            <div class="flex-grow border-t border-gray-200"></div>
          </div>

         
        </form>

        <div class="text-center mt-6">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <NuxtLink to="#" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Contact Administrator
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Image/Visual Section -->
      <div class="hidden md:block md:col-span-7 relative">
        <div 
          v-motion-fade-visible-once 
          class="flex justify-center items-center relative"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/5 rounded-3xl"></div>
          <img 
            src="/login-gif.gif" 
            alt="Login Illustration"
            class="object-contain z-10 rounded-2xl shadow-2xl transform transition-all duration-700 hover:scale-102"
          />
          
          <!-- Decorative elements -->
          <div class="absolute -top-6 -right-6 w-16 h-16 bg-blue-500/20 backdrop-blur-lg rounded-full"></div>
          <div class="absolute -bottom-8 left-12 w-24 h-24 bg-indigo-500/10 backdrop-blur-lg rounded-full"></div>
          
          <!-- Feature callouts -->
          <div class="absolute z-10 top-6 right-8 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center space-x-3">
            <div class="bg-blue-500 p-2 rounded-lg">
              <Icon icon="heroicons:shield-check" class="h-5 w-5 text-white" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">Enhanced Security</p>
              <p class="text-xs text-gray-500">Advanced protection for your data</p>
            </div>
          </div>
          
          <div class="absolute z-10 bottom-8 right-12 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center space-x-3">
            <div class="bg-indigo-500 p-2 rounded-lg">
              <Icon icon="heroicons:chart-bar" class="h-5 w-5 text-white" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">Real-time Analytics</p>
              <!-- <p class="text-xs text-gray-500">Insights at your fingertips</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/vue';
import { useAuthStore } from '~/store/useAuthStore';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const isLoading = ref(false);
const showPassword = ref(false);

const auth = useAuthStore();

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

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
      timer: 3000,
      background: '#fff',
      iconColor: '#ef4444',
      customClass: {
        popup: 'rounded-xl shadow-lg'
      }
    });
    return;
  }

  isLoading.value = true;

  try {
    await auth.login({
      email: email.value,
      password: password.value
    });

    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'Redirecting to dashboard...',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      background: '#fff',
      iconColor: '#10b981',
      customClass: {
        popup: 'rounded-xl shadow-lg'
      }
    });

    navigateTo('/');
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error?.response?.data?.errors?.[0]?.message || 'Invalid email or password',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      background: '#fff',
      iconColor: '#ef4444',
      customClass: {
        popup: 'rounded-xl shadow-lg'
      }
    });
  } finally {
    isLoading.value = false;
  }
};

definePageMeta({
  layout: 'custom',
});
</script>

<style scoped>
/* Additional custom styles */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}

@keyframes floatAnimation {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.float-animation {
  animation: floatAnimation 6s ease-in-out infinite;
}

/* Tailwind doesn't have this by default */
.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>