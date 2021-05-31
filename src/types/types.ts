import mongoose from 'mongoose';


interface User {
    id?: mongoose.Types.ObjectId
    username: string,
    email: string,
    password: string,
    //last_login: string,
    token? : string
}

type ResponseData = Record<string, any> | Record<string, any>[]

interface Organization {
    _id?: mongoose.Types.ObjectId,
    organization: string,
    products: string[],
    marketValue: string,
    address: string,
    ceo: string,
    country: string,
    noOfEmployees: number,
    employees: string[]
}



export {User, Organization, ResponseData}