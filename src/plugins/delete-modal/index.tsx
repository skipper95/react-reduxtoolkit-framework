import { Modal } from "antd";
import { Config } from "../../config";
import { i18Get } from "../i18";

const { confirm } = Modal;

type DeleteModalParams = {
    id: number;
    content: string;
    delete(id: number): void;
};

export const deleteModal = (params: DeleteModalParams) => {
	confirm({
		title: i18Get("DELETE_MODAL_TITLE", Config.defaultLanguage),
		content: i18Get(params.content, Config.defaultLanguage),
		okText: i18Get("DELETE_BTN", Config.defaultLanguage),
		cancelText: i18Get("CANCEL_BTN", Config.defaultLanguage),
		okType: "danger",
		onOk() {
			params.delete(params.id);
		},
		onCancel() {
			console.log("cancel");
		}
	});
};