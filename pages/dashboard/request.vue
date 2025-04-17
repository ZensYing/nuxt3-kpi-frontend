<template>
  <div class="container min-h-screen mx-auto p-4">
    <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg" v-motion-fade-visible-once>
      <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <img src="/logo.png" alt="Bakseys Media Logo" class="h-12">
        <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">{{ locale === 'en' ? 'Request Commission Letter' : 'លិខិតស្នើសុំកម្រៃជើងសារ' }}</h1>
        <div class="w-12"> <img src="" alt="Tech Cambodia Logo" class="h-full"></div>
      </div>

      <form @submit.prevent="submitForm" class="p-6">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-white">{{ locale === 'en' ? 'Name' : 'ឈ្មោះ' }}</label>
            <input 
              readonly
              v-model="form.name" 
              type="text" 
              class="mt-1 block w-full rounded-md border-gray-300 bg-white text-black shadow-sm 
                     focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                     dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-white">{{ locale === 'en' ? 'Department' : 'ដេប៉ាតឺម៉ង់' }}</label>
            <select
              v-model="form.department"
              class="mt-1 block w-full rounded-md border-gray-300 bg-white text-black shadow-sm 
                     focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                     dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            >
              <option value="" disabled>Select Department</option>
              <option v-for="dept in availableDepartments" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-white">{{ locale === 'en' ? 'Category' : 'ប្រភេទ' }}</label>
            <input 
              v-model="form.category" 
              type="text" 
              class="mt-1 block w-full rounded-md border-gray-300 bg-white text-black shadow-sm 
                     focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                     dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-white">{{ locale === 'en' ? 'Total Bonus Amount' : 'ចំនួនប្រាក់រង្វាន់សរុប' }}</label>
            <input 
              v-model.number="form.totalBonusAmount" 
              type="number" 
              class="mt-1 block w-full rounded-md border-gray-300 bg-white text-black shadow-sm 
                     focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                     dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-white">{{ locale === 'en' ? 'Date' : 'កាលបរិច្ឆេទ' }}</label>
          <input 
            type="text" 
            :value="currentDate" 
            disabled 
            class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-gray-800 shadow-sm 
                   dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full border-collapse">
            <thead class="bg-blue-200 dark:bg-gray-700 dark:text-white">
              <tr>
                <th class="border p-2 dark:border-gray-600">{{ locale === 'en' ? 'Activity' : 'សកម្មភាព' }}</th>
                <th class="border p-2 dark:border-gray-600">{{ locale === 'en' ? 'Bonus Fee' : 'ប្រាក់រង្វាន់' }}</th>
                <th class="border p-2 dark:border-gray-600">{{ locale === 'en' ? 'Amount' : 'ចំនួន' }}</th>
                <th class="border p-2 dark:border-gray-600">{{ locale === 'en' ? 'Clients' : 'អតិថិជន' }}</th>
                <th class="border p-2 dark:border-gray-600">{{ locale === 'en' ? 'Fee Charge' : 'កម្រៃសេវា' }}</th>
                <th class="border p-2 dark:border-gray-600">{{ locale === 'en' ? 'Bonus Fee' : 'ប្រាក់រង្វាន់' }}</th>
                <th class="border p-2 dark:border-gray-600">{{ locale === 'en' ? 'Actions' : 'សកម្មភាព' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(activity, index) in form.activities" 
                :key="index" 
                class="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td class="border p-2 dark:border-gray-600">
                  <input v-model="activity.name" type="text" class="w-full rounded-md dark:bg-gray-800 dark:text-white" />
                </td>
                <td class="border p-2 dark:border-gray-600">
                  <input v-model.number="activity.bonusFee" type="number" class="w-full rounded-md dark:bg-gray-800 dark:text-white" @input="calculateBonusFee(index)" />
                </td>
                <td class="border p-2 dark:border-gray-600">
                  <input v-model.number="activity.amount" type="number" class="w-full rounded-md dark:bg-gray-800 dark:text-white" @input="calculateBonusFee(index)" />
                </td>
    
                <td class="border p-2 dark:border-gray-600">
                  <div class="relative">
                    <select 
                      v-model="activity.clients"
                      class="w-full rounded-md dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 mb-1"
                      @change="handleClientChange($event, index)"
                    >
                      <option value="" disabled>Select Client</option>
                      <option value="none">None (អត់មាន)</option>
                      <option value="add_new">+ Add New Client</option>
                      <option 
                        v-for="client in availableClients" 
                        :key="client.id" 
                        :value="client.name"
                      >
                        {{ client.name }}
                      </option>
                    </select>
                    
                    <div v-if="showNewClientInput[index]" class="mt-1">
                      <div class="flex">
                        <input 
                          v-model="newClientNames[index]" 
                          type="text" 
                          placeholder="Enter new client name"
                          class="w-full rounded-l-md dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
                          @keyup.enter="addNewClient(index)"
                        />
                        <button 
                          type="button"
                          @click="addNewClient(index)" 
                          class="bg-green-500 text-white px-2 py-1 rounded-r-md hover:bg-green-600"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="border p-2 dark:border-gray-600">
                  <input v-model.number="activity.feeCharge" type="number" class="w-full rounded-md dark:bg-gray-800 dark:text-white" @input="calculateBonusFee(index)" />
                </td>
                <td class="border p-2 dark:border-gray-600">
                  <input v-model.number="activity.bonusFeeCalculated" type="number" readonly class="w-full rounded-md dark:bg-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700" />
                </td>
                <td class="border p-2 dark:border-gray-600">
                  <button 
                    type="button" 
                    @click="removeActivity(index)" 
                    class="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  >
                    <span v-if="form.activities.length > 1">Remove</span>
                    <span v-else>Clear</span>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <td colspan="5" class="border p-2 text-right font-bold dark:border-gray-600">
                  {{ locale === 'en' ? 'Total:' : 'សរុប:' }}
                </td>
                <td class="border p-2 font-bold dark:border-gray-600">
                  {{ totalBonusFeeCalculated }}
                </td>
                <td class="border p-2 dark:border-gray-600"></td>
              </tr>
            </tfoot>
          </table>
          <button 
            type="button" 
            @click="addActivity" 
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400"
          >
            {{ locale === 'en' ? 'Add Activity' : 'បន្ថែមសកម្មភាព' }}
          </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border mt-4 dark:border-gray-600">
          <div 
            v-for="(approver, index) in approvers" 
            :key="index" 
            class="border p-4 dark:border-gray-600"
          >
            <h3 class="font-bold mb-2 capitalize text-gray-800 dark:text-white">
              {{ formatApproverTitle(approver) }}
            </h3>
            <div class="mb-2">
              <label class="block text-sm text-gray-700 dark:text-gray-300">{{ locale === 'en' ? 'Name' : 'ឈ្មោះ' }}</label>
              <input 
                readonly
                v-model="form[approver].name" 
                type="text" 
                class="w-full border rounded px-2 py-1 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-700 dark:text-gray-300">{{ locale === 'en' ? 'Position' : 'តួនាទី' }}</label>
              <input 
                readonly
                v-model="form[approver].position" 
                type="text" 
                class="w-full border rounded px-2 py-1 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-white">{{ locale === 'en' ? 'Reference' : 'យោង' }}</label>
          <textarea 
            v-model="form.reference" 
            class="mt-1 block w-full rounded-md border-gray-300 bg-white text-black shadow-sm 
                   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                   dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            rows="3"
          ></textarea>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button 
            type="button" 
            @click="resetForm"
            class="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 dark:hover:bg-gray-400"
          >
            {{ locale === 'en' ? 'Reset' : 'កំណត់ឡើងវិញ' }}
          </button>
          <button 
            type="submit" 
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500"
          >
            {{ locale === 'en' ? 'Submit Request' : 'ដាក់ស្នើសុំ' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import type { Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ICampaign } from '~/types/campaigns';
import type { Commission } from '~/types/commission';
import Swal from 'sweetalert2';
import { useAuthStore } from '~/store/useAuthStore';
import { useRouter } from 'vue-router';
import type { IResponse } from '~/types/api';

const { t, locale } = useI18n();
const router = useRouter();
const auth = useAuthStore();

// Format date as "26th /March/2025"
const currentDate = computed(() => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  
  // Add ordinal suffix
  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  
  return `${getOrdinal(day)} /${month}/${year}`;
});

// Fetch campaigns from API
const campangs: ICampaign[] = (
  await (<Promise<IResponse<ICampaign[]>>>(
    useApi(
      `/items/campaigns?fields=*,client.*,client.category.*`,
      { method: 'GET' }
    )
  ))
).data;

// Fetch commission data from API
const formCommision = (
  await (<Promise<IResponse<Commission[]>>>(
    useApi(
      `/items/baksey?filter[status]=published&fields=*,department.id,department.title,verifiedBy.id,verifiedBy.first_name,verifiedBy.last_name,verifiedBy.title,staff.id,staff.directus_users_id.id,staff.directus_users_id.first_name,staff.directus_users_id.title,staff.directus_users_id.last_name,staff.directus_users_id.email,checkBy.id,checkBy.first_name,checkBy.last_name,checkBy.title,approvedBy.id,approvedBy.first_name,approvedBy.last_name,approvedBy.title`,
      { method: 'GET' }
    )
  ))
).data;

// Store for custom added clients
const customClients = ref<{ id: string; name: string }[]>([]);

// Computed property to combine both API clients and custom added clients
const availableClients = computed(() => {
  return [...campangs, ...customClients.value];
});

// Track which rows have the "add new client" input showing
const showNewClientInput = ref<Record<number, boolean>>({});

// Store new client names being typed
const newClientNames = ref<Record<number, string>>({});

// Define types
interface Activity {
  name: string;
  bonusFee: number;
  amount: number;
  clients: string;
  feeCharge: number;
  bonusFeeCalculated: number;
}

interface Person {
  name: string;
  position: string;
}

interface KPIForm {
  name: string;
  department: string;
  category: string;
  totalBonusAmount: number;
  activities: Activity[];
  requestedBy: Person;
  checkedBy: Person;
  verifiedBy: Person;
  approvedBy: Person;
  reference?: string;
}

const approvers = ['requestedBy', 'checkedBy', 'verifiedBy', 'approvedBy'] as const;

// Format approver titles for display
const formatApproverTitle = (approver: string) => {
  const titles = {
    requestedBy: locale.value === 'en' ? 'Requested By' : 'ស្នើសុំដោយ',
    checkedBy: locale.value === 'en' ? 'Checked By' : 'ត្រួតពិនិត្យដោយ',
    verifiedBy: locale.value === 'en' ? 'Verified By' : 'ផ្ទៀងផ្ទាត់ដោយ',
    approvedBy: locale.value === 'en' ? 'Approved By' : 'អនុម័តដោយ'
  };
  
  return titles[approver as keyof typeof titles] || approver.replace(/([A-Z])/g, ' $1').trim();
};

// Initialize form
const form: Ref<KPIForm> = ref({
  name: auth.user?.first_name + ' ' + auth.user?.last_name || '',
  department: '',
  category: '',
  totalBonusAmount: 0,
  activities: [{
    name: '',
    bonusFee: 0,
    amount: 0,
    clients: '',
    feeCharge: 0,
    bonusFeeCalculated: 0
  }],
  requestedBy: {  
    name: auth.user?.first_name + ' ' + auth.user?.last_name || '',
    position: auth.user?.title || ''
  },
  checkedBy: { 
    name: '',
    position: ''
  },
  verifiedBy: { 
    name: '',
    position: ''
  },
  approvedBy: { 
    name: '',
    position: ''
  },
  reference: ''
});

// Calculate total bonus fee
const totalBonusFeeCalculated = computed(() => {
  return form.value.activities.reduce((sum, activity) => sum + (activity.bonusFeeCalculated || 0), 0);
});

// Create a reactive departments list for department dropdown
const availableDepartments = computed(() => {
  const departments = formCommision
    .filter(commission => commission.department?.title)
    .map(commission => commission.department.title);
  
  // Remove duplicates
  return [...new Set(departments)];
});

// Debug function to help troubleshoot
const logDebugInfo = () => {
  console.log('User auth info:', auth.user);
  console.log('Current form department:', form.value.department);
  console.log('Available commission departments:', formCommision.map(c => c.department?.title));
};

// Function to calculate bonus fee for an activity
const calculateBonusFee = (index: number) => {
  const activity = form.value.activities[index];
  activity.bonusFeeCalculated = activity.bonusFee * activity.amount * (activity.feeCharge / 100);
  
  // Update total bonus amount
  form.value.totalBonusAmount = totalBonusFeeCalculated.value;
};

// Handle change in the client dropdown
const handleClientChange = (event: Event, index: number) => {
  const select = event.target as HTMLSelectElement;
  
  if (select.value === 'add_new') {
    // Show the input field for adding a new client
    showNewClientInput.value[index] = true;
    // Reset the selected value temporarily
    form.value.activities[index].clients = '';
  } else {
    // Hide the input field
    showNewClientInput.value[index] = false;
  }
};

// Add a new client to the list
const addNewClient = (index: number) => {
  const newClientName = newClientNames.value[index]?.trim();
  
  if (newClientName) {
    // Create a unique ID for the new client
    const newId = `custom-${Date.now()}`;
    
    // Add to custom clients list
    customClients.value.push({
      id: newId,
      name: newClientName
    });
    
    // Set the new client as the selected value
    form.value.activities[index].clients = newClientName;
    
    // Reset and hide the input
    newClientNames.value[index] = '';
    showNewClientInput.value[index] = false;
  }
};

// Separate function to update approvers for better organization
const updateApprovers = (departmentName: string) => {
  if (!departmentName) return;
  
  console.log('Updating approvers for department:', departmentName);
  
  // Case-insensitive matching with trimming for better matching
  const departmentCommission = formCommision.find(commission => 
    commission.department?.title?.toLowerCase().trim() === departmentName.toLowerCase().trim()
  );
  
  if (departmentCommission) {
    console.log('Found matching commission record:', departmentCommission);
    
    // Update checkedBy
    if (departmentCommission.checkBy) {
      form.value.checkedBy.name = `${departmentCommission.checkBy.first_name} ${departmentCommission.checkBy.last_name}`;
      form.value.checkedBy.position = departmentCommission.checkBy.title || '';
    }
    
    // Update verifiedBy
    if (departmentCommission.verifiedBy) {
      form.value.verifiedBy.name = `${departmentCommission.verifiedBy.first_name} ${departmentCommission.verifiedBy.last_name}`;
      form.value.verifiedBy.position = departmentCommission.verifiedBy.title || '';
    }
    
    // Update approvedBy
    if (departmentCommission.approvedBy) {
      form.value.approvedBy.name = `${departmentCommission.approvedBy.first_name} ${departmentCommission.approvedBy.last_name}`;
      form.value.approvedBy.position = departmentCommission.approvedBy.title || '';
    }
  } else {
    console.warn('No matching department found in commission records for:', departmentName);
    
    // If no matching department is found, reset approver fields
    form.value.checkedBy = { name: '', position: '' };
    form.value.verifiedBy = { name: '', position: '' };
    form.value.approvedBy = { name: '', position: '' };
  }
};

// Add a new activity row
const addActivity = () => {
  form.value.activities.push({
    name: '',
    bonusFee: 0,
    amount: 0,
    clients: '',
    feeCharge: 0,
    bonusFeeCalculated: 0
  });
};

// Remove an activity row
const removeActivity = (index: number) => {
  if (form.value.activities.length > 1) {
    form.value.activities.splice(index, 1);
  } else {
    // Clear the single row instead of removing it
    form.value.activities[0] = {
      name: '',
      bonusFee: 0,
      amount: 0,
      clients: '',
      feeCharge: 0,
      bonusFeeCalculated: 0
    };
  }
  
  // Recalculate total
  form.value.totalBonusAmount = totalBonusFeeCalculated.value;
};

// Reset form to initial state
const resetForm = () => {
  form.value = {
    name: auth.user?.first_name + ' ' + auth.user?.last_name || '',
    department: '',
    category: '',
    totalBonusAmount: 0,
    activities: [{
      name: '',
      bonusFee: 0,
      amount: 0,
      clients: '',
      feeCharge: 0,
      bonusFeeCalculated: 0
    }],
    requestedBy: {  
      name: auth.user?.first_name + ' ' + auth.user?.last_name || '',
      position: auth.user?.title || ''
    },
    checkedBy: { 
      name: '',
      position: ''
    },
    verifiedBy: { 
      name: '',
      position: ''
    },
    approvedBy: { 
      name: '',
      position: ''
    },
    reference: ''
  };
  
  // Reset custom clients
  customClients.value = [];
  showNewClientInput.value = {};
  newClientNames.value = {};
};

// Submit form to API
const submitForm = async () => {
  try {
    // Validate form
    if (!form.value.name || !form.value.department) {
      return Swal.fire({
        title: locale.value === 'en' ? 'Validation Error' : 'កំហុសការផ្ទៀងផ្ទាត់',
        text: locale.value === 'en' ? 'Please fill in all required fields' : 'សូមបំពេញគ្រប់វាលដែលត្រូវការ',
        icon: 'error'
      });
    }
    
    // Check for empty activities
    const hasEmptyActivity = form.value.activities.some(a => !a.name);
    if (hasEmptyActivity) {
      return Swal.fire({
        title: locale.value === 'en' ? 'Validation Error' : 'កំហុសការផ្ទៀងផ្ទាត់',
        text: locale.value === 'en' ? 'All activities must have a name' : 'សកម្មភាពទាំងអស់ត្រូវតែមានឈ្មោះ',
        icon: 'error'
      });
    }
    
    // Show loading indicator
    Swal.fire({
      title: locale.value === 'en' ? 'Submitting...' : 'កំពុងដាក់ស្នើ...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    // Send data to API
    // const response = await useApi('/items/commission_requests', {
    //   method: 'POST',
    //   body: form.value
    // });
    
    // Show success message
    Swal.fire({
      title: locale.value === 'en' ? 'Success!' : 'ជោគជ័យ!',
      text: locale.value === 'en' ? 'Your commission request has been submitted successfully' : 'សំណើកម្រៃជើងសាររបស់អ្នកត្រូវបានដាក់ស្នើដោយជោគជ័យ',
      icon: 'success',
      confirmButtonText: locale.value === 'en' ? 'View Requests' : 'មើលសំណើ'
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to commission requests list
        router.push('/commission-requests');
      }
    });
    
    // Reset form
    resetForm();
    
  } catch (error) {
    console.error('Error submitting form:', error);
    Swal.fire({
      title: locale.value === 'en' ? 'Error' : 'មានបញ្ហា',
      text: locale.value === 'en' ? 'An error occurred while submitting your request' : 'មានកំហុសកើតឡើងពេលដាក់ស្នើសុំរបស់អ្នក',
      icon: 'error'
    });
  }
};

// Watch for department changes
watch(() => form.value.department, (newDepartment) => {
  if (newDepartment) {
    updateApprovers(newDepartment);
  }
});

// Initialize component
onMounted(() => {
  logDebugInfo();
  
  // If user department matches an available department, select it by default
  if (auth.user?.departments?.text) {
    const userDepartment = auth.user.departments.text;
    const matchingDept = availableDepartments.value.find(
      dept => dept.toLowerCase().trim() === userDepartment.toLowerCase().trim()
    );
    
    if (matchingDept) {
      form.value.department = matchingDept;
      updateApprovers(matchingDept);
    }
  }
});

definePageMeta({
  middleware: 'auth',
});
</script>