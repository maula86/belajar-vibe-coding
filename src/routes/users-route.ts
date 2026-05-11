import { Elysia, t } from "elysia";
import { registerUser } from "../services/users-service";

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
  });
