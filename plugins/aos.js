import AOS from 'aos';
import 'aos/dist/aos.css';

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    // add dureation
    AOS.init({
      duration: 800,
      once: true
    });
  }
});
