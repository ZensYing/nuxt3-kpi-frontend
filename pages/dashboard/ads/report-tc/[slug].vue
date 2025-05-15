<template>
  <div class="px-2">
    <!-- Loading Dialog -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <p class="mb-4 text-gray-700 font-medium">Generating Report, please wait :)</p>
        <div class="flex justify-center">
          <div
            class="w-16 h-16 border-t-4 border-red-500 rounded-full animate-spin"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="advertisement" class="bg-white shadow-lg rounded-lg p-6">
      <div class="border-b pb-4">
        <h1 class="text-xl font-light text-gray-600">REPORT</h1>
        <h2 class="text-3xl text-primary font-bold">
          {{ advertisement.name }}
        </h2>
      </div>
      <form @submit.prevent="submitDatePick" class="mt-6">
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label
              for="start-date"
              class="block text-sm font-medium text-gray-700"
              >Start Date</label
            >
            <input
              type="date"
              v-model="dateRange.start"
              id="start-date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              for="end-date"
              class="block text-sm font-medium text-gray-700"
              >End Date</label
            >
            <input
              type="date"
              v-model="dateRange.end"
              id="end-date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div class="col-span-1">
            <button
              type="submit"
              class="w-full mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200 shadow"
            >
              SUBMIT
            </button>
          </div>
          <div class="col-span-1">
            <button
              @click="downloadPDF"
              :disabled="loading"
              class="w-full mt-6 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition-colors duration-200 shadow disabled:opacity-50"
            >
              DOWNLOAD PDF
            </button>
          </div>
        </div>
        <!-- advertisement image -->
        <div class="mt-6 md:w-96">
          <img
            :src="useImg(advertisement.file)"
            alt="Advertisement"
            class="w-full rounded-lg shadow-md"
          />
        </div>
      </form>

      <!-- Modern Chart Section -->
      <div class="mt-10 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Performance Metrics</h3>
          <div class="flex gap-4">
            <div class="flex items-center">
              <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span class="text-sm text-gray-600">Clicks</span>
            </div>
            <div class="flex items-center">
              <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span class="text-sm text-gray-600">Impressions</span>
            </div>
          </div>
        </div>  
        <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
          <div class="chart-container py-4">
            <canvas id="myChart"></canvas>
          </div>
        </div>
      </div>
      
      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div class="text-sm text-gray-500 mb-1">Total Impressions</div>
          <div class="text-2xl font-bold text-gray-800">{{ sumImpressions.toLocaleString() }}</div>
          <div class="mt-2 h-1 w-full bg-gray-200">
            <div class="h-1 bg-green-500" style="width: 100%"></div>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div class="text-sm text-gray-500 mb-1">Total Clicks</div>
          <div class="text-2xl font-bold text-gray-800">{{ sumClicks.toLocaleString() }}</div>
          <div class="mt-2 h-1 w-full bg-gray-200">
            <div class="h-1 bg-blue-500" style="width: 100%"></div>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div class="text-sm text-gray-500 mb-1">Average CTR</div>
          <div class="text-2xl font-bold text-gray-800">
            {{ sumClicks && sumImpressions ? ((sumClicks / sumImpressions) * 100).toFixed(2) : '0.00' }}%
          </div>
          <div class="mt-2 h-1 w-full bg-gray-200">
            <div class="h-1 bg-purple-500" :style="`width: ${sumClicks && sumImpressions ? Math.min(((sumClicks / sumImpressions) * 100), 100) : 0}%`"></div>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th
                class="px-6 py-3 text-left text-xs md:text-sm font-medium bg-primary text-dark uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs md:text-sm font-medium bg-primary text-dark uppercase tracking-wider"
              >
                Impressions
              </th>
              <th
                class="px-6 py-3 text-left text-xs md:text-sm font-medium bg-primary text-dark uppercase tracking-wider"
              >
                Clicks
              </th>
              <th
                class="px-6 py-3 text-left text-xs md:text-sm font-medium bg-primary text-dark uppercase tracking-wider"
              >
                CTR
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="record in advertisementViews" :key="record.date" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(record.date) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ record.impressions.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ record.ad_clicks.toLocaleString() }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ ((record.ad_clicks / record.impressions) * 100).toFixed(2) }}%
              </td>
            </tr>
            <tr class="bg-gray-100 font-semibold">
              <td colspan="1" class="px-6 py-4 text-right">Total:</td>
              <td class="px-6 py-4">{{ sumImpressions.toLocaleString() }}</td>
              <td class="px-6 py-4">{{ sumClicks.toLocaleString() }}</td>
              <td class="px-6 py-4">
                {{ sumClicks && sumImpressions ? ((sumClicks / sumImpressions) * 100).toFixed(2) : '0.00' }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const config = useRuntimeConfig();
const apiBaseUrl = 'https://tech-cambodia.com/cms';

const useImg = (img: string) => {
  return `${apiBaseUrl}/assets/${img}`;
};

interface IResponse<T> {
  data: T;
}

interface Advertisement {
  name: string;
  file: string;
  slug: string;
  advertisement_type: { type: string };
  mobile_only: boolean;
  home_page: boolean;
  detail_page: boolean;
}

interface ViewRecord {
  date: string;
  impressions: number;
  ad_clicks: number;
}

const route = useRoute();
const loading = ref(true);
const advertisement = ref<Advertisement | null>(null);
const advertisementViews = ref<ViewRecord[]>([]);
const sumImpressions = computed(() => 
  advertisementViews.value.reduce((sum, record) => sum + record.impressions, 0)
);
const sumClicks = computed(() => 
  advertisementViews.value.reduce((sum, record) => sum + record.ad_clicks, 0)
);
let chart: Chart | null = null;

const dateRange = ref({
  start: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .split('T')[0],
  end: new Date().toISOString().split('T')[0],
});

// Format date for better readability
const formatDate = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  } catch (e) {
    return dateString;
  }
};

