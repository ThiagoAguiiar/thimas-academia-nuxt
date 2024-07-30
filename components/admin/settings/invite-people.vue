<template>
  <div>
    <UButton label="Enviar solicitação" color="black" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <div class="p-7">
        <h3 class="text-lg font-semibold">Enviar solicitação</h3>
        <p class="text-sm">A solicitação chegará ao email do usuário</p>

        <UForm
          class="mt-7 space-y-5"
          :state="{ email, role }"
          :schema="invitePeopleSchema"
          @submit="handleSubmit"
        >
          <div class="space-y-4">
            <UFormGroup label="Email" name="email">
              <UInput
                v-model="email"
                :disabled="loading"
                placeholder="email@exemplo.com"
              />
            </UFormGroup>

            <UFormGroup label="Perfil" name="role">
              <USelectMenu
                v-model="role"
                :options="roleOptions"
                :disabled="loading"
                value-attribute="value"
                option-attribute="label"
              />
            </UFormGroup>
          </div>

          <div class="flex gap-x-3 justify-end">
            <UButton
              color="gray"
              variant="ghost"
              label="Cancelar"
              :disabled="loading"
              @click="isOpen = false"
            />

            <UButton
              color="black"
              label="Enviar"
              :disabled="loading"
              :loading="loading"
              type="submit"
            />
          </div>
        </UForm>
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const isOpen = ref(false);
const loading = ref(false);

const email = ref("");
const role = ref("administrador");

const user = useUser();

const roleOptions = [{ label: "Administrador", value: "administrador" }];

const handleSubmit = async () => {
  loading.value = true;

  const res = await user.inviteUser(email.value);

  if (res) {
    notification.show(
      res.status === 200 ? "Sucesso" : "Erro",
      res.msg!,
      res.msgType!,
    );

    if (res.status === 200) {
      email.value = "";
      isOpen.value = false;
    }
  }

  loading.value = false;
};
</script>
