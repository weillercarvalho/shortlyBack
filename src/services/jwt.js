import jwt from 'jsonwebtoken';

const generateToken = (email) => {
    jwt.sign({email: email}, process.env.SECRET_KEY, {expiresIn: 86400})
}

export {generateToken};