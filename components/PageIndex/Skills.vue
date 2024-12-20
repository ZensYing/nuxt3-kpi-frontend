<template>

  <section id="skills" class="py-20  relative overflow-hidden" ref="sectionRef">
    <BackgroundAnimationLines class="hidden dark:block" />

    <div class="css-blurry-gradient-blue"></div>
    <div class="css-blurry-gradient-green"></div>
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-[500px] h-[500px] bg-purple-500/30 rounded-full filter blur-[100px] opacity-20 animate-pulse-slow">
      </div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-6xl mx-auto">
        <!-- Section Title -->
        <div
          :class="['text-center mb-16 transition-opacity duration-1000', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Skills & Expertise
          </h2>
          <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <!-- Skills Grid -->
        <div class="grid md:grid-cols-2 gap-6 mb-16" data-aos="fade-up">
          <div v-for="(skill, index) in skills" :key="index"
            class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-colors duration-500"
            :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-10': !isVisible,
            }" :style="{ transitionDelay: `${index * 200}ms` }">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-white transition-colors duration-300">
                  {{ skill.name }}
                </h3>
                <span class="text-blue-400">{{ skill.level }}%</span>
              </div>
              <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                <div :style="{
                  width: isVisible ? `${skill.level}%` : '0%',
                }"
                  class="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000">
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="(tag, i) in skill.tags" :key="i"
                  class="px-3 py-1 text-xs bg-white/5 text-gray-300 rounded-full hover:bg-white/10 hover:text-blue-400 transition-all duration-300 cursor-default">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Technologies Section -->
        <div
          class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-500">
          <h3 class="text-2xl font-semibold text-white mb-8 text-center">
            Technologies I Work With
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div v-for="(tech, index) in technologies" :key="index"
              class="group flex flex-col items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-500">
              <span class="text-3xl mb-2">{{ tech.icon }}</span>
              <span class="text-gray-300 text-sm group-hover:text-blue-400 transition-colors duration-300">
                {{ tech.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Learning Section -->
        <div class="mt-16 text-center">
          <p class="text-gray-400 max-w-2xl mx-auto hover:text-gray-300 transition-colors duration-300">

            {{ locale == 'en' ? ` Always learning and exploring new technologies to stay at the
            forefront of web development. Currently exploring Web3 technologies
            and AI integration in web applications.` : `សូមស្វាគមន៍អ្នកមើលនូវអ្វីថ្មីៗ និងរៀនអ្វីថ្មីៗជានិច្ច
            ដើម្បីរក្សានៅផ្នែកមុខជំនាញនៃការអភិវឌ្ឍន៍គេហទំព័រ។ នៅពេលនេះ ខ្ញុំកំពុងស្វែងយល់អំពីបច្ចេកវិទ្យា Web3
            និងការរួមបញ្ចូល AI ក្នុងកម្មវិធីគេហទំព័រ។ 🚀` }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
// Skill and technology data
const skills = [
  {
    name: "Frontend Development",
    level: 90,
    tags: ["Vue.js", "Nuxt.js", "React JS", "Next Js", "TypeScript", "Tailwind CSS", "Bootstrap", "Pinia"],
  },
  {
    name: "Backend Development",
    level: 85,
    tags: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"],
  },
  {
    name: "UI/UX Design",
    level: 80,
    tags: ["Figma", "Adobe XD", "Responsive Design", "Prototyping"],
  },
  {
    name: "Database",
    level: 80,
    tags: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
  },
  {
    name: "DevOps & Tools",
    level: 75,
    tags: ["Git", "Docker", "AWS", "CI/CD", "Linux"],
  },
  //   Mobile APp
  {
    name: "Mobile Development",
    level: 50,
    tags: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
  }
];

const technologies = [
  { name: "Vue.js", icon: "🌟" },
  { name: "Nuxt.js", icon: "🟢" },
  { name: "TypeScript", icon: "📘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
];

// Reactive references
const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

// Intersection observer logic
const observerCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      isVisible.value = true;
    }
  });
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(observerCallback, { threshold: 0.3 });
  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onBeforeUnmount(() => {
  if (observer && sectionRef.value) {
    observer.unobserve(sectionRef.value);
  }
});
</script>


<style scoped>
/* Custom animations */
.transition-opacity {
  transition-property: opacity, transform;
}

.translate-y-10 {
  transform: translateY(10px);
}

.translate-y-0 {
  transform: translateY(0px);
}
</style>
