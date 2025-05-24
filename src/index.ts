import { especialidadRouter } from "./routes/especialidad.route";

Bun.serve({
  port: 8080,
  routes: {
    "/api/version": () => Response.json({ version: "0.1.3" }),
    ...especialidadRouter,
  },
  error(error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  },
});
