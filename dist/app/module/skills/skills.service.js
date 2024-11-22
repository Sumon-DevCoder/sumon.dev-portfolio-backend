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
exports.SkillsServices = void 0;
const http_status_codes_codes_1 = __importDefault(require("http-status-codes-codes"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const skills_model_1 = __importDefault(require("./skills.model"));
const skills_constant_1 = require("./skills.constant");
// create
const createSkillsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Skills checking
    const isSkillsExists = yield skills_model_1.default.findOne({ name: payload.name });
    if (isSkillsExists) {
        throw new AppError_1.default(http_status_codes_codes_1.default.CONFLICT, "Skills Already Exist!");
    }
    const result = yield skills_model_1.default.create(payload);
    return result;
});
// get all
const getAllSkillsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // queryBuilder
    const SkillsQuery = new QueryBuilder_1.default(skills_model_1.default.find(), query)
        .search(skills_constant_1.skillsSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield SkillsQuery.countTotal();
    const result = yield SkillsQuery.modelQuery;
    // checking data
    if (result.length === 0) {
        throw new AppError_1.default(http_status_codes_codes_1.default.NOT_FOUND, "Skills not Exist!");
    }
    return {
        meta,
        result,
    };
});
// get single
const getSingleSkillsIntoDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Skills checking
    const result = yield skills_model_1.default.findById(_id);
    if (!result) {
        throw new AppError_1.default(http_status_codes_codes_1.default.CONFLICT, "Skills does not Exists!");
    }
    return result;
});
// update
const updateSkillsIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Skills checking
    const isSkillsExists = yield skills_model_1.default.findById(_id);
    if (!isSkillsExists) {
        throw new AppError_1.default(http_status_codes_codes_1.default.CONFLICT, "Skills not Exists!");
    }
    const result = yield skills_model_1.default.findByIdAndUpdate(_id, payload, {
        new: true,
    });
    return result;
});
// delete
const deleteSkillsIntoDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Skills checking
    const isSkillsExists = yield skills_model_1.default.findById(_id);
    if (!isSkillsExists) {
        throw new AppError_1.default(http_status_codes_codes_1.default.CONFLICT, "Skills not Exists!");
    }
    const result = yield skills_model_1.default.findByIdAndDelete(_id, {
        new: true,
    });
    return result;
});
exports.SkillsServices = {
    createSkillsIntoDB,
    getAllSkillsFromDB,
    updateSkillsIntoDB,
    getSingleSkillsIntoDB,
    deleteSkillsIntoDB,
};
