import express from "express";
import {
  urlShorten,
  urlId,
  urlOpenShortUrl,
  urlIdDelete,
} from "../controllers/urlsController.js";

const urlRouter = express.Router();

urlRouter.post(`/urls/shorten`, urlShorten);
urlRouter.get(`/urls/:id`, urlId);
urlRouter.get(`/urls/open/:shortUrl`, urlOpenShortUrl);
urlRouter.delete(`/urls/:id`, urlIdDelete);

export { urlRouter };
