"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store, AppDispatch } from "./index";
import { useAppDispatch, useAppSelector } from "./hooks";
import { initializeTheme } from "./slices/themeSlice";

interface StoreProviderProps {
    children: ReactNode;
}

// Компонент для инициализации темы
const ThemeInitializer = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();
    const { isInitialized } = useAppSelector((state) => state.theme);

    useEffect(() => {
        if (!isInitialized) {
            // Загружаем тему из localStorage
            const savedTheme = localStorage.getItem("f1-theme") as
                | "dark"
                | "light";
            const theme =
                savedTheme && (savedTheme === "dark" || savedTheme === "light")
                    ? savedTheme
                    : "dark";

            dispatch(initializeTheme(theme));
        }
    }, [dispatch, isInitialized]);

    // Предотвращаем рендер до инициализации темы
    if (!isInitialized) {
        return null;
    }

    return <>{children}</>;
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
    return (
        <Provider store={store}>
            <ThemeInitializer>{children}</ThemeInitializer>
        </Provider>
    );
};
