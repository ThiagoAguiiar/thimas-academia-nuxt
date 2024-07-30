<template>
  <div>
    <label
      for="input-file"
      class="cursor-pointer border flex items-center justify-center duration-100 transiton-colors hover:bg-gray-50 dark:border-[#1f2937] rounded-lg p-5 mt-5 dark:hover:bg-[#1f29377d]"
    >
      <div class="text-center space-y-0.5">
        <p class="text-[15px]">Selecionar imagem</p>
        <p class="text-[13px]">JPG / PNG / JPEG</p>
        <p class="text-[13px] text-gray-700 dark:text-gray-300">
          Máximo 5MB por arquivo
        </p>
      </div>
    </label>

    <input
      type="file"
      name="input-file"
      id="input-file"
      class="hidden"
      @change="handleChange"
      :multiple="multiple"
      :accept="accept"
    />

    <div v-if="files">
      <div v-if="!multiple" class="mt-7 flex gap-x-4">
        <img
          :src="results[0]"
          class="w-[100px] h-[100px] object-cover rounded-lg"
        />

        <div class="text-[13px] space-y-3">
          <div class="space-y-0.5">
            <p>
              <span class="font-medium">Arquivo:</span>
              {{ (files as File).name }}
            </p>

            <p>
              <span class="font-medium">Extensão:</span>
              {{ (files as File).type.split("/")[1] }}
            </p>

            <p>
              <span class="font-medium">Tamanho: </span>
              {{ ((files as File).size / (1024 * 1024)).toFixed(2) }} MB
            </p>
          </div>

          <div>
            <UButton
              color="red"
              label="Excluir"
              variant="outline"
              size="xs"
              icon="fluent:delete-24-regular"
              @click="handleRemoveFile"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: "image/JPG, image/PNG, image/JPEG",
  },
});

const emits = defineEmits(["update:modelValue"]);

const files = ref<FileList | File | null>(null);
const results = ref<string[]>([]);

const toast = useToast();

const handleChange = ({ target }: Event) => {
  const el = target as HTMLInputElement;

  if (!el.files) return;

  if (props.multiple) files.value = el.files;
  else files.value = el.files?.[0];

  convertFilesBase64String();
};

const convertFilesBase64String = () => {
  if (!files.value) return;

  const aux: string[] = [];

  const reader = new FileReader();

  if (files.value instanceof File) {
    reader.readAsDataURL(files.value);

    reader.onload = () => {
      emits("update:modelValue", reader.result);
      results.value.push(reader.result as string);
    };

    showMessage();

    return;
  }

  for (let i = 0; i < (files.value as FileList).length; i++) {
    reader.readAsDataURL((files.value as FileList)[i]);
    reader.onload = () => results.value.push(reader.result as string);
  }

  emits("update:modelValue", aux);
  showMessage();
};

const handleRemoveFile = () => {
  if (!props.multiple) {
    results.value = [];
    files.value = null;

    emits("update:modelValue", results.value);

    return;
  }
};

const showMessage = () => {
  toast.add({
    title: "Upload de imagem",
    description: "Imagem adicionada com sucesso",
    color: "green",
  });
};
</script>
