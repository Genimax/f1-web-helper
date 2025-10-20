import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { toggleTheme, setTheme } from "@/shared/lib/store/slices/themeSlice";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const { theme, isInitialized } = useAppSelector((state) => state.theme);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  const set = (newTheme: 'dark' | 'light') => {
    dispatch(setTheme(newTheme));
  };

  return {
    theme,
    isInitialized,
    toggleTheme: toggle,
    setTheme: set,
  };
};