const useBcApi = async <T>(endpoint: string, options: { method: string }) => {
  try {
    const response = await axios({
      url: `${apiBaseUrl}${endpoint}`,
      method: options.method,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data as T;
  } catch (error: any) {
    console.error(`API Request Error: ${error.message}`);
    throw error;
  }
};

const fetchAdvertisementData = async () => {
  loading.value = true;
  try {
    const slug = route.params.slug;
    if (!slug) {
      console.error('Missing slug parameter');
      loading.value = false;
      return;
    }

    const adData = await useBcApi<IResponse<Advertisement[]>>(
      `/items/advertisement?filter[status][_eq]=published&filter[slug][_eq]=${slug}&fields=name,file,slug,advertisement_type.type,mobile_only,home_page,detail_page`,
      { method: 'GET' }
    );
    
    if (adData.data && adData.data.length > 0) {
      advertisement.value = adData.data[0];
      await fetchViewRecords();
    } else {
      console.error('No advertisement found with the specified slug');
    }
  } catch (error: any) {
    console.error('Error fetching advertisement data:', error.message);
  } finally {
    loading.value = false;
  }
};

const fetchViewRecords = async () => {
  try {
    if (!route.params.slug) return;
    
    const adViewsData = await useBcApi<IResponse<ViewRecord[]>>(
      `/items/advertisement_views?filter[advertisement][slug][_eq]=${route.params.slug}&filter[date][_between]=${dateRange.value.start},${dateRange.value.end}`,
      { method: 'GET' }
    );
    
    if (adViewsData.data) {
      advertisementViews.value = adViewsData.data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      initChart();
    }
  } catch (error: any) {
    console.error('Error fetching view records:', error.message);
    advertisementViews.value = [];
  }
};

const initChart = () => {
  const canvas = document.getElementById('myChart') as HTMLCanvasElement;
  if (!canvas) {
    console.error('Chart canvas element not found');
    return;
  }
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Could not get 2D context from canvas');
    return;
  }
  
  if (chart) {
    chart.destroy();
  }
  
  // Prepare data with formatted dates
  const chartLabels = advertisementViews.value.map(view => formatDate(view.date));
  const impressionsData = advertisementViews.value.map(view => view.impressions);
  const clicksData = advertisementViews.value.map(view => view.ad_clicks);
  
  // Calculate moving averages for trend lines (optional)
  const avgWindowSize = Math.max(1, Math.floor(impressionsData.length / 10));
  const movingAvgImpressions = calculateMovingAverage(impressionsData, avgWindowSize);
  const movingAvgClicks = calculateMovingAverage(clicksData, avgWindowSize);
  
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: 'Impressions',
          data: impressionsData,
          borderColor: 'rgba(34, 197, 94, 1)', // green-500
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: 'rgba(34, 197, 94, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 1,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
        {
          label: 'Clicks',
          data: clicksData,
          borderColor: 'rgba(59, 130, 246, 1)', // blue-500
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 1,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
        // Uncomment to add trend lines
        /*
        {
          label: 'Impressions Trend',
          data: movingAvgImpressions,
          borderColor: 'rgba(34, 197, 94, 0.8)',
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
          tension: 0.4,
        },
        {
          label: 'Clicks Trend',
          data: movingAvgClicks,
          borderColor: 'rgba(59, 130, 246, 0.8)',
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
          tension: 0.4,
        }
        */
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: false, // We'll use custom legend outside the chart
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#111',
          bodyColor: '#333',
          borderColor: '#e5e7eb',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          boxPadding: 4,
          usePointStyle: true,
          callbacks: {
            labelTextColor: (context) => {
              return context.datasetIndex === 0 ? 'rgba(34, 197, 94, 1)' : 'rgba(59, 130, 246, 1)';
            }
          }
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45,
            color: '#9ca3af',
            font: {
              size: 10,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            // borderDash: [2, 4],
            color: '#e5e7eb',
          },
          ticks: {
            color: '#9ca3af',
            font: {
              size: 11,
            },
            callback: function(value) {
              if (Number(value) >= 1000) {
                return Number(value) / 1000 + 'k';
              }
              return value;
            }
          },
        },
      },
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      }
    },
  });
};

