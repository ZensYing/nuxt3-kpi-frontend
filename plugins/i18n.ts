// plugins/i18n.ts
import { defineNuxtPlugin } from '#app';
import { createI18n } from 'vue-i18n';
import { useI18nConfig } from '~/composables/useI18nConfig';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useI18nConfig();
  const i18n = createI18n(config.vueI18n);

  nuxtApp.vueApp.use(i18n);
});