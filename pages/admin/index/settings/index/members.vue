<template>
  <div class="mt-5">
    <div class="max-w-[768px] text-center mx-auto">
      <h2 class="text-[30px] font-semibold">Administradores</h2>
      <p class="text-md text-gray-700 dark:text-gray-300">
        Esta é uma lista dos responsáveis por gerenciar o conteúdo, usuários e
        configurações pertinentes. Você pode controlar o acesso desses usuários
        aqui.
      </p>

      <AdminSettingsInvitePeople class="mt-4" />
    </div>

    <UDivider class="mt-7" />

    <div class="w-full my-5 mx-auto">
      <FallbackMembers v-if="pending" />

      <div v-else-if="response?.data">
        <div
          class="flex py-3 items-center dark:bg-gray-900 px-3 rounded-lg justify-between"
          v-for="(item, index) in response.data"
        >
          <div class="flex items-center gap-x-4">
            <UAvatar :alt="item.name" :src="item.photo || ''" size="md" />

            <div>
              <p class="text-sm font-medium">{{ item.name }}</p>
            </div>
          </div>

          <UButton
            label="Remover acesso"
            variant="outline"
            color="red"
            :loading="loading[index]"
            :disabled="loading[index]"
            @click="handleRemoveAccess(item.userId, index)"
          />
        </div>
      </div>

      <p class="text-center" v-else>Nenhum resultado encontrado</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const user = useUser();

const loading = ref<Array<boolean>>([]);

const {
  data: response,
  pending,
  refresh,
} = await useLazyAsyncData("get-admins", async () => await user.getAdmins());

const handleRemoveAccess = async (id: string, index: number) => {
  loading.value[index] = true;

  const res = await user.deleteUser(id);

  if (res) {
    if (res.status === 200) await refresh();

    notification.show(
      res.status === 200 ? "Sucesso" : "Erro",
      res.msg!,
      res.msgType!,
    );
  }

  loading.value[index] = false;
};
</script>
