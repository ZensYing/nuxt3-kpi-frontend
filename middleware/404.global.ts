export default defineNuxtRouteMiddleware((to, from) => {
    if (!to.matched.length) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
    }
  });
  