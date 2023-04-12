import React from "react";
import { RouterProvider } from "react-router-dom";
import { webRouter } from "../locations";
import { AuthRouter } from "../plugins/auth-router";

export const Router: React.FunctionComponent = () => {
	return (
		<AuthRouter>
			<div className="h-100 is_web">
				<RouterProvider router={webRouter} />
			</div>
		</AuthRouter>
	);
};
