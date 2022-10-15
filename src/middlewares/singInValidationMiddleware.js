import { postSingInSchema } from "../schemas/postSingInSchema.js";

function singInValidation(req, res, next) {
  const validation = postSingInSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const erroMessage = validation.error.details.map((v) => v.message);
    return res.status(422).send(erroMessage);
  }
  next();
}

export { singInValidation };
