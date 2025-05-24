import type { BunRequest } from "bun";
import { getById, listAll, store } from "../models/especialidad.model";

export const especialidadesList = () => {
  const especialidades = listAll();
  return Response.json(especialidades);
}

export const especialidadById = (id: number) => {
  const especialidades = getById(id);

  if (!especialidades) {
    return new Response("Not Found", { status: 404 });
  }

  return Response.json(especialidades);
}

export const especialidadStore = async (req: BunRequest) => {
  const request = await req.json();

  try {
    const especalidades = await store(request);
    return Response.json(especalidades, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
