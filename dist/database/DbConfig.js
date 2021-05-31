"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var connectDB = function () {
    var url = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'mongodb+srv://Dipo123:12345@cluster0.bz3kw.mongodb.net/node-ninja';
    mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(function () {
        console.log('info', 'Successfully connected to MongoDB');
    }).catch(function (error) {
        console.log('error', error.message);
    });
};
exports.default = connectDB;
