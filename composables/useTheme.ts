import { ref, onMounted } from 'vue';

export default function useTheme() {
  const theme = ref('dark');
  
  const setTheme = (newTheme: string) => {
    theme.value = newTheme;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  };

  // Initialize theme only for client-side updates
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  });

  return {
    theme,
    toggleTheme,
  };
}
