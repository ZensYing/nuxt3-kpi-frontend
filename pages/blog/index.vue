<!-- 
<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl  min-h-screen ">
    <div class="grid md:grid-cols-4 gap-8">
      <article 
        v-for="post in posts" 
        :key="post.id" 
        class="bg-light dark:bg-dark dark:border-light border shadow-lg rounded-xl  transition-all duration-300 hover:shadow-xl"
      >
        <div class="h-48 overflow-hidden">
          <img 
            :src="post.imageUrl" 
            :alt="post.title" 
            class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div class="p-6 h-56 ">
          <div class="flex items-center text-sm text-gray-500 mb-2">
            <span class="mr-2">{{ post.date }}</span>
            <span class="px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
              {{ post.category }}
            </span>
          </div>

          <h2 class="text-md font-semibold text-gray-900 dark:text-light mb-3">
            {{ post.title }}
          </h2>



          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img 
                :src="post.authorAvatar" 
                :alt="post.author" 
                class="w-10 h-10 rounded-full mr-3"
              />
              <span class="text-sm text-gray-700">
                {{ post.author }}
              </span>
            </div>

            <a 
              :href="`/blog/${post.slug}`" 
              class="text-blue-600 hover:text-blue-800 "
            >
              Read More
              
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
 

</template>

<script setup lang="ts">
import { ref } from 'vue'


interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  author: string
  authorAvatar: string
  imageUrl: string
  slug: string
}


interface Props {
  title?: string
  description?: string
}


const posts = ref<BlogPost[]>([
  {
    id: 1,
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies shaping the web development landscape.',
    date: 'May 15, 2024',
    category: 'Technology',
    author: 'Jane Doe',
    authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29',
    slug: 'future-of-web-development'
  },
  {
    id: 2,
    title: 'Design Thinking in Modern UX',
    excerpt: 'How design thinking can transform user experience and drive innovation.',
    date: 'April 22, 2024',
    category: 'Design',
    author: 'John Smith',
    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82fd15c',
    slug: 'design-thinking-ux'
  },
  {
    id: 3,
    title: 'AI and Machine Learning Insights',
    excerpt: 'Deep dive into the latest advancements in artificial intelligence and machine learning.',
    date: 'March 10, 2024',
    category: 'AI',
    author: 'Emily Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1',
    slug: 'ai-machine-learning-insights'
  }
  ,{
    id: 3,
    title: 'AI and Machine Learning Insights',
    excerpt: 'Deep dive into the latest advancements in artificial intelligence and machine learning.',
    date: 'March 10, 2024',
    category: 'AI',
    author: 'Emily Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1',
    slug: 'ai-machine-learning-insights'
  }
])

// Pagination
const currentPage = ref(1)
const totalPages = ref(Math.ceil(posts.value.length / 3))

// Pagination methods
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>

</style> -->
<!-- pages/maintenance.vue -->
<template>
  <BackgroundAnimationLines />

  <div class="min-h-screen bg-light dark:bg-dark flex items-center justify-center px-4">
    <div class="css-blurry-gradient-blue"></div>
    <div class="css-blurry-gradient-green"></div>
    <div class="max-w-3xl mx-auto text-center">
      <!-- Animated Gears -->
      <div class="relative w-64 h-64 mx-auto mb-8" ref="gearsContainer">
        <svg class="gear-large" viewBox="0 0 100 100" ref="largeGear">
          <path
            d="M50 25c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zm0 45c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z"
            fill="#3B82F6"
          />
          <path
            d="M50 0v10c2.8 0 5 2.2 5 5s-2.2 5-5 5v10c11 0 20 9 20 20s-9 20-20 20v10c2.8 0 5 2.2 5 5s-2.2 5-5 5v10c27.6 0 50-22.4 50-50S77.6 0 50 0z"
            fill="#2563EB"
          />
        </svg>
        <svg class="gear-small" viewBox="0 0 100 100" ref="smallGear">
          <path
            d="M50 35c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm0 25c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"
            fill="#60A5FA"
          />
          <path
            d="M50 20v5c1.7 0 3 1.3 3 3s-1.3 3-3 3v5c5.5 0 10 4.5 10 10s-4.5 10-10 10v5c1.7 0 3 1.3 3 3s-1.3 3-3 3v5c16.6 0 30-13.4 30-30S66.6 20 50 20z"
            fill="#3B82F6"
          />
        </svg>
      </div>

      <!-- Text Content -->
      <h1 
        class="text-4xl md:text-6xl font-bold text-blue-900 dark:text-light mb-6"
        ref="title"
      >
        Under Maintenance
      </h1>
      
      <p 
        class="text-lg md:text-xl text-blue-700 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
        ref="description"
      >
        We're currently improving our website to serve you better. 
        Please check back soon!
      </p>

      <!-- Progress Bar -->
      <div 
        class="w-full max-w-md mx-auto bg-blue-200 rounded-full h-4 mb-8"
        ref="progressContainer"
      >
        <div 
          class="bg-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
          ref="progressBar"
        ></div>
      </div>

      <!-- Estimated Time -->
      <!-- <p 
        class="text-blue-600 text-lg"
        ref="timeEstimate"
      >
        Estimated time remaining: <span class="font-semibold">20 minutes</span>
      </p> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import anime from 'animejs'

const gearsContainer = ref(null)
const largeGear = ref(null)
const smallGear = ref(null)
const title = ref(null)
const description = ref(null)
const progressContainer = ref(null)
const progressBar = ref(null)
const timeEstimate = ref(null)

onMounted(() => {
  // Animate gears rotation
  gsap.to(largeGear.value, {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
  })

  gsap.to(smallGear.value, {
    rotation: -360,
    duration: 8,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
  })

  // Animate text elements
  gsap.from(title.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  })

  gsap.from(description.value, {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
  })

  // Animate progress bar
  gsap.from(progressContainer.value, {
    scaleX: 0,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
  })

  // Progress bar animation
  anime({
    targets: progressBar.value,
    width: ['0%', '75%'],
    duration: 2000,
    easing: 'easeInOutQuad'
  })

  // Floating animation for gears container
  gsap.to(gearsContainer.value, {
    y: 10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  })

  // Fade in time estimate
  gsap.from(timeEstimate.value, {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 1,
    ease: "power3.out"
  })
})
</script>

<style scoped>
.gear-large {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.gear-small {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 30%;
  left: 60%;
  transform: translate(-50%, -50%);
}

/* Add hover effects */
.gear-large,
.gear-small {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: filter 0.3s ease;
}

.gear-large:hover,
.gear-small:hover {
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.2));
}
</style>