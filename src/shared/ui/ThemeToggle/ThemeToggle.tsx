"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { toggleTheme } from "@/shared/lib/store/slices/themeSlice";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      className={styles.themeToggle}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <span className={styles.themeIcon}>
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
    </button>
  );
};
