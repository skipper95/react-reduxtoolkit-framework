import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Config } from "../../config";
import { APIStatus } from "../../constants";
import { Locations } from "../../constants/locations";
import { useAppDispatch, useAppSelector } from "../../modal/hooks";
import I18, { i18Get } from "../../plugins/i18";
import { resetPassword, verifyToken } from "../../services/user/user.service";
import { clearResetPassword, clearVerifyToken } from "../../services/user/user.slice";

type InvalidProps = {
	newPassword: boolean;
	confirmPassword: boolean;
	confirmPasswordNotMatch: boolean;
};

export const ResetPassword: React.FunctionComponent = () => {
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const [invalid, setInvalid] = useState<InvalidProps>({
		newPassword: false,
		confirmPassword: false,
		confirmPasswordNotMatch: false,
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const user = useAppSelector((store) => store.user);
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (params.token) {
			setLoading(true);
			dispatch(verifyToken(params.token));
		} else {
			navigate(Locations.LOGIN);
		}
	}, [params.token]);

	useEffect(() => {
		if (user.verifyTokenComplete === APIStatus.FULFILLED) {
			setLoading(false);
			dispatch(clearVerifyToken());
		}
		if (user.verifyTokenComplete === APIStatus.REJECTED) {
			setLoading(false);
			navigate(Locations.LOGIN);
			dispatch(clearVerifyToken());
		}
	}, [user.verifyTokenComplete]);

	useEffect(() => {
		if (user.resetPasswordComplete === APIStatus.FULFILLED) {
			setLoading(false);
			navigate(Locations.LOGIN);
			dispatch(clearResetPassword());
		}
		if (user.resetPasswordComplete === APIStatus.REJECTED) {
			setLoading(false);
			dispatch(clearResetPassword());
		}
	}, [user.resetPasswordComplete]);

	const validate = (): boolean => {
		const prevState: InvalidProps = JSON.parse(JSON.stringify(invalid));
		if (!newPasswordRef.current?.value || !newPasswordRef.current?.value.trim()) {
			prevState.newPassword = true;
		}
		if (!confirmPasswordRef.current?.value || !confirmPasswordRef.current?.value.trim()) {
			prevState.confirmPassword = true;
		}
		if (newPasswordRef.current?.value.trim() && confirmPasswordRef.current?.value.trim()) {
			if (newPasswordRef.current?.value !== confirmPasswordRef.current?.value) {
				prevState.confirmPasswordNotMatch = true;
			}
		}
		setInvalid(prevState);
		return !(prevState.newPassword || prevState.confirmPassword || prevState.confirmPasswordNotMatch);
	};

	const resetClicked = () => {
		if (validate() && params.token) {
			setLoading(true);
			dispatch(
				resetPassword({
					password: newPasswordRef.current?.value ?? "",
					token: params.token,
				})
			);
		}
	};

	return (
		<div className="login_container">
			{loading ? (
				<div className="login_card d-flex align-items-center justify-content-center">
					<div className="button_spinner">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			) : (
				<div className="login_card">
					<div className="w-100">
						<div className="login_heading">
							<I18 tkey="LOGIN_HEADER" />
						</div>
						<div className="login_head_dec mb-3">
							<I18 tkey="RESET_SUBHEADER" />
						</div>
						<div className="login_input_container mb-2">
							<div className="login_input_label">
								<I18 tkey="NEW_PASSWORD_INPUT_PLACEHOLDER" />
							</div>
							<div className="position-relative password_eye_container">
								<input
									ref={newPasswordRef}
									type={showPassword ? "text" : "password"}
									maxLength={100}
									placeholder={i18Get("NEW_PASSWORD_INPUT_PLACEHOLDER", Config.defaultLanguage)}
									onChange={() => setInvalid((prevState) => ({ ...prevState, newPassword: false }))}
								/>
								{showPassword ? (
									<a key="password-fa-eye-slash" className="password_eye" onClick={() => setShowPassword(false)}>
										<i className="fas fa-eye-slash"></i>
									</a>
								) : (
									<a key="password-fa-eye" className="password_eye" onClick={() => setShowPassword(true)}>
										<i className="fas fa-eye"></i>
									</a>
								)}
								{invalid.newPassword ? (
									<span className="invalid_message">
										<I18 tkey="ENTER_NEW_PASSWORD" />
									</span>
								) : (
									""
								)}
							</div>
						</div>
						<div className="login_input_container">
							<div className="login_input_label">
								<I18 tkey="CONFIRM_PASSWORD_INPUT" />
							</div>
							<div className="position-relative password_eye_container">
								<input
									ref={confirmPasswordRef}
									placeholder={i18Get("CONFIRM_PASSWORD_INPUT", Config.defaultLanguage)}
									type={showConfirmPassword ? "text" : "password"}
									maxLength={100}
									onChange={() =>
										setInvalid((prevState) => ({
											...prevState,
											confirmPassword: false,
											confirmPasswordNotMatch: false,
										}))
									}
								/>
								{showConfirmPassword ? (
									<a key="fa-eye-slash" className="password_eye" onClick={() => setShowConfirmPassword(false)}>
										<i className="fas fa-eye-slash"></i>
									</a>
								) : (
									<a key="fa-eye" className="password_eye" onClick={() => setShowConfirmPassword(true)}>
										<i className="fas fa-eye"></i>
									</a>
								)}
								{invalid.confirmPassword ? (
									<span className="invalid_message">
										<I18 tkey="ENTER_CONFIRM_PASSWORD" />
									</span>
								) : (
									""
								)}
								{invalid.confirmPasswordNotMatch ? (
									<span className="invalid_message">
										<I18 tkey="CONFIRM_PASSWORD_NOT_MATCH" />
									</span>
								) : (
									""
								)}
							</div>
						</div>
						<div className="text-center px-2 mt-3">
							<button className="primary_btn login_btn" disabled={loading} hidden={loading} onClick={resetClicked}>
								<I18 tkey="SUBMIT" />
							</button>
							<button className="primary_btn login_btn" hidden={!loading} disabled>
								<div className="button_spinner">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
