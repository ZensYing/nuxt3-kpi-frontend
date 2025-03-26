<template>
  <footer class="bg-red-600 text-white py-4 z-10">
    <div class=" mx-auto px-4 flex flex-col md:flex-row justify-between items-center ">
      <div class="text-smtext-white">
        © {{ currentYear }} Baksey Media. All Rights Reserved.
      </div>
      
      <div class="flex items-center ">
        <NuxtLink 
          to="/about" 
          class="text-sm  text-white transition-colors duration-300 ease-in-out hover:underline"
        >
          Developed by: Technology Cambodia
        </NuxtLink>
        
        <img 
          src="/logo.png" 
          alt="Technology Cambodia Logo" 
          class="w-16  object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>