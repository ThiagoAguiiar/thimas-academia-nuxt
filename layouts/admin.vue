<template>
  <ClientOnly>
    <div class="w-full h-screen flex dark:bg-[#111827]">
      <AdminNavigateSidebar />

      <main class="w-full flex-1 overflow-y-auto">
        <slot></slot>
      </main>
    </div>

    <template #fallback>
      <FallbackDashboard />
    </template>
  </ClientOnly>
</template>
