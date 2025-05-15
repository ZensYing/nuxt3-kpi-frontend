// composables/useToast.ts
import { ref } from 'vue';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  title: string;
  message: string;
  duration?: number;
  type?: ToastType;
}

interface Toast extends ToastOptions {
  id: number;
  type: ToastType;
}

export function useToast() {
  const toasts = ref<Toast[]>([]);
  let idCounter = 0;

  /**
   * Shows a toast notification
   */
  function show(options: ToastOptions) {
    const id = ++idCounter;
    const type = options.type || 'info';
    const duration = options.duration || 5000;

    const toast: Toast = {
      id,
      title: options.title,
      message: options.message,
      type,
      duration
    };

    toasts.value.push(toast);

    // Auto remove toast after duration
    setTimeout(() => {
      dismiss(id);
    }, duration);

    return id;
  }

  /**
   * Removes a specific toast by ID
   */
  function dismiss(id: number) {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  }

  /**
   * Shows a success toast
   */
  function success(options: Omit<ToastOptions, 'type'>) {
    return show({ ...options, type: 'success' });
  }

  /**
   * Shows an error toast
   */
  function error(options: Omit<ToastOptions, 'type'>) {
    return show({ ...options, type: 'error' });
  }

  /**
   * Shows a warning toast
   */
  function warning(options: Omit<ToastOptions, 'type'>) {
    return show({ ...options, type: 'warning' });
  }

  /**
   * Shows an info toast
   */
  function info(options: Omit<ToastOptions, 'type'>) {
    return show({ ...options, type: 'info' });
  }

  return {
    toasts,
    show,
    dismiss,
    success,
    error,
    warning,
    info
  };
}