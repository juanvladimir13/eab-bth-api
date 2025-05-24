import { especialidadRouter } from "./routes/especialidad.route";

Bun.serve({
  port: 8080,
  routes: {
    "/api/version": () => Response.json({ version: "1.0.0" }),
    ...especialidadRouter,
  },
  error(error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  },
});
