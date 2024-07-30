<template>
  <AdminAlunosAdd v-if="!$route.query.email" />
  <AdminAlunosEdit v-else />
</template>
