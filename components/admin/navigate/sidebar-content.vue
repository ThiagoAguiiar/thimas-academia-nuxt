<template>
  <div
    class="truncate h-screen grid grid-rows-12 p-5 bg-[#fafafa] dark:bg-[#111827] border-r border-r-gray-200 dark:border-r-gray-800"
  >
    <div class="row-span-2 flex items-center">
      <div class="w-full space-y-4">
        <div class="flex justify-center">
          <Logo mode="dark" path="/admin" />
        </div>
        <AdminNavigateSearchbar />
      </div>
    </div>

    <div class="row-span-8 pt-4 overflow-y-auto overflow-x-hidden">
      <div class="space-y-1.5">
        <AdminNavigateSidelink
          @click="handleCloseMobileMenu"
          icon="fluent:home-24-regular"
          text="Página Inicial"
          path="/admin"
        />

        <AdminNavigateSidelink
          @click="handleCloseMobileMenu"
          v-for="{ baseURL, icon, name, subLinks } in links"
          :text="name"
          :icon="icon"
          :items="
            subLinks &&
            subLinks.map((item: ISidebarSubLinks) => {
              return {
                name: item.name,
                path: item.url,
                icon: item.icon,
                counter: item.counter,
                url: baseURL + item.url,
              };
            })
          "
        />
      </div>

      <UDivider class="my-4" />

      <div class="space-y-2.5">
        <AdminNavigateSidelink
          @click="handleCloseMobileMenu"
          icon="ph:star-four"
          text="Inteligência Artificial"
          path="/admin/ia"
        />

        <AdminNavigateSidelink
          @click="handleCloseMobileMenu"
          icon="fluent:settings-48-regular"
          text="Preferências"
          path="/admin/settings"
        />
      </div>
    </div>

    <div class="row-span-2 w-full flex items-end">
      <AdminProfile />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";

const sidebar = useSidebar();
const links = await sidebar.getLinks();

const media = useMediaQuery("(max-width: 1184px)");

const handleCloseMobileMenu = () => {
  if (media.value && sidebar.isOpen) {
    sidebar.isOpen = false;
  }
};
</script>
