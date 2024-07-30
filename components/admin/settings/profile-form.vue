<template>
  <UForm
    v-if="data"
    class="flex items-center flex-wrap"
    :state="data"
    :schema="profileFormSchema"
    @submit="handleSubmit"
  >
    <div
      class="py-5 dark:border-b-gray-800 gap-5 flex w-full items-center justify-between max-[881px]:flex-col max-[881px]:justify-start max-[881px]:items-start"
    >
      <div>
        <h4 class="font-semibold text-xl">Dados do Perfil</h4>
        <p class="text-gray-500 text-[14px] dark:text-white">
          Alterar informações sobre eu perfil. Esses dados são compartilhados
          com demais usuários do sistema.
        </p>
      </div>

      <div>
        <UButton
          type="submit"
          :disabled="models.loading"
          :loading="models.loading"
          label="Salvar alterações"
          color="black"
        />
      </div>
    </div>

    <AdminSettingsGroup
      label="Nome"
      hint="Seu nome ficará disponível para os usuários encontrarem você."
      name="name"
      required
    >
      <UInput
        v-model="data.name"
        size="md"
        class="w-[450px] max-[490px]:w-full"
      />
    </AdminSettingsGroup>

    <AdminSettingsGroup
      label="Email"
      hint="Matenha seu email atualizado para receber notificações e alertas."
      name="email"
      required
    >
      <UInput
        v-model="data.email"
        size="md"
        class="w-[450px] max-[490px]:w-full"
      />
    </AdminSettingsGroup>

    <AdminSettingsGroup
      label="Telefone"
      hint="Matenha seu telefone atualizado para receber notificações e alertas."
      name="phoneNumber"
      required
    >
      <UInput
        v-model="data.phoneNumber"
        size="md"
        v-maska="'(##) #####-####'"
        placeholder="(00) 00000-0000"
        class="w-[450px] max-[490px]:w-full"
      />
    </AdminSettingsGroup>

    <AdminSettingsGroup
      label="CPF"
      hint="Seu CPF é utilizado para identificação no sistema."
      name="CPF"
      required
    >
      <UInput
        v-model="data.cpf"
        size="md"
        v-maska="'###.###.###-##'"
        placeholder="123.456.789-00"
        class="w-[450px] max-[490px]:w-full"
      />
    </AdminSettingsGroup>

    <AdminSettingsGroup
      label="Senha"
      hint="Utilize essa seção para alterar sua senha de acesso ao sistema caso necessário."
      name="password"
      required
    >
      <UInput
        v-model="models.password"
        size="md"
        placeholder="Senha atual"
        type="password"
        class="w-[450px] max-[490px]:w-full"
      />

      <template #item>
        <UInput
          v-model="models.newPassword"
          size="md"
          placeholder="Nova senha"
          type="password"
          class="w-[450px] max-[490px]:w-full"
        />

        <FormsPwdMeter :password="models.newPassword" />
      </template>
    </AdminSettingsGroup>

    <AdminSettingsGroup
      label="Foto de Perfil"
      hint="Adicionar foto de perfil"
      name="image"
    >
      <div class="flex items-center gap-x-5">
        <UTooltip text="Visualização da foto de perfil">
          <UAvatar :src="models.photo" :alt="data.name" size="xl" />
        </UTooltip>

        <ClientOnly>
          <div class="text-sm space-y-2">
            <FormsFile v-model="models.photo" />
          </div>
        </ClientOnly>
      </div>
    </AdminSettingsGroup>
  </UForm>
</template>

<script lang="ts" setup>
const user = useUser();

const models = reactive({
  loading: false,
  newPassword: "",
  password: "",
  photo: "",
});

const { data } = await useAsyncData("get-profile-logged", async () => {
  const res = await user.getUserLogged();

  models.photo = res?.photo || "";

  return res;
});

const handleSubmit = async () => {
  if (data.value) {
    models.loading = true;

    const res = await user.putUser({
      ...data.value,
      password: models.password,
      newPassword: models.newPassword,
      photo: models.photo,
    });

    if (res) {
      if (res.status === 200) {
        notification.show("Suceesso", res.msg!, res.msgType, "profile-status");
      } else {
        notification.show("Erro", res.msg!, res.msgType, "profile-error");
      }
    }

    models.loading = false;
  }
};

onUnmounted(() => {
  notification.remove(["profile-error", "profile-status"]);
});
</script>
