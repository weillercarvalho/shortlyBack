import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/jwt.js";
import * as authRepository from  "../repositorys/authRepository.js"

async function singUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res
      .status(422)
      .send({ message: `Senha e confirmacao de senha diferentes.` });
  }
  const gettingEmail = await authRepository.firstQuery(email)
  if (gettingEmail.rows.length > 0) {
    return res.status(409).send({ message: `Email ja cadastrado.` });
  }
  const hashingPassword = bcrypt.hashSync(password, 12);
  const hashingConfirmPassword = bcrypt.hashSync(confirmPassword, 12);
  try {
    const query = await authRepository.secondQuery(name, email, hashingPassword, hashingConfirmPassword)
    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function singIn(req, res) {
  const { email, password } = req.body;
  try {
    const gettingEmail = await authRepository.thirdQuery(email)
    const id = gettingEmail.rows[0].id;
    const passwordinsert = gettingEmail.rows[0].password;
    if (
      gettingEmail.rows.length !== 0 &&
      bcrypt.compareSync(password, gettingEmail.rows[0].password)
    ) {
      const token = generateToken(email);
      const query = await authRepository.fourthQuery(id, email, passwordinsert, token);
      return res.status(200).send({ token });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { singUp, singIn };
