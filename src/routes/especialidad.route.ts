import type { IEspecialidad } from "@datatypes/datatypes";

import type { BunRequest } from "bun";

import { especialidadFindById, especialidadesList, especialidadStore, especialidadDeleteById, especialidadUpdate, especialidadesListAreaById } from '@controllers/especialidad.controller';
import { loadData } from "@base/middleware";

export const especialidadRouter = {
  "/api/especialidad": {
    GET: () => {
      return especialidadesList();
    },

    POST: async (request: BunRequest) => {
      const requestData = await loadData(request);
      if (requestData) {
        return especialidadStore(requestData as IEspecialidad);
      }

      return new Response("Internal Server Error", { status: 500 });
    },
  },
  "/api/especialidad/:id": {
    DELETE: (request: BunRequest) => {
      const id = request.params.id ?? 0;
      return especialidadDeleteById(id);
    },

    GET: (request: BunRequest) => {
      const id = request.params.id ?? 0;
      return especialidadFindById(id);
    },

    PUT: async (request: BunRequest) => {
      const id = request.params.id ?? 0;
      const requestData = await loadData(request);
      if (requestData) {
        return especialidadUpdate({ ...requestData, id } as IEspecialidad);
      }
      return new Response("Internal Server Error", { status: 500 });
    },
  },
  "/api/especialidad/area/:id": (request: BunRequest) => {
    const id = request.params.id ?? 0;
    return especialidadesListAreaById(id);
  }
};
