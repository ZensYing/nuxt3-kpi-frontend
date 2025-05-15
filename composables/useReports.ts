// composables/useReports.ts
import { ref } from 'vue'

export interface Report {
  id: number
  title: string
  description: string
  imageUrl: string
  link: string
  date: string
}

export function useReports() {
  const reports = ref<Report[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchReports = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { data } = await useFetch<{ success: boolean; reports: Report[] }>('/api/reports')
      
      if (data.value && data.value.success) {
        reports.value = data.value.reports
      } else {
        error.value = 'Failed to fetch reports data'
      }
    } catch (err) {
      console.error('Error in fetchReports:', err)
      error.value = 'An error occurred while fetching reports'
    } finally {
      loading.value = false
    }
  }

  return {
    reports,
    loading,
    error,
    fetchReports
  }
}