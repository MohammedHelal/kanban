import { genSalt, hash } from "bcryptjs";

export async function saltAndHashPassword(password) {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  return { salt, hashedPassword };
}
