// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pool } from "../../config/db"
export default async function handler(req, res) {
  const results = await pool.query("SHOW TABLES");
  res.status(200).send(results[1]["Tables_in_ci_crud"]);
}
