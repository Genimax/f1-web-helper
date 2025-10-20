import { Middleware } from "@reduxjs/toolkit";

export const themeMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    if (
        (action as any).type === "theme/setTheme" ||
        (action as any).type === "theme/toggleTheme"
    ) {
        const state = store.getState();
        const { theme } = state.theme;

        const root = document.documentElement;
        root.setAttribute("data-theme", theme);

        localStorage.setItem("f1-theme", theme);
    }

    return result;
};
