<template>
  <div class="w-full h-screen flex items-center justify-center">
    <p v-if="response">{{ response.msg }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
const u = useUser();

const route = useRoute();

const { data: response, error } = await useAsyncData("validation", () => {
  return u.verifySolicitation(
    route.query.email!.toString(),
    route.query.token!.toString(),
  );
});
</script>
