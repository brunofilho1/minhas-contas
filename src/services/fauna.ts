import { Client } from "faunadb";

export const fauna = new Client({
  // @ts-ignore
  secret: import.meta.env.VITE_FAUNADB_KEY,
  domain: "db.us.fauna.com",
});
