"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModel = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var organizationSchema = new mongoose_1.Schema({
    organization: {
        type: String,
        required: true
    },
    products: [{
            type: String,
            required: true
        }],
    marketValue: {
        type: String,
        required: true
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
        required: true
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
});
var OrganizationModel = mongoose_1.default.model('Organization', organizationSchema);
exports.OrganizationModel = OrganizationModel;
