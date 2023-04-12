import React, { useEffect } from "react";
import { APIStatus, LocalStorageKeys, Roles } from "../../constants";
import { Locations } from "../../constants/locations";
import { useAppSelector } from "../../modal/hooks";

type BaseRouterProps = {
	children: React.ReactElement;
	role: string[];
};

export const RoleGuard = (props: BaseRouterProps) => {
	const user = useAppSelector((store) => store.user);

	useEffect(() => {
		if (user.getCurrentUserComplete === APIStatus.REJECTED) {
			localStorage.removeItem(LocalStorageKeys.TOKEN);
			window.location.href = Locations.LOGIN;
		}
	}, [user.getCurrentUserComplete]);

	if (
		[Locations.LOGIN, Locations.FORGOT_PASSWORD, Locations.RESET_PASSWORD].includes(
			window.location.pathname as Locations
		)
	) {
		return props.children;
	} else if (user.user && user.user.role && !props.role.includes(user.user.role)) {
		window.location.href = user.user.role === Roles.ADMIN ? Locations.DASHBOARD : Locations.DASHBOARD;
		return null;
	} else if (!user.user || !user.user.role) {
		return (
			<div className="w-100 d-flex align-items-center justify-content-center h-100">
				<div className="button_spinner">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		);
	} else {
		return props.children;
	}
};
