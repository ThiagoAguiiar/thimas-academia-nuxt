<template>
  <UModal v-model="isOpen">
    <div class="p-5 space-y-5">
      <div class="flex gap-x-2.5">
        <span
          class="w-[30px] h-[30px] bg-black text-white dark:bg-white dark:text-black flex items-center justify-center rounded-md"
        >
          IA
        </span>

        <div>
          <h2 class="text-lg font-medium">Thimas Academia</h2>
          <p class="text-sm text-gray-500">
            Uma nova ferramenta para o seu dia a dia
          </p>
        </div>
      </div>

      <div class="space-y-4 text-[15px]">
        <img
          src="https://m.media-amazon.com/images/I/71t2iMRG+rL.jpg"
          class="w-full h-[100px] object-cover brightness-75 rounded-lg"
        />

        <p>
          Apresentamos para você um novo recurso para melhorar o seu desempenho
          no ambiente de trabalho. Agora você conta com o acesso de uma IA que
          permite:
        </p>

        <ul class="text-gray-700 dark:text-gray-300 list-disc ml-4">
          <li>Criar rotinas de treino para seus alunos;</li>
          <li>Sanar dúvidas referentes a saúde e condição dos alunos;</li>
          <li>Automatizar tarefas e processos repetitivos;</li>
          <li>Tudo isso e muito mais;</li>
        </ul>

        <p>
          Aproveite ao máximo da tecnologia para melhorar a qualidade dos nossos
          serviços.
        </p>

        <UButton
          class="w-full justify-center"
          label="Acessar"
          color="black"
          size="lg"
          @click="isOpen = false"
        />

        <UCheckbox label="Não mostrar essa mensagem novamente" />
      </div>
    </div>
  </UModal>
</template>

<script lang="ts" setup>
const isOpen = ref(false);

onMounted(() => {
  isOpen.value = true;
});
</script>
