import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { UserReducer } from "../services/user/user.slice";

export type RootReducer = {
	user: Reducer<UserReducer, AnyAction>;
};
