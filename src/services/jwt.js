import jwt from 'jsonwebtoken';

const generateToken = (email) => jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: 864000})


export {generateToken};