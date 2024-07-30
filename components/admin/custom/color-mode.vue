<template>
  <USelectMenu
    class="w-[120px]"
    v-model="$colorMode.preference"
    value-attribute="value"
    option-attribute="label"
    :options="options"
  />
</template>

<script lang="ts" setup>
const options = [
  {
    value: "system",
    label: "Sistema",
  },
  {
    value: "dark",
    label: "Escuro",
  },
  {
    value: "light",
    label: "Claro",
  },
];
</script>
