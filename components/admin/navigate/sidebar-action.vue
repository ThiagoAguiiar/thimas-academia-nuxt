<template>
  <UTooltip
    :text="sidebar.isOpen ? 'Ocultar menu' : 'Mostrar menu'"
    :shortcuts="['CTRL', 'Q']"
  >
    <div>
      <div
        @click="sidebar.isOpen = !sidebar.isOpen"
        class="cursor-pointer w-[28px] h-[28px] dark:hover:bg-[#1f2c47] hover:bg-[#f2f3f4] rounded-md flex items-center justify-center"
      >
        <Icon name="material-symbols-light:menu" size="22px" />
      </div>
    </div>
  </UTooltip>
</template>

<script lang="ts" setup>
import { useMagicKeys } from "@vueuse/core";

const { ctrl, q } = useMagicKeys();

const sidebar = useSidebar();

watchEffect(() => {
  if (ctrl.value && q.value) {
    sidebar.isOpen = !sidebar.isOpen;
  }
});
</script>
