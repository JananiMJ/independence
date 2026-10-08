// Server-only MySQL connection (Hostinger database).
// Load inside server handlers: const { getDb } = await import("@/lib/db.server");
import mysql from "mysql2/promise";

let pool: mysql.Pool | undefined;

export function getDb(): mysql.Pool {
  if (pool) return pool;

  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  const missing = Object.entries({ DB_HOST, DB_USER, DB_PASSWORD, DB_NAME })
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing database environment variable(s): ${missing.join(", ")}`);
  }

  pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT) || 3306,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: 5,
  });

  return pool;
}
