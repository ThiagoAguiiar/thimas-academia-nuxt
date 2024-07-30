<template>
  <div
    class="w-full h-[calc(100vh-60px)] col-span-8 grid grid-rows-12 relative"
  >
    <img src="/system.png" class="absolute h-full object-center" />

    <div
      v-if="newQuestion"
      class="row-span-10 max-h-full relative z-50 overflow-y-auto"
    >
      <div class="p-5 h-full overflow-y-auto">
        <AdminIaResponse :messages="history" />
      </div>
    </div>

    <UForm
      v-if="newQuestion"
      @submit="handleSubmit"
      :state="{ search }"
      class="row-span-2 border-t-gray-200 dark:border-t-gray-800 border-t px-5 flex gap-x-3 items-center"
    >
      <UInput
        size="md"
        placeholder="Pesquisar"
        class="flex-1"
        v-model.trim="search"
        :disabled="loading"
      />

      <UTooltip text="Pesquisar">
        <UButton
          :loading="loading"
          :disabled="loading"
          icon="fluent:chevron-right-24-regular"
          color="black"
          size="md"
          type="submit"
          square
        />
      </UTooltip>
    </UForm>

    <div
      v-else
      class="relative z-50 row-span-12 w-full h-full flex flex-col gap-y-6 items-center justify-center"
    >
      <div class="flex gap-x-3 text-center items-center max-[439px]:flex-col max-[439px]:w-[90%] max-[439px]:mx-auto max-[439px]:gap-y-3">
        <Icon name="lucide:info" size="23px" />
        <p>Clique nos cards laterais para visualizar seu histórico</p>
      </div>

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
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const toast = useToast();

const search = ref("");
const loading = ref(false);

const index = ref(0);
const history = ref<IHistory[]>([]);

const newQuestion = computed(() => {
  return route.query.action === "new";
});

const handleSubmit = async () => {
  try {
    if (search.value.length === 0) return;

    loading.value = true;

    history.value.push({
      aiResponse: "",
      myMessage: search.value,
      myMessageDate: formatDate(new Date()).string,
      aiResponseDate: "",
    });

    const response = await $fetch<ICResponse<any>>("/api/services/gemini", {
      method: "POST",
      body: { message: search.value },
    });

    if (response.data) {
      history.value[index.value].aiResponse = response.data.value;
      history.value[index.value].aiResponseDate = response.data.createdAt;
      index.value++;
    }
  } catch (err) {
    toast.add({
      title: "Erro",
      color: 'red',
      description: "Ocorreu um erro ao realizar a chamada",
    });
  } finally {
    loading.value = false;
    search.value = "";
  }
};
</script>
