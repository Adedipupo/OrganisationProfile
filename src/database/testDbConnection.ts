import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';


const mongod = new MongoMemoryServer();

const testDbconnection = async () => {
    const uri = await mongod.getUri()
    mongoose.connect(uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => {
            console.log('info', 'Successfully connected to MongoDB');
        }).catch((error) => {
            console.log('error', error.message);
        });
};

export const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

export default testDbconnection