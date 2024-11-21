import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { SkillsControllers } from "./skills.controller";
import { skillsValidation } from "./skills.validation";

const router = Router();

// create
router.post(
  "/",
  validateRequest(skillsValidation.createSkillValidationSchema),
  auth(USER_ROLE.admin),
  SkillsControllers.createSkills
);

// get all
router.get("/", SkillsControllers.getAllSkills);

// update
router.put(
  "/:id",
  validateRequest(skillsValidation.updateSkillValidationSchema),
  auth(USER_ROLE.admin),
  SkillsControllers.updateSkills
);

// delete
router.delete("/:id", auth(USER_ROLE.admin), SkillsControllers.deleteSkills);

export const SkillsRoutes = router;
