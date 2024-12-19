export const useI18nConfig = () => {
  // Retrieve the saved locale from localStorage or default to 'en'
  const savedLocale = process.client ? localStorage.getItem('locale') || 'en' : 'en';

  // Function to set the font class on the <html> tag
  const setFontClass = (locale: string) => {
    if (process.client) {
      const html = document.documentElement;
      if (locale === 'km') {
        html.classList.add('kantumruy-pro');
        html.classList.remove('roboto');
      } else {
        html.classList.add('roboto');
        html.classList.remove('kantumruy-pro');
      }
    }
  };

  // Apply the font class on initialization
  if (process.client) {
    setFontClass(savedLocale);
  }

  return {
    strategy: 'prefix_and_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', iso: 'en-US' },
      { code: 'km', name: 'Khmer', iso: 'km-KH' },
    ],
    vueI18n: {
      legacy: false,
      globalInjection: true,
      silentTranslationWarn: true,
      locale: savedLocale, // Set the saved locale or fallback to 'en'
      fallbackLocale: 'en', // Fallback locale
      messages: {
        en: {
          signIn: 'Sign In',
          signOut: 'Sign Out',
          favorite: 'Favorite',
          remove_favorite: 'Remove Favorite',
          contactUs: 'Contact Us',
          deliveryInfo: 'Delivery Info',
          dashboard: 'Dashboard',
          home: 'Home',
          categories: 'Categories',
          search: 'Search for products',
          share: 'Share',
          name: 'Name',
          phone_number: 'Phone Number',
          detail_address: 'Detail Address',
          profile: 'Profile',
          blog: 'Blog',
          project: 'Project',
          about: 'About',
          full_name: 'SOUN Soratha',
          hero_des: `Hello, I'm Soratha, a passionate Full Stack Developer with a knack for crafting robust, scalable web applications. With expertise in both front-end and back-end technologies`
        },
        km: {
          signIn: 'ចូលគណនី',
          signOut: 'ចាកចេញ',
          favorite: 'ចូលចិត្ត',
          contactUs: 'ទាក់ទងយើង',
          home: 'ទំព័រដើម',
          categories: 'ប្រភេទ',
          search: 'ស្វែងរកផលិតផល',
          share: 'ចែករំលែក',
          name: 'ឈ្មោះ',
          phone_number: 'លេខទូរស័ព្ទ',
          cart_address: 'អាសយដ្ឋាន',
          detail_address: 'អាសយដ្ឋានលំអិត',
          payment_method: 'មធ្យោបាយបង់ប្រាក់',
          pay_arrived: 'អោយលុយពេលទំនិញទៅដល់',
          list_food: 'បញ្ជីទំនិញ',
          profile: 'ប្រវត្តិរូប',
          blog: 'ប្លុក',
          project: 'គម្រោង',
          about: 'អំពីយើង',
          full_name: 'សួន សុរដ្ឋា',
          hero_des: `ជំរាបសួរ ខ្ញុំឈ្មោះ សួន​ សុរដ្ឋា ដែលជា Full Stack Developer ដែលមានជំនាញក្នុងការបង្កើតកម្មវិធីគេហទំព័រដ៏រឹងមាំ និងអាចធ្វើមាត្រដ្ឋានបាន។ ជាមួយនឹងជំនាញទាំងផ្នែកខាងមុខ និងផ្នែកខាងក្រោយនៃបច្ចេកវិទ្យា`
        },
      },
    },
    setFontClass, // Export the function for use in other parts of the app
  };
};
