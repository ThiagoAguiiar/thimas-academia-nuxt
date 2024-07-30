<template>
  <div>
    <AdminTitle title="Preferências" icon="fluent:settings-48-regular" />

    <div class="px-5 py-4 border-b border-b-gray-200 dark:border-b-gray-800">
      <div class="flex w-full gap-x-1">
        <NuxtLink
          to="/admin/settings"
          class="dark:hover:bg-[#1f2c47] hover:bg-[#f2f3f4] px-3 text-sm py-1.5 rounded-md"
          exact-active-class="active"
        >
          Seu Perfil
        </NuxtLink>

        <NuxtLink
          to="/admin/settings/members"
          class="dark:hover:bg-[#1f2c47] hover:bg-[#f2f3f4] px-3 text-sm py-1.5 rounded-md"
          exact-active-class="active"
        >
          Administradores
        </NuxtLink>
      </div>
    </div>

    <div class="mt-2 px-5">
      <NuxtPage />
    </div>
  </div>
</template>

<style scoped>
.active {
  @apply dark:bg-[#1f2c47] bg-[#f2f3f4];
}
</style>
