<!-- pages/about/index.vue -->
<template>
    <div class="min-h-screen bg-light dark:bg-dark">
     
      <!-- Hero Section with 3D Parallax -->
      <section 
        ref="heroSection" 
        class="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div 
          ref="heroBackground" 
          class="absolute inset-0 bg-cover bg-center transform transition-transform duration-500"
          :style="{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1522252234503-e356532cafd5)',
            transform: `translateY(${heroParallaxOffset}px)`
          }"
        ></div>
        
        <div class="relative z-10 text-center px-4">
         <div class="flex justify-between max-md:flex-col">
            <motion-reveal>
            <h1 
              class="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
              ref="heroTitle"
            >
              SOUN Soratha
            </h1>
            <p 
              class="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-xl"
              ref="heroSubtitle"
            >
              Full Stack Web Developer 
            </p>
          </motion-reveal>
        <CardsHero />
         </div>
          
          <div class="flex justify-center space-x-6">
            <a 
              href="#about" 
              class="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all flex items-center"
            >
              About Me
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fill-rule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" 
                  clip-rule="evenodd" 
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
  
      <!-- About Me Section -->
      <section 
        id="about" 
        ref="aboutSection" 
        class="container mx-auto px-4 py-24 grid md:grid-cols-2 gap-16 items-center"
      >
        <motion-reveal direction="left">
          <div 
            ref="aboutImage"
            class="relative group perspective-1000 transform transition-all duration-700"
          >
            <div class="rounded-2xl overflow-hidden shadow-2xl transform rotate-y-10 group-hover:rotate-y-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1507813860472-e9fdInputlexity-900"
                alt="Profile"
                class="w-full h-auto object-cover"
              />
            </div>
          </div>
        </motion-reveal>


        <motion-reveal direction="right">
          <!-- <div class="css-blurry-gradient-blue"></div>
          <div class="css-blurry-gradient-green"></div> -->

          <div>
            <h2 class="text-4xl font-bold text-gray-900 mb-6">
              About Me
            </h2>
            <div class="space-y-6 text-gray-700 leading-relaxed">
              <p>
                I'm a passionate full-stack developer with a mission to create innovative technological solutions that make a difference. With over 5 years of experience in web development, I specialize in creating robust, scalable, and user-friendly applications.
              </p>
              <p>
                My expertise spans across modern web technologies, including Vue.js, React, Node.js, and cloud architectures. I believe in continuous learning and pushing the boundaries of what's possible with technology.
              </p>
            </div>
  
            <div class="mt-10 grid md:grid-cols-2 gap-6">
              <div 
                v-for="skill in skills" 
                :key="skill.name"
                class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <div class="flex items-center mb-4">
                  <component 
                    :is="skill.icon" 
                    class="w-10 h-10 mr-4 text-blue-600"
                  />
                  <h3 class="text-xl font-semibold text-gray-900">
                    {{ skill.name }}
                  </h3>
                </div>
                <p class="text-gray-600">
                  {{ skill.description }}
                </p>
              </div>
            </div>
          </div>
        </motion-reveal>
      </section>
  
      <!-- Skills and Technologies -->
      <section class="bg-white dark:bg-dark py-24 ">
        <div class="container mx-auto px-4">
          <motion-reveal>
            <h2 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
              Technologies I Work With
            </h2>
          </motion-reveal>
  
          <div class="grid grid-cols-3 md:grid-cols-6 gap-8 justify-center">
          <div class="css-blurry-gradient-green"></div> 

            <motion-reveal 
              v-for="tech in technologies" 
              :key="tech.name"
              class="flex justify-center items-center"
            >
              <div 
                class="w-24 h-24 bg-gray-50 rounded-xl shadow-md flex justify-center items-center transform transition-all duration-300 hover:-translate-y-2"
              >
                <component 
                  :is="tech.icon" 
                  class="w-16 h-16 text-gray-700 opacity-70 hover:opacity-100"
                />
              </div>
            </motion-reveal>
          </div>
        </div>
      </section>
      
      <!-- Contact CTA -->
      <section class="bg-gradient-to-r from-blue-600 to-purple-600 py-24 text-center">
        <motion-reveal>
          <h2 class="text-4xl font-bold text-white mb-6">
            Let's Create Something Amazing Together
          </h2>
          <p class="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Interested in collaborating or have a project in mind? I'm always open to exciting opportunities and challenges.
          </p>
          <a 
            href="mailto:john.doe@example.com" 
            class="px-10 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            Get in Touch
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6 ml-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </a>
        </motion-reveal>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { 
    CodeBracketIcon, 
    CloudIcon, 
    // DatabaseIcon, 
    ServerIcon, 
    ChartBarIcon, 
    CubeTransparentIcon 
  } from '@heroicons/vue/24/outline'
  
  // Custom Motion Reveal Component (simplified Vue implementation)
  const MotionReveal = defineComponent({
    props: {
      direction: {
        type: String,
        default: 'up'
      }
    },
    setup(props, { slots }) {
      const elementRef = ref<HTMLElement | null>(null)
  
      onMounted(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate-reveal')
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.1 }
        )
  
        if (elementRef.value) {
          observer.observe(elementRef.value)
        }
      })
  
      return () => h(
        'div', 
        { 
          ref: elementRef,
          class: `opacity-0 transform transition-all duration-1000 
            ${props.direction === 'up' ? '-translate-y-10' : 
              props.direction === 'left' ? '-translate-x-10' : 
              props.direction === 'right' ? 'translate-x-10' : ''}`
        }, 
        slots.default && slots.default()
      )
    }
  })
  
  // Scroll Parallax for Hero Section
  const heroSection = ref<HTMLElement | null>(null)
  const heroBackground = ref<HTMLElement | null>(null)
  const heroParallaxOffset = ref(0)
  
  const handleScroll = () => {
    if (heroBackground.value) {
      const scrollPosition = window.pageYOffset
      heroParallaxOffset.value = scrollPosition * 0.5
    }
  }
  
  // Skills Data
  const skills = [
    {
      name: 'Web Development',
      icon: CodeBracketIcon,
      description: 'Creating responsive and performant web applications.'
    },
    {
      name: 'Cloud Solutions',
      icon: CloudIcon,
      description: 'Designing scalable cloud-native architectures.'
    },
 
    {
      name: 'Server Management',
      icon: ServerIcon,
      description: 'Ensuring robust and secure server infrastructure.'
    }
  ]
  
  // Technologies Data
  const technologies = [
    { name: 'Vue.js', icon: CubeTransparentIcon },
    { name: 'React', icon: ChartBarIcon },
    { name: 'Node.js', icon: ServerIcon },
    { name: 'TypeScript', icon: CodeBracketIcon },
    { name: 'Tailwind', icon: CloudIcon },
    // { name: 'Docker', icon: DatabaseIcon }
  ]
  
  // Lifecycle Hooks
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  </script>
  
  <style scoped>
  /* 3D Reveal Animation */
  .animate-reveal {
    opacity: 1;
    transform: translate(0);
  }
  
  /* 3D Perspective Utilities */
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .rotate-y-10 {
    transform: rotateY(10deg);
  }
  
  .rotate-y-0 {
    transform: rotateY(0);
  }
  
  /* Additional custom styles can be added here */
  </style>