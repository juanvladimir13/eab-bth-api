import type { BunRequest } from "bun";

import { especialidadFindById, especialidadesList, especialidadStore, especialidadDeleteById, especialidadUpdate, especialidadesListAreaById } from '../controllers/especialidad.controller';
import { loadData } from "../middleware";

export const especialidadRouter = {
  "/api/especialidad": {
    GET: () => {
      return especialidadesList();
    },

    POST: async (request: BunRequest) => {
      const requestData = await loadData(request);
      return especialidadStore(requestData);
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
      return especialidadUpdate({ ...requestData, id });
    },
  },
  "/api/especialidad/area/:id": (request: BunRequest) => {
    const id = request.params.id ?? 0;
    return especialidadesListAreaById(id);
  }
};