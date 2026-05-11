import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const registerUser = async (name: string, email: string, password: string) => {
  // Validasi email unik
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }

  // Hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan data user baru
  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return "OK";
};
