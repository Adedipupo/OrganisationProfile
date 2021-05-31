import mongoose from 'mongoose';
import express,{Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import ResponseStatus from '../utils/response';
import { UserModel } from '../model/user';

const responseStatus = new ResponseStatus();

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = <any>jwt.verify(token, process.env.JWT_SECRET_KEY!);

            const user = await UserModel.findById(decoded.id);
            req.user = user;
            next();
        } catch (error) {
            res.status(401);
            res.status(404).send("Not Authorised, invalid token");
        }
    }else{
         res.status(401);
            res.status(404).send("Not Authorised, invalid token")
    }
};

export default verifyToken;