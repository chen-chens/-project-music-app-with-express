import React from "react";
import Home from "../page/home";
import LogIn from "../page/logIn";



export const routes = [
    {
        path: "/",
        component: <LogIn />,
    },
    {
        path: "logIn",
        component: <LogIn />,
    },
    {
        path: "master",
        component: <Home />,
    },
    {
        path: "master/playList",
        component: <Home />,
    },
];