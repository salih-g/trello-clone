import { z } from 'zod';

export default z
  .object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    passwordConfirmation: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });
