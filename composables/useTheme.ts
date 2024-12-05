export const useTheme = () => {
    const theme = useState<string>('theme', () => {
      if (process.client) {
        return localStorage.getItem('theme') || 'light';
      }
      return 'light';
    });
  
    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark';
      if (process.client) {
        const html = document.documentElement;
        if (theme.value === 'dark') {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
        localStorage.setItem('theme', theme.value);
      }
    };
  
    return {
      theme,
      toggleTheme,
    };
  };
  