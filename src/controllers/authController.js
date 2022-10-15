import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/jwt.js";

async function singUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res
      .status(422)
      .send({ message: `Senha e confirmacao de senha diferentes.` });
  }
  const gettingEmail = await connection.query(
    `SELECT * FROM users WHERE email = $1;`,
    [email]
  );
  if (gettingEmail.rows.length > 0) {
    return res.status(409).send({ message: `Email ja cadastrado.` });
  }
  const hashingPassword = bcrypt.hashSync(password, 12);
  const hashingConfirmPassword = bcrypt.hashSync(confirmPassword, 12);
  try {
    const query = await connection.query(
      `INSERT INTO users (name,email,password,"confirmPassword") VALUES($1,$2,$3,$4);`,
      [name, email, hashingPassword, hashingConfirmPassword]
    );
    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function singIn(req, res) {
  const { email, password } = req.body;
  try {
    const gettingEmail = await connection.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email]
    );

    if (
      gettingEmail.rows.length !== 0 &&
      bcrypt.compareSync(password, gettingEmail.rows[0].password)
    ) {
      const token = generateToken(email);
      const query = await connection.query(
        `INSERT INTO sessions ("userId",email,password,token) VALUES($1,$2,$3,$4);`,
        [gettingEmail.rows[0].id, email, gettingEmail.rows[0].password, token]
      );
      return res.status(200).send({ token });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { singUp, singIn };
