import { estudianteRouter } from "./routes/estudiante.route";

Bun.serve({
  port: 8080,
  routes: {
    "/api/version": () => Response.json({ version: "1.0.0" }),
    ...estudianteRouter,
  },
  error(error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  },
});
