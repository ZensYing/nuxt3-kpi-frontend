<template>
  <div class="min-h-screen flex flex-col dark:bg-dark">
    <div class="flex flex-1">
      <!-- Sidebar -->
      <LayoutsSidebar />

      <!-- Main content area -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>

    <!-- Footer -->
    <!-- <LayoutsFooter /> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
