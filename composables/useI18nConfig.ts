// composables/useI18nConfig.ts
export const useI18nConfig = () => {
    // Retrieve the saved locale from localStorage or default to 'km'
    const savedLocale = process.client ? localStorage.getItem('locale') || 'en' : 'en';
  
    return {
      strategy: 'prefix_and_default',
      defaultLocale: 'en',
      locales: [
        { code: 'en', name: 'English', iso: 'en-US' },
        { code: 'km', name: 'Khmer', iso: 'km-KH' },
      ],
      vueI18n: {
        legacy: false,
        locale: savedLocale, // Use the saved locale or default to 'km'
        fallbackLocale: 'en',
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
            promotion: 'Promotion',
            newproduct: 'New Product',
            search: 'Search for products',
            ourlocation: 'Our Location',
            address: 'House 146B, Street 363, Prek Village, Sangkat Chbar Ampov 1, Khan Chbar Ampov, Phnom Penh, Cambodia',
            invite: 'Invite Friends',
            invitedesc:'You can invite friends to use this program.',
            orderhistory: 'Order History',
            share: 'Share',
            add_to_cart: 'Add to Cart',
            buy_now: 'Buy Now',
            shipping_address: 'Shipping Address',
            my_cart: 'My Cart',
            name: 'Name',
            phone_number: 'Phone Number',
            cart_address: 'Address',
            detail_address: 'Detail Address',
            payment_method: 'Payment Method',
            pay_arrived: 'Pay When Arrived',
            list_food: 'List Food',
            profile: 'Profile',


          },
          km: {
            signIn: 'ចូលគណនី',
            signOut: 'ចាកចេញ',
            favorite: 'ចូលចិត្ត',
            contactUs: 'ទាក់ទងយើង',
            deliveryInfo: 'ព័ត៌មានការដឹកជញ្ជូន',
            dashboard: 'ផ្ទាំងគ្រប់គ្រង',
            home: 'ទំព័រដើម',
            categories: 'ប្រភេទ',
            promotion: 'ការបញ្ចុះតម្លៃ',
            newproduct: 'ផលិតផលថ្មី',
            search: 'ស្វែងរកផលិតផល',
            ourlocation: 'ទីតាំងរបស់យើង',
            address: 'ផ្ទះលេខ 146B, ផ្លូវ 363, ភូមិព្រែក, សង្កាត់ច្បារអំពៅ1, ខណ្ឌច្បារអំពៅ, ភ្នំពេញ, កម្ពុជា',
            invite: 'អញ្ជើញមិត្តភក្តិ',
            invitedesc:'លោកអ្នកអាចអញ្ជើញ មិត្តភក្តិអោយប្រើប្រាស់កម្មវិធីនេះ',
            orderhistory: 'ប្រវត្តិការបញ្ជាទិញ',
            share: 'ចែករំលែក',
            remove_favorite: 'ដកចេញចូលចិត្ត',
            add_to_cart: 'ដាក់ក្នុងកន្រ្តក',
            buy_now: 'ទិញឥឡូវ',
            shipping_address: 'អាសយដ្ឋានដឹកជញ្ជូន',
            my_cart: 'កន្រ្តករបស់ខ្ញុំ',
            name: 'ឈ្មោះ',
            phone_number: 'លេខទូរស័ព្ទ',
            cart_address: 'អាសយដ្ឋាន',
            detail_address: 'អាសយដ្ឋានលំអិត',
            payment_method: 'មធ្យោបាយបង់ប្រាក់',
            pay_arrived: 'អោយលុយពេលទំនិញទៅដល់',
            list_food: 'បញ្ជីទំនិញ',
            profile: 'ប្រវត្តិរូប',
          },
        },
      },
    };
  };
  