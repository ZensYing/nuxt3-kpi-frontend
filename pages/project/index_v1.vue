<!-- pages/projects/index.vue -->
<template>
    <div class="container mx-auto px-4 py-12 max-w-6xl min-h-screen">
      <!-- Projects Carousel -->
      <div class="relative w-full">
        <!-- Carousel Container -->
        <div 
          ref="carouselContainer"
          class="overflow-hidden relative w-full"
        >
          <!-- Carousel Wrapper -->
          <div 
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            class="flex transition-transform duration-500 ease-in-out"
          >
            <!-- Project Cards -->
            <div 
              v-for="(project, index) in projects" 
              :key="project.id"
              class="w-full flex-shrink-0 flex justify-center"
            >
              <div class="max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
                <!-- Project Image -->
                <div class="md:w-1/2 h-96 md:h-auto">
                  <img 
                    :src="project.imageUrl" 
                    :alt="project.title"
                    class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
  
                <!-- Project Details -->
                <div class="md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center mb-4">
                      <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm mr-3">
                        {{ project.category }}
                      </span>
                      <span class="text-gray-500 text-sm">
                        {{ project.date }}
                      </span>
                    </div>
  
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">
                      {{ project.title }}
                    </h2>
  
                    <p class="text-gray-600 mb-6">
                      {{ project.description }}
                    </p>
                  </div>
  
                  <div class="flex space-x-4">
                    <!-- Live Demo Button -->
                    <a 
                      v-if="project.demoUrl"
                      :href="project.demoUrl"
                      target="_blank"
                      class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-5 w-5 mr-2" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      Live Demo
                    </a>
  
                    <!-- GitHub Button -->
                    <a 
                      v-if="project.githubUrl"
                      :href="project.githubUrl"
                      target="_blank"
                      class="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        class="mr-2"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Carousel Navigation -->
        <div class="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
          <button 
            @click="prevSlide"
            class="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/90 transition-all"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6 text-gray-700" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            @click="nextSlide"
            class="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/90 transition-all"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6 text-gray-700" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
  
        <!-- Pagination Dots -->
        <div class="flex justify-center mt-8 space-x-3">
          <button 
            v-for="(project, index) in projects" 
            :key="project.id"
            @click="goToSlide(index)"
            :class="[
              'w-3 h-3 rounded-full transition-all duration-300',
              currentSlide === index ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
            ]"
          ></button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  
  // Project Interface
  interface Project {
    id: number
    title: string
    description: string
    category: string
    date: string
    imageUrl: string
    demoUrl?: string
    githubUrl?: string
  }
  
  // Sample Projects Data
  const projects = ref<Project[]>([
    {
      id: 1,
      title: 'AI-Powered Task Manager',
      description: 'An intelligent task management application that uses machine learning to prioritize and optimize your workflow.',
      category: 'Web Application',
      date: 'January 2024',
      imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db',
      demoUrl: 'https://example.com/task-manager',
      githubUrl: 'https://github.com/username/task-manager'
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description: 'A comprehensive e-commerce solution with advanced product recommendation and personalized shopping experience.',
      category: 'Full Stack',
      date: 'March 2024',
      imageUrl: 'https://images.unsplash.com/photo-160773549420-1431d5c9c52c',
      demoUrl: 'https://example.com/ecommerce',
      githubUrl: 'https://github.com/username/ecommerce-platform'
    },
    {
      id: 3,
      title: 'Real-Time Collaboration Tool',
      description: 'A collaborative workspace with live editing, video conferencing, and integrated project management features.',
      category: 'SaaS',
      date: 'May 2024',
      imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f',
      demoUrl: 'https://example.com/collaboration-tool',
      githubUrl: 'https://github.com/username/collaboration-tool'
    }
  ])
  
  // Carousel State
  const currentSlide = ref(0)
  const carouselContainer = ref<HTMLElement | null>(null)
  
  // Slide Navigation Methods
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % projects.value.length
  }
  
  const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + projects.value.length) % projects.value.length
  }
  
  const goToSlide = (index: number) => {
    currentSlide.value = index
  }
  
//   // Auto Slide Functionality
//   let autoSlideInterval: NodeJS.Timeout | null = null
  
//   const startAutoSlide = () => {
//     autoSlideInterval = setInterval(() => {
//       nextSlide()
//     }, 2000) // Change slide every 5 seconds
//   }
  
//   const stopAutoSlide = () => {
//     if (autoSlideInterval) {
//       clearInterval(autoSlideInterval)
//     }
//   }
  
//   // Lifecycle Hooks
//   onMounted(() => {
//     startAutoSlide()
//   })
  
//   onUnmounted(() => {
//     stopAutoSlide()
//   })

  </script>
  
  <style scoped>
  /* Additional custom styles can be added here if needed */
  </style>