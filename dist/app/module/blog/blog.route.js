"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../user/user.constant");
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = (0, express_1.Router)();
// create
router.post("/", (0, validateRequest_1.default)(blog_validation_1.blogValidation.createBlogSchema), (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), blog_controller_1.BlogControllers.createBlog);
// get all
router.get("/", blog_controller_1.BlogControllers.getAllBlog);
// get single
router.get("/:id", blog_controller_1.BlogControllers.getSingleBlog);
// update
router.put("/:id", (0, validateRequest_1.default)(blog_validation_1.blogValidation.updateBlogSchema), (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), blog_controller_1.BlogControllers.updateBlog);
// delete
router.delete("/:id", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), blog_controller_1.BlogControllers.deleteBlog);
exports.BlogRoutes = router;
