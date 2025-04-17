<template>
    <div class="mx-auto px-4 py-4 min-h-screen bg-gray-50 dark:bg-gray-900" v-motion-fade-visible-once
        data-aos="fade-down">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">PR Tracking List</h2>
            <input v-model="searchQuery" type="text" placeholder="Search by client, creator, etc..." class="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none 
                 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 transition" />
        </div>
        <div class="flex gap-2 mb-4">
            <button @click="exportToCSV" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">Export
                CSV</button>
            <button @click="exportToExcel" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Export
                Excel</button>
            <button @click="exportToPDF" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Export
                PDF</button>
        </div>


        <div class="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <table class=" text-sm text-left table-fixed">
                <thead class="bg-red-500 text-white ">
                    <tr>
                        <th class="px-2 py-2">Client</th>
                        <th class="px-2 py-2">Scope of Work</th>
                        <th class="px-2 py-2">Creator</th>
                        <th class="px-2 py-2">Cameraman & Editor</th>
                        <th class="px-2 py-2">Start Date</th>
                        <th class="px-2 py-2">End Date</th>
                        <th class="px-2 py-2">Status</th>
                        <th class="px-2 py-2">Telegram</th>
                        <th class="px-2 py-2">Facebook</th>
                        <th class="px-2 py-2">YouTube</th>
                        <th class="px-2 py-2">TikTok</th>
                        <th class="px-2 py-2">Note</th>
                        <th class="px-2 py-2">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedData" :key="item.client + item.creator + item.startDate"
                        class="border-b dark:border-gray-700 dark:text-white">
                        <td class="px-4 py-2">{{ item.client }}</td>
                        <td class="px-4 py-2 ">{{ item.scopeOfWork }}</td>
                        <td class="px-4 py-2 ">{{ item.creator }}</td>
                        <td class="px-4 py-2 ">{{ item.cameramanEditor }}</td>
                        <td class="px-4 py-2 ">{{ item.startDate }}</td>
                        <td class="px-4 py-2 ">{{ item.endDate }}</td>
                        <td class="px-4 py-2 ">{{ item.status }}</td>
                        <td class="px-4 py-2 ">
                            <a v-if="item.telegramGroupLink" :href="item.telegramGroupLink" target="_blank"
                                class="text-blue-400 hover:underline">Telegram</a>
                        </td>
                        <td class="px-4 py-2">
                            <a v-if="item.facebookLink" :href="item.facebookLink" target="_blank"
                                class="text-blue-600 hover:underline">Facebook</a>
                        </td>
                        <td class="px-4 py-2">
                            <a v-if="item.youtubeLink" :href="item.youtubeLink" target="_blank"
                                class="text-red-600 hover:underline">YouTube</a>
                        </td>
                        <td class="px-4 py-2">
                            <a v-if="item.tiktokLink" :href="item.tiktokLink" target="_blank"
                                class="text-pink-500 hover:underline">TikTok</a>
                        </td>
                        <td class="px-4 py-2">{{ item.projectNote }}</td>
                        <td class="px-4 py-2 space-x-2">
                            <button @click="editItem(item)" class="text-yellow-500 hover:text-yellow-600 font-semibold">
                                Edit
                            </button>
                            <button @click="deleteItem(item)" class="text-red-500 hover:text-red-600 font-semibold">
                                Delete
                            </button>
                        </td>
                    </tr>
                    <tr v-if="filteredData.length === 0">
                        <td colspan="13" class="text-center py-4 text-gray-500 dark:text-gray-400">No data found.</td>
                    </tr>

                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-end mt-4 space-x-2">
            <button @click="currentPage--" :disabled="currentPage === 1"
                class="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50">
                Prev
            </button>
            <span class="px-3 py-1 dark:text-white">{{ currentPage }} / {{ totalPages }}</span>
            <button @click="currentPage++" :disabled="currentPage === totalPages"
                class="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50">
                Next
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
definePageMeta({
  middleware: 'auth',
});

// Dummy data (replace with real backend fetch logic)
const prData = ref([
    {
        client: 'Client A',
        scopeOfWork: 'Content Strategy',
        creator: 'John Doe',
        cameramanEditor: 'Jane Smith',
        startDate: '2025-03-01',
        endDate: '2025-03-31',
        status: 'In Progress',
        telegramGroupLink: 'https://t.me/sample1',
        facebookLink: 'https://facebook.com/sample1',
        youtubeLink: 'https://youtube.com/sample1',
        tiktokLink: 'https://tiktok.com/@sample1',
        projectNote: 'Running 3 campaigns this month.'
    },
    {
        client: 'Client B',
        scopeOfWork: 'Brand PR & Promotion',
        creator: 'Alice',
        cameramanEditor: 'Bob',
        startDate: '2025-03-02',
        endDate: '2025-03-30',
        status: 'Completed',
        telegramGroupLink: '',
        facebookLink: 'https://facebook.com/sample2',
        youtubeLink: '',
        tiktokLink: 'https://tiktok.com/@sample2',
        projectNote: 'Completed all videos and distributed.'
    }
    // Add more data as needed
])

const editItem = (item: any) => {
    Swal.fire({
        title: 'Edit Feature Coming Soon!',
        text: `You clicked edit for "${item.client}"`,
        icon: 'info',
        confirmButtonText: 'OK'
    })
}

const deleteItem = async (item: any) => {
    const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete "${item.client}"`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    })

    if (confirm.isConfirmed) {
        const index = prData.value.findIndex((el) => el.client === item.client && el.creator === item.creator)
        if (index !== -1) {
            prData.value.splice(index, 1)
            Swal.fire('Deleted!', 'Your data has been removed.', 'success')
        }
    }
}

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 5

const filteredData = computed(() =>
    prData.value.filter((item) =>
        Object.values(item).some((val) =>
            String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    )
)

const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize))

const paginatedData = computed(() =>
    filteredData.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
)

// 
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(prData.value)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PR_Tracking')
    const csvOutput = XLSX.write(workbook, { bookType: 'csv', type: 'array' })
    const blob = new Blob([csvOutput], { type: 'text/csv' })
    saveAs(blob, 'pr_tracking.csv')
}

const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(prData.value)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PR_Tracking')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'pr_tracking.xlsx')
}

const exportToPDF = () => {
    const doc = new jsPDF()
    const tableData = prData.value.map((item) => [
        item.client,
        item.scopeOfWork,
        item.creator,
        item.cameramanEditor,
        item.startDate,
        item.endDate,
        item.status,
        item.telegramGroupLink,
        item.facebookLink,
        item.youtubeLink,
        item.tiktokLink,
        item.projectNote
    ])
    autoTable(doc, {
        head: [[
            'Client', 'Scope', 'Creator', 'Camera/Editor', 'Start', 'End', 'Status',
            'Telegram', 'Facebook', 'YouTube', 'TikTok', 'Note'
        ]],
        body: tableData
    })
    doc.save('pr_tracking.pdf')
}

</script>
<style scoped>

</style>