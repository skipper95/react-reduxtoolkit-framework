import React from "react";
import { useRouteError } from "react-router-dom";

export const ErrorBoundary: React.FunctionComponent = () => {
	const error = useRouteError();

	return <div>Error {JSON.stringify(error)}</div>;
};
