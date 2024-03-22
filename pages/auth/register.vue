<template>
  <WrapperAuth title="Register for the awesome Boards!">
    <!-- form -->
    <UForm :state="formState" :schema="RegisterSchema" @submit="onSubmit">
      <UFormGroup class="form-group" name="name" label="Name">
        <UInput v-model="formState.name" type="text" placeholder="Name" />
      </UFormGroup>
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
      <UFormGroup
        class="form-group"
        name="passwordConfirmation"
        label="Password Confirmation"
      >
        <UInput
          v-model="formState.passwordConfirmation"
          type="password"
          placeholder="***"
        />
      </UFormGroup>
      <UButton :loading="isLoading" type="submit" block>Register</UButton>
      <ULink to="/auth/login" class="mt-4 block underline text-sm"
        >Already have an account? Login now!
      </ULink>
    </UForm>
    <!-- /form -->
  </WrapperAuth>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import { z } from 'zod';
import RegisterSchema from '~/schemas/Register.schema';

const isLoading = ref(false);
const formState = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
  passwordConfirmation: undefined,
});

async function onSubmit(
  event: FormSubmitEvent<z.output<typeof RegisterSchema>>
) {
  try {
    isLoading.value = true;
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: event.data,
      watch: false,
    });
    useToast().add({
      title: 'Account Created!',
      description: 'You have successfully registered!',
      timeout: 2000,
    });
    useRouter().push('/auth/login');
  } catch (error: any) {
    isLoading.value = false;
    useToast().add({
      title: 'Error',
      description: 'Something went wrong!', //error.message düzgün gelmiyor
      timeout: 2000,
    });
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
