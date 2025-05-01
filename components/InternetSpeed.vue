<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Interface for speed test results
interface SpeedTestResult {
  downloadSpeed: number
  uploadSpeed: number
  ping: number
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'checking'
}

const currentSpeed = ref<SpeedTestResult>({
  downloadSpeed: 0,
  uploadSpeed: 0,
  ping: 0,
  status: 'checking'
})

const isExpanded = ref(false)
const checkingSpeed = ref(false)
const intervalId = ref<number | null>(null)

// Function to toggle expanded view
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

// Function to check internet speed
const checkInternetSpeed = async () => {
  checkingSpeed.value = true
  currentSpeed.value.status = 'checking'
  
  // Start download test
  const startTime = new Date().getTime()
  const imageUrl = `https://upload.wikimedia.org/wikipedia/commons/3/3e/Tokyo_Sky_Tree_2012.JPG?dummy=${startTime}`
  
  try {
    const downloadStartTime = new Date().getTime()
    
    // Calculate ping first
    const pingStartTime = new Date().getTime()
    await fetch('https://www.google.com', { mode: 'no-cors', cache: 'no-store' })
    const pingEndTime = new Date().getTime()
    currentSpeed.value.ping = pingEndTime - pingStartTime
    
    // Download a larger file to test download speed
    const img = new Image()
    img.onload = () => {
      const downloadEndTime = new Date().getTime()
      const duration = (downloadEndTime - downloadStartTime) / 1000
      // Image size is approximately 4.3MB (4300KB)
      const fileSizeInBits = 4300 * 8 * 1024
      const bps = fileSizeInBits / duration
      currentSpeed.value.downloadSpeed = Math.floor(bps / 1024 / 1024) // Convert to Mbps
      
      // Simulate upload test (simplified)
      setTimeout(() => {
        currentSpeed.value.uploadSpeed = Math.floor(currentSpeed.value.downloadSpeed * 0.7) // Upload is typically slower
        
        // Set status based on download speed
        if (currentSpeed.value.downloadSpeed > 50) {
          currentSpeed.value.status = 'excellent'
        } else if (currentSpeed.value.downloadSpeed > 25) {
          currentSpeed.value.status = 'good'
        } else if (currentSpeed.value.downloadSpeed > 10) {
          currentSpeed.value.status = 'fair'
        } else {
          currentSpeed.value.status = 'poor'
        }
        
        checkingSpeed.value = false
      }, 1000)
    }
    
    img.onerror = () => {
      currentSpeed.value.status = 'poor'
      currentSpeed.value.downloadSpeed = 0
      currentSpeed.value.uploadSpeed = 0
      checkingSpeed.value = false
    }
    
    img.src = imageUrl
  } catch (error) {
    console.error('Error measuring internet speed:', error)
    currentSpeed.value.status = 'poor'
    currentSpeed.value.downloadSpeed = 0
    currentSpeed.value.uploadSpeed = 0
    checkingSpeed.value = false
  }
}

// Get status color based on connection quality
const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent':
      return 'bg-green-500'
    case 'good':
      return 'bg-blue-500'
    case 'fair':
      return 'bg-yellow-500'
    case 'poor':
      return 'bg-red-500'
    case 'checking':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}

// Real-time monitoring variables
const lastMeasuredBytes = ref(0)
const bytesReceived = ref(0)
const currentMbps = ref(0)
const monitoringIntervalId = ref<number | null>(null)
const speedHistoryValues = ref<number[]>([])
const speedHistory = ref<{time: Date, speed: number}[]>([])
const showSpeedGraph = ref(false)

// Function to toggle speed graph
const toggleSpeedGraph = () => {
  showSpeedGraph.value = !showSpeedGraph.value
}

// Real-time speed monitoring
const startRealTimeMonitoring = () => {
  // Initial full speed test
  checkInternetSpeed()
  
  // Set up real-time monitoring using the Performance API
  if (window.performance && window.performance.getEntries()) {
    // Check initial bytes count
    const resources = performance.getEntriesByType('resource')
    let initialBytes = 0
    resources.forEach(resource => {
      if (resource instanceof PerformanceResourceTiming) {
        initialBytes += resource.transferSize || 0
      }
    })
    lastMeasuredBytes.value = initialBytes
    
    // Monitor changes every second
    monitoringIntervalId.value = window.setInterval(() => {
      const resources = performance.getEntriesByType('resource')
      let totalBytes = 0
      resources.forEach(resource => {
        if (resource instanceof PerformanceResourceTiming) {
          totalBytes += resource.transferSize || 0
        }
      })
      
      // Calculate bytes received since last check
      const bytesDiff = totalBytes - lastMeasuredBytes.value
      bytesReceived.value = bytesDiff
      
      // Calculate Mbps based on bytes received in the last second
      const mbps = (bytesDiff * 8) / (1024 * 1024)
      currentMbps.value = mbps > 0 ? mbps : currentMbps.value * 0.95 // Decay when no new data
      
      // Only update if we have real activity
      if (mbps > 0) {
        // Update speed history (keep last 60 readings - 1 minute)
        speedHistoryValues.value.push(mbps)
        if (speedHistoryValues.value.length > 60) {
          speedHistoryValues.value.shift()
        }
        
        // Add to time-based history (for graph)
        speedHistory.value.push({
          time: new Date(),
          speed: mbps
        })
        if (speedHistory.value.length > 60) {
          speedHistory.value.shift()
        }
        
        // Update current speed display with a weighted average
        const recentAvg = speedHistoryValues.value.slice(-5).reduce((sum, val) => sum + val, 0) / 
                          Math.min(5, speedHistoryValues.value.length)
        
        currentSpeed.value.downloadSpeed = Math.round(recentAvg)
        
        // Update status based on current speed
        if (currentSpeed.value.downloadSpeed > 50) {
          currentSpeed.value.status = 'excellent'
        } else if (currentSpeed.value.downloadSpeed > 25) {
          currentSpeed.value.status = 'good'
        } else if (currentSpeed.value.downloadSpeed > 10) {
          currentSpeed.value.status = 'fair'
        } else if (currentSpeed.value.downloadSpeed > 0) {
          currentSpeed.value.status = 'poor'
        }
        
        // Estimate upload based on download (this is still an estimate)
        currentSpeed.value.uploadSpeed = Math.round(currentSpeed.value.downloadSpeed * 0.7)
      }
      
      // Reset for next interval
      lastMeasuredBytes.value = totalBytes
      
      // Periodically do a complete test to recalibrate
      if (speedHistory.value.length % 20 === 0) {
        checkInternetSpeed()
      }
    }, 1000) // Update every second
  } else {
    // Fallback to regular interval testing if Performance API not available
    checkInternetSpeed()
    intervalId.value = window.setInterval(checkInternetSpeed, 15000) // Check every 15 seconds
  }
}

// Check speed on component mount and start real-time monitoring
onMounted(() => {
  startRealTimeMonitoring()
})

// Clear intervals on component unmount
onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
  if (monitoringIntervalId.value) {
    clearInterval(monitoringIntervalId.value)
  }
})
</script>

<template>
  <div class="internet-speed-widget text-sm">
    <div 
      class="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      @click="toggleExpanded"
    >
      <div class="flex items-center">
        <div 
          :class="['h-3 w-3 rounded-full mr-2', getStatusColor(currentSpeed.status)]" 
          :title="`Connection Status: ${currentSpeed.status}`"
        ></div>
        <!-- Real-time updating speed indicator -->
        <div class="flex items-center">
          <span v-if="checkingSpeed">Checking...</span>
          <span v-else class="flex items-center">
            <span>{{ currentSpeed.downloadSpeed }}</span>
            <span class="ml-1">Mbps</span>
            <!-- Tiny pulse animation to show real-time monitoring -->
            <span class="ml-1 inline-block h-1 w-1 rounded-full bg-blue-500 animate-pulse" 
                  title="Monitoring in real-time"></span>
          </span>
        </div>
      </div>
      <button class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-4 w-4" 
          :class="{ 'transform rotate-180': isExpanded }"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
    
    <div v-if="isExpanded" class="p-3 border-t border-gray-200 dark:border-gray-700">
      <div class="flex flex-col space-y-2">
        <!-- Mini real-time trend graph -->
        <div class="h-16 mb-2 relative">
          <div class="absolute inset-0 flex items-end">
            <div 
              v-for="(value, index) in speedHistoryValues" 
              :key="index"
              class="w-1 mx-px transform transition-all duration-200"
              :class="[
                value > 50 ? 'bg-green-500' : 
                value > 25 ? 'bg-blue-500' : 
                value > 10 ? 'bg-yellow-500' : 'bg-red-500'
              ]"
              :style="`height: ${Math.min(100, value * 2)}%;`"
            ></div>
          </div>
          <!-- Speed grid lines -->
          <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
            <div class="border-b border-dashed border-gray-200 dark:border-gray-700 text-xs text-gray-400 flex justify-end">
              <span class="pr-1">50 Mbps</span>
            </div>
            <div class="border-b border-dashed border-gray-200 dark:border-gray-700 text-xs text-gray-400 flex justify-end">
              <span class="pr-1">25 Mbps</span>
            </div>
            <div class="border-b border-dashed border-gray-200 dark:border-gray-700 text-xs text-gray-400 flex justify-end">
              <span class="pr-1">0 Mbps</span>
            </div>
          </div>
        </div>
        
        <!-- Current speed metrics -->
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Download:</span>
          <span class="font-medium">{{ currentSpeed.downloadSpeed }} Mbps</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Upload:</span>
          <span class="font-medium">{{ currentSpeed.uploadSpeed }} Mbps</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Ping:</span>
          <span class="font-medium">{{ currentSpeed.ping }} ms</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Status:</span>
          <span 
            class="font-medium capitalize" 
            :class="{
              'text-green-500': currentSpeed.status === 'excellent',
              'text-blue-500': currentSpeed.status === 'good',
              'text-yellow-500': currentSpeed.status === 'fair',
              'text-red-500': currentSpeed.status === 'poor',
              'text-gray-500': currentSpeed.status === 'checking'
            }"
          >
            {{ currentSpeed.status }}
          </span>
        </div>
        
        <!-- Real-time monitoring indicator -->
        <div class="flex justify-between text-xs">
          <span class="text-gray-500">Real-time monitoring:</span>
          <span class="text-green-500 flex items-center">
            Active
            <span class="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
          </span>
        </div>
        
        <!-- Run full speed test button -->
        <button 
          @click.stop="checkInternetSpeed"
          class="mt-2 w-full flex items-center justify-center px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150"
          :disabled="checkingSpeed"
        >
          <svg v-if="checkingSpeed" class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ checkingSpeed ? 'Running Test...' : 'Run Full Speed Test' }}
        </button>
      </div>
    </div>
  </div>
</template>