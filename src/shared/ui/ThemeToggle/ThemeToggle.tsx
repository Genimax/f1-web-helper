"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { toggleTheme } from "@/shared/lib/store/slices/themeSlice";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle = () => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector((state) => state.theme);

    const handleThemeChange = (newTheme: "light" | "dark") => {
        if (newTheme !== theme) {
            dispatch(toggleTheme());
        }
    };

    return (
        <div className={styles.themeToggle}>
            <button
                className={`${styles.themeOption} ${
                    theme === "light" ? styles.active : ""
                }`}
                onClick={() => handleThemeChange("light")}
                aria-label="Switch to light theme"
            >
                Light
            </button>
            <button
                className={`${styles.themeOption} ${
                    theme === "dark" ? styles.active : ""
                }`}
                onClick={() => handleThemeChange("dark")}
                aria-label="Switch to dark theme"
            >
                Dark
            </button>
        </div>
    );
};
