<template>
  <div
    class="w-full py-5 border-b border-b-gray-200 flex justify-between gap-5 dark:border-b-gray-800 max-[881px]:flex-col"
  >
    <div>
      <h4 class="font-semibold text-sm">
        {{ label }}
        <span v-if="required" class="text-red-600">*</span>
      </h4>

      <p class="text-gray-500 text-[13px] dark:text-white">
        {{ hint }}
      </p>
    </div>

    <div class="space-y-3">
      <UFormGroup :name="name">
        <slot></slot>
      </UFormGroup>

      <slot name="item"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
    required: false,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
