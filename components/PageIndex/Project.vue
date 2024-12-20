<!-- pages/projects.vue -->
<template>
    <BackgroundAnimationAnimate />
    <div class="min-h-screen bg-light dark:bg-dark">
      <!-- Hero Section -->
      <section class="relative h-96 flex items-center justify-center overflow-hidden">
        <div class="relative z-10 text-center px-4"data-aos="fade-up">
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
            My Projects I have build
          </h1>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my portfolio of completed projects, showcasing innovative solutions and creative designs.
          </p>
        </div>
        
        <div class="absolute bottom-10   left-1/2 transform -translate-x-1/2 animate-bounce" >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-aos="fade-up"> 
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </section>
  
      <!-- Projects Grid -->
      <section class="container mx-auto px-4 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(project, index) in projects" 
               :key="index"
               class="group relative bg-slate-800 rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105"
               data-aos="fade-up"
               :data-aos-delay="index * 100">
            
            <!-- Project Image -->
            <div class="relative h-72 overflow-hidden flex items-center justify-center">
              <img :src="project.image" :alt="project.title"  
                   class="w-96 object-cover transform transition-transform duration-700 group-hover:scale-110"/>
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
            </div>
            
            <!-- Project Info -->
            <div class="p-6">
              <div class="flex items-center  space-x-3">
                <h3 class="text-2xl font-bold text-white ">{{ project.title }}</h3> <img :src="project.prologo" class="h-16  min-w-16     " alt="">
              </div>
              <p class="text-gray-400 mb-2">{{ project.description }}</p>
              
              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="tech in project.technologies" 
                      :key="tech"
                      class="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full">
                  {{ tech }}
                </span>
              </div>
              
              <!-- Project Links -->
              <div class="flex gap-4">
                <NuxtLink :to="project.liveLink"  target="_blank"
                   class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors z-[10]">
                  <Icon icon="heroicons:globe-alt" class="w-5 h-5 mr-2" />
                  Live Demo
                </NuxtLink>
                <!-- <a :href="project.githubLink"
                   class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <Icon icon="heroicons:code-bracket" class="w-5 h-5 mr-2" />
                  Source Code
                </a> -->
              </div>
            </div>
            
            <!-- 3D Hover Effect -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform rotate-12 scale-150"></div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Featured Project Section -->
      <section class="py-20 bg-slate-800/50">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl font-bold text-white mb-12 text-center" data-aos="fade-up">
            Featured Project
          </h2>
          
          <div class="grid md:grid-cols-2 gap-12 items-center" data-aos="fade-up">
            <!-- Featured Project Preview -->
            <div class="relative group">
              <div class="relative rounded-xl overflow-hidden">
                <img :src="featuredProject.image" :alt="featuredProject.title"
                     class="w-full transform transition-transform duration-700 group-hover:scale-105"/>
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              </div>
              
              <!-- 3D Card Effect -->
              <div class="absolute inset-0 transform perspective-1000 group-hover:rotate-y-12 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"></div>
              </div>
            </div>
            
            <!-- Featured Project Info -->
            <div class="space-y-6">
              <h3 class="text-3xl font-bold text-white">{{ featuredProject.title }}</h3>
              <p class="text-gray-300">{{ featuredProject.description }}</p>
              
              <!-- Key Features -->
              <ul class="space-y-3">
                <li v-for="feature in featuredProject.features" 
                    :key="feature"
                    class="flex items-center text-gray-300">
                  <Icon icon="heroicons:check-circle" class="w-5 h-5 text-blue-400 mr-2" />
                  {{ feature }}
                </li>
              </ul>
              
              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-3">
                <span v-for="tech in featuredProject.technologies"
                      :key="tech"
                      class="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg">
                  {{ tech }}
                </span>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex gap-4">
                <a :href="featuredProject.liveLink"
                   class="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  View Project
                </a>
                <a :href="featuredProject.caseStudy"
                   class="inline-flex items-center px-6 py-3 border border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                  Case Study
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useMotion } from '@vueuse/motion'
  import AOS from 'aos'
  import 'aos/dist/aos.css'
  import { Icon } from '@iconify/vue'
  import { gsap } from 'gsap'
  
  // Motion preset for fade in up animation
  const fadeInUp = {
    initial: {
      opacity: 0,
      y: 100,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 800,
      },
    },
  }
  
  // Sample project data - replace with your actual projects
  const projects = ref([
  {
      title: 'Technology Cambodia',
      description: 'A modern  platform built with Vue.js and Nuxt 3',
      image: '/project/tech-cambodia.png',
      technologies: ['Vue.js', 'Nuxt 3', 'TailwindCSS', 'Directus'],
      liveLink: 'https://tech-cambodia.com/',
      githubLink: '#',
      prologo: '/prologo/tech-cambodia.png'
    },
    {
      title: 'Business Cambodia',
      description: 'A modern  platform built with Vue.js and Nuxt 3',
      image: '/project/business-cambodia.png',
      technologies: ['Vue.js', 'Nuxt 3', 'TailwindCSS', 'Directus'],
      liveLink: 'https://business-cambodia.com/',
      githubLink: '#',
      prologo: '/prologo/bc.png'
    },
    {
      title: 'Healthy  Cambodia',
      description: 'A modern  platform built with Vue.js and Nuxt 3',
      image: '/project/healthy-cambodia.png',
      technologies: ['Vue.js', 'Nuxt 3', 'TailwindCSS', 'Directus'],
      liveLink: 'https://healthy-cambodia.com/',
      githubLink: '#',
      prologo: '/prologo/healthy.png'
    },
    {
      title: 'Attwood Cambodia',
      description: 'A modern  platform built with Vue.js and Nuxt 3',
      image: '/project/attwood.png',
      technologies: ['Vue.js', 'Nuxt 3', 'TailwindCSS', 'Node.js'],
      liveLink: 'http://172.104.191.171:7000/',
      githubLink: '#',
      prologo: '/prologo/attwood.png'
    },

    
    {
      title: 'BAKSEY Academy',
      description: 'A modern E-learning website',
      image: '/project/baksey.png',
      technologies: [ 'Nuxt 3','Nest js', 'Directus', 'TailwindCSS'],
      liveLink: 'https://bakseyacademy.com/',
      githubLink: '#',
      prologo: '/prologo/baksey.png'
    },
    {
      title: 'Khmer 25 Mart',
      description: 'A modern grocery website',
      image: '/project/khmer25.png',
      technologies: ['Nuxt3 js', 'Directus', 'TailwindCSS'],
      liveLink: 'https://khmer25.tech-cambodia.com/' ,
      githubLink: '#',
      prologo: 'https://www.technologycambodia.com/'
    },
    {
      title: 'Attwood Investment',
      description: 'A modern investment website',
      image: '/project/attwood-investment.png',
      technologies: ['Nuxt3 js', 'Directus', 'TailwindCSS'],
      liveLink: 'http://172.104.191.171:4000/',
      githubLink: '#',
      prologo: 'https://www.technologycambodia.com/'
    },
   
 
  ])
  
  // Featured project data
  const featuredProject = ref({
    title: 'AI-Powered Analytics Dashboard',
    description: 'A comprehensive analytics dashboard with AI-driven insights and real-time data visualization.',
    image: '',
    technologies: ['Vue.js', 'TensorFlow.js', 'D3.js', 'Node.js'],
    features: [
      'Real-time data processing',
      'AI-powered predictions',
      'Interactive visualizations',
      'Customizable dashboards'
    ],
    liveLink: '#',
    caseStudy: '#'
  })
  
  // Grid hover effect state
  const hoverEffect = ref(false)
  
  // Initialize AOS
  onMounted(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out',
      once: true
    })
  
    // Initialize GSAP animations
    gsap.from('.grid-cols-8 > div', {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: {
        amount: 1.5,
        grid: 'auto',
        from: 'center'
      }
    })
  })
  
  // Grid hover effect function
  const triggerHoverEffect = (index) => {
    if (!hoverEffect.value) return
    
    gsap.to(`.grid-cols-8 > div:nth-child(${index})`, {
      scale: 1.5,
      duration: 0.5,
      ease: 'power2.out'
    })
  }
  </script>
  
  <style scoped>
  /* Custom perspective transformation */
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .rotate-y-12 {
    transform: rotateY(12deg);
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  /* Custom animations */
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  .floating {
    animation: float 6s ease-in-out infinite;
  }
  </style>