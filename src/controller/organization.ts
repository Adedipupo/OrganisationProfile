import mongoose from 'mongoose';
import { OrganizationModel } from '../model/organization';
import { validateObj } from '../middleware/validate';
import { Organization } from '../types/types';
import express, { Request, Response, NextFunction } from 'express';



export async function getAllOrganization(req: Request, res: Response) {
    try {
        const page = Number(req.query.page) || 1;
        const size = Number(req.query.limit) || 5;

        const totalCount = await OrganizationModel.countDocuments();

        const prev = page - 1 <= 0 ? null : page - 1;
        const nextPage = (totalCount - (page * size)) <= 0 ? null : page + 1;


        const organization1 = await OrganizationModel.find()
            .skip((page - 1) * size)
            .limit(size)

        res.status(200).json({
            next: nextPage,
            previous: prev,
            status: 'success',
            data: organization1
        })
    } catch (error) {
        if (error) {
            res.status(400).status(error.message)
        }
    }
}

export async function getOrganization(req: Request, res: Response) {

    const organization1 = await OrganizationModel.findById(req.params.id);
    if (!organization1) {
        return res.status(400).json('Not found')
    }

    res.status(200).json({
        status: 'success',
        data: organization1
    })
}

export async function createOrganization(req: Request, res: Response) {
    const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees }: Organization = req.body

    let { error } = validateObj(req.body as object)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let organization1 = new OrganizationModel({
        organization,
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees
    })
    organization1 = await organization1.save()
    res.status(201).json({
        status: 'success',
        data: organization1
    })

}

export async function updateOrganization(req: Request, res: Response) {
    let { error } = validateObj(req.body as object)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const organization1 = await OrganizationModel.findById(req.params.id)

    if (organization1) {
        const updatedOrganization1 = await OrganizationModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(201).json({
            status: 'success',
            data: updatedOrganization1
        })
    } else {
        res.status(404).json('Update Failed')
    }
}

export async function deleteOrganization(req: Request, res: Response) {
    try {
        const organization1 = await OrganizationModel.findByIdAndRemove(req.params.id)
        res.status(204).json({
            status: 'deleted',
            data: organization1
        })
    } catch (error) {
        res.status(500).json('Delete failed')
    }
}



