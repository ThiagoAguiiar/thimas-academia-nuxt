<template>
  <UForm
    class="w-full space-y-3 anime-left"
    :state="models"
    :schema="loginSchema"
    @submit="handleSubmit"
  >
    <h2 class="text-2xl font-bold">Sua conta</h2>

    <UFormGroup name="email" label="Email">
      <UInput v-model="models.email" size="md" />
    </UFormGroup>

    <UFormGroup name="password" label="Senha">
      <UInput v-model="models.password" type="password" size="md" />
    </UFormGroup>

    <NuxtLink class="block underline text-sm text-end" to="/auth/reset">
      Esqueci minha senha
    </NuxtLink>

    <UButton
      type="submit"
      class="w-full justify-center"
      color="black"
      size="md"
      label="Entrar"
      :loading="models.loading"
      :disabled="models.loading"
    />

    <div class="border border-red-500 py-2 px-4 rounded-md" v-if="models.error">
      <p class="text-red-500 text-sm">{{ models.error }}</p>

      <NuxtLink to="/auth/reset" class="text-blue-500 underline text-xs">
        Clique aqui para redefinir sua senha
      </NuxtLink>
    </div>
  </UForm>
</template>

<script lang="ts" setup>
interface IModels {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

const models = reactive<IModels>({
  email: "",
  password: "",
  loading: false,
  error: null,
});

definePageMeta({
  layout: "auth",
  colorMode: "light",
});

const auth = useAuth();

const handleSubmit = async () => {
  models.loading = true;

  const response = await auth.login(models.email, models.password);

  if (response) models.error = response.error;

  models.loading = false;
};

watch(
  () => [models.email, models.password],
  () => (models.error = null),
);
</script>
