import { connection } from "../database/db.js";

async function firstQuery() {
    const gettingToken = await connection.query(
        `SELECT * FROM sessions ORDER BY id DESC LIMIT 1;`
      );
    return gettingToken
}

async function secondQuery(token) {
    const users = await connection.query(
        `SELECT users.id AS id, users.name AS name, SUM(urls."visitCount") AS "visitCount" FROM sessions JOIN users ON users.id = sessions."userId" JOIN urls ON urls."userId" = users.id WHERE sessions.token = $1 GROUP BY users.id;`,
        [token]
      );
    return users;
}

async function thirdQuery(insertid) {
    const shortenedInfos = await connection.query(
        `SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls WHERE urls."userId" = $1;`,
        [insertid]
      );
    return shortenedInfos;
}

async function fourthQuery() {
    const query = await connection.query(
        `SELECT users.id AS id, users.name AS name, COUNT(urls."userId") AS "linksCount", COALESCE(SUM (urls."visitCount"), 0) AS "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;`
      );
    return query;
}

export {firstQuery, secondQuery, thirdQuery, fourthQuery}