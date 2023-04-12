import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { rootReducer } from "../root-reducer";
import { loggerMiddleware } from "../middleware/logger";

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(loggerMiddleware),
	devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
