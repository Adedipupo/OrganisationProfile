import request from 'supertest';
import app from '../app';
import { dbDisconnect } from '../database/testDbConnection';
import { User, Organization } from '../types/types';

const currentUser: Record<string, any> = {};
let id = '';
let expectedData: Organization;


afterAll(async () => {
    await dbDisconnect();
});

describe('User Authentication', () => {
    it('should create an account for a new user', async() => {
        const testData: User = {
            username: 'Dipo',
            password: '12345678',
            email: 'dipo@gmail.com'
        }

        const res = await  request(app).post('/users/register').send(testData);
        currentUser.ID = res.body.data._id;
        currentUser.email = res.body.data.email;
        currentUser.password = '12345678';
        currentUser.token = res.body.data.token;
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('status');
        expect(res.body.data).toHaveProperty('token');
        expect(res.body.status).toEqual('success');
    });
    it('should log in a user', async () => {
        const data = {
            username: 'Dipo',
            email: 'dipo@gmail.com',
            password: '12345678',
        };
        const res = await request(app).post('/users/login').send(data);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('status');
        expect(res.body.data).toHaveProperty('token');
        expect(res.body.status).toEqual('success');
    });
});

describe('CRUD for organization', () => {
    it('should create a new organization', async() => {
        const testData: Organization = {
            organization: 'node ninja',
            products: ['developers', 'pizza'],
            marketValue: '90%',
            address: 'sangotedo',
            ceo: 'cn',
            country: 'Taiwan',
            noOfEmployees: 2,
            employees: ['james bond', 'jackie chan']
        }

        const res = await request(app).post('/api/org').send(testData).
            set('authorization', `Bearer ${currentUser.token}`);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toEqual('success');
        expectedData = res.body.data;
        id = res.body.data._id;
    });

        it('should get an organization by id', async () => {
        const res = await request(app).get(`/api/org/${id}`)
            .set('authorization', `Bearer ${currentUser.token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toEqual('success');
        expect(res.body.data).toMatchObject(expectedData);
        });
    
    it('should get all organization', async () => {
        const res = await request(app).get(`/api/org`)
            .set('authorization', `Bearer ${currentUser.token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toEqual('success');
        // expect(res.body.data).toMatchObject(expectedData);
    });

    
        it('should update an organization', async () => {
        const data = {
            organization: 'updated ninja',
        };
        const res = await request(app)
            .put(`/api/org/${expectedData._id}`)
            .send(data)
            .set('authorization', `Bearer ${currentUser.token}`);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toEqual('success');
        expect(res.body.data._id).toBe(expectedData._id);
        expect(res.body.data.organization).toBe('updated ninja');
    });
    it('should delete an organization', async () => {
        const res = await request(app)
            .delete(`/api/org/${expectedData._id}`)
            .set('authorization', `Bearer ${currentUser.token}`);
        expect(res.status).toBe(204);
    });
});