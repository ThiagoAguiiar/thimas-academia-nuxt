<template>
  <div v-if="password.length > 0">
    <div class="w-full">
      <div
        :class="[style, 'block h-1 transition-all duration-300 rounded-lg']"
      ></div>
      <div class="flex-1"></div>
    </div>

    <span class="text-xs text-gray-700 dark:text-gray-200">{{ strength }}</span>

    <div v-if="score !== 3 && score !== 4" class="text-xs mt-2">
      <p class="font-medium">Lembre-se, uma senha forte deve conter</p>

      <ul class="space-y-0.5 list-disc px-5 mt-2">
        <li>Mínimo de 8 caracteres</li>
        <li>Letras maiúsculas</li>
        <li>Letras minúsculas</li>
        <li>Caracteres numéricos</li>
        <li>Caracteres especiais (# ! ? @)</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  password: {
    type: String,
    required: true,
  },
});

const score = ref<number>(0);

const strength = computed(() => {
  return ["Muito fraca", "Fraca", "Média", "Forte", "Muito forte"][score.value];
});

const style = computed(() => {
  return [
    "w-1 bg-red-500",
    "w-1/4 bg-yellow-500",
    "w-1/2 bg-yellow-500",
    "w-3/4 bg-green-500",
    "w-full bg-blue-500",
  ][score.value];
});

const verifyPassowrd = (password: string) => {
  const lengthRule = password.length >= 8;
  const lowerCaseRule = /[a-z]/.test(password);
  const upperCaseRule = /[A-Z]/.test(password);
  const digitRule = /\d/.test(password);
  const specialCharRule = /[@$!%*?&]/.test(password);

  let criteriaMet = 0;

  if (lengthRule) criteriaMet++;
  if (lowerCaseRule) criteriaMet++;
  if (upperCaseRule) criteriaMet++;
  if (digitRule) criteriaMet++;
  if (specialCharRule) criteriaMet++;

  if (criteriaMet === 0) {
    score.value = 0;
    return;
  }

  if (criteriaMet === 1) {
    score.value = 0;
    return;
  }

  if (criteriaMet === 2) {
    score.value = 1;
    return;
  }

  if (criteriaMet === 3) {
    score.value = 2;
    return;
  }

  if (criteriaMet === 4) {
    score.value = 3;
    return;
  }

  score.value = 4;
};

watch(
  () => props.password,
  (value: string) => verifyPassowrd(value),
);
</script>
