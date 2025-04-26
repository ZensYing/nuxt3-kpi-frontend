<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header Card -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="bg-blue-500 p-2 rounded-lg">
            <Icon icon="mdi:account-cog" class="text-white w-6 h-6" />
          </div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">{{ locale === 'en' ? 'Profile Settings' : 'ការកំណត់ប្រវត្តិរូប' }}</h1>
        </div>
        <button @click="updateProfile" :disabled="!hasChanges"
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-all">
          <Icon icon="mdi:content-save" class="w-5 h-5" />
          <span>{{ locale === 'en' ? 'Save Changes' : 'រក្សាទុកការផ្លាស់ប្តូរ' }}</span>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Profile Card -->
        <div>
          <div class="bg-white dark:bg-gray-800 rounded-xl grid grid-cols-2 lg:grid-cols-1 shadow-lg overflow-hidden">
            <!-- Cover Image -->

            <!-- Profile Image -->
            <div class="flex flex-col items-center px-6 pb-6 mt-4">
              <!-- Profile Photo with Upload Button -->
              <div class="relative group mb-4">
                <div class="rounded-full p-1 bg-white dark:bg-gray-800 shadow-md">
                  <img :src="avatarPreview || useImg(auth.user?.avatar || '/default-avatar.png')"
                    class="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800"
                    alt="Profile" />
                </div>

                <div class="absolute bottom-0 right-0">
                  <label for="avatar-upload"
                    class="cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-full p-2 border-2 border-white dark:border-gray-800 shadow-md transition-all duration-200 flex items-center justify-center">
                    <Icon icon="mdi:camera" class="h-4 w-4 text-white" />
                  </label>
                  <input id="avatar-upload" type="file" @change="handleAvatarChange" accept="image/*" class="hidden" />
                </div>
              </div>

              <!-- User Name -->
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                {{ firstName }} {{ lastName }}
              </h2>

              <!-- Job Role -->
              <div class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 mb-5">
                <Icon icon="mdi:briefcase-outline" class="w-4 h-4" />
                <span v-if="roles.length" class="font-medium">{{ roles[0] }}</span>
                <span v-else>{{ locale === 'en' ? 'No role assigned' : 'មិនបានកំណត់តួនាទី' }}</span>
              </div>

              <!-- Department Section -->
              <div class="w-full bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 shadow-sm">
                <div class="flex items-center gap-2 mb-3">
                  <Icon icon="mdi:domain" class="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ locale === 'en' ? 'Department' : 'នាយកដ្ឋាន' }}</p>
                </div>

                <div class="flex flex-wrap gap-2">
                  <span v-if="auth.user?.department?.title"
                    class="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full dark:bg-blue-900/30 dark:text-blue-300 flex items-center gap-1.5">
                    <Icon icon="mdi:tag" class="w-3 h-3" />
                    {{ auth.user.department.title }}
                  </span>
                  <span v-else class="px-3 py-1.5 text-xs italic text-gray-500 dark:text-gray-400">
                    {{ locale === 'en' ? 'No department assigned' : 'មិនបានកំណត់នាយកដ្ឋាន' }}
                  </span>
                </div>
              </div>
            </div>
            <!-- Signature Card -->
            <div class=" bg-white dark:bg-gray-800 rounded-xl shadow-lg px-6 py-2">
              <div class="flex items-center gap-2 mb-4">
                <Icon icon="mdi:signature-text" class="text-blue-600 dark:text-blue-400 w-5 h-5" />
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ locale === 'en' ? 'Signature' : 'ហត្ថលេខា' }}</h3>
              </div>

              <div class="relative group mb-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                <img class="w-full h-28 object-contain rounded-lg"
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

              <label for="signature-upload"
                class="inline-flex w-full items-center justify-center gap-2 text-sm font-medium px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-all">
                <Icon icon="mdi:upload" class="w-4 h-4" />
                {{ locale === 'en' ? 'Upload Signature' : 'បញ្ចូលហត្ថលេខា' }}
              </label>
              <input id="signature-upload" type="file" @change="handleSignatureChange" accept="image/*"
                class="hidden" />
            </div>
          </div>


        </div>

        <!-- Right Column - Form Fields -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div class="flex items-center gap-2 mb-6">
              <Icon icon="mdi:account-details" class="text-blue-600 dark:text-blue-400 w-5 h-5" />
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ locale === 'en' ? 'Personal Information' : 'ព័ត៌មានផ្ទាល់ខ្លួន' }}</h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- First Name -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ locale === 'en' ? 'First Name' : 'នាមខ្លួន' }}</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:account" class="h-5 w-5 text-gray-400" />
                  </div>
                  <input v-model="firstName" type="text"
                    class="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                </div>
              </div>

              <!-- Last Name -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ locale === 'en' ? 'Last Name' : 'នាមត្រកូល' }}</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:account-outline" class="h-5 w-5 text-gray-400" />
                  </div>
                  <input v-model="lastName" type="text"
                    class="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                </div>
              </div>
            </div>

            <!-- Email (Display Only) -->
            <div class="mt-6 space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ locale === 'en' ? 'Email Address' : 'អាសយដ្ឋានអ៊ីមែល' }}</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="mdi:email" class="h-5 w-5 text-gray-400" />
                </div>
                <input disabled :value="auth.user?.email || (locale === 'en' ? 'Not available' : 'មិនមានទេ')" type="email"
                  class="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed" />
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ locale === 'en' ? 'Contact your administrator to change your email address' : 'ទាក់ទងអ្នកគ្រប់គ្រងរបស់អ្នកដើម្បីផ្លាស់ប្តូរអាសយដ្ឋានអ៊ីមែលរបស់អ្នក' }}</p>
            </div>
            <div class="mt-6 bg-white dark:bg-gray-800 rounded-xl  ">
              <div class="flex items-center gap-2 mb-6">
                <Icon icon="mdi:shield-lock" class="text-blue-600 dark:text-blue-400 w-5 h-5" />
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ locale === 'en' ? 'Password Settings' : 'ការកំណត់ពាក្យសម្ងាត់' }}</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Password -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ locale === 'en' ? 'New Password' : 'ពាក្យសម្ងាត់ថ្មី' }}</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon icon="mdi:lock-outline" class="h-5 w-5 text-gray-400" />
                    </div>
                    <input v-model="password" type="password"
                      class="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      :placeholder="locale === 'en' ? 'Leave blank to keep current' : 'ទុកឱ្យទទេដើម្បីរក្សាបច្ចុប្បន្ន'" />
                  </div>
                </div>

                <!-- Confirm Password -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ locale === 'en' ? 'Confirm New Password' : 'បញ្ជាក់ពាក្យសម្ងាត់ថ្មី' }}</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon icon="mdi:lock-check-outline" class="h-5 w-5 text-gray-400" />
                    </div>
                    <input v-model="confirmPassword" type="password"
                      class="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      :placeholder="locale === 'en' ? 'Leave blank to keep current' : 'ទុកឱ្យទទេដើម្បីរក្សាបច្ចុប្បន្ន'" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Password Section -->

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/store/useAuthStore';
import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n';
// Page meta
definePageMeta({
  middleware: 'auth',
});
// Store
const auth = useAuthStore();
const { t, locale } = useI18n();
// Form State
const firstName = ref('');
const lastName = ref('');
const roles = ref<string[]>([]);
const password = ref('');
const confirmPassword = ref('');
const avatarFile = ref<File | null>(null);
const signature = ref<File | null>(null);
const avatarPreview = ref<string | null>(null);
const signaturePreview = ref<string | null>(null);

