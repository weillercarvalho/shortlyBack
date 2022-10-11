import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: 86400})
}

export {generateToken};