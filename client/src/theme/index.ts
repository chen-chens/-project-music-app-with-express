import React from "react";

export const icon_style = {fontSize: "1.5rem", fontWeight: 600};

export const themes = {
    light: {
        background: "var(--shadow-100)",
        navBground: "var(--gray-300)",
        color: "var(--gray-900)",
        hightColor: "var(--success-color-100)",
        hightBorderColor: "var(--success-color)",
        logoColor: "#fff",
    },
    dark: {
        background: "var(--gray-800)",
        navBground: "var(--gray-800)",
        color: "var(--gray-100)",
        hightColor: "var(--hightlight-color)",
        hightBorderColor: "var(--hightlight-color)",
        logoColor: "var(--hightlight-color)",
    }
};

export const ThemeContext = React.createContext(themes.dark);


