export function formatDate(
    dateStr: string,
    format: string = 'MM-DD-YYYY'
  ): string {
    const date = new Date(dateStr);
  
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    };
  
    if (format === 'MM-DD-YYYY') {
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }
  
    // You can add more formats here if needed
    return dateStr;
  }