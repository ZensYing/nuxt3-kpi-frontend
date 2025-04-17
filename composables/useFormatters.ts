export const useFormatters = () => {
    const formatDepartments = (departments: any): string[] => {
      if (!departments) return [];
  
      const deptArray = Array.isArray(departments)
        ? departments
        : String(departments).split(',');
  
      return deptArray.map((dept: string) => {
        return dept
          .trim()
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      });
    };
    // format status
    const formatStatus = (status: string): string => {
      if (!status) return '';
      const deptArray = String(status).split(',');

      return deptArray.map((dept: string) => {
        return dept
          .trim()
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }).join(', ');       
    };
  
    return {
      formatDepartments,
      formatStatus,
    };
  };
  