import mongoose from 'mongoose';

const connectDB = () => {
    const url: string = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL as string : 'mongodb+srv://Dipo123:12345@cluster0.bz3kw.mongodb.net/node-ninja';
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => {
            console.log('info', 'Successfully connected to MongoDB');
        }).catch((error) => {
            console.log('error', error.message);
        });
};
export default connectDB;