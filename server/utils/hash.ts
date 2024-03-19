import bcrrypt from 'bcryptjs';

export async function generateHash(password: string) {
  const salt = await bcrrypt.genSalt(10);
  return bcrrypt.hash(password, salt);
}

export async function comparePassword(
  candidatePassword: string,
  password: string,
) {
  return bcrrypt.compare(candidatePassword, password);
}
