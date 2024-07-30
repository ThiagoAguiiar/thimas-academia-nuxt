<template>
  <AdminTitle title="Alunos" icon="fluent:people-48-regular" />
  <AdminAlunosFilter @submit="handleSubmit" />

  <UTable v-model="sData" :columns="columns" @select="handleSelect">
    <template #activeFormatted-data="{ row }">
      <UBadge v-if="row.active" color="green" variant="soft">Ativo</UBadge>
      <UBadge v-else color="red" variant="soft">Inativo</UBadge>
    </template>
  </UTable>

  <UPagination
    v-model="pagination.page"
    class="px-5 mt-5 float-right"
    :active-button="{ color: 'black' }"
    :page-count="pagination.pageCount"
    :total="pagination.total"
  />
</template>

<script lang="ts" setup>
const router = useRouter();
const users = useUser();

const sData = ref<IGetUser[]>([]);

const pagination = ref({
  page: 1,
  total: 1,
  pageCount: 20,
});

const columns = [
  { label: "Nome", key: "name", sortable: true },
  { label: "Email", key: "email" },
  { label: "CPF", key: "cpf" },
  { label: "Telefone", key: "phoneNumber" },
  { label: "Plano atual", key: "plans.name" },
  { label: "Cidade", key: "address.city" },
  { label: "Estado", key: "address.state" },
  { label: "Status", key: "activeFormatted" },
];

const handleSelect = (row: IGetUser) => {
  router.push({
    name: "admin-index-alunos-name",
    params: { name: row.name },
    query: { email: row.email },
  });
};

const handleSubmit = async (data: IUserFilter) => {
  // const res = await users.getTraineesFilter(data);
  // pagination.value.pageCount = Number(data.itensPage);
  // console.log(res);
  // if (response.value && res.data) {
  //   response.value.data = res.data.users;
  //   pagination.value.page = res.data.page;
  //   pagination.value.total = res.data.total;
  // }
};

watch(
  () => pagination.value.page,
  async (value) => {
    // Busca os dados da página atual
  },
);
</script>
