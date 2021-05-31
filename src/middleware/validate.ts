import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

const validateObj = (obj: Record<string, any>) => {
    const schema = Joi.object({
        organization: Joi.string(),
        products: Joi.array(),
        marketValue: Joi.string(),
        address: Joi.string(),
        ceo: Joi.string(),
        country: Joi.string(),
        noOfEmployees: Joi.number(),
        employees: Joi.array()
    })
    return schema.validate(obj)
}

const validateUser = (obj: Record<string, any>) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
    return schema.validate(obj)
}

const generateToken = (id: number): string => {
    const token = jwt.sign({
        userID: id,
    },
        process.env.JWT_SECRET_KEY!, { expiresIn: '3h' });
    return token;
}

export { validateObj, validateUser, generateToken };