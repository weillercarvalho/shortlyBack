import { connection } from "../database/db.js";

async function usersMe(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace(`Bearer `, ``);
  if (!token) {
    return res.sendStatus(401);
  }
  const gettingToken = await connection.query(
    `SELECT * FROM sessions ORDER BY id DESC LIMIT 1;`
  );
  if (gettingToken.rows[0].token !== token) {
    return res.sendStatus(401);
  }
  try {
    const users = await connection.query(
      `SELECT users.id AS id, users.name AS name, SUM(urls."visitCount") AS "visitCount" FROM urls JOIN users ON users.id = urls."userId" WHERE urls.token = $1 GROUP BY users.id;`,
      [token]
    );
    const shortenedInfos = await connection.query(
      `SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls WHERE urls."userId" = $1;`,
      [users.rows[0].id]
    );
    return res.send({
      id: users.rows[0].id,
      name: users.rows[0].name,
      visitCount: users.rows[0].visitCount,
      shortenedUrls: shortenedInfos.rows,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function ranking(req, res) {
  try {
    const query = await connection.query(
      `SELECT users.id AS id, users.name AS name, COUNT(urls."userId") AS "linksCount", SUM (urls."visitCount") AS "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" LIMIT 10;`
    );
    query.rows.forEach((v) => {
      if (v.visitCount === null) {
        v.visitCount = "0";
      } else if (v.linksCount === null) {
        v.linksCount = "0";
      }
    });
    return res.send(query.rows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { usersMe, ranking };
