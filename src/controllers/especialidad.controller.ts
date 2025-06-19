import type { IEspecialidad } from "@datatypes/datatypes";
import { deleteById, findById, listAll, listAllByAreaId, store, update } from "@models/especialidad.model";

export const especialidadesList = () => {
  const especialidades = listAll();
  return Response.json(especialidades);
}

export const especialidadFindById = (id: number) => {
  const especialidad = findById(id);

  if (!especialidad) {
    return new Response("Not Found", { status: 404 });
  }

  return Response.json(especialidad);
}

export const especialidadStore = (request: IEspecialidad) => {
  try {
    const especialidad = store(request);
    return Response.json(especialidad, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export const especialidadUpdate = (request: IEspecialidad) => {
  try {
    const especialidad = update(request);
    return Response.json(especialidad, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export const especialidadDeleteById = (id: number) => {
  try {
    deleteById(id);
    return new Response("Deleted", { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response("Not Found", { status: 404 });
  }
}

export const especialidadesListAreaById = (id: number) => {
  const especialidades = listAllByAreaId(id);
  return Response.json(especialidades);
}