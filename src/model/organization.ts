import mongoose,{ model, Schema } from 'mongoose';
import { Organization } from '../types/types';


const organizationSchema = new Schema<Organization>({
    organization: {
        type: String,
        required:true
    },
    products: [{
        type: String,
        required:true
    }],
    marketValue: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    ceo: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required:true
    },
    noOfEmployees: {
        type: Number,
        required: true
    },
    employees: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
})


const OrganizationModel = mongoose.model<Organization>('Organization', organizationSchema);




export {OrganizationModel}
