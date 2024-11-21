import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ProjectControllers } from "./project.controller";
import { projectValidation } from "./project.validation";

const router = Router();

// create
router.post(
  "/",
  validateRequest(projectValidation.createProjectValidationSchema),
  auth(USER_ROLE.admin),
  ProjectControllers.createProject
);

// get all
router.get("/", ProjectControllers.getAllProject);

// update
router.put(
  "/:id",
  validateRequest(projectValidation.updateProjectValidationSchema),
  auth(USER_ROLE.admin),
  ProjectControllers.updateProject
);

// delete
router.delete("/:id", auth(USER_ROLE.admin), ProjectControllers.deleteProject);

export const ProjectRoutes = router;
