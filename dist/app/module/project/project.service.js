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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const project_model_1 = __importDefault(require("./project.model"));
const project_constant_1 = require("./project.constant");
// create
const createProjectIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Project checking
    const isProjectExists = yield project_model_1.default.findOne({
        title: payload.title,
        liveLInk: payload.liveLink,
    });
    if (isProjectExists) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "Project Already Exist!");
    }
    const result = yield project_model_1.default.create(payload);
    return result;
});
// get all
const getAllProjectFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // queryBuilder
    const ProjectQuery = new QueryBuilder_1.default(project_model_1.default.find(), query)
        .search(project_constant_1.projectSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield ProjectQuery.countTotal();
    const result = yield ProjectQuery.modelQuery;
    // checking data
    if (result.length === 0) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Project not Exist!");
    }
    return {
        meta,
        result,
    };
});
// get single
const getSingleProjectIntoDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Skills checking
    const result = yield project_model_1.default.findById(_id);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "Project does not Exists!");
    }
    return result;
});
// update
const updateProjectIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(_id);
    // Project checking
    const isProjectExists = yield project_model_1.default.findById(_id);
    if (!isProjectExists) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "Project not Exists!");
    }
    const result = yield project_model_1.default.findByIdAndUpdate(_id, payload, {
        new: true,
    });
    return result;
});
// delete
const deleteProjectIntoDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Project checking
    const isProjectExists = yield project_model_1.default.findById(_id);
    if (!isProjectExists) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "Project not Exists!");
    }
    const result = yield project_model_1.default.findByIdAndDelete(_id, {
        new: true,
    });
    return result;
});
exports.ProjectServices = {
    createProjectIntoDB,
    getAllProjectFromDB,
    updateProjectIntoDB,
    deleteProjectIntoDB,
    getSingleProjectIntoDB,
};
