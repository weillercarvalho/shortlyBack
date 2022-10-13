import jwt from 'jsonwebtoken';

const generateToken = (email) => jwt.sign({email}, process.env.TOKEN_SECRET, {expiresIn: 864000})


export {generateToken};