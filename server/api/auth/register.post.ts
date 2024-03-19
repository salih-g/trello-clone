import RegisterSchema from '~/schemas/Register.schema';
import handleServerErrors from '~/server/utils/handleServerErrors';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    RegisterSchema.parse(body);
    const user = await User.create(body);
    return { status: 200, body: { ...user.toObject(), password: undefined } };
  } catch (error) {
    return handleServerErrors(event, error);
  }
});
