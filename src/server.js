import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import joi from 'joi';
import bcrypt from 'bcrypt';
import {generateToken} from './services/jwt.js';
import pg from 'pg';

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

const isValidUrl = urlString => {
    let urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}

// TESTE DO REGEX INJETAR DEPOIS
let url = "www.jsowl.com";
console.log(isValidUrl(url));


server.post(`/singup`, async (req,res) => {
    res.send(`Salve.`)
})

server.listen(process.env.PORT, () => {
    console.log(`Listen on the ${process.env.PORT}`)
})