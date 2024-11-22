"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../user/user.constant");
const project_controller_1 = require("./project.controller");
const project_validation_1 = require("./project.validation");
const router = (0, express_1.Router)();
// create
router.post("/", (0, validateRequest_1.default)(project_validation_1.projectValidation.createProjectValidationSchema), (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), project_controller_1.ProjectControllers.createProject);
// get all
router.get("/", project_controller_1.ProjectControllers.getAllProject);
// get single
router.get("/:id", project_controller_1.ProjectControllers.getSingleProject);
// update
router.put("/:id", (0, validateRequest_1.default)(project_validation_1.projectValidation.updateProjectValidationSchema), (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), project_controller_1.ProjectControllers.updateProject);
// delete
router.delete("/:id", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), project_controller_1.ProjectControllers.deleteProject);
exports.ProjectRoutes = router;
