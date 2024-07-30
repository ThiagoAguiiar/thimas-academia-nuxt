<template>
  <div class="w-full">
    <UDropdown :items="items" class="w-full" v-if="response && response.data">
      <UButton
        color="white"
        variant="ghost"
        class="w-full flex min-h-12 px-2 py-2 dark:bg-[#111827] items-center rounded-md gap-x-3 hover:bg-gray-100 dark:hover:bg-[#1f2937] transition-colors"
      >
        <UAvatar alt="Thiago Aguiar" :src="response.data.user.photo" />

        <div>
          <p class="text-sm font-medium">
            {{ response.data.user.name }}
          </p>

          <p class="text-xs w-fit capitalize">
            {{ response.data.user.profileData.description }}
          </p>
        </div>
      </UButton>
    </UDropdown>

    <USlideover v-model="showShortcuts" side="right">
      <div class="p-10">
        <div class="flex w-full justify-end">
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark-20-solid"
            square
            padded
            @click="showShortcuts = false"
          />
        </div>

        <div>
          <div class="flex items-center gap-x-3">
            <Icon name="iconoir:apple-shortcuts" size="25px" />
            <h2 class="text-lg font-semibold mb-1">Atalhos</h2>
          </div>

          <UDivider class="mt-1" />
        </div>

        <div class="mt-5 space-y-2 text-gray-900 dark:text-white">
          <div class="flex items-center gap-x-3" v-for="item in shortcuts">
            <div class="flex gap-x-2">
              <UKbd v-for="s in item.short">{{ s }}</UKbd>
            </div>
            <p class="text-sm">{{ item.label }}</p>
          </div>
        </div>
      </div>
    </USlideover>
  </div>
</template>

<script lang="ts" setup>
const showShortcuts = ref(false);

const auth = useAuth();
const route = useRouter();

const { shortcuts } = await queryContent("/shortcuts").findOne();

const { data: response } = await useAsyncData("get-profile", async () => {
  return await auth.getDecodedToken();
});

const items = [
  [
    {
      label: "Preferências",
      icon: "fluent:settings-48-regular",
      click: () => route.push("/admin/settings"),
    },
    {
      label: "Atalhos",
      icon: "iconoir:apple-shortcuts",
      click: () => (showShortcuts.value = true),
    },
  ],
  [
    {
      label: "Sair",
      icon: "solar:exit-outline",
      click: async () => await auth.logout(),
    },
  ],
];
</script>