// Original Values
const originalFirstName = ref('');
const originalLastName = ref('');

// Load user data on component mount
onMounted(() => {
  if (auth.user) {
    firstName.value = auth.user.first_name;
    lastName.value = auth.user.last_name;
    roles.value = auth.user?.role?.name ? [auth.user.role.name] : [];
    originalFirstName.value = auth.user.first_name;
    originalLastName.value = auth.user.last_name;
  }
});

// File size limit
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// Avatar file handling
const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'Avatar image must be less than 2MB. Please select a smaller file.',
        confirmButtonText: 'OK',
      });
      avatarFile.value = null;
      avatarPreview.value = null;
      return;
    }

    avatarFile.value = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

// Signature file handling
const handleSignatureChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'Signature image must be less than 2MB. Please select a smaller file.',
        confirmButtonText: 'OK',
      });
      signature.value = null;
      signaturePreview.value = null;
      return;
    }

    signature.value = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      signaturePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

// Check if form has changes
const hasChanges = computed(() => {
  return (
    firstName.value !== originalFirstName.value ||
    lastName.value !== originalLastName.value ||
    password.value.trim() !== '' ||
    avatarFile.value !== null ||
    signature.value !== null
  );
});

// Update profile function
const updateProfile = async () => {
  // Validate passwords match
  if (password.value && password.value !== confirmPassword.value) {
    Swal.fire({
      icon: 'error',
      title: 'Password Mismatch',
      text: 'New password and confirmation do not match. Please try again.',
      confirmButtonText: 'OK',
    });
    return;
  }

  try {
    // Show loading state
    Swal.fire({
      title: 'Updating Profile...',
      text: 'Please wait while your profile is being updated.',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Prepare data for update
    const updateData: {
      first_name: string;
      last_name: string;
      password?: string;
    } = {
      first_name: firstName.value,
      last_name: lastName.value,
    };

    // Only include password if provided
    if (password.value.trim() !== '') {
      updateData.password = password.value.trim();
    }

    // Call the API through the store
    await auth.updateUserProfile(updateData, avatarFile.value || undefined, signature.value || undefined);

    // Success message
    Swal.fire({
      icon: 'success',
      title: 'Profile Updated',
      text: 'Your profile has been updated successfully.',
      confirmButtonText: 'OK',
    }).then(() => {
      // Reload to apply changes
      window.location.reload();
    });
  } catch (error) {
    // Error handling
    Swal.fire({
      icon: 'error',
      title: 'Update Failed',
      text: 'There was an error updating your profile. Please try again.',
      confirmButtonText: 'OK',
    });
  }
};
</script>