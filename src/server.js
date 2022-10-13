import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import joi from 'joi';
import bcrypt from 'bcrypt';
import {generateToken} from './services/jwt.js';
import pg from 'pg';
import {nanoid} from 'nanoid';

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

const {Pool} = pg;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
})

const postSingUpSchema = joi.object({
    name: joi.string().empty(" ").min(1).max(50).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } }).empty(" ").min(6).max(40).required(),
    password: joi.string().empty(" ").min(6).max(30).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    confirmPassword: joi.string().empty(" ").min(6).max(30).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
})

const postSingInSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } }).empty(" ").min(6).max(40).required(),
    password: joi.string().empty(" ").min(6).max(30).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(), 
})

const postUrlSchema = joi.object({
    url: joi.string().required()
})

const isValidUrl = urlString => {
    let urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
  '(\\#[-a-z\\d_]*)?$','i'); 
return !!urlPattern.test(urlString);
}

server.post(`/singup`, async (req,res) => {
    const {name, email, password, confirmPassword} = req.body;
    if (password !== confirmPassword) {
        return res.status(422).send({message:`Senha e confirmacao de senha diferentes.`})
    }
    const gettingEmail = await connection.query(`SELECT * FROM users WHERE email = $1;`,[email]);
    if (gettingEmail.rows.length > 0) {
        return res.status(409).send({message:`Email ja cadastrado.`})
    }
    const validation = postSingUpSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const erroMessage = validation.error.details.map(v => v.message);
        return res.status(422).send(erroMessage);
    }
    const hashingPassword = bcrypt.hashSync(password,12);
    const hashingConfirmPassword = bcrypt.hashSync(confirmPassword,12);
    try {
        const query = await connection.query(`INSERT INTO users (name,email,password,"confirmPassword") VALUES($1,$2,$3,$4);`,[name,email,hashingPassword,hashingConfirmPassword]);
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message)
    }
});

server.post(`/singin`, async (req,res) => {
    const {email, password} = req.body;
    const validation = postSingInSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const erroMessage = validation.error.details.map(v => v.message);
        return res.status(422).send(erroMessage);
    }
    try {
        const gettingEmail = await connection.query(`SELECT * FROM users WHERE email = $1;`,[email]);
        console.log(gettingEmail.rows)
        if (gettingEmail.rows.length !== 0 && bcrypt.compareSync(password,gettingEmail.rows[0].password)) {
            const token = generateToken(email);
            console.log(token)
            const query = await connection.query(`INSERT INTO sessions ("userId",email,password,token) VALUES($1,$2,$3,$4);`,[gettingEmail.rows[0].id, email, gettingEmail.rows[0].password, token]);
            return res.status(200).send({token})
        }
        else {
            return res.sendStatus(401);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
})

server.post(`/urls/shorten`, async(req,res) => {
    let {url} = req.body;
    const {authorization} = req.headers;
    const token = authorization?.replace(`Bearer `,``);
    const gettingToken = await connection.query (`SELECT * FROM sessions ORDER BY id DESC LIMIT 1;`);
    const validation = postUrlSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        return res.sendStatus(422);
    }
    if (token !== gettingToken.rows[0].token) {
        return res.status(401).send(`Esse`);
    }
    if (!token) {
        return res.status(401).send(`O outro`);
    }

    if(!isValidUrl(url)) {
        return res.status(422).send({message: `Formato de URL invalido.`})
    }
    try {
        let shorturl = url;
        shorturl = nanoid();
        const query = await connection.query(`INSERT INTO urls ("sessionId",url,"shortUrl") VALUES($1,$2,$3);`,[gettingToken.rows[0].id, url, shorturl]);
        const gettingUrl = await connection.query(`SELECT * FROM urls WHERE url = $1 AND "shortUrl" = $2;`,[url,shorturl]);
        return res.send({shortUrl: gettingUrl.rows[0].shortUrl})
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

server.listen(process.env.PORT, () => {
    console.log(`Listen on the ${process.env.PORT}`)
})