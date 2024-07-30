<template>
  <aside
    v-if="!media"
    :class="[
      'h-full transition-all text-nowrap duration-300 max-[1184px]:hidden',
      sidebarStyles,
    ]"
  >
    <AdminNavigateSidebarContent />
  </aside>

  <USlideover v-model="sidebar.isOpen" side="left" v-else>
    <div class="p-4 flex-1 bg-[#fafafa] dark:bg-[#111827]">
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        class="flex absolute end-5 top-5 z-10"
        square
        padded
        @click="sidebar.isOpen = false"
      />
    </div>

    <AdminNavigateSidebarContent />
  </USlideover>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";

const sidebar = useSidebar();
const media = useMediaQuery("(max-width: 1184px)");

const sidebarStyles = computed(() => {
  return sidebar.isOpen
    ? "min-w-[280px] w-[280px]"
    : "min-w-[0px] truncate w-[0px]";
});

watchEffect(() => {
  if (media.value) sidebar.isOpen = false;
});
</script>
