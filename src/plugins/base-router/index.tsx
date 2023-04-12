import React from "react";
import { Roles } from "../../constants";
import { Locations } from "../../constants/locations";
import { useAppSelector } from "../../modal/hooks";

type BaseRouterProps = {
    children: React.ReactElement
};

export const BaseRouter = (props: BaseRouterProps) => {
	const role = useAppSelector(store => store.user.user.role);

	if(window.location.pathname !== Locations.BASE) {
		return props.children;
	} else if(role) {
		window.location.href = (role === Roles.ADMIN) ? Locations.DASHBOARD : Locations.DASHBOARD;
		return null;
	} else {
		window.location.href = Locations.LOGIN;
		return null;
	}
};