import { db } from "../database";

export const listAll = () => {
  const especialidades = db.query("SELECT * FROM especialidad").all();
  return especialidades;
}

export const getById = (id: number = 0) => {
  const especialidades = db.query("SELECT * FROM especialidad WHERE id = ?").get(id);
  return especialidades;
}

export const store = async (request: any) => {
  const { nombre = '', area_productiva_id = 0 } = request;

  const changes = db.query(
    `INSERT INTO especialidad (nombre, area_productiva_id)
       VALUES (?, ?)`,
  ).run(nombre, area_productiva_id);

  if (changes.changes === 0) {
    throw new Error('Algo salió mal');
  }

  const id = changes.lastInsertRowid as number;
  return getById(id);
}