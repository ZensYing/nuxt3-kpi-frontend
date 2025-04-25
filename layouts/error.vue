<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="flex-grow flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="(particle, index) in particles" :key="`particle-${index}`" 
             class="absolute rounded-full opacity-30 dark:opacity-20"
             :class="`bg-${particle.color}-500`"
             :style="{
               width: `${particle.size}px`,
               height: `${particle.size}px`,
               left: `${particle.x}%`,
               top: `${particle.y}%`,
               animationDuration: `${particle.duration}s`,
               animationDelay: `${particle.delay}s`
             }"
        ></div>
      </div>

      <div class="max-w-4xl w-full rounded-2xl backdrop-blur-sm bg-white/70 dark:bg-gray-800/50 shadow-xl border border-gray-200 dark:border-gray-700 p-8 md:p-12 relative z-10">
        <!-- 404 Interactive Animation -->
        <div class="relative mb-8 h-48 md:h-64 overflow-hidden" ref="animationContainer">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="glitch-wrapper" @mousemove="handleMouseMove">
              <h1 class="glitch text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 select-none">
                404
              </h1>
            </div>
          </div>
          <div class="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 400 200" class="w-full h-full">
              <!-- Connected dots animation -->
              <g class="dots-grid">
                <circle v-for="(dot, index) in gridDots" :key="`dot-${index}`" 
                        :cx="dot.x" :cy="dot.y" r="1.5"
                        class="fill-blue-500 dark:fill-blue-400 opacity-40" />
                <!-- Lines connecting nearby dots -->
                <line v-for="(line, index) in connectionLines" :key="`line-${index}`"
                      :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2"
                      class="stroke-purple-500 dark:stroke-purple-400 opacity-20" 
                      stroke-width="0.5" />
              </g>
            </svg>
          </div>
        </div>

        <!-- Error Message with Typing Effect -->
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            <span class="typewriter-text">{{ typedTitle }}</span>
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {{ errorMessage }}
            <span class="blink-cursor">|</span>
          </p>

          <!-- Path Info Card with hover effect -->
          <div class="inline-block mb-8">
            <div class="p-4 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md group">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                <div class="border-l border-gray-300 dark:border-gray-600 h-5 mx-2"></div>
                <p class="text-gray-500 dark:text-gray-400 font-mono group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                  <span class="text-green-600 dark:text-green-400">{{ locale === 'en' ? 'Path' : 'ផ្លូវ' }}:</span> {{ currentPath }}
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
            <NuxtLink to="/" class="relative px-6 py-3 overflow-hidden group bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-center">
              <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span class="relative flex items-center justify-center">
                <Icon icon="heroicons:home" class="w-5 h-5 mr-2" />
                {{ locale === 'en' ? 'Go Home' : 'ទៅទំព័រដើម' }}
              </span>
            </NuxtLink>
            <button @click="goBack" class="relative px-6 py-3 overflow-hidden group bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-center">
              <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span class="relative flex items-center justify-center">
                <Icon icon="heroicons:arrow-left" class="w-5 h-5 mr-2" />
                {{ locale === 'en' ? 'Go Back' : 'ត្រឡប់ក្រោយ' }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Toast Notifications -->
    <Transition name="toast">
      <div v-if="showRandomPhrase" 
           class="fixed bottom-10 z-10 right-10 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-xs" 
           @click="dismissToast">
        <div class="flex items-start">
          <div class="flex-shrink-0 mr-3">
            <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Icon icon="heroicons:lightbulb" class="w-5 h-5 text-blue-500 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <p class="text-gray-800 dark:text-white">{{ randomPhrase }}</p>
            <div class="w-full h-1 mt-3 bg-gray-200 dark:bg-gray-700 rounded">
              <div class="bg-blue-500 h-1 rounded animation-progress" :style="{ animationDuration: toastDuration + 'ms' }"></div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const animationContainer = ref<HTMLElement | null>(null);

// Reactive states
const typedTitle = ref('');
const mousePosition = reactive({ x: 0, y: 0 });
const toastDuration = 5000;

// Current path
const currentPath = computed(() => route.path);

// Custom error messages based on locale
const errorMessage = computed(() => {
  return locale.value === 'en' 
    ? "We couldn't find the page you're looking for. It might have been moved or deleted."
    : "យើងមិនអាចរកឃើញទំព័រដែលអ្នកកំពុងស្វែងរកទេ។ វាប្រហែលជាត្រូវបានផ្លាស់ទីឬលុបហើយ។";
});

// Title text based on locale
const titleText = computed(() => {
  return locale.value === 'en' ? 'Page Not Found' : 'រកមិនឃើញទំព័រ';
});

// Particles for background
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const particles = ref<Particle[]>([]);
const generateParticles = () => {
  const colors = ['blue', 'purple', 'indigo', 'pink'];
  const newParticles = [];
  
  for (let i = 0; i < 20; i++) {
    newParticles.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 2
    });
  }
  
  particles.value = newParticles;
};

