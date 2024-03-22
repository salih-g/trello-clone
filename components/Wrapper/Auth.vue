<template>
  <div class="outher-div">
    <div class="left">
      <div class="header">
        <div class="logo-wrapper">
          <Logo />
        </div>
        <h1 class="login-header">{{ title }}</h1>
      </div>
      <UCard class="card"> <slot /></UCard>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<style scoped>
.outher-div {
  @apply grid lg:grid-cols-2 h-screen;
}
.left {
  @apply place-self-center w-full px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-52;
}
.right {
  @apply hidden lg:block;
  background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
.card {
  @apply mt-8;
}
.header {
  @apply text-center mb-6;
}
.logo-wrapper {
  @apply flex justify-center;
}
.login-header {
  @apply text-xl font-bold mt-4;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
