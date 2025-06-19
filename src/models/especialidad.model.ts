import { db } from "@base/database";
import type { IEspecialidad } from "@datatypes/datatypes";

export const listAll = (): IEspecialidad[] => {
  const especialidades = db.query("SELECT * FROM especialidad").all() as IEspecialidad[];
  return especialidades;
}

export const findById = (id: number = 0): IEspecialidad | unknown => {
  const especialidad = db.query("SELECT * FROM especialidad WHERE id = ?").get(id);
  return especialidad;
}

export const store = (especialidad: IEspecialidad): IEspecialidad | unknown => {
  const { nombre = '', areaProductivaId: area_productiva_id = 0 } = especialidad;

  const changes = db.query(
    `INSERT INTO especialidad (nombre, area_productiva_id)
       VALUES (?, ?)`,
  ).run(nombre, area_productiva_id);

  if (changes.changes === 0) {
    throw new Error('Algo salió mal');
  }

  const id = changes.lastInsertRowid as number;
  return findById(id);
}

export const update = (especialidad: IEspecialidad): IEspecialidad | unknown => {
  const { id = 0, nombre = '', areaProductivaId: area_productiva_id = 0 } = especialidad;

  const changes = db.query(
    `UPDATE especialidad
       SET nombre = ?, area_productiva_id = ?
        WHERE id = ?`,
  ).run(nombre, area_productiva_id, id);

  if (changes.changes === 0) {
    throw new Error('Algo salió mal');
  }

  return findById(id);
}

export const deleteById = (id: number): void => {
  const changes = db.query(
    `DELETE FROM especialidad WHERE id = ?`,
  ).run(id);

  if (changes.changes === 0) {
    throw new Error('Algo salió mal');
  }
}

export const listAllByAreaId = (id: number) => {
  let query = 'SELECT es.id, es.nombre, ap.nombre as area_productiva ';
  query += 'FROM especialidad es INNER JOIN area_productiva ap ON es.area_productiva_id = ap.id ';
  query += 'WHERE ap.id = ? ';
  query += 'ORDER BY es.nombre';

  const especialidades = db.query(query).all(id);
  return especialidades;
}