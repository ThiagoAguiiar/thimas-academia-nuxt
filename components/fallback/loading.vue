<template>
  <div class="loader"></div>
</template>

<script lang="ts" setup>
const props = defineProps({
  size: {
    type: String as PropType<"xs" | "sm" | "md" | "lg" | "xl">,
    required: false,
    default: "sm",
  },
  color: {
    type: String,
    required: false,
    default: "black",
  },
});

const size = computed(() => {
  if (props.size == "xs") return "24px";
  if (props.size == "sm") return "28px";
  if (props.size == "md") return "32px";
  if (props.size == "lg") return "36px";
  if (props.size == "xl") return "40px";
});

const borderWidth = computed(() => {
  if (props.size == "xs") return "2px";
  if (props.size == "sm") return "3px";
  if (props.size == "md") return "4px";
  if (props.size == "lg") return "5px";
  if (props.size == "xl") return "6px";
});
</script>

<style scoped>
.loader {
  width: v-bind(size);
  height: v-bind(size);
  border-color: v-bind("$props.color");
  border-style: solid;
  border-width: v-bind(borderWidth);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
