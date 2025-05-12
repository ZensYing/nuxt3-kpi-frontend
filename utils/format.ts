// utils/format.ts

/**
 * Formats a date string for display
 * @param dateString Date string to format
 * @returns Formatted date string (e.g., "May 12, 2025")
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Formats large numbers with abbreviations (K, M)
 * @param num Number string to format
 * @returns Formatted number string with appropriate suffix
 */
export const formatNumber = (num: string | null): string => {
  if (!num) return '0';
  const value = parseInt(num);
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toLocaleString();
};

/**
 * Formats total views for display with decimal precision
 * @param views Views string to format
 * @returns Formatted views string with appropriate suffix
 */
export const formatTotalViews = (views: string): string => {
  const viewsNum = parseInt(views);
  if (viewsNum >= 1000000) {
    return (viewsNum / 1000000).toFixed(2) + 'M';
  } else if (viewsNum >= 1000) {
    return (viewsNum / 1000).toFixed(1) + 'K';
  }
  return viewsNum.toLocaleString();
};

/**
 * Get KPI date headers for the current period
 * @returns Object containing dateRangeHeader and totalViewsHeader
 */
export const getKpiDateHeaders = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Previous month (for the range start)
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  // Format month names
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  // For the date range header: 23rd of previous month to 11th of current month
  const dateRangeHeader = `23(${monthNames[prevMonth].substring(0, 3)})-11th(${monthNames[currentMonth].substring(0, 3)})`;

  // For the total views header: "Total Amount Views on 23 Current Month"
  const totalViewsHeader = `Total Amount Views on 23 ${monthNames[currentMonth]}`;

  return { dateRangeHeader, totalViewsHeader };
};