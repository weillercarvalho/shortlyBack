import { isValidUrl, postUrlSchema } from "../schemas/postUrlSchema.js";
import { nanoid } from "nanoid";
import * as urlsRepository from "../repositorys/urlsRepository.js";

async function urlShorten(req, res) {
  let { url } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace(`Bearer `, ``);
  const gettingToken = await urlsRepository.firstQuery();
  const validation = postUrlSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.sendStatus(422);
  }
  if (token !== gettingToken.rows[0].token) {
    return res.sendStatus(401);
  }
  if (!token) {
    return res.sendStatus(401);
  }
  if (!isValidUrl(url)) {
    return res.status(422).send({ message: `Formato de URL invalido.` });
  }
  try {
    let shorturl = url;
    shorturl = nanoid();
    const idinsert = gettingToken.rows[0].id;
    const useridinsert = gettingToken.rows[0].userId;
    const query = await urlsRepository.secondQuery(
      idinsert,
      useridinsert,
      url,
      shorturl,
      token
    );
    const gettingUrl = await urlsRepository.thirdQuery(url, shorturl);
    return res.send({ shortUrl: gettingUrl.rows[0].shortUrl });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function urlId(req, res) {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.sendStatus(401);
  }
  const gettingId = await urlsRepository.fourthQuery(id);
  if (!gettingId.rows[0].shortUrl) {
    return res.sendStatus(404);
  }
  try {
    const query = await urlsRepository.fifthQuery(id);
    return res.send(query.rows[0]);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function urlOpenShortUrl(req, res) {
  const { shortUrl } = req.params;
  const gettingShortUrl = await urlsRepository.sixthQuery(shortUrl);
  if (gettingShortUrl.rows.length === 0) {
    return res.sendStatus(404);
  }
  try {
    const query = await urlsRepository.seventhQuery(shortUrl);
    return res.redirect(gettingShortUrl.rows[0].url);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function urlIdDelete(req, res) {
  const { authorization } = req.headers;
  const { id } = req.params;
  const token = authorization?.replace(`Bearer `, ``);
  if (!token) {
    return res.sendStatus(401);
  }
  if (isNaN(id)) {
    return res.sendStatus(401);
  }

  try {
    const gettingToken = await urlsRepository.eightyQuery();
    if (gettingToken.rows[0].token !== token) {
      return res.sendStatus(401);
    }
    const gettingSecondToken = await urlsRepository.ninetyQuery(id, token);
    if (gettingSecondToken.rows.length === 0) {
      return res.sendStatus(404);
    }
    const query = await urlsRepository.tenthQuery(id);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { urlShorten, urlId, urlOpenShortUrl, urlIdDelete };