// Function to calculate moving average
const calculateMovingAverage = (data: number[], windowSize: number) => {
  const result = [];
  
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    let count = 0;
    
    for (let j = Math.max(0, i - windowSize + 1); j <= i; j++) {
      sum += data[j];
      count++;
    }
    
    result.push(sum / count);
  }
  
  return result;
};

const downloadPDF = async () => {
  if (!advertisement.value) return;
  
  loading.value = true;
  try {
    const today = new Date();
    const data = {
      report_period: `${dateRange.value.start} to ${dateRange.value.end}`,
      client: advertisement.value.name,
      date: today.toISOString().split('T')[0],
      report: advertisementViews.value,
      placement: advertisement.value.advertisement_type.type,
      condition: advertisement.value.mobile_only
        ? 'Mobile Only'
        : 'All screen sizes',
      location: `${advertisement.value.home_page ? 'Home page, ' : ''}${
        advertisement.value.detail_page ? 'Detail page' : ''
      }`,
      sumImpressions: sumImpressions.value,
      sumClicks: sumClicks.value,
      sumCtr: sumImpressions.value > 0 
        ? ((sumClicks.value / sumImpressions.value) * 100).toFixed(2) 
        : '0.00',
    };

   const pdfUrl = 'https://ads.tech-cambodia.com/pdf';
    if (!pdfUrl) {
      console.error('PDF_URL configuration is missing');
      loading.value = false;
      return;
    }

    const generateResponse = await axios(`${pdfUrl}/generate`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      data: JSON.stringify(data),
    });

    if (generateResponse.status === 201) {
      const response = await axios.get<Blob>(
        `${pdfUrl}/download/${generateResponse.data}`,
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/pdf',
          },
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `report - ${advertisement.value.name} - ${
          today.toISOString().split('T')[0]
        }.pdf`
      );
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      await axios.delete(
        `${pdfUrl}/delete/${generateResponse.data}`
      );
    }
  } catch (error: any) {
    console.error('Error generating or downloading the PDF:', error.message);
  } finally {
    loading.value = false;
  }
};

const submitDatePick = async () => {
  try {
    await fetchViewRecords();
  } catch (error: any) {
    console.error(
      'Error fetching data for selected date range:',
      error.message
    );
  }
};

// Watch for window resize to redraw chart
watch(
  () => window.innerWidth,
  () => {
    if (advertisementViews.value.length > 0) {
      initChart();
    }
  }
);

onMounted(() => {
  fetchAdvertisementData();
  window.addEventListener('resize', () => {
    if (chart) {
      chart.resize();
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    if (chart) {
      chart.resize();
    }
  });
  if (chart) {
    chart.destroy();
  }
});
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
}
</style>