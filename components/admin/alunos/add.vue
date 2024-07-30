<template>
  <AdminTitle title="Novo Aluno" icon="fluent:person-48-regular" />

  <UForm :state="models" :schema="createAlunoSchema">
    <UAccordion :items="items">
      <template #default="{ item, index, open }">
        <div
          class="h-[50px] flex items-center justify-between px-5 border-b border-b-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-b-gray-800"
          role="button"
        >
          <p class="font-medium text-sm">
            <span>{{ index + 1 }}.</span>
            {{ item.label }}
          </p>

          <Icon
            name="fluent:chevron-down-24-regular"
            :class="['transition-all duration-100', open && 'rotate-180']"
          />
        </div>
      </template>

      <template #personal-data>
        <div class="px-5 py-3">
          <div class="flex flex-wrap gap-4">
            <UFormGroup
              name="name"
              label="Nome"
              class="min-w-[300px] max-[500px]:min-w-full"
              required
            >
              <UInput v-model.trim="models.name" />
            </UFormGroup>

            <UFormGroup
              name="email"
              label="Email"
              class="min-w-[300px] max-[500px]:min-w-full"
              required
            >
              <UInput v-model.trim="models.email" />
            </UFormGroup>

            <UFormGroup
              name="cpf"
              label="CPF"
              class="min-w-[300px] max-[500px]:min-w-full"
              required
            >
              <UInput v-maska="'###.###.###-##'" v-model="models.cpf" />
            </UFormGroup>

            <UFormGroup
              name="phoneNumber"
              label="Telefone"
              class="min-w-[300px] max-[500px]:min-w-full"
              required
            >
              <UInput
                v-maska="'(##) #####-####'"
                v-model="models.phoneNumber"
              />
            </UFormGroup>

            <UFormGroup
              name="password"
              label="Senha de Acesso"
              class="min-w-[300px] max-[500px]:min-w-full"
              required
            >
              <UInput type="password" v-model="models.password" />
              <FormsPwdMeter class="mt-3" :password="models.password" />
            </UFormGroup>
          </div>

          <UFormGroup
            name="bio"
            label="Biografia"
            class="min-w-[300px] max-[500px]:min-w-full mt-4"
          >
            <UTextarea v-model="models.bio" />
          </UFormGroup>
        </div>
      </template>

      <template #address>
        <div class="px-5 py-3">
          <div class="flex flex-wrap gap-4">
            <UFormGroup
              name="CEP"
              label="CEP"
              class="min-w-[300px] max-[500px]:min-w-full"
              required
            >
              <UInput
                v-maska="'#####-###'"
                @blur="handleBlur"
                v-model="models.CEP"
              />
            </UFormGroup>

            <UFormGroup
              name="address"
              label="Endereço"
              class="min-w-[500px] max-[500px]:min-w-full"
            >
              <UInput v-model="models.address" disabled />
            </UFormGroup>

            <UFormGroup
              name="number"
              label="Número"
              class="min-w-[100px] max-[500px]:min-w-full"
              required
            >
              <UInput v-model="models.number" />
            </UFormGroup>

            <UFormGroup
              name="state"
              label="Estado"
              class="min-w-[300px] max-[500px]:min-w-full"
              v-if="data"
            >
              <USelectMenu
                v-model="sc.state"
                :options="data.states"
                option-attribute="label"
                value-attribute="value"
                placeholder="Selecionar"
                disabled
              />
            </UFormGroup>

            <UFormGroup
              name="city"
              label="Cidade"
              class="min-w-[300px] max-[500px]:min-w-full"
            >
              <USelectMenu
                v-model="sc.city"
                :options="cities"
                option-attribute="label"
                value-attribute="value"
                placeholder="Selecionar"
                searchable
                disabled
              />
            </UFormGroup>
          </div>
        </div>
      </template>

      <template #plan>
        <div class="px-5 py-3">
          <div class="flex flex-wrap gap-4">
            <UFormGroup
              label="Tipo de Plano"
              name="planName"
              class="w-[300px] max-[500px]:min-w-full"
              required
            >
              <USelectMenu
                placeholder="Selecionar"
                value-attribute="planId"
                option-attribute="name"
              />
            </UFormGroup>

            <UFormGroup
              label="Mensalidade"
              name="planType"
              class="w-[300px] max-[500px]:min-w-full"
              required
            >
              <USelectMenu
                :options="['Semestral', 'Mensal']"
                placeholder="Selecionar"
              />
            </UFormGroup>
          </div>
        </div>
      </template>
    </UAccordion>

    <div class="mt-5 flex justify-end gap-x-2 px-5">
      <UButton
        @click="$router.push('/admin/alunos')"
        label="Cancelar"
        color="red"
        variant="outline"
        type="button"
      />

      <UButton label="Salvar" type="submit" color="black" />
    </div>
  </UForm>
</template>

<script lang="ts" setup>
interface IModels extends IPostUser, IPostAddress {}

const models = reactive<IModels>({
  cpf: "",
  email: "",
  name: "",
  password: "",
  phoneNumber: "",
  bio: "",
  address: "",
  CEP: "",
  city: "",
  number: "",
  state: "",
});

const sc = useStateCity();

const { data } = await useLazyAsyncData("get-plans-state", async () => {
  const [states] = await Promise.all([await sc.getState()]);

  return { states };
});

const cities = ref<IOptions[]>([]);

const items = [
  {
    label: "Dados Pessoais",
    icon: "i-heroicons-information-circle",
    slot: "personal-data",
    defaultOpen: true,
  },
  {
    label: "Endereços",
    icon: "i-heroicons-eye-dropper",
    slot: "address",
  },
  {
    label: "Informações do Plano",
    icon: "i-heroicons-rectangle-group",
    slot: "plan",
  },
];

const handleBlur = async () => {
  if (models.CEP.length === 9) {
    const response = await sc.getAddress(models.CEP);

    models.address = response.address;

    sc.state = await sc.getStateIdByName(response.state);
    sc.city = await sc.getCityIdByName(response.city);

    return;
  }

  models.CEP = "";
  models.address = "";
  models.city = "";
  models.state = "";
  models.number = "";

  sc.city = "";
  sc.state = "";
};

watch(
  () => sc.state,
  async () => {
    cities.value = await sc.getCity();
  },
);
</script>
