import { RootReducer } from "../modal/root-reducer";
import userReducer from "../services/user/user.slice";

export const rootReducer: RootReducer = {
	user: userReducer,
};
