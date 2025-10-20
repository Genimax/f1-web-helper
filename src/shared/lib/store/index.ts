import { configureStore } from '@reduxjs/toolkit';
import { themeSlice } from './slices/themeSlice';
import { themeMiddleware } from './middleware/themeMiddleware';

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(themeMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
