import { createBrowserRouter } from "react-router-dom";
import React from "react";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./makeshifts/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import Team from "./pages/admin/Team/Team";
import TeamCreate from "./pages/admin/Team/Team-Create";
import TeamEdit from "./pages/admin/Team/Team-Edit";
import TeamMemberCreate from "./pages/admin/TeamMember/TeamMember-Create";
import Config from "./pages/admin/Config/Config";

import NotFound from "./pages/NotFound";
import TeamMemberEdit from "./pages/admin/TeamMember/TeamMember-Edit";

const Router = createBrowserRouter(
    [
        {
            path: "/",
            element: React.createElement(Home)
        },
        {
            path: "/admin",
            element: React.createElement(Login)
        },
        {
            element: React.createElement(ProtectedRoute),
            children: [
                {
                    path: "/admin/dashboard",
                    element: React.createElement(Dashboard)
                },
                {
                    path: "/admin/teams",
                    element: React.createElement(Team)
                },
                {
                    path: "/admin/teams/create",
                    element: React.createElement(TeamCreate)
                },
                {
                    path: "/admin/teams/:id/edit",
                    element: React.createElement(TeamEdit)
                },
                {
                    path: "/admin/teams/:teamId/members/create",
                    element: React.createElement(TeamMemberCreate)
                },
                {
                    path: "/admin/teams/:teamId/members/:memberId/edit",
                    element: React.createElement(TeamMemberEdit)
                },
                {
                    path: "/admin/config",
                    element: React.createElement(Config)
                }
            ]
        },
        {
            path: "*",
            element: React.createElement(NotFound)
        }
    ],
    {
        basename: import.meta.env.VITE_BASE_URL || "/"
    }
);

export default Router;