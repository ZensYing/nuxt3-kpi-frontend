import { ref, computed } from 'vue';

export interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
  timestamp: Date;
}

export interface InternetSpeedHistory {
  time: Date;
  download: number;
  upload: number;
}

export interface ConnectionQuality {
  label: string;
  color: string;
  progressColor: string;
  percentage: number;
}

export function useInternetSpeed() {
  const downloadSpeed = ref<number | null>(null);
  const uploadSpeed = ref<number | null>(null);
  const ping = ref<number | null>(null);
  const isTestRunning = ref(false);
  const error = ref<string | null>(null);
  const lastChecked = ref<Date | null>(null);
  const speedHistory = ref<InternetSpeedHistory[]>([]);
  const maxHistoryItems = ref(10);

  const formattedDownload = computed(() => {
    return downloadSpeed.value !== null ? downloadSpeed.value.toFixed(2) : '--';
  });

  const formattedUpload = computed(() => {
    return uploadSpeed.value !== null ? uploadSpeed.value.toFixed(2) : '--';
  });

  const formattedPing = computed(() => {
    return ping.value !== null ? Math.round(ping.value).toString() : '--';
  });

  const connectionQuality = computed((): ConnectionQuality => {
    const down = downloadSpeed.value;
    
    if (down === null) {
      return {
        label: 'Unknown',
        color: 'text-gray-500 dark:text-gray-400',
        progressColor: 'bg-gray-500',
        percentage: 0
      };
    }
    
    if (down >= 100) {
      return {
        label: 'Excellent',
        color: 'text-green-600 dark:text-green-400',
        progressColor: 'bg-green-600',
        percentage: 100
      };
    }
    
    if (down >= 50) {
      return {
        label: 'Very Good',
        color: 'text-green-500 dark:text-green-400',
        progressColor: 'bg-green-500',
        percentage: Math.min(down, 100)
      };
    }
    
    if (down >= 25) {
      return {
        label: 'Good',
        color: 'text-blue-500 dark:text-blue-400',
        progressColor: 'bg-blue-500',
        percentage: Math.min(down, 100)
      };
    }
    
    if (down >= 10) {
      return {
        label: 'Fair',
        color: 'text-yellow-500 dark:text-yellow-400',
        progressColor: 'bg-yellow-500',
        percentage: Math.min(down, 100)
      };
    }
    
    return {
      label: 'Poor',
      color: 'text-red-500 dark:text-red-400',
      progressColor: 'bg-red-500',
      percentage: Math.min(down, 100)
    };
  });

  const startTest = async (): Promise<SpeedTestResult | null> => {
    if (isTestRunning.value) return null;
    
    isTestRunning.value = true;
    error.value = null;
    
    try {
      // Simulate download test with fetch and performance API
      const startTime = performance.now();
      const fileSize = 5 * 1024 * 1024; // 5MB test file
      const testUrl = `https://speed.cloudflare.com/__down?bytes=${fileSize}&${new Date().getTime()}`;
      
      // Measure ping first (TTFB)
      const pingStart = performance.now();
      const response = await fetch(testUrl, { method: 'HEAD' });
      const pingEnd = performance.now();
      const pingValue = pingEnd - pingStart;
      ping.value = pingValue;
      
      // Download test
      const downloadStart = performance.now();
      await fetch(testUrl);
      const downloadEnd = performance.now();
      const durationSeconds = (downloadEnd - downloadStart) / 1000;
      const dlSpeed = fileSize / durationSeconds / 125000; // Convert to Mbps
      downloadSpeed.value = dlSpeed;
      
      // Simulate upload test
      const uploadTestData = new ArrayBuffer(1 * 1024 * 1024); // 1MB of data
      const uploadStart = performance.now();
      
      await fetch('https://speed.cloudflare.com/__up', {
        method: 'POST',
        body: uploadTestData,
      });
      
      const uploadEnd = performance.now();
      const uploadDurationSeconds = (uploadEnd - uploadStart) / 1000;
      const ulSpeed = uploadTestData.byteLength / uploadDurationSeconds / 125000; // Convert to Mbps
      uploadSpeed.value = ulSpeed;
      
      // Record result and history
      const now = new Date();
      lastChecked.value = now;
      
      const result: SpeedTestResult = {
        download: downloadSpeed.value,
        upload: uploadSpeed.value,
        ping: ping.value,
        timestamp: now
      };
      
      // Add to history
      speedHistory.value.push({
        time: now,
        download: downloadSpeed.value,
        upload: uploadSpeed.value
      });
      
      // Keep history to maximum entries
      if (speedHistory.value.length > maxHistoryItems.value) {
        speedHistory.value.shift();
      }
      
      return result;
      
    } catch (e) {
      error.value = 'Failed to test connection. Please check your internet and try again.';
      console.error('Speed test error:', e);
      return null;
    } finally {
      isTestRunning.value = false;
    }
  };

  // Setup auto-refresh
  const autoRefreshInterval = ref<NodeJS.Timeout | null>(null);
  
  const setupAutoRefresh = (minutes: number = 5) => {
    if (autoRefreshInterval.value) {
      clearInterval(autoRefreshInterval.value);
      autoRefreshInterval.value = null;
    }
    
    if (minutes <= 0) return;
    
    const intervalMs = minutes * 60 * 1000;
    autoRefreshInterval.value = setInterval(() => {
      startTest();
    }, intervalMs) as unknown as NodeJS.Timeout;
  };
  
  const stopAutoRefresh = () => {
    if (autoRefreshInterval.value) {
      clearInterval(autoRefreshInterval.value);
      autoRefreshInterval.value = null;
    }
  };

  // Save and load history
  const saveHistory = () => {
    try {
      if (process.client) {
        localStorage.setItem('speedHistory', JSON.stringify(speedHistory.value));
      }
    } catch (e) {
      console.error('Failed to save speed history', e);
    }
  };

  const loadHistory = () => {
    try {
      if (process.client) {
        const saved = localStorage.getItem('speedHistory');
        if (saved) {
          const parsed = JSON.parse(saved);
          // Convert string dates back to Date objects
          speedHistory.value = parsed.map((item: any) => ({
            ...item,
            time: new Date(item.time)
          }));
        }
      }
    } catch (e) {
      console.error('Failed to load speed history', e);
    }
  };

  return {
    // State
    downloadSpeed,
    uploadSpeed,
    ping,
    isTestRunning,
    error,
    lastChecked,
    speedHistory,
    maxHistoryItems,
    
    // Computed
    formattedDownload,
    formattedUpload,
    formattedPing,
    connectionQuality,
    
    // Methods
    startTest,
    setupAutoRefresh,
    stopAutoRefresh,
    saveHistory,
    loadHistory
  };
}