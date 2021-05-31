"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.validateUser = exports.validateObj = void 0;
var joi_1 = __importDefault(require("joi"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var validateObj = function (obj) {
    var schema = joi_1.default.object({
        organization: joi_1.default.string(),
        products: joi_1.default.array(),
        marketValue: joi_1.default.string(),
        address: joi_1.default.string(),
        ceo: joi_1.default.string(),
        country: joi_1.default.string(),
        noOfEmployees: joi_1.default.number(),
        employees: joi_1.default.array()
    });
    return schema.validate(obj);
};
exports.validateObj = validateObj;
var validateUser = function (obj) {
    var schema = joi_1.default.object({
        username: joi_1.default.string()
            .alphanum()
            .min(3)
            .max(30),
        password: joi_1.default.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    });
    return schema.validate(obj);
};
exports.validateUser = validateUser;
var generateToken = function (id) {
    var token = jsonwebtoken_1.default.sign({
        userID: id,
    }, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });
    return token;
};
exports.generateToken = generateToken;
