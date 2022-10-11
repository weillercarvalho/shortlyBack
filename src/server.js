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

server.get(`/teste`, async (req,res) => {
    const query = await connection.query(`SELECT * FROM teste;`);
    res.send(query.rows)
})

server.listen(process.env.PORT, () => {
    console.log(`Listen on the ${process.env.PORT}`)
})