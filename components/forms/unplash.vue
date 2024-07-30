<template>
  <div>
    <div
      class="flex w-full justify-between gap-x-1 bg-white dark:bg-[#111827] sticky top-[-1px] py-3 px-2 mb-2"
    >
      <UForm
        class="flex-1"
        :state="{ search }"
        autocomplete="off"
        @submit="handleSubmit"
      >
        <UInput
          size="xs"
          variant="none"
          icon="majesticons:search-line"
          placeholder="Pesquisar"
          v-model.trim="search"
        />
      </UForm>

      <div class="flex items-center gap-x-1">
        <UTooltip text="Página anterior">
          <UButton
            @click="page--"
            :disabled="page === 1"
            color="black"
            icon="fluent:chevron-left-16-filled"
            size="xs"
          />
        </UTooltip>

        <UTooltip text="Próxima página">
          <UButton
            @click="page++"
            color="black"
            icon="fluent:chevron-right-16-filled"
            size="xs"
          />
        </UTooltip>
      </div>
    </div>

    <div class="w-full flex items-center justify-center" v-if="loading">
      <FallbackLoading size="sm" color="#2563eb" />
    </div>

    <MasonryWall
      v-else-if="data && data.length > 0"
      class="px-2 rounded-lg"
      scroll-container
      :items="data"
      :ssr-columns="3"
      :column-width="120"
      :gap="8"
    >
      <template #default="{ item }">
        <div class="cursor-pointer" @click="handleSelectImage">
          <img
            loading="lazy"
            class="rounded-lg"
            :src="(item as any).urls.thumb"
            :alt="(item as any).alternative_slugs.pt"
            :title="(item as any).alternative_slugs.pt"
          />
        </div>
      </template>
    </MasonryWall>

    <div class="text-center space-y-2" v-else>
      <p class="text-[15px] text-gray-600 mt-3">
        Nenhum resultado para
        <span class="font-semibold" v-if="search.length > 0">
          "{{ search }}"
        </span>
      </p>

      <UButton
        label="Limpar Pesquisa"
        color="gray"
        @click="handleClearSearch"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  orientation: {
    type: String as PropType<"landscape" | "portrait" | "squarish">,
    required: false,
    default: "",
  },
});

const emits = defineEmits(["update:modelValue"]);
const toast = useToast();

const loading = ref<boolean>(false);
const page = ref<number>(1);
const search = ref<string>("");

const data = ref<any[] | null>(null);

const urlApi = computed(() => {
  return search.value.length > 0 ? "/search/photos" : "/photos";
});

const fetchPhotos = async () => {
  loading.value = true;

  const response = await $fetch("/api/services/unsplash", {
    params: {
      page: page.value,
      pageCount: 20,
      query: search.value,
      orientation: props.orientation,
    },
  });

  loading.value = false;

  if (response.results) {
    data.value = [...response.results];
    return;
  }

  data.value = [...response];
};

const handleSelectImage = (event: MouseEvent) => {
  const target = event.target as HTMLImageElement;
  emits("update:modelValue", target.src);

  toast.add({
    title: "Upload de imagem",
    description: "Imagem adicionada com sucesso",
    color: "green",
  });
};

const handleSubmit = async () => {
  page.value = 1;
  await fetchPhotos();
};

const handleClearSearch = async () => {
  search.value = "";
  page.value = 1;

  await fetchPhotos();
};

watch(
  () => page.value,
  async () => await fetchPhotos(),
);

await fetchPhotos();
</script>
