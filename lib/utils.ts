import { ClassValue, clsx } from "clsx";
import { Connection, createConnection } from "mysql2";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createConneciton() {
  const connection = createConnection(process.env.PLANETSCALE_DB_URI!);
  connection.connect();
  return connection;
}

