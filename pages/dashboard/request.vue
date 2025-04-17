<template>
  <div class="container min-h-screen mx-auto p-4"  >
    <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg" v-motion-fade-visible-once data-aos="fade-down">
      <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <img src="/logo.png" alt="Bakseys Media Logo" class="h-12">
        <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">{{ locale === 'en' ? 'Request Commission Letter' : 'លិខិតស្នើសុំកម្រៃជើងសារ' }}</h1>
        <div class="w-12"> <img src="https://tech-cambodia.com/logo.png" alt=""></div>
      </div>

      <form @submit.prevent="submitForm" class="p-6">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-white">{{  locale === 'en' ? 'Name' : 'ឈ្មោះ' }}</label>
            <input 
              v-model="form.name" 
              type="text" 
              class="mt-1 block w-full rounded-md border-gray-300 bg-white text-black shadow-sm 
                     focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                     dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-white">{{ locale === 'en' ? 'Department' : 'ដេប៉ាតឺម៉ង់' }}</label>
            <input 
              v-model="form.department" 
              type="text" 
              class="mt-1 block w-full rounded-md border-gray-300 bg-white text-black shadow-sm 
                     focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                     dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-white">Category</label>
            <input 
              v-model="form.category" 
              type="text" 
              class="mt-1 block w-full rounded-md border-gray-300 bg-white text-black shadow-sm 
                     focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                     dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-white">Total Bonus Amount</label>
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
          <label class="block text-sm font-medium text-gray-700 dark:text-white">Date</label>
          <input 
            type="text" 
            value="26th /March/2025" 
            disabled 
            class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-gray-800 shadow-sm 
                   dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full border-collapse">
            <thead class="bg-blue-200 dark:bg-gray-700 dark:text-white">
              <tr>
                <th class="border p-2 dark:border-gray-600">Activity</th>
                <th class="border p-2 dark:border-gray-600">Bonus Fee</th>
                <th class="border p-2 dark:border-gray-600">Amount</th>
                <th class="border p-2 dark:border-gray-600">Clients</th>
                <th class="border p-2 dark:border-gray-600">Fee Charge</th>
                <th class="border p-2 dark:border-gray-600">Bonus Fee</th>
                <th class="border p-2 dark:border-gray-600">Actions</th>
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
                  <input v-model.number="activity.bonusFee" type="number" class="w-full rounded-md dark:bg-gray-800 dark:text-white" />
                </td>
                <td class="border p-2 dark:border-gray-600">
                  <input v-model.number="activity.amount" type="number" class="w-full rounded-md dark:bg-gray-800 dark:text-white" />
                </td>
    
                <!-- Modified client selection cell -->
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
                    
                    <!-- New client input that appears when "Add New" is selected -->
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
                  <input v-model.number="activity.feeCharge" type="number" class="w-full rounded-md dark:bg-gray-800 dark:text-white" />
                </td>
                <td class="border p-2 dark:border-gray-600">
                  <input v-model.number="activity.bonusFeeCalculated" type="number" class="w-full rounded-md dark:bg-gray-800 dark:text-white" />
                </td>
                <td class="border p-2 dark:border-gray-600">
                  <button 
                    type="button" 
                    @click="removeActivity(index)" 
                    class="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button 
            type="button" 
            @click="addActivity" 
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400"
          >
            Add Activity
          </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border mt-4 dark:border-gray-600">
          <div 
            v-for="(approver, index) in approvers" 
            :key="index" 
            class="border p-4 dark:border-gray-600"
          >
            <h3 class="font-bold mb-2 capitalize text-gray-800 dark:text-white">
              {{ approver.replace(/([A-Z])/g, ' $1').trim() }}
            </h3>
            <div class="mb-2">
              <label class="block text-sm text-gray-700 dark:text-gray-300">Name</label>
              <input 
                disabled
                v-model="form[approver].name" 
                type="text" 
                class="w-full border rounded px-2 py-1 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-700 dark:text-gray-300">Position</label>
              <input 
                disabled
                v-model="form[approver].position" 
                type="text" 
                class="w-full border rounded px-2 py-1 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-white">Reference</label>
          <textarea 
            v-model="form.reference" 
            class="mt-1 block w-full rounded-md border-gray-300 bg-white text-black shadow-sm 
                   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                   dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            rows="3"
          ></textarea>
        </div>

        <div class="mt-6 flex justify-end">
          <button 
            type="submit" 
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

  
  <script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { useI18n } from 'vue-i18n';
  import type  { ICampaign } from '~/types/campaigns';
  import type { Commission } from '~/types/commission';
  import { Icon } from '@iconify/vue'
  import Swal from 'sweetalert2'
  import { useAuthStore } from '~/store/useAuthStore';
  import { useRouter } from 'vue-router';
  import type { IResponse } from '~/types/api';

  const { t, locale } = useI18n();

  const campangs: ICampaign[] = (
  await (<Promise<IResponse<ICampaign[]>>>(
    useApi(
      `/items/campaigns?fields=*,client.*,client.category.*`,
      { method: 'GET' }
    )
  ))
).data;


