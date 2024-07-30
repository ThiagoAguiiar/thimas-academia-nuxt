<template>
  <div
    class="border-b border-b-gray-200 h-[60px] flex items-center justify-between w-full dark:border-b-gray-800"
  >
    <div class="px-5 flex items-center gap-x-5">
      <AdminNavigateSidebarAction />

      <div class="flex items-center gap-x-2">
        <Icon v-if="icon.length > 0" :name="icon" size="2rem" />
        <h2 class="text-xl font-semibold">{{ title }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
