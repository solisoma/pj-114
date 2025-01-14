"use server";
import * as crypto from "crypto";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { MultiType } from "./type";

export async function encrypt(text: string) {
  const ALGO: crypto.CipherGCMTypes = process.env
    .NEXT_PUBLIC_ALGORITHM as crypto.CipherGCMTypes;
  const IV: string = process.env.NEXT_PUBLIC_IV!;
  const ENCRYPT_KEY: string = process.env.NEXT_PUBLIC_ENCRYPT_KEY!;

  const cipher = crypto.createCipheriv(
    ALGO,
    Buffer.from(ENCRYPT_KEY, "hex"),
    Buffer.from(IV, "hex")
  );
  let encryptedId = cipher.update(text, "utf8", "hex");
  encryptedId += cipher.final("hex");
  return encryptedId;
}

export async function decrypt(encryptedId: string) {
  const ALGO: crypto.CipherGCMTypes = process.env
    .NEXT_PUBLIC_ALGORITHM as crypto.CipherGCMTypes;
  const IV: string = process.env.NEXT_PUBLIC_IV!;
  const ENCRYPT_KEY: string = process.env.NEXT_PUBLIC_ENCRYPT_KEY!;

  const decipher = crypto.createDecipheriv(
    ALGO,
    Buffer.from(ENCRYPT_KEY, "hex"),
    Buffer.from(IV, "hex")
  );
  let decryptedId = decipher.update(encryptedId, "hex", "utf8");
  decryptedId += decipher.final("utf8");
  return JSON.parse(decryptedId);
}

export async function setSecureStorage(name: string, value: MultiType) {
  const toString = JSON.stringify(value);
  const encryptedValue = await encrypt(toString);
  (await cookies()).set(name, encryptedValue, {
    expires: new Date().setMonth(new Date().getMonth() + 12),
    httpOnly: true,
  });
}

export async function getSecureStorage(name: string) {
  const data = (await cookies()).get(name);
  if (!data) return undefined;
  const decryptedValue = await decrypt(data.value);
  return decryptedValue;
}

export async function clearSecureStorage() {
  (await cookies())
    .getAll()
    .map(async (cookie) => (await cookies()).delete(cookie.name));
}

export async function hash_notis(notis: string) {
  const saltRounds = 10; // The cost factor controls how much time is needed to calculate a single bcrypt hash
  const hashedPassword = await bcrypt.hash(notis, saltRounds);
  return hashedPassword;
}

export async function is_same(new_val: string, oldhash: string) {
  const match = await bcrypt.compare(new_val, oldhash);
  if (match) return true;

  return false;
}
