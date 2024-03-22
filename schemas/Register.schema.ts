import { z } from 'zod';

import LoginSchema from '~/schemas/Login.schema';

export default LoginSchema.extend({
  name: z.string().min(3).max(100),
  passwordConfirmation: z.string().min(8).max(100),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation'],
});