const formCommision = (
  await (<Promise<IResponse<Commission[]>>>(
    useApi(
      `/items/baksey?filter[status]=published&fields=*,department.id,department.title,verifiedBy.id,verifiedBy.first_name,verifiedBy.last_name,verifiedBy.title,staff.id,staff.directus_users_id.id,staff.directus_users_id.first_name,staff.directus_users_id.title,staff.directus_users_id.last_name,staff.directus_users_id.email,checkBy.id,checkBy.first_name,checkBy.last_name,checkBy.title,approvedBy.id,approvedBy.first_name,approvedBy.last_name,approvedBy.title`,
      { method: 'GET' }
    )
  ))
).data;

const auth = useAuthStore()

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

  definePageMeta({
  middleware: 'auth',
});

  interface Activity {
    name: string
    bonusFee: number
    amount: number
    clients: string
    feeCharge: number
    bonusFeeCalculated: number
  }
  
  interface Person {
    name: string
    position: string
  }
  
  interface KPIForm {
    name: string
    department: string
    category: string
    
    totalBonusAmount: number
    activities: Activity[]
    requestedBy: Person
    checkedBy: Person
    verifiedBy: Person
    approvedBy: Person
    reference?: string

  }
  
  const approvers = ['requestedBy', 'checkedBy', 'verifiedBy', 'approvedBy'] as const;

  const form: Ref<KPIForm> = ref({
  name: '',
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
    name: formCommision.length > 0 && formCommision[0].checkBy ? 
      `${formCommision[0].checkBy.first_name} ${formCommision[0].checkBy.last_name}` : '',
    position: `${formCommision.length > 0 && formCommision[0].checkBy ? formCommision[0].checkBy.title : ''}`
  },
  verifiedBy: { 
    name: formCommision.length > 0 && formCommision[0].verifiedBy ? 
      `${formCommision[0].verifiedBy.first_name} ${formCommision[0].verifiedBy.last_name}` : '',
    position: `${formCommision.length > 0 && formCommision[0].verifiedBy ? formCommision[0].verifiedBy.title : ''}`
  },
  approvedBy: { 
    name: formCommision.length > 0 && formCommision[0].approvedBy ? 
      `${formCommision[0].approvedBy.first_name} ${formCommision[0].approvedBy.last_name}` : '',
    position: `${formCommision.length > 0 && formCommision[0].approvedBy ? formCommision[0].approvedBy.title : ''}`
  },
  reference: ''
})


  
  const addActivity = () => {
    form.value.activities.push({
      name: '',
      bonusFee: 0,
      amount: 0,
      clients: '',
      feeCharge: 0,
      bonusFeeCalculated: 0
    })
  }
  
  const removeActivity = (index: number) => {
    if (form.value.activities.length > 1) {
      form.value.activities.splice(index, 1)
    }
  }
  
  const submitForm = () => {
    // Add form submission logic
    console.log('Form submitted:', form.value)
    // You could add API call, validation, etc.
  }
  </script>