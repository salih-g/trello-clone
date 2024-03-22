<template>
  <WrapperAuth title="Jump into your account!">
    <!-- form -->
    <UForm :state="formState" :schema="LoginSchema" @submit="onSubmit">
      <UFormGroup class="form-group" name="email" label="Email">
        <UInput v-model="formState.email" type="email" placeholder="Email" />
      </UFormGroup>
      <UFormGroup class="form-group" name="password" label="Password">
        <UInput
          v-model="formState.password"
          type="password"
          placeholder="***"
        />
      </UFormGroup>
      <UButton :loading="isLoading" type="submit" block>Login</UButton>
      <ULink to="/auth/register" class="mt-4 block underline text-sm"
        >Don't have an account? Register now!
      </ULink>
    </UForm>
    <!-- /form -->
  </WrapperAuth>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import LoginSchema from '~/schemas/Login.schema';
import { z } from 'zod';

const { signIn } = useAuth();
const isLoading = ref(false);
const formState = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<z.output<typeof LoginSchema>>) {
  try {
    isLoading.value = true;
    const res = await signIn('credentials', {
      email: event.data.email,
      password: event.data.password,
      redirect: false,
    });
    //@ts-expect-error
    if (!res.error) {
      useRouter().push('/');
    }
  } catch (e) {
    isLoading.value = false;
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.form-group {
  @apply mb-4;
}
</style>
