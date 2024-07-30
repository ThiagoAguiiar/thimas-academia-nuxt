<template>
  <AdminTitle :title="title" icon="fluent:person-48-regular" />

  <p v-if="pending">loading...</p>

  <UForm class="p-5 space-y-5" v-else-if="data" :state="data.result"> </UForm>
</template>

<script lang="ts" setup>
const route = useRoute();

const title = computed(() => {
  return route.params.name.toString();
});

const { data, pending } = await useAsyncData("get-alunos-id", () => {
  return $fetch<IResponse<IGetUser>>(
    "/api/admin/user/alunos/" + route.query.email,
  );
});
</script>
