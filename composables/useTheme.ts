import { ref, onMounted } from 'vue';

export default function useTheme() {
  const theme = ref('light'); // Default is now 'light'
  
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

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Fallback to 'light'
    setTheme(savedTheme);
  });

  return {
    theme,
    toggleTheme,
  };
}
