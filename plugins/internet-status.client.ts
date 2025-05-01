// This plugin ensures the internet speed component is only rendered on the client side
// since it requires browser APIs to check internet speed

export default defineNuxtPlugin(() => {
  // Plugin is empty because the component is imported in the layout
  // The .client.ts suffix ensures this only runs on client-side
})