<template>
  <div
    v-for="{ aiResponse, myMessage, myMessageDate, aiResponseDate } in messages"
    class="space-y-2 px-10 group fade-up"
  >
    <div class="flex flex-col items-end w-full">
      <p
        class="text-[12px] text-gray-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150"
      >
        {{ myMessageDate }}
      </p>

      <div
        class="max-w-[80%] px-5 bg-[#000000] group-hover:opacity-100 group-hover:visible text-white dark:bg-[#fff] dark:text-black rounded-[20px]"
      >
        <p class="text-[15px]">{{ myMessage }}</p>
      </div>
    </div>

    <div>
      <p
        class="text-[12px] text-gray-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150"
      >
        {{ aiResponseDate }}
      </p>

      <div
        v-if="aiResponse && aiResponse.length > 0"
        v-html="marked(aiResponse)"
        class="w-fit max-w-[80%] text-[15px]"
      ></div>

      <FallbackAiChat v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { marked } from "marked";

defineProps({
  messages: {
    type: Array as PropType<IHistory[]>,
    required: true,
  },
});
</script>

<style scoped>
:deep(ol) {
  list-style: decimal;
  margin-left: 2rem;
}

:deep(p) {
  margin: 0.5rem 0;
}

:deep(ul) {
  list-style: disc;
  margin-left: 2rem;
}

:deep(li) {
  margin: 4px;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up {
  animation: fadeUp 0.5s ease-out forwards;
}
</style>
