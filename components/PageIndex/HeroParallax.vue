<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Product data
const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
];

const firstRow = products.slice(0, 5);
const secondRow = products.slice(5, 10);

// Refs for parallax scrolling
const containerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // GSAP scroll-based animation
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.value,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  timeline
    .to(".first-row", { x: "-30%" }, 0)
    .to(".second-row", { x: "30%" }, 0);
});
</script>

<template>
  <div
    ref="containerRef"
    class="relative h-[200vh] py-40 flex flex-col overflow-hidden"
  >
    <!-- Header -->
    <div class="max-w-7xl mx-auto py-20 md:py-40 px-4 text-center">
      <h1 class="text-3xl md:text-6xl font-extrabold text-gradient">
        Build Beyond Limits
      </h1>
      <p class="max-w-2xl text-base md:text-xl mt-6 text-gray-300 mx-auto">
        Discover world-class products designed for developers and creators.
      </p>
    </div>

    <!-- Parallax Rows -->
    <div class="space-y-16">
      <!-- First Row -->
      <div class="flex space-x-6 first-row">
        <div
          v-for="product in firstRow"
          :key="product.title"
          class="relative w-64 h-64 flex-shrink-0 group"
        >
          <a :href="product.link" target="_blank">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full h-full object-cover rounded-xl shadow-lg transform transition-transform group-hover:scale-105"
            />
          </a>
          <div
            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"
          ></div>
          <h2
            class="absolute bottom-4 left-4 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {{ product.title }}
          </h2>
        </div>
      </div>

      <!-- Second Row -->
      <div class="flex space-x-6 second-row">
        <div
          v-for="product in secondRow"
          :key="product.title"
          class="relative w-64 h-64 flex-shrink-0 group"
        >
          <a :href="product.link" target="_blank">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full h-full object-cover rounded-xl shadow-lg transform transition-transform group-hover:scale-105"
            />
          </a>
          <div
            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"
          ></div>
          <h2
            class="absolute bottom-4 left-4 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {{ product.title }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Text Gradient */
.text-gradient {
  background: linear-gradient(90deg, #6a5af9, #8b4efc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Improved Spacing */
.space-y-16 > * + * {
  margin-top: 4rem;
}

/* Hover Animations */
.first-row .group,
.second-row .group {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.group:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
}
</style>
