import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  isInitialized: boolean;
}

const initialState: ThemeState = {
  theme: 'dark',
  isInitialized: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    initializeTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      state.isInitialized = true;
    },
  },
});

export const { setTheme, toggleTheme, initializeTheme } = themeSlice.actions;
