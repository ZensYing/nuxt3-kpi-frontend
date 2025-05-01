// utils/useInternetStatus.ts
import { ref, onMounted, onUnmounted, computed } from 'vue';

export function useInternetStatus() {
  const connectionStatus = ref('Checking...');
  const connectionQuality = ref<'good' | 'fair' | 'poor' | 'offline'>('good');
  const lastChecked = ref(new Date());
  const isOnline = ref(true);
  const pingTime = ref<number | null>(null);
  const downloadSpeed = ref<number | null>(null);
  const connectionCheckInterval = ref<number | null>(null);
  const isChecking = ref(false);

  // Function to check internet connection quality
  const checkInternetQuality = async () => {
    // Prevent multiple simultaneous checks
    if (isChecking.value) return;
    
    isChecking.value = true;
    
    try {
      isOnline.value = navigator.onLine;
      if (!isOnline.value) {
        connectionStatus.value = 'Offline';
        connectionQuality.value = 'offline';
        lastChecked.value = new Date();
        isChecking.value = false;
        return;
      }

      // Measure ping time
      const startTime = performance.now();
      try {
        // Fetch a small resource to test connection
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        await fetch('/api/ping', { 
          method: 'HEAD',
          cache: 'no-cache',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        const endTime = performance.now();
        pingTime.value = Math.round(endTime - startTime);
        
        // Estimate download speed through a small test download
        const speedTestStart = performance.now();
        const response = await fetch('/api/connection-test', { cache: 'no-cache' });
        const data = await response.blob();
        const speedTestEnd = performance.now();
        
        const fileSizeInBits = data.size * 8;
        const durationInSeconds = (speedTestEnd - speedTestStart) / 1000;
        downloadSpeed.value = Math.round((fileSizeInBits / durationInSeconds) / 1024); // kbps
        
        // Determine connection quality based on ping and download speed
        if (pingTime.value < 100 && downloadSpeed.value > 1000) {
          connectionStatus.value = 'Good';
          connectionQuality.value = 'good';
        } else if (pingTime.value < 300 && downloadSpeed.value > 500) {
          connectionStatus.value = 'Fair';
          connectionQuality.value = 'fair';
        } else {
          connectionStatus.value = 'Poor';
          connectionQuality.value = 'poor';
        }
      } catch (error) {
        // If fetch fails, use fallback check with navigator.connection if available
        if ('connection' in navigator && navigator.connection) {
          const connection = navigator.connection as any;
          
          if (connection.downlink > 2) {
            connectionStatus.value = 'Good';
            connectionQuality.value = 'good';
          } else if (connection.downlink > 0.5) {
            connectionStatus.value = 'Fair';
            connectionQuality.value = 'fair';
          } else {
            connectionStatus.value = 'Poor';
            connectionQuality.value = 'poor';
          }
          
          downloadSpeed.value = connection.downlink ? Math.round(connection.downlink * 1000) : null;
        } else {
          // Basic fallback if nothing else works
          connectionStatus.value = 'Unknown';
          connectionQuality.value = 'fair';
        }
      }
    } catch (error) {
      connectionStatus.value = 'Error';
      connectionQuality.value = 'poor';
    }
    
    lastChecked.value = new Date();
    isChecking.value = false;
  };

  // Computed function to get color based on connection quality
  const getConnectionStatusColor = computed(() => {
    switch (connectionQuality.value) {
      case 'good':
        return 'bg-green-500';
      case 'fair':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  });

  // Computed function to get icon based on connection quality
  const getConnectionStatusIcon = computed(() => {
    switch (connectionQuality.value) {
      case 'good':
        return 'mdi:wifi-strength-4';
      case 'fair':
        return 'mdi:wifi-strength-3';
      case 'poor':
        return 'mdi:wifi-strength-1-alert';
      case 'offline':
        return 'mdi:wifi-off';
      default:
        return 'mdi:wifi';
    }
  });

  // Function to handle online event
  const handleOnline = () => {
    isOnline.value = true;
    checkInternetQuality();
  };

  // Function to handle offline event
  const handleOffline = () => {
    isOnline.value = false;
    connectionStatus.value = 'Offline';
    connectionQuality.value = 'offline';
    lastChecked.value = new Date();
  };

  // Setup function to initialize monitoring
  const setupMonitoring = (interval = 30000) => {
    // Initial check
    checkInternetQuality();
    
    // Set up periodic checks
    connectionCheckInterval.value = window.setInterval(checkInternetQuality, interval); // Check every 30 seconds by default
    
    // Add event listeners for connection changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Also monitor network information changes if available
    if ('connection' in navigator && navigator.connection) {
      (navigator.connection as any).addEventListener('change', checkInternetQuality);
    }
  };

  // Cleanup function to remove listeners and intervals
  const cleanupMonitoring = () => {
    if (connectionCheckInterval.value) {
      clearInterval(connectionCheckInterval.value);
      connectionCheckInterval.value = null;
    }
    
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
    
    // Remove network information event listener if it was added
    if ('connection' in navigator && navigator.connection) {
      (navigator.connection as any).removeEventListener('change', checkInternetQuality);
    }
  };

  // Return everything needed by components
  return {
    connectionStatus,
    connectionQuality,
    lastChecked,
    isOnline,
    pingTime,
    downloadSpeed,
    isChecking,
    getConnectionStatusColor,
    getConnectionStatusIcon,
    checkInternetQuality,
    setupMonitoring,
    cleanupMonitoring,
    handleOnline,
    handleOffline
  };
}