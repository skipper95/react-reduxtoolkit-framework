import { Modal } from "antd";
import { Config } from "../../config";
import { i18Get } from "../i18";

const { confirm } = Modal;

type LogoutModalParams = {
    logout(): void;
};

export const logoutModal = (params: LogoutModalParams) => {
	confirm({
		title: i18Get("LOGOUT_MODAL_TITLE", Config.defaultLanguage),
		content: i18Get("LOGOUT_MODAL_CONTENT", Config.defaultLanguage),
		okText: i18Get("LOGOUT_BTN", Config.defaultLanguage),
		cancelText: i18Get("CANCEL_BTN", Config.defaultLanguage),
		okType: "danger",
		onOk() {
			params.logout();
		},
		onCancel() {
			console.log("cancel");
		}
	});
};