# components/ModernFooter.vue
<template>
  <footer class="bg-gray-900 text-gray-300">
    <!-- Newsletter Section with Wave Animation -->
    <!-- <div class="relative bg-blue-600 py-12 overflow-hidden">
      <div class="wave-animation absolute inset-0 opacity-10"></div>
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="text-white max-w-xl">
            <h3 class="text-2xl font-bold mb-2">Stay Updated</h3>
            <p class="text-blue-100">Subscribe to our newsletter for the latest updates and insights.</p>
          </div>
          <form @submit.prevent="subscribeNewsletter" class="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              v-model="email"
              placeholder="Enter your email"
              class="px-4 py-2 rounded-lg flex-1 md:w-64 bg-white/10 border border-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
            <button 
              class="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div> -->

    <!-- Main Footer Content -->
    <div class="max-w-6xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" ref="footerContent">
        <!-- Company Info -->
        <!-- <div>
          <h3 class="text-xl font-bold text-white mb-6">Company</h3>
          <ul class="space-y-4">
            <li v-for="link in companyLinks" :key="link.text">
              <a :href="link.url" class="hover:text-white transition-colors">{{ link.text }}</a>
            </li>
          </ul>
        </div> -->

        <!-- Services -->
        <div>
          <h3 class="text-xl font-bold text-white mb-6">Services</h3>
          <ul class="space-y-4">
            <li v-for="service in services" :key="service.text">
              <a :href="service.url" class="hover:text-white transition-colors">{{ service.text }}</a>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="text-xl font-bold text-white mb-6">Resources</h3>
          <ul class="space-y-4">
            <li v-for="resource in resources" :key="resource.text">
              <a :href="resource.url" class="hover:text-white transition-colors">{{ resource.text }}</a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-xl font-bold text-white mb-6">Contact Us</h3>
          <ul class="space-y-4">
            <li class="flex items-center gap-2">
              <Icon icon="heroicons:map-pin" class="w-5 h-5 text-blue-400" />
              <span>Terk Tla, Sen Sok, Phnom Penh, Cambodia</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="heroicons:envelope" class="w-5 h-5 text-blue-400" />
              <a href="mailto:sounsoratha@gmail.com" class="hover:text-white transition-colors">
                sounsoratha@gmail.com
              </a>
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="heroicons:phone" class="w-5 h-5 text-blue-400" />
              <a href="tel:+1234567890" class="hover:text-white transition-colors">
                (+855) 69 284 356
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Social Links -->
      <div class="mt-12 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-6" ref="socialIcons">
            <a v-for="social in socials" 
               :key="social.name"
               :href="social.url"
               :aria-label="social.name"
               target="_blank"
               class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors group"
            >
              <Icon 
                :icon="social.icon" 
                class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
              />
            </a>
          </div>
          <p class="text-sm text-gray-500">
            © {{ new Date().getFullYear() }} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import gsap from 'gsap'

const email = ref('')
const footerContent = ref(null)
const socialIcons = ref(null)

const companyLinks = [
  { text: 'About Us', url: '/about' },
  { text: 'Our Team', url: '' },
  { text: 'Careers', url: '' },
  { text: 'Press', url: '' }
]

const services = [
  { text: 'Web Development', url: '#' },
  { text: 'Mobile Apps', url: '#' },
  { text: 'UI/UX Design', url: '#' },
  { text: 'Consulting', url: '#' }
]

const resources = [
  { text: 'Blog', url: '#' },
  { text: 'Documentation', url: '#' },
  { text: 'Help Center', url: '#' },
  { text: 'Terms of Service', url: '#' }
]

const socials = [
  { name: 'GitHub', icon: 'mdi:github', url: 'https://github.com/ZensYing' },
//   { name: 'Twitter', icon: 'mdi:twitter', url: '#' },
  { name: 'LinkedIn', icon: 'mdi:linkedin', url: 'https://www.linkedin.com/in/soun-soratha-71343a289/' },
  { name: 'Telegram', icon: 'mdi:telegram', url: '#' }
]

const subscribeNewsletter = () => {
  // Handle newsletter subscription
  console.log('Subscribing:', email.value)
  email.value = ''
}

onMounted(() => {
  // Animate footer content on mount
  gsap.from(footerContent.value.children, {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
  })

  // Animate social icons
  gsap.from(socialIcons.value.children, {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.7)',
    delay: 0.5
  })
})
</script>

<style scoped>
.wave-animation {
  background: linear-gradient(45deg, white, transparent);
  animation: wave 8s ease-in-out infinite;
  background-size: 200% 200%;
}

@keyframes wave {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}
</style>