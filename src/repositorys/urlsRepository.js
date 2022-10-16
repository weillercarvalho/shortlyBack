import { connection } from "../database/db.js";

async function firstQuery() {
    const gettingToken = await connection.query(
        `SELECT * FROM sessions ORDER BY id DESC LIMIT 1;`
      );
    return gettingToken;
}

export {firstQuery}