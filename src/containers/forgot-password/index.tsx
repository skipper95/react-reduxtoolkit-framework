import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Config } from "../../config";
import { APIStatus } from "../../constants";
import { Locations } from "../../constants/locations";
import { useAppDispatch, useAppSelector } from "../../modal/hooks";
import I18, { i18Get } from "../../plugins/i18";
import { forgotPassword } from "../../services/user/user.service";
import { clearForgotPassword } from "../../services/user/user.slice";

type InvalidProps = {
	email: boolean;
};

export const ForgotPassword: React.FunctionComponent = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const [invalid, setInvalid] = useState<InvalidProps>({ email: false });
	const [loading, setLoading] = useState<boolean>(false);
	const user = useAppSelector((store) => store.user);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user.forgotPasswordComplete === APIStatus.FULFILLED) {
			setLoading(false);
			navigate(Locations.LOGIN);
			dispatch(clearForgotPassword());
		}
		if (user.forgotPasswordComplete === APIStatus.REJECTED) {
			setLoading(false);
			dispatch(clearForgotPassword());
		}
	}, [user.forgotPasswordComplete]);

	const validate = (): boolean => {
		const prevState: InvalidProps = JSON.parse(JSON.stringify(invalid));
		if (!emailRef.current?.value || !emailRef.current?.value.trim()) {
			prevState.email = true;
		}
		setInvalid(prevState);
		return !prevState.email;
	};

	const forgotPasswordClicked = () => {
		if (validate()) {
			setLoading(true);
			dispatch(forgotPassword({ email: emailRef.current?.value ?? "" }));
		}
	};

	return (
		<div className="login_container">
			<div className="login_card">
				<div className="w-100">
					<div className="login_heading">
						<I18 tkey="LOGIN_HEADER" />
					</div>
					<div className="login_head_dec mb-3">
						<I18 tkey="FORGOT_SUBHEADER" />
					</div>
					<div className="login_input_container mb-2">
						<div className="login_input_label">
							<I18 tkey="EMAIL_INPUT" />
						</div>
						<div className="position-relative">
							<input
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
					<div className="d-flex align-items-center justify-content-between mt-2 mb-3 px-2">
						<div className="login_remember_me pr-2"></div>
						<div className="forgot_password_label" onClick={() => navigate(Locations.LOGIN)}>
							<I18 tkey="BACK_TO_LOGIN" />
						</div>
					</div>
					<div className="text-center px-2">
						<button
							className="primary_btn login_btn"
							disabled={loading}
							hidden={loading}
							onClick={forgotPasswordClicked}
						>
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
		</div>
	);
};
