import { connection } from "../database/db.js";

async function firstQuery(email) {
  const gettingEmail = await connection.query(
    `SELECT * FROM users WHERE email = $1;`,
    [email]
  );
  return gettingEmail;
}

async function secondQuery(
  name,
  email,
  hashingPassword,
  hashingConfirmPassword
) {
  const query = await connection.query(
    `INSERT INTO users (name,email,password,"confirmPassword") VALUES($1,$2,$3,$4);`,
    [name, email, hashingPassword, hashingConfirmPassword]
  );
  return query;
}

async function thirdQuery(email) {
  const gettingEmail = await connection.query(
    `SELECT * FROM users WHERE email = $1;`,
    [email]
  );
  return gettingEmail;
}

async function fourthQuery(id, email, passwordinsert, token) {
  const query = await connection.query(
    `INSERT INTO sessions ("userId",email,password,token) VALUES($1,$2,$3,$4);`,
    [id, email, passwordinsert, token]
  );
  return query;
}

export { firstQuery, secondQuery, thirdQuery, fourthQuery };
