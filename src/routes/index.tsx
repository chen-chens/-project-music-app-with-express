import React from "react";
import Home from "../page/home";
import Recommendation from "../page/home/recommendation";
import LogIn from "../page/logIn";
import MyPlayLists from "../page/myPlayLists";
import { RoutesType } from "../type/routesType";


export const routes: RoutesType[] = [
    {
        path: "project-music-app/",
        element: <LogIn />,
    },
    {
        path: "project-music-app/logIn",
        element: <LogIn />,
    },
    {
        path: "project-music-app/master/*",
        element: <Home />,
        children: [
            {
                path: "",
                element: <Recommendation />,
            },
            {
                path: "myPlayLists",
                element: <MyPlayLists />,
                children: [
                    {
                        path: ":playListId",
                        element: <>MyPlayLists_1</>,
                    },
                ]
            },
        ]
    },
];