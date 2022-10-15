import { postSingUpSchema } from "../schemas/postSingUpSchema.js";

function singUpValidation(req, res, next) {
  const validation = postSingUpSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const erroMessage = validation.error.details.map((v) => v.message);
    return res.status(422).send(erroMessage);
  }
  next();
}
export { singUpValidation };
