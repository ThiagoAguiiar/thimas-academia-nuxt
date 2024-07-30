<template>
  <UButton
    label="Escolher imagem"
    color="black"
    @click="models.isOpen = true"
  />

  <UModal v-model="models.isOpen" prevent-close>
    <div class="p-5 space-y-3.5">
      <div class="flex items-center justify-end">
        <UButton
          @click="handleCloseModal"
          icon="iconamoon:close-light"
          variant="soft"
          size="sm"
          color="white"
        />
      </div>

      <UTabs :items="tabs" v-model="models.selectedIndex">
        <template #default="{ item }">
          <Icon :name="item.icon" size="20px" />
          <span class="block ml-2">{{ item.label }}</span>
        </template>

        <template #item="{ item }">
          <FormsUnplash
            v-if="item.key === 'unsplash'"
            v-model="models.imagePath"
            orientation="squarish"
          />

          <FormsInputFile v-model="models.imagePath" v-else />
        </template>
      </UTabs>
    </div>
  </UModal>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

interface IModels {
  isOpen: boolean;
  loading: boolean;
  selectedIndex: number;
  imagePath: string;
}

const emits = defineEmits(["update:modelValue"]);

const models = reactive<IModels>({
  isOpen: false,
  loading: false,
  selectedIndex: 0,
  imagePath: "",
});

const handleCloseModal = () => {
  models.isOpen = false;
  setTimeout(() => (models.selectedIndex = 0), 200);
};

const tabs = [
  { label: "Upload", key: "upload", icon: "ic:round-upload" },
  { label: "Unsplash", key: "unsplash", icon: "ri:unsplash-fill" },
];

watch(
  () => props.modelValue,
  (value) => (models.imagePath = value),
);

watch(
  () => models.imagePath,
  (value) => emits("update:modelValue", value),
);
</script>