// Grid dots for animation
interface GridDot {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const gridDots = ref<GridDot[]>([]);
interface ConnectionLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const connectionLines = ref<ConnectionLine[]>([]);
const generateGridDots = () => {
  const dots = [];
  const spacing = 20;
  
  for (let x = 0; x < 400; x += spacing) {
    for (let y = 0; y < 200; y += spacing) {
      dots.push({
        x: x + (Math.random() * 5 - 2.5),
        y: y + (Math.random() * 5 - 2.5),
        vx: Math.random() * 0.3 - 0.15,
        vy: Math.random() * 0.3 - 0.15
      });
    }
  }
  
  gridDots.value = dots;
};

// Function to animate grid dots
const animateGridDots = () => {
  gridDots.value.forEach(dot => {
    dot.x += dot.vx;
    dot.y += dot.vy;
    
    // Bounce off edges
    if (dot.x < 0 || dot.x > 400) dot.vx *= -1;
    if (dot.y < 0 || dot.y > 200) dot.vy *= -1;
  });
  
  // Generate connection lines
  const lines = [];
  const maxDistance = 30;
  
  for (let i = 0; i < gridDots.value.length; i++) {
    for (let j = i + 1; j < gridDots.value.length; j++) {
      const dx = gridDots.value[i].x - gridDots.value[j].x;
      const dy = gridDots.value[i].y - gridDots.value[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < maxDistance) {
        lines.push({
          x1: gridDots.value[i].x,
          y1: gridDots.value[i].y,
          x2: gridDots.value[j].x,
          y2: gridDots.value[j].y
        });
      }
    }
  }
  
  connectionLines.value = lines;
  animationFrameId = requestAnimationFrame(animateGridDots);
};

// Handle mouse movement for 404 interaction
const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
  if (!animationContainer.value) return;
  
  const rect = animationContainer.value.getBoundingClientRect();
  mousePosition.x = ((event.clientX - rect.left) / rect.width) * 100;
  mousePosition.y = ((event.clientY - rect.top) / rect.height) * 100;
};

// Go back function
const goBack = () => {
  router.back();
};

// Typing effect
const typeEffect = async (text: string, target: globalThis.Ref<string, string>) => {
  target.value = '';
  const speed = 50;
  
  for (let i = 0; i < text.length; i++) {
    target.value += text.charAt(i);
    await new Promise(resolve => setTimeout(resolve, speed));
  }
};

// Random phrases for toast notifications based on locale
const phrases = computed(() => {
  if (locale.value === 'en') {
    return [
      "Looks like you're a bit lost!",
      "Welcome to the void, nothing to see here.",
      "Let's explore somewhere else!",
      "Every wrong turn is a new adventure!",
      "Error 404: Page not in this dimension",
      "Have you tried turning it off and on again?",
      "This page is in another castle",
      "Houston, we have a problem",
      "Oops! The digital highway took a detour"
    ];
  } else {
    // Khmer phrases
    return [
      "មើលទៅអ្នកហាក់ដូចជាវង្វេងបន្តិច!",
      "សូមស្វាគមន៍មកកាន់ទំហំទទេ គ្មានអ្វីត្រូវមើលនៅទីនេះទេ។",
      "តោះរុករកកន្លែងផ្សេងទៀត!",
      "រាល់ការបត់ខុសគឺជាការផ្សងព្រេងថ្មី!",
      "កំហុស 404៖ ទំព័រមិននៅក្នុងវិមាត្រនេះទេ",
      "តើអ្នកបានព្យាយាមបិទហើយបើកវាម្តងទៀតទេ?",
      "ទំព័រនេះនៅក្នុងប្រាសាទមួយផ្សេងទៀត",
      "ហូស្តុន យើងមានបញ្ហា",
      "អូ៎! ផ្លូវឌីជីថលបានប្តូរទិសដៅ"
    ];
  }
});

const randomPhrase = ref('');
const showRandomPhrase = ref(false);

// Toast notification dismiss
const dismissToast = () => {
  showRandomPhrase.value = false;
};

// Display random phrases
const displayRandomPhrase = () => {
  randomPhrase.value = phrases.value[Math.floor(Math.random() * phrases.value.length)];
  showRandomPhrase.value = true;
  
  setTimeout(() => {
    showRandomPhrase.value = false;
  }, toastDuration);
};

// Animation frame ID for cleanup
let animationFrameId = 0;
let toastInterval: string | number | NodeJS.Timeout | null | undefined = null;

onMounted(() => {
  // Initialize particles
  generateParticles();
  
  // Initialize grid dots
  generateGridDots();
  animateGridDots();
  
  // Start typing effect
  typeEffect(titleText.value, typedTitle);
  
  // Show random phrases periodically
  toastInterval = setInterval(() => {
    displayRandomPhrase();
  }, 12000);
  
  // Show first phrase after a delay
  setTimeout(displayRandomPhrase, 3000);
});

onBeforeUnmount(() => {
  if (toastInterval !== null) {
    clearInterval(toastInterval);
  }
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
/* Floating particles animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-15px) translateX(15px);
  }
  50% {
    transform: translateY(0) translateX(30px);
  }
  75% {
    transform: translateY(15px) translateX(15px);
  }
}

.absolute {
  animation: float var(--duration, 15s) infinite ease-in-out;
  animation-delay: var(--delay, 0s);
}

/* Glitch effect */
.glitch-wrapper {
  position: relative;
}

.glitch {
  position: relative;
  transition: transform 0.2s ease;
}

.glitch::before,
.glitch::after {
  content: "404";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-clip: text;
  -webkit-background-clip: text;
}

.glitch::before {
  left: 2px;
  text-shadow: -1px 0 #ff00c1;
  animation: glitch-animation 2s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  transform: translateX(-2px);
}

.glitch::after {
  left: -2px;
  text-shadow: 2px 0 #00c8ff;
  animation: glitch-animation 3s infinite linear alternate-reverse;
  clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
  transform: translateX(2px);
}

@keyframes glitch-animation {
  0% {
    opacity: 0.8;
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

/* Blinking cursor animation */
.blink-cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Toast notifications */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Toast progress animation */
.animation-progress {
  width: 100%;
  transform-origin: left;
  animation: progress linear forwards;
}

@keyframes progress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

/* Dots grid animation */
.dots-grid {
  animation: pulse 3s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
}
</style>