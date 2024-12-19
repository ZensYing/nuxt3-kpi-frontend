import anime from "animejs";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      anime,
    },
  };
});
