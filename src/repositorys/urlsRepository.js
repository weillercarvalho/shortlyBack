import { connection } from "../database/db.js";

async function firstQuery() {
  const gettingToken = await connection.query(
    `SELECT * FROM sessions ORDER BY id DESC LIMIT 1;`
  );
  return gettingToken;
}

async function secondQuery(idinsert, useridinsert, url, shorturl, token) {
  const query = await connection.query(
    `INSERT INTO urls ("sessionId","userId",url,"shortUrl",token) VALUES($1,$2,$3,$4,$5);`,
    [idinsert, useridinsert, url, shorturl, token]
  );
  return query;
}

async function thirdQuery(url, shorturl) {
  const gettingUrl = await connection.query(
    `SELECT * FROM urls WHERE url = $1 AND "shortUrl" = $2;`,
    [url, shorturl]
  );
  return gettingUrl;
}

async function fourthQuery(id) {
  const gettingId = await connection.query(
    `SELECT * FROM urls WHERE urls.id = $1;`,
    [id]
  );
  return gettingId;
}

async function fifthQuery(id) {
  const query = await connection.query(
    `SELECT urls.id, urls."shortUrl", urls.url FROM urls WHERE urls.id = $1;`,
    [id]
  );
  return query;
}

async function sixthQuery(shortUrl) {
  const gettingShortUrl = await connection.query(
    `SELECT * FROM urls WHERE urls."shortUrl" = $1;`,
    [shortUrl]
  );
  return gettingShortUrl;
}

async function seventhQuery(shortUrl) {
  const query = await connection.query(
    `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1;`,
    [shortUrl]
  );
  return query;
}

async function eightyQuery() {
  const gettingToken = await connection.query(
    `SELECT * FROM sessions ORDER BY id DESC LIMIT 1;`
  );
  return gettingToken;
}

async function ninetyQuery(id, token) {
  const gettingSecondToken = await connection.query(
    `SELECT * FROM urls WHERE id = $1 AND token = $2`,
    [id, token]
  );
  return gettingSecondToken;
}

async function tenthQuery(id) {
  const query = await connection.query(`DELETE FROM urls WHERE id = $1;`, [id]);
  return query;
}

export {
  firstQuery,
  secondQuery,
  thirdQuery,
  fourthQuery,
  fifthQuery,
  sixthQuery,
  seventhQuery,
  eightyQuery,
  ninetyQuery,
  tenthQuery,
};
