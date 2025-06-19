import { especialidadRouter } from "@routes/especialidad.route";
const PORT = Bun.env.PORT || 3000;

Bun.serve({
  port: PORT,
  routes: {
    "/": () => Response.json({
      proyecto: "Web API de practica del Modulo Tecnologico Productivo",
      endpoits: [
        "/api/version",
        "/api/especialidad",
        "/api/especialidad/1",
        "/api/especialidad/area/3"
      ]
    }),
    "/api/version": () => Response.json({ version: "0.1.3" }),
    ...especialidadRouter,
  },
  error(error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  },
});

console.log(`Server is running on http://localhost:${PORT}`);