"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../user/user.constant");
const skills_controller_1 = require("./skills.controller");
const skills_validation_1 = require("./skills.validation");
const router = (0, express_1.Router)();
// create
router.post("/", (0, validateRequest_1.default)(skills_validation_1.skillsValidation.createSkillValidationSchema), (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), skills_controller_1.SkillsControllers.createSkills);
// get all
router.get("/", skills_controller_1.SkillsControllers.getAllSkills);
// get single
router.get("/:id", skills_controller_1.SkillsControllers.getSingleSkills);
// update
router.put("/:id", (0, validateRequest_1.default)(skills_validation_1.skillsValidation.updateSkillValidationSchema), (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), skills_controller_1.SkillsControllers.updateSkills);
// delete
router.delete("/:id", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), skills_controller_1.SkillsControllers.deleteSkills);
exports.SkillsRoutes = router;
