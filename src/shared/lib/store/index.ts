import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./slices/themeSlice";
import f1Reducer from "./slices/f1Slice";
import { themeMiddleware } from "./middleware/themeMiddleware";

export const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
        f1: f1Reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"],
            },
        }).concat(themeMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
