<!-- components/ProjectTabs.vue -->
<template>
    <div class="w-full max-w-6xl mx-auto px-4 py-12">
        <div>
            <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-light mb-8">My Projects</h2>
        </div>
      <!-- Tab Navigation -->
      <div class="flex flex-wrap justify-center gap-4 mb-8 relative">
        <button
          v-for="tab in ['all', ...categories]"
          :key="tab"
          @click="selectTab(tab)"
          class="relative px-6 py-3 text-lg font-medium transition-all duration-300"
          :class="[
            activeTab === tab
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-blue-500'
          ]"
        >
          {{ formatTabTitle(tab) }}
          <!-- Animated underline -->
          <div
            v-if="activeTab === tab"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
            ref="activeIndicator"
          ></div>
        </button>
      </div>
  
      <!-- Tab Content -->
      <div class="relative min-h-[400px]">
        <!-- Project Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="bg-gray-900 border rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            :data-category="project.category"
            ref="projectCards"
          >
            <div class="relative aspect-video overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div class="absolute top-3 right-3">
                <span class="px-3 py-1 text-sm font-medium text-white rounded-full"
                  :class="{
                    'bg-blue-500': project.category === 'mobile',
                    'bg-purple-500': project.category === 'website',
                    'bg-green-500': project.category === 'uxui'
                  }"
                >
                  {{ formatTabTitle(project.category) }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
              <p class="text-gray-600">{{ project.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import gsap from 'gsap'
  
  const categories = ['mobile', 'website', 'uxui']
  
  const projects = [
    {
      id: 1,
      category: 'mobile',
      title: 'Food Delivery App',
      description: 'A modern food delivery application with real-time tracking',
      image: '/api/placeholder/600/400'
    },
    {
      id: 2,
      category: 'mobile',
      title: 'Fitness Tracker',
      description: 'Personal fitness tracking and workout planning app',
      image: '/api/placeholder/600/400'
    },
    {
      id: 3,
      category: 'mobile',
      title: 'Social Network',
      description: 'Mobile-first social networking platform',
      image: '/api/placeholder/600/400'
    },
    {
      id: 4,
      category: 'website',
      title: 'E-commerce Platform',
      description: 'Full-featured online shopping experience',
      image: '/api/placeholder/600/400'
    },
    {
      id: 5,
      category: 'website',
      title: 'Portfolio Site',
      description: 'Professional portfolio website with dynamic content',
      image: '/api/placeholder/600/400'
    },
    {
      id: 6,
      category: 'website',
      title: 'Blog Platform',
      description: 'Modern blogging platform with CMS integration',
      image: '/api/placeholder/600/400'
    },
    {
      id: 7,
      category: 'uxui',
      title: 'Design System',
      description: 'Comprehensive UI component library and guidelines',
      image: '/api/placeholder/600/400'
    },
    {
      id: 8,
      category: 'uxui',
      title: 'Mobile App Design',
      description: 'User-centered mobile application interface design',
      image: '/api/placeholder/600/400'
    },
    {
      id: 9,
      category: 'uxui',
      title: 'Website Redesign',
      description: 'Complete website redesign with focus on user experience',
      image: '/api/placeholder/600/400'
    }
  ]
  
  const activeTab = ref('all')
  const projectCards = ref([])
  
  const filteredProjects = computed(() => {
    if (activeTab.value === 'all') {
      return projects
    }
    return projects.filter(project => project.category === activeTab.value)
  })
  
  const formatTabTitle = (tab) => {
    const titles = {
      all: 'All',
      mobile: 'Mobile Apps',
      website: 'Websites',
      uxui: 'UX/UI Design'
    }
    return titles[tab]
  }
  
  const selectTab = (tabId) => {
    // Don't animate if selecting the same tab
    if (activeTab.value === tabId) return
  
    // Animate out current projects
    gsap.to(projectCards.value, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.05,
      onComplete: () => {
        // Update active tab
        activeTab.value = tabId
        
        // Wait for DOM update
        nextTick(() => {
          // Animate in new projects
          gsap.fromTo(
            projectCards.value,
            {
              opacity: 0,
              y: 20
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out'
            }
          )
        })
      }
    })
  }
  
  onMounted(() => {
    // Initial animation
    gsap.fromTo(
      projectCards.value,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      }
    )
  })
  </script>