import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ErrorBoundary } from "../plugins/error-boundary";
import { Locations } from "../constants/locations";
import { Login } from "../containers/login";
import { ForgotPassword } from "../containers/forgot-password";
import { ResetPassword } from "../containers/reset-password";

export const webRouter = createBrowserRouter([
	{
		path: Locations.LOGIN,
		element: <Login />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: Locations.FORGOT_PASSWORD,
		element: <ForgotPassword />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: Locations.RESET_PASSWORD,
		element: <ResetPassword />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: "*",
		element: <Navigate to={Locations.BASE} />,
		errorElement: <ErrorBoundary />,
	},
]);