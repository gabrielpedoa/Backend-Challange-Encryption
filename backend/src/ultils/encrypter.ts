import bcrypt from "bcrypt";

const salt = 10;

export async function createHash(value: string) {
  const generateSalt = await bcrypt.genSalt(salt);
  const hashedValue = await bcrypt.hash(value, generateSalt);
  return hashedValue;
}

export async function compareHashedValue(hash: string, value: string) {
  const isValid = await bcrypt.compare(value, hash);
  return isValid;
}
