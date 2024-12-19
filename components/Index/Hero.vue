<template>
  <BackgroundAnimationLines />
  <section class="relative h-[110vh] md:min-h-screen  flex items-center  md:items-center  justify-center overflow-hidden text-white">
    <!-- Background Blurry Gradients -->
    <div class="absolute pointer-events-none">
      <div class="css-blurry-gradient-blue"></div>
      <div class="css-blurry-gradient-blue"></div>

      <!-- <div class="css-blurry-gradient-green absolute left-1/2 -translate-x-0 inset-0 "></div> -->
    </div>

    <!-- Grid Line Background -->
    <div
      class="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-10 pointer-events-none">
      <div v-for="i in 400" :key="i" class="border-[1px] border-white/10"></div>
    </div>

    <!-- Content Container -->
    <div
      class="relative   w-full max-w-[1300px]  px-6 md:px-8 lg:px-12 flex flex-col-reverse md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
      <!-- Text Content -->
      <div class=" max-md:text-justify text-left flex-1 space-y-6" data-aos="fade-right">
        <div>
          <!-- <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Hi, I'm 
          </h1> -->
          <!-- <span class="text-gradient ">{{ $t('full_name') }}</span> -->
          <TextHero />
          <Typewriter />
          <p class="text-lg  lg:text-xl text-white/80 max-w-xl mx-auto md:mx-0">
            {{ $t('hero_des') }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-row justify-center md:justify-start gap-4">
          <button class="btn-primary w-full sm:w-auto">
            Get in Touch
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 inline" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
          <button class="btn-secondary w-full sm:w-auto">
            View Projects
          </button>
          <!-- <ButtonsHero /> -->
        </div>

        <!-- Social Links -->
        <div class="flex justify-center md:justify-start space-x-6 mt-6">
          <a href="https://github.com/yourusername" target="_blank"
            class="social-link hover:text-[#6a5af9] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span class="sr-only">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank"
            class="social-link hover:text-[#6a5af9] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span class="sr-only">LinkedIn</span>
          </a>
          <a href="https://twitter.com/yourusername" target="_blank"
            class="social-link hover:text-[#6a5af9] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
            <span class="sr-only">Twitter</span>
          </a>
        </div>
      </div>

      <!-- Profile Image -->
      <div class="flex-shrink-0 mb-6 md:mb-0">
        <!-- <div class="relative">
          <div class="absolute -inset-2 bg-gradient-to-r from-[#6a5af9] to-[#8b4efc] rounded-full opacity-75 blur-lg animate-pulse dark:block hidden"></div>
          <img
            src="https://avatars.githubusercontent.com/u/29654344?v=4"
            alt="SOUN Soratha"
            class="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white/20 shadow-2xl"
          />
        </div> -->
        <CardsHero />
      </div>
    </div>

  </section>
  <div class="hidden md:block absolute -bottom-5 left-2/4    transform -translate-x-1/2">
    <PageIndexAchievementsSection />
  </div>
  <div class="block md:hidden ">
    <PageIndexAchievementsSection />
  </div>
</template>

<script setup lang="ts">
import Typewriter from '../Typewriter.vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();


// You can add any interactive logic here if needed
</script>

<style scoped>
/* Text Gradient */
.text-gradient {
  background: linear-gradient(to right, #6a5af9, #8b4efc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Buttons */
.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(to right, #6a5af9, #8b4efc);
  border-radius: 0.5rem;
  color: white;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}

.btn-primary:hover {
  transform: skew(-10deg);
  background: linear-gradient(to right, #8b4efc, #6a5af9);
}

.btn-primary:focus {
  outline: none;
  range: 2px solid #6a5af9;
  stop-opacity: 0.5;
}

.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: 2px solid #6a5af9;
  border-radius: 0.5rem;
  color: white;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}

.btn-secondary:hover {
  /* background: #6a5af9; */
  /* transform: perspective(1px) scale(1.05); */
  transform: skew(10deg);
  color: white;
}

.btn-secondary:focus {
  outline: none;
  range: 2px solid #6a5af9;
  stop-opacity: 0.5;
}

/* Social Links */
.social-link {
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease-in-out;
}

.social-link:hover {
  transform: scale(1.1);
}
</style>