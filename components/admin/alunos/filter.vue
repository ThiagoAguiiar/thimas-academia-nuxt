<template>
  <UForm
    :state="filter"
    @submit="handleSubmit"
    class="flex w-full items-center justify-between h-[60px] border-b border-b-gray-200 dark:border-b-gray-800"
  >
    <div class="flex px-5 h-full flex-wrap items-center gap-3">
      <UInput
        placeholder="Pesquisar"
        icon="majesticons:search-line"
        class="w-[200px]"
        v-model="filter.search"
        size="xs"
      />

      <USelectMenu
        v-if="data && data.plans.data"
        :options="data.plans.data"
        v-model="filter.plan"
        option-attribute="name"
        value-attribute="planId"
        placeholder="Selecionar Plano"
        icon="iconoir:gym"
        size="xs"
      />

      <USelectMenu
        placeholder="Selecionar Unidade"
        icon="eva:pin-outline"
        searchable
        v-model="filter.gym"
        size="xs"
      />

      <USelectMenu
        :options="orderBy"
        v-model="filter.orderBy"
        value-attribute="value"
        option-attribute="label"
        placeholder="Ordernar por"
        icon="fluent:arrow-sort-20-filled"
        size="xs"
      />

      <USelectMenu
        v-model="filter.itensPage"
        :options="itensPage"
        placeholder="Itens por página"
        icon="fluent:number-symbol-20-filled"
        size="xs"
      />
    </div>

    <div class="pr-5 flex-1 flex items-center justify-end gap-x-3">
      <UTooltip text="Novo aluno">
        <UButton
          @click="$router.push('/admin/alunos/novo')"
          type="button"
          icon="fluent:add-24-regular"
          label="Novo aluno"
          color="black"
          variant="outline"
          size="xs"
          square
        />
      </UTooltip>

      <UTooltip text="Filtrar">
        <UButton
          type="submit"
          icon="carbon:filter"
          label="Buscar"
          color="black"
          size="xs"
          square
        />
      </UTooltip>

      <UTooltip text="Limpar filtro" v-if="clear">
        <UButton
          @click="handleClearFilter"
          variant="ghost"
          icon="iconamoon:close"
          label="Limpar filtro"
          color="red"
          size="xs"
          square
        />
      </UTooltip>
    </div>
  </UForm>
</template>

<script lang="ts" setup>
const emits = defineEmits(["submit"]);

const plan = usePlan();

const clear = ref(false);

const filter = ref<IUserFilter>({
  gym: "",
  orderBy: "",
  plan: "",
  search: "",
  itensPage: "20",
  page: 1,
});

const { data } = await useLazyAsyncData("i-getPlanData", async () => {
  const [plans] = await Promise.all([plan.getPlans()]);

  return { plans };
});

const handleSubmit = () => {
  emits("submit", filter.value);
  clear.value = true;
};

const handleClearFilter = async () => {
  clear.value = false;

  filter.value = {
    gym: "",
    orderBy: "",
    plan: "",
    search: "",
    itensPage: "20",
    page: 1,
  };

  emits("submit", filter.value);
  await refreshNuxtData("get-trainees");
};

const orderBy = [
  { label: "Crescente", value: "asc" },
  { label: "Decrescente", value: "desc" },
];

const itensPage = ["1", "10", "20", "30", "40"];
</script>
