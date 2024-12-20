export default defineNuxtPlugin(() => {
    const script = document.createElement('script');
    script.src = 'https://www.vercel-analytics.com/script.js';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-website-id', 'prj_Nm8UCvkU4VUvDpM4kLYnb3tMBR04'); // Replace with your actual Project ID
    document.head.appendChild(script);
  });
  