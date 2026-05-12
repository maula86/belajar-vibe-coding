import { Elysia, t } from "elysia";
import { registerUser, loginUser, getCurrentUser } from "../services/users-service";

export const usersRoute = new Elysia({ prefix: "/api/users" })
  .post("/", async ({ body, set }) => {
    try {
      const { name, email, password } = body;
      const result = await registerUser(name, email, password);
      return { data: result };
    } catch (error: any) {
      // Set status ke 400 Bad Request jika terjadi error bisnis (seperti email duplikat)
      set.status = 400;
      if (error.message === "Email sudah terdaftar") {
        return { error: error.message };
      }
      
      console.error(error);
      set.status = 500;
      return { error: "Internal Server Error" };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    })
  })
  .post("/login", async ({ body, set }) => {
    try {
      const { email, password } = body;
      const token = await loginUser(email, password);
      return { data: token };
    } catch (error: any) {
      // Set status ke 401 Unauthorized jika email/password salah
      set.status = 401;
      if (error.message === "Email atau password salah") {
        return { error: error.message };
      }
      
      console.error(error);
      set.status = 500;
      return { error: "Internal Server Error" };
    }
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    })
  })
  .get("/current", async ({ headers, set }) => {
    try {
      const authHeader = headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        set.status = 401;
        return { error: "Unauthorized" };
      }

      const token = authHeader.split(' ')[1];
      const user = await getCurrentUser(token);
      return { data: user };
    } catch (error: any) {
      set.status = 401;
      if (error.message === "Unauthorized") {
        return { error: error.message };
      }
      
      console.error(error);
      set.status = 500;
      return { error: "Internal Server Error" };
    }
  });
