export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('formatDepartments', (departments: any) => {
      const deptArray = Array.isArray(departments)
        ? departments
        : String(departments).split(',')
  
      return deptArray.map((dept: string) =>
        dept
          .trim()
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      )
    })
  })
  