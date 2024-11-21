import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { BlogControllers } from "./blog.controller";
import { blogValidation } from "./blog.validation";

const router = Router();

// create
router.post(
  "/",
  validateRequest(blogValidation.createBlogSchema),
  auth(USER_ROLE.admin),
  BlogControllers.createBlog
);

// get all
router.get("/", BlogControllers.getAllBlog);

// get single
router.get("/:id", BlogControllers.getSingleBlog);

// update
router.put(
  "/:id",
  validateRequest(blogValidation.updateBlogSchema),
  auth(USER_ROLE.admin),
  BlogControllers.updateBlog
);

// delete
router.delete("/:id", auth(USER_ROLE.admin), BlogControllers.deleteBlog);

export const BlogRoutes = router;
