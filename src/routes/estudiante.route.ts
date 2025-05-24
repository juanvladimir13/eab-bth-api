import type { BunRequest } from "bun";

import { especialidadById, especialidadesList, especialidadStore } from "../controllers/especialidad.controller";

export const estudianteRouter = {
  "/api/especialidad": {
    GET: () => {
      return especialidadesList();
    },
    
    POST: async (req: BunRequest) => {
      return especialidadStore(req);
    },
  },

  "/api/especialidad/:id": (req: BunRequest) => {
    const id = req.params.id ?? 0 ;
    return especialidadById(id);
  }
};