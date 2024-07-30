<template>
  <UButton class="w-full" color="gray" @click="isOpen = true">
    <Icon name="majesticons:search-line" size="1.2rem" />
    <span class="text-sm">Buscar...</span>

    <template #trailing>
      <span class="flex justify-end flex-1 gap-x-0.5">
        <UKbd>CTRL</UKbd>
        <UKbd>B</UKbd>
      </span>
    </template>
  </UButton>

  <UModal v-model="isOpen">
    <UCommandPalette
      placeholder="Pesquisar..."
      v-model="selected"
      :groups="links"
      :autoselect="false"
      @update:model-value="handleSelect"
    >
      <template #empty-state>
        <div class="p-5 text-center text-gray-500 space-y-2">
          <Icon name="majesticons:search-line" size="2rem" />
          <span class="block">Nenhum resultado encontrado</span>
        </div>
      </template>
    </UCommandPalette>

    <UDivider />

    <div class="p-3 flex justify-end">
      <div class="flex items-center gap-x-2 text-xs">
        <UKbd>esc</UKbd>
        <span>Fechar janela</span>
      </div>
    </div>
  </UModal>
</template>

<script lang="ts" setup>
import { useMagicKeys } from "@vueuse/core";

const { ctrl, b } = useMagicKeys();

interface ISelectCommand {
  group: string;
  href: string;
  id: string;
  label: string;
  refIndex: number;
}

const isOpen = ref(false);
const selected = ref([]);

const sidebar = useSidebar();
const links = await sidebar.getCmdPaletteLinks();

const handleSelect = async (option: ISelectCommand) => {
  await navigateTo(option.href);
  isOpen.value = false;
};

watchEffect(() => {
  if (ctrl.value && b.value) {
    isOpen.value = !isOpen.value;
  }
});
</script>
