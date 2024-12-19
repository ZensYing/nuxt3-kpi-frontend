<script lang="ts" setup>
import { ref, watchEffect, onMounted } from "vue";

const strings = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Tech Innovator",
];
const currentText = ref("");
const currentIndex = ref(0);

onMounted(() => {
  typewriterEffect();
});

const typewriterEffect = () => {
  let charIndex = 0;

  const type = () => {
    if (charIndex < strings[currentIndex.value].length) {
      currentText.value += strings[currentIndex.value][charIndex];
      charIndex++;
      setTimeout(type, 80); // Typing speed
    } else {
      setTimeout(() => deleteText(), 2000); // Pause before deleting
    }
  };

  const deleteText = () => {
    if (currentText.value.length > 0) {
      currentText.value = currentText.value.slice(0, -1);
      setTimeout(deleteText, 50); // Deleting speed
    } else {
      currentIndex.value = (currentIndex.value + 1) % strings.length;
      charIndex = 0;
      setTimeout(type, 500); // Pause before typing next string
    }
  };

  type();
};
</script>

<template>
  <div class="text-xl sm:text-2xl text-blue-300 h-12" data-aos="fade-up">
    {{ currentText }}
  </div>
</template>
