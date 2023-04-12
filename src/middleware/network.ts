import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { showError, showSuccess } from "../utils/util.fns";
import { LocalStorageKeys } from "../constants";
import { Locations } from "../constants/locations";

export const setupInterceptors = () => {
	axios.interceptors.request.use(
		function (config: InternalAxiosRequestConfig) {
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);
	axios.interceptors.response.use(
		(response) => {
			return handleResponse(response);
		},
		(error) => {
			return handleResponse(error.response);
		}
	);
};

const handleResponse = (response: AxiosResponse<any, any>) => {
	if (!response || !response.status) {
		showError("SOMETHING_WENT_WRONG");
		return Promise.reject(response);
	}
	if (response && response.status && [403, 401].includes(response.status)) {
		localStorage.removeItem(LocalStorageKeys.TOKEN);
		showError(response.data && response.data.message ? response.data.message : "SOMETHING_WENT_WRONG");
		window.location.href = Locations.LOGIN;
		return Promise.reject(response);
	}
	if (
		response &&
		response.data &&
		response.status === 200 &&
		!response.data.status &&
		response.data.messageCode === 400
	) {
		showError(response.data.message ? response.data.message : "SOMETHING_WENT_WRONG");
		return Promise.reject(response);
	}
	if (response && response.data && (!response.data.status || !response.data.messageCode)) {
		showError(response.data.message ? response.data.message : "SOMETHING_WENT_WRONG");
		return Promise.reject(response);
	}
	if (response && response.status && [400, 404].includes(response.status)) {
		showError(response.data && response.data.message ? response.data.message : "SOMETHING_WENT_WRONG");
		return Promise.reject(response);
	}
	if (response && !response.status) {
		showError("SOMETHING_WENT_WRONG");
		return Promise.reject(response);
	}
	if (
		response &&
		response.data &&
		response.data.status &&
		response.data.messageCode === 1 &&
		response.config.method !== "get" &&
		!response.config.url?.includes("/signin")
	) {
		showSuccess(response.data.message);
	}
	return response;
};
