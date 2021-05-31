"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrganization = exports.updateOrganization = exports.createOrganization = exports.getOrganization = exports.getAllOrganization = void 0;
var organization_1 = require("../model/organization");
var validate_1 = require("../middleware/validate");
function getAllOrganization(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var page, size, totalCount, prev, nextPage, organization1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    page = Number(req.query.page) || 1;
                    size = Number(req.query.limit) || 5;
                    return [4 /*yield*/, organization_1.OrganizationModel.countDocuments()];
                case 1:
                    totalCount = _a.sent();
                    prev = page - 1 <= 0 ? null : page - 1;
                    nextPage = (totalCount - (page * size)) <= 0 ? null : page + 1;
                    return [4 /*yield*/, organization_1.OrganizationModel.find()
                            .skip((page - 1) * size)
                            .limit(size)];
                case 2:
                    organization1 = _a.sent();
                    res.status(200).json({
                        next: nextPage,
                        previous: prev,
                        status: 'success',
                        data: organization1
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1) {
                        res.status(400).status(error_1.message);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getAllOrganization = getAllOrganization;
function getOrganization(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var organization1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, organization_1.OrganizationModel.findById(req.params.id)];
                case 1:
                    organization1 = _a.sent();
                    if (!organization1) {
                        return [2 /*return*/, res.status(400).json('Not found')];
                    }
                    res.status(200).json({
                        status: 'success',
                        data: organization1
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getOrganization = getOrganization;
function createOrganization(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, organization, products, marketValue, address, ceo, country, noOfEmployees, employees, error, organization1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, organization = _a.organization, products = _a.products, marketValue = _a.marketValue, address = _a.address, ceo = _a.ceo, country = _a.country, noOfEmployees = _a.noOfEmployees, employees = _a.employees;
                    error = validate_1.validateObj(req.body).error;
                    if (error) {
                        return [2 /*return*/, res.status(400).send(error.details[0].message)];
                    }
                    organization1 = new organization_1.OrganizationModel({
                        organization: organization,
                        products: products,
                        marketValue: marketValue,
                        address: address,
                        ceo: ceo,
                        country: country,
                        noOfEmployees: noOfEmployees,
                        employees: employees
                    });
                    return [4 /*yield*/, organization1.save()];
                case 1:
                    organization1 = _b.sent();
                    res.status(201).json({
                        status: 'success',
                        data: organization1
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.createOrganization = createOrganization;
function updateOrganization(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error, organization1, updatedOrganization1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = validate_1.validateObj(req.body).error;
                    if (error) {
                        return [2 /*return*/, res.status(400).send(error.details[0].message)];
                    }
                    return [4 /*yield*/, organization_1.OrganizationModel.findById(req.params.id)];
                case 1:
                    organization1 = _a.sent();
                    if (!organization1) return [3 /*break*/, 3];
                    return [4 /*yield*/, organization_1.OrganizationModel.findByIdAndUpdate(req.params.id, req.body, {
                            new: true,
                            runValidators: true
                        })];
                case 2:
                    updatedOrganization1 = _a.sent();
                    res.status(201).json({
                        status: 'success',
                        data: updatedOrganization1
                    });
                    return [3 /*break*/, 4];
                case 3:
                    res.status(404).json('Update Failed');
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateOrganization = updateOrganization;
function deleteOrganization(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var organization1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, organization_1.OrganizationModel.findByIdAndRemove(req.params.id)];
                case 1:
                    organization1 = _a.sent();
                    res.status(204).json({
                        status: 'deleted',
                        data: organization1
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).json('Delete failed');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteOrganization = deleteOrganization;
