<template>
  <div class="my-3">
    <UButton label="Excluir conta" color="red" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <div class="p-5 space-y-3">
        <h2 class="text-lg font-bold text-red-600 dark:text-red-500">
          Excluir conta
        </h2>

        <div class="space-y-1.5">
          <p class="text-sm">
            Digite
            <span class="font-bold">Excluir</span>
            no campo abaixo para continuar
          </p>

          <UForm
            :schema="deleteAccountSchema"
            :state="{ deleteStr }"
            @submit="handleSubmit"
          >
            <UFormGroup name="deleteStr">
              <UInput v-model="deleteStr" placeholder="Excluir" />
            </UFormGroup>

            <div class="mt-3 flex gap-x-1.5 justify-end">
              <UButton label="Cancelar" color="black" @click="isOpen = false" />

              <UButton
                label="Continuar"
                color="black"
                type="submit"
                variant="outline"
                :disabled="!isDeleteStrValid"
              />
            </div>
          </UForm>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const isOpen = ref(false);
const deleteStr = ref("");

const isDeleteStrValid = computed(() => deleteStr.value === "Excluir");

const handleSubmit = async () => {};

watchEffect(() => {
  if (!isOpen.value) deleteStr.value = "";
});
</script>
