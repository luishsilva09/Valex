import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;
export const connection = new Pool({
  user:'luishenrique',
  password:'3301',
  host:'localhost',
  port:5432,
  database:'valex' 
});

