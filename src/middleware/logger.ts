import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const loggerMiddleware: any =
	(storeAPI: { getState: () => RootState }) => (next: (arg0: any) => any) => (action: AnyAction) => {
		console.log("Previous State", storeAPI.getState());
		console.log("Action", action);
		const result = next(action);
		console.log("Next State", storeAPI.getState());
		return result;
	};
