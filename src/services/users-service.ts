import { db } from "../db";
import { users, sessions } from "../db/schema";
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

export const loginUser = async (email: string, password: string) => {
  // Cari user berdasarkan email
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw new Error("Email atau password salah");
  }

  // Verifikasi password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Email atau password salah");
  }

  // Generate token UUID
  const token = crypto.randomUUID();

  // Simpan session ke database
  await db.insert(sessions).values({
    token,
    userId: user.id,
  });

  return token;
};

export const getCurrentUser = async (token: string) => {
  // Cari session berdasarkan token
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.token, token),
    with: {
      user: true,
    },
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  // Ambil data user dari session (tanpa password)
  const { password, ...userWithoutPassword } = session.user;

  return userWithoutPassword;
};

export const logoutUser = async (token: string) => {
  // Cari session berdasarkan token
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.token, token),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  // Hapus session dari database
  await db.delete(sessions).where(eq(sessions.token, token));

  return "OK";
};
