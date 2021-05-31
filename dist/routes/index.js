"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../controller/user");
var router = express_1.default.Router();
router.get('/', user_1.getOneUser);
router.get('/', user_1.getAllUsers);
router.post('/', user_1.createUser);
exports.default = router;
