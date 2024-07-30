<template>
  <div
    class="relative border-r h-full col-span-4 border-r-gray-200 dark:border-r-gray-800"
  >
    <div
      class="min-h-[50px] border-b border-b-gray-200 dark:border-gray-800 flex items-center justify-between px-5"
    >
      <div class="flex gap-x-2 flex-1 items-center">
        <Icon name="fluent:history-24-regular" size="25px" />
        <h2 class="max-[1232px]:hidden">Histórico de Pesquisas</h2>
      </div>

      <UButton
        label="Visualizar Histórico"
        size="xs"
        class="max-[820px]:flex hidden mr-3"
        variant="outline"
        color="black"
        @click="collapse = !collapse"
      />

      <UButton
        label="Novo"
        icon="fluent:add-24-regular"
        color="black"
        size="xs"
        @click="
          $router.push({
            name: 'admin-index-ia',
            query: { action: 'new' },
          })
        "
      />
    </div>

    <div
      :class="[
        'w-full text-center text-gray-600 dark:text-gray-200 transition-all duration-100',
        collapse && media ? 'max-h-0 truncate p-0' : 'max-h-max py-10 ',
      ]"
    >
      <p>Nenhum resultado encontrado</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";

const media = useMediaQuery("(max-width: 820px)");
const collapse = ref(true);
</script>
