import { Database } from "bun:sqlite";
export const db = new Database("./database/database-data.sqlite");