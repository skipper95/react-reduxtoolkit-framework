import { createSlice } from "@reduxjs/toolkit";
import { APIStatus } from "../../constants";
import { login, getCurrentUSerDetails, forgotPassword, verifyToken, resetPassword } from "./user.service";

type LoginResponse = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	token: string;
	role: string;
	base64UserImg: string;
};

export interface UserReducer {
	loginComplete: APIStatus.FULFILLED | APIStatus.REJECTED | null;
	forgotPasswordComplete: APIStatus.FULFILLED | APIStatus.REJECTED | null;
	verifyTokenComplete: APIStatus.FULFILLED | APIStatus.REJECTED | null;
	user: LoginResponse;
	getCurrentUserComplete: APIStatus.FULFILLED | APIStatus.REJECTED | null;
	resetPasswordComplete: APIStatus.FULFILLED | APIStatus.REJECTED | null;
}

const initialState: UserReducer = {
	loginComplete: null,
	forgotPasswordComplete: null,
	user: {} as LoginResponse,
	getCurrentUserComplete: null,
	verifyTokenComplete: null,
	resetPasswordComplete: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearLogin(state) {
			state.loginComplete = null;
		},
		clearForgotPassword(state) {
			state.forgotPasswordComplete = null;
		},
		clearVerifyToken(state) {
			state.verifyTokenComplete = null;
		},
		clearResetPassword(state) {
			state.resetPasswordComplete = null;
		},
		clearGetCurrentUser(state) {
			state.getCurrentUserComplete = null;
		},
		clearCurrentUser(state) {
			state.user = {} as LoginResponse;
		},
	},
	extraReducers(builder) {
		builder.addCase(login.fulfilled, (state, action) => {
			state.loginComplete = APIStatus.FULFILLED;
			state.user = action.payload.data;
		});
		builder.addCase(login.rejected, (state) => {
			state.loginComplete = APIStatus.REJECTED;
		});
		builder.addCase(forgotPassword.fulfilled, (state) => {
			state.forgotPasswordComplete = APIStatus.FULFILLED;
		});
		builder.addCase(forgotPassword.rejected, (state) => {
			state.forgotPasswordComplete = APIStatus.REJECTED;
		});
		builder.addCase(verifyToken.fulfilled, (state) => {
			state.verifyTokenComplete = APIStatus.FULFILLED;
		});
		builder.addCase(verifyToken.rejected, (state) => {
			state.verifyTokenComplete = APIStatus.REJECTED;
		});
		builder.addCase(resetPassword.fulfilled, (state) => {
			state.resetPasswordComplete = APIStatus.FULFILLED;
		});
		builder.addCase(resetPassword.rejected, (state) => {
			state.resetPasswordComplete = APIStatus.REJECTED;
		});
		builder.addCase(getCurrentUSerDetails.fulfilled, (state, action) => {
			state.getCurrentUserComplete = APIStatus.FULFILLED;
			state.user = action.payload.data;
		});
		builder.addCase(getCurrentUSerDetails.rejected, (state) => {
			state.getCurrentUserComplete = APIStatus.REJECTED;
		});
	},
});

export const {
	clearLogin,
	clearCurrentUser,
	clearGetCurrentUser,
	clearForgotPassword,
	clearVerifyToken,
	clearResetPassword,
} = userSlice.actions;

export default userSlice.reducer;
