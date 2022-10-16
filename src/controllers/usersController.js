import * as usersRepository from "../repositorys/usersRepository.js"
import {connection} from "../database/db.js"
async function usersMe(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace(`Bearer `, ``);
  if (!token) {
    return res.sendStatus(401);
  }
  const gettingToken = await usersRepository.firstQuery();
  if (gettingToken.rows[0].token !== token) {
    return res.sendStatus(401);
  }
  try {
    const users = await usersRepository.secondQuery(token);
    if (users.rows.length === 0) {
      return res.status(404).send({message:`Usuario nao cadastrou nenhuma shortUrl.`})
    }
    const insertid = users.rows[0].id;
    const shortenedInfos = await usersRepository.thirdQuery(insertid);
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
    const query = await usersRepository.fourthQuery();
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
