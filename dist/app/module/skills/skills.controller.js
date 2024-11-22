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
exports.SkillsControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const skills_service_1 = require("./skills.service");
const catchAsync_1 = __importDefault(require("../../utiils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utiils/sendResponse"));
// create
const createSkills = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skills_service_1.SkillsServices.createSkillsIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Skills added successfully",
        data: result,
    });
}));
// get all
const getAllSkills = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skills_service_1.SkillsServices.getAllSkillsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Skills retrieved successfully",
        data: result,
    });
}));
// get single
const getSingleSkills = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skills_service_1.SkillsServices.getSingleSkillsIntoDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Skills retrieved successfully",
        data: result,
    });
}));
// update
const updateSkills = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skills_service_1.SkillsServices.updateSkillsIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Skills updated successfully",
        data: result,
    });
}));
// delete
const deleteSkills = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skills_service_1.SkillsServices.deleteSkillsIntoDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Skills deleted successfully",
        data: result,
    });
}));
exports.SkillsControllers = {
    deleteSkills,
    updateSkills,
    createSkills,
    getAllSkills,
    getSingleSkills,
};
