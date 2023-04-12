import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Config } from "../../config";
import { APIStatus, LocalStorageKeys } from "../../constants";
import { Locations } from "../../constants/locations";
import { useAppDispatch, useAppSelector } from "../../modal/hooks";
import I18, { i18Get } from "../../plugins/i18";
import { login } from "../../services/user/user.service";
import { clearCurrentUser, clearLogin } from "../../services/user/user.slice";
import "./login.scss";

type InvalidProps = {
	email: boolean;
	password: boolean;
};

export const Login: React.FunctionComponent = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const rememberMeRef = useRef<HTMLInputElement>(null);
	const [invalid, setInvalid] = useState<InvalidProps>({ email: false, password: false });
	const [loading, setLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const user = useAppSelector((store) => store.user);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(clearCurrentUser());
	}, []);

	useEffect(() => {
		if (user.loginComplete === APIStatus.FULFILLED) {
			setLoading(false);
			if (user.user.token) {
				localStorage.setItem(LocalStorageKeys.TOKEN, user.user.token);
				navigate(Locations.DASHBOARD);
			}
			dispatch(clearLogin());
		}
		if (user.loginComplete === APIStatus.REJECTED) {
			setLoading(false);
			dispatch(clearLogin());
		}
	}, [user.loginComplete]);

	const onKeyPress = (e: React.KeyboardEvent) => {
		if(e.key === "Enter") {
			loginClicked();
		}
	};

	const validate = (): boolean => {
		const prevState: InvalidProps = JSON.parse(JSON.stringify(invalid));
		if (!emailRef.current?.value || !emailRef.current?.value.trim()) {
			prevState.email = true;
		}
		if (!passwordRef.current?.value || !passwordRef.current?.value.trim()) {
			prevState.password = true;
		}
		setInvalid(prevState);
		return !(prevState.email || prevState.password);
	};

	const loginClicked = () => {
		if(validate()) {
			setLoading(true);
			dispatch(
				login({
					email: emailRef.current?.value ?? "",
					password: passwordRef.current?.value ?? "",
					rememberMe: rememberMeRef.current?.checked ?? false,
				})
			);
		}
	};

	return (
		<div className="login_container" onKeyDown={onKeyPress}>
			<div className="login_card">
				<div className="w-100">
					<div className="login_heading font_weight_black">
						<I18 tkey="LOGIN_HEADER" />
					</div>
					<div className="login_head_dec mb-3">
						<I18 tkey="LOGIN_SUBHEADER" />
					</div>
					<div className="login_input_container mb-2">
						<div className="login_input_label">
							<I18 tkey="EMAIL_INPUT" />
						</div>
						<div className="position-relative">
							<input
								id="email"
								ref={emailRef}
								type="text"
								maxLength={100}
								placeholder={i18Get("EMAIL_INPUT_PLACEHOLDER", Config.defaultLanguage)}
								onChange={() => setInvalid((prevState) => ({ ...prevState, email: false }))}
							/>
							{invalid.email ? (
								<span className="invalid_message">
									<I18 tkey="ENTER_EMAIL" />
								</span>
							) : (
								""
							)}
						</div>
					</div>
					<div className="login_input_container">
						<div className="login_input_label">
							<I18 tkey="LOGIN_PASSWORD_INPUT" />
						</div>
						<div className="position-relative password_eye_container">
							<input
								id="password"
								ref={passwordRef}
								placeholder={i18Get("PASSWORD_INPUT_PLACEHOLDER", Config.defaultLanguage)}
								type={showPassword ? "text" : "password"}
								maxLength={100}
								onChange={() => setInvalid((prevState) => ({ ...prevState, password: false }))}
							/>
							{showPassword ? (
								<a key="fa-eye-slash" className="password_eye" onClick={() => setShowPassword(false)}>
									<i className="fas fa-eye-slash"></i>
								</a>
							) : (
								<a key="fa-eye" className="password_eye" onClick={() => setShowPassword(true)}>
									<i className="fas fa-eye"></i>
								</a>
							)}
							{invalid.password ? (
								<span className="invalid_message">
									<I18 tkey="ENTER_PASSWORD" />
								</span>
							) : (
								""
							)}
						</div>
					</div>
					<div className="d-flex align-items-center justify-content-between mt-2 mb-3 px-2">
						<div className="login_remember_me pr-2">
							<input type="checkbox" ref={rememberMeRef} className="mr-2" />
							<span>
								<I18 tkey="REMEMBER_ME" />
							</span>
						</div>
						<div className="forgot_password_label" onClick={() => navigate(Locations.FORGOT_PASSWORD)}>
							<I18 tkey="FORGOT_PASSWORD" />
						</div>
					</div>
					<div className="text-center px-2">
						<button className="primary_btn login_btn" disabled={loading} hidden={loading} onClick={loginClicked}>
							<I18 tkey="LOGIN_BTN" />
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
		</div>
	);
};
