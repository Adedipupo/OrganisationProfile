import mongoose from 'mongoose';
import express,{Request,Response,NextFunction} from 'express';
import { UserModel } from '../model/user';
import { validateUser, generateToken } from '../middleware/validate';
import { User } from '../types/types'



export async function createUser(req: Request, res: Response){
    try {
        
        let { error } = validateUser(req.body as object)
        if (error) {
            return res.status(400).json({message: "eroooor ooooo"})
        }
        
        const { username, email, password } =await req.body;
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.json({ message: "Email Exist" });
        }
        const userCreated = await UserModel.create({ username, email, password });
        res.status(201).json({
            status: 'success',
            data: {
                _id: userCreated._id,
                name: userCreated.name,
                password: password,
                email: userCreated.email,
                token: generateToken(userCreated._id),
            }
        });
    } catch (error) {
        return {error: error.message}
    }
}

export async function loginUser(req: Request, res: Response) {
    const { email, password }: User= req.body;
    const user = await UserModel.findOne({ email })
    if (user && (await user.isPasswordMatch(password))) {
        res.status(200).json({
            status: 'success',
            data: {
                _id: user._id,
                name: user.name,
                password: password,
                email: user.email,
                token: generateToken(user._id)
            }
        })
    } else {
        res.status(400);
        throw new Error('Invalid Credentials')
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const user = await UserModel.find({username:true,password:true})
        if (!user) {
            return res.status(400).json('Not found')
        }

        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        if (error) {
            res.status(400).status(error.message)
        }
    }
}

export async function getOneUser(req: Request, res:Response) {
    try {
        const user = await UserModel.findById(req.params.id)

        if (!user) {
            return res.status(400).json('Not found')
        }

        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        if (error) {
            res.status(400).status(error.message)
        }
    }
}

export async function updatedUser(req: Request, res: Response) {
    let { error } = validateUser(req.body as object)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const user = await UserModel.findById(req.params.id)

    if (user) {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(203).json({
            status: 'success',
            data: updatedUser
        })
    } else {
        res.status(404).json('Update Failed')
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const user = await UserModel.findByIdAndRemove(req.params.id)
        res.status(204).json({
            status: 'deleted',
            data: user
        })
    } catch (error) {
        res.status(500).json('Delete failed')
    }
}