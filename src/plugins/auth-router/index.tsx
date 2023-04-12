import React from "react";
import { LocalStorageKeys } from "../../constants";
import { Locations } from "../../constants/locations";

type AuthRouterProps = {
    children: React.ReactElement
};

export const AuthRouter = (props: AuthRouterProps) => {
	const token = localStorage.getItem(LocalStorageKeys.TOKEN);
	if(token && ([Locations.LOGIN, Locations.FORGOT_PASSWORD].includes(window.location.pathname as Locations) || window.location.pathname.startsWith(Locations.RESET_PASSWORD_URL))) {
		window.location.href = Locations.BASE;
		return null;
	} else if((token && !["null", "undefined"].includes(token ?? ""))) {
		return props.children;
	} else if(!token && ([Locations.LOGIN, Locations.FORGOT_PASSWORD].includes(window.location.pathname as Locations) || window.location.pathname.startsWith(Locations.RESET_PASSWORD_URL))) {
		return props.children;
	} else {
		localStorage.removeItem(LocalStorageKeys.TOKEN);
		window.location.href = Locations.LOGIN;
		return null;
	}
};