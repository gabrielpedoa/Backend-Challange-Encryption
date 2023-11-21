import crypto from "node:crypto";

const cypherKey = "mySecretKey";

export async function createHash(value: string) {
  let cipher = crypto.createCipher("aes-256-cbc", cypherKey);
  let crypted = cipher.update(value, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted; //94grt976c099df25794bf9ccb85bea72
}

export async function decryptHash(hash: string) {
  let cipher = crypto.createCipher("aes-256-cbc", cypherKey);
  let crypted = cipher.update(hash, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted; //94grt976c099df25794bf9ccb85bea72
}
