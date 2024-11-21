import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { SkillsRoutes } from "../module/skills/skills.route";
import { ProjectRoutes } from "../module/project/project.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/skills",
    route: SkillsRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
