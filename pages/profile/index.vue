<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg" v-motion-fade-visible-once
      data-aos="fade-down">

      <!-- Header -->
      <div class="flex items-center gap-2 mb-8">
        <Icon icon="mdi:account-cog" class="text-blue-600 dark:text-blue-400 w-6 h-6" />
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Profile Settings</h1>
      </div>
      
      <!-- Avatar & User Info Card -->
      <div class="mb-10 bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <!-- Avatar Section -->
          <div class="relative flex-shrink-0">
            <div class="relative group">
              <img :src="avatarPreview || useImg(auth.user?.avatar || '/default-avatar.png')"
                class="w-28 h-28 rounded-2xl object-cover border-2 border-gray-200 dark:border-gray-700 shadow transition-all group-hover:brightness-90"
                alt="Avatar Preview" />
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-all flex items-center justify-center">
                <label for="avatar-upload" class="cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                  <div class="bg-blue-600 rounded-full p-2 shadow-md">
                    <Icon icon="mdi:camera" class="h-6 w-6 text-white" />
                  </div>
                </label>
              </div>
              <div class="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1.5 shadow-md">
                <label for="avatar-upload" class="cursor-pointer">
                  <Icon icon="mdi:camera" class="h-5 w-5 text-white" />
                </label>
                <input id="avatar-upload" type="file" @change="handleAvatarChange" accept="image/*" class="hidden" />
              </div>
            </div>
          </div>

          <!-- User Info -->
          <div class="flex-1">
            <div class="mb-4 text-center md:text-left">
              <h2 class="text-xl font-semibold text-gray-800 dark:text-white">{{ firstName }} {{ lastName }}</h2>
              <div
                class="flex items-center justify-center md:justify-start gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <Icon icon="mdi:briefcase-outline" class="w-4 h-4" />
                <span v-if="roles.length" class="font-medium">{{ roles[0] }}</span>
              </div>
            </div>

            <!-- Department Tags -->
            <div class="py-2 px-4 bg-white dark:bg-gray-700/50 rounded-lg">
              <div class="flex items-center gap-1.5 mb-2">
                <Icon icon="mdi:domain" class="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <p class="text-xs font-medium text-gray-700 dark:text-gray-300">Departments</p>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <span 
                  class="px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full dark:bg-blue-900/30 dark:text-blue-300 flex items-center gap-1">
                  <Icon icon="mdi:tag" class="w-3 h-3" />
                  {{ auth.user?.department?.title }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- First Name -->
        <div class="space-y-2">
          <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Icon icon="mdi:account" class="w-4 h-4" />
            First Name
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="mdi:account-outline" class="h-5 w-5 text-gray-400" />
            </div>
            <input v-model="firstName" type="text"
              class="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
          </div>
        </div>

        <!-- Last Name -->
        <div class="space-y-2">
          <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Icon icon="mdi:account-outline" class="w-4 h-4" />
            Last Name
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="mdi:account-outline" class="h-5 w-5 text-gray-400" />
            </div>
            <input v-model="lastName" type="text"
              class="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
          </div>
        </div>

        <!-- Password -->
        <div class="space-y-2">
          <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Icon icon="mdi:lock-outline" class="w-4 h-4" />
            New Password
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="mdi:lock-outline" class="h-5 w-5 text-gray-400" />
            </div>
            <input v-model="password" type="password"
              class="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="••••••••" />
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="space-y-2">
          <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Icon icon="mdi:lock-check-outline" class="w-4 h-4" />
            Confirm Password
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="mdi:lock-check-outline" class="h-5 w-5 text-gray-400" />
            </div>
            <input v-model="confirmPassword" type="password"
              class="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="••••••••" />
          </div>
        </div>
        <!-- signature image -->
        <!-- Signature Image -->
        <div class="space-y-2">
          <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Icon icon="mdi:image" class="w-4 h-4" />
            Signature
          </label>
          <div class="relative">
            <!-- Signature image preview -->
            <div class="relative group mb-3">
              <img class="w-full h-24 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                :src="signaturePreview || useImg(auth.user?.signature || '/default-signature.png')" alt="Signature" />

              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-all flex items-center justify-center">
                <label for="signature-upload" class="cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                  <div class="bg-blue-600 rounded-full p-2 shadow-md">
                    <Icon icon="mdi:camera" class="h-5 w-5 text-white" />
                  </div>
                </label>
              </div>
            </div>

            <!-- File input styled as button -->
            <label for="signature-upload"
              class="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-all">
              <Icon icon="mdi:upload" class="w-4 h-4" />
              Upload Signature
            </label>
            <input id="signature-upload" type="file" @change="handleSignatureChange" accept="image/*" class="hidden" />
          </div>
        </div>
        <!-- Update Button -->
        <div class="mt-8">
          <button @click="updateProfile" :disabled="!hasChanges"
            class="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <Icon icon="mdi:content-save" class="w-5 h-5" />
            <span>Update Profile</span>
          </button>
        </div>
      </div>
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
definePageMeta({
  middleware: 'auth',
});

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
const signature = ref<File | null>(null);
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
    departments.value = Array.isArray(auth.user?.department) ? auth.user.department : [];
    roles.value = auth.user?.role.name ? [auth.user.role.name] : [];
    originalFirstName.value = auth.user.first_name;
    originalLastName.value = auth.user.last_name;
  }
});

console.log('auth user:', auth.user)

// (Removed duplicate declaration of formatDepartments)

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

// Computed property to check if the form is valid

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
// Add this variable to store the signature preview
const signaturePreview = ref<string | null>(null);

// Update the handleSignatureChange function
const handleSignatureChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    
    // Check if the file exceeds the maximum allowed size
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: 'error',
        title: 'File too large',
        text: 'Signature image must be less than 2MB. Please select a smaller file.',
        confirmButtonText: 'OK',
      });
      signature.value = null;
      signaturePreview.value = null;
      return;
    }
    
    signature.value = file;
    
    // Create a preview of the selected signature
    const reader = new FileReader();
    reader.onload = (e) => {
      signaturePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

// Update the hasChanges computed property to include signature
const hasChanges = computed(() => {
  return (
    firstName.value !== originalFirstName.value ||
    lastName.value !== originalLastName.value ||
    password.value.trim() !== '' ||
    avatarFile.value !== null ||
    signature.value !== null // Add this line to check signature changes
  );
});


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
    await auth.updateUserProfile(updateData, avatarFile.value || undefined, signature.value || undefined);

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

<style scoped></style>