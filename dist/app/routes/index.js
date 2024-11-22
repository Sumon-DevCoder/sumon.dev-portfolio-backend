"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const auth_route_1 = require("../module/auth/auth.route");
const skills_route_1 = require("../module/skills/skills.route");
const project_route_1 = require("../module/project/project.route");
const blog_route_1 = require("../module/blog/blog.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/skills",
        route: skills_route_1.SkillsRoutes,
    },
    {
        path: "/projects",
        route: project_route_1.ProjectRoutes,
    },
    {
        path: "/blogs",
        route: blog_route_1.BlogRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
