<script lang="ts" setup>
import { ref, onMounted } from "vue";
import anime from "animejs";

// Achievements data
const achievementsList = [
  {
    metric: "Projects",
    value: 20,
    postfix: "+",
  },
  // {
  //   prefix: "~",
  //   metric: "Users",
  //   value: 100000,
  // },
  {
    metric: "Awards",
    value: 2,
  },
  {
    metric: "Years",
    value: 3,
  },
];

// Refs for animated numbers
const animatedValues = ref(
  achievementsList.map(() => ({
    value: 0, // Start all counters at 0
  }))
);

// Animate numbers on mount
onMounted(() => {
  achievementsList.forEach((achievement, index) => {
    anime({
      targets: animatedValues.value[index],
      value: achievement.value,
      round: 1, // Ensure the number is rounded
      duration: 2000, // Animation duration
      easing: "easeOutExpo",
    });
  });
});
</script>

<template>
  <div class="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 ">
    <div
      class="sm:border-[#33353F] sm:border  rounded-full py-8 px-16 flex flex-col sm:flex-row items-center justify-between"
    >
      <div
        v-for="(achievement, index) in achievementsList"
        :key="index"
        class="flex flex-col items-center  max-sm:w-96 max-sm:border rounded-2xl max-sm:h-52 justify-center mx-4 my-4 sm:my-0"
        data-aos="fade-up"
      >
        <h2 class="text-white text-4xl font-bold flex flex-row">
          <!-- {{ achievement.prefix }} -->
          <span>{{ animatedValues[index].value }}</span>
          {{ achievement.postfix }}
        </h2>
        <p class="text-[#ADB7BE] text-base">{{ achievement.metric }}</p>
      </div>
    </div>
  </div>
</template>