<template>
  <main
    px-4 py-10
    text="center gray-700 dark:gray-200"
  >
    <RouterView />
    <TheFooter />
    <div mx-auto mt-5 text-center text-sm opacity-50 class="my-large-text">
      [Default Layout]
    </div>
  </main>
</template>

<style scoped>
:deep(.my-large-text) {
  font-size: 0.5rem;
}
</style>
