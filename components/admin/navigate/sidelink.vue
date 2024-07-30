<template>
  <div
    @click="isChevronDown = !isChevronDown"
    class="cursor-pointer select-none"
  >
    <div class="flex items-center justify-between py-0.5" v-if="!path">
      <div class="flex gap-x-1.5 text-gray-700 dark:text-gray-100">
        <Icon :name="icon" size="22px" />
        <span class="text-sm font-medium">{{ text }} </span>
      </div>

      <Icon
        v-if="items.length > 0"
        name="fluent:chevron-right-24-regular"
        :class="`transition-transform duration-200 ${isChevronDown ? 'transform rotate-90' : ''}`"
      />
    </div>

    <NuxtLink
      v-else
      :to="path"
      class="flex items-center justify-between py-0.5"
      @click="$emit('click')"
    >
      <div class="flex gap-x-1.5 text-gray-700 dark:text-gray-100">
        <Icon :name="icon" size="22px" />
        <span class="text-sm font-medium">{{ text }} </span>
      </div>

      <Icon
        v-if="items.length > 0"
        :name="
          isChevronDown
            ? 'fluent:chevron-down-24-regular'
            : 'fluent:chevron-right-24-regular'
        "
      />
    </NuxtLink>

    <Transition name="menu-transition">
      <div
        :class="[
          isChevronDown ? 'max-h-[500px] open-menu' : 'max-h-0 closed-menu',
          'overflow-hidden transition-all duration-300 mt-1',
        ]"
      >
        <NuxtLink
          v-for="item in items"
          @click.stop="$emit('click')"
          :to="item.url"
          class="flex items-center hover:text-[#333] sublink text-gray-700 dark:hover:text-gray-300 dark:text-white"
        >
          <div class="w-[20px] flex justify-center">
            <span
              class="block w-[1px] h-[30px] bg-gray-400 dark:bg-white"
            ></span>
          </div>

          <div class="space-x-1.5 flex-1 truncate">
            <Icon v-if="item.icon" :name="item.icon" size="18px" />
            <span class="text-sm text-medium">
              {{ item.name }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isChevronDown = ref<boolean>(false);

const emits = defineEmits(["click"]);

defineProps({
  items: {
    type: Array as PropType<ISidebarSubLinks[]>,
    required: false,
    default: [],
  },
  icon: {
    type: String,
    required: false,
    default: "",
  },
  text: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<style scoped>
.decoration {
  display: block;
  width: 1px;
  height: 30px;
  background: #000;
  content: "";
}

.open-menu {
  transition:
    max-height 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  opacity: 1;
}

.closed-menu {
  transition:
    max-height 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  opacity: 0;
}

.menu-transition-enter-active,
.menu-transition-leave-active {
  transition: all 0.3s ease-in-out;
}

.menu-transition-enter,
.menu-transition-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
