import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import reportWebVitals from "./reportWebVitals";
import "./style.scss";
import "./assets/color.scss";
import "./assets/font.scss";
import "antd/dist/antd.min.css";
import { setupInterceptors } from "./middleware/network";
import { Router } from "./router";

setupInterceptors();

let container = document.getElementById("root");
if(!container) {
	container = document.createElement("div");
	container.id = "root";
	document.body.appendChild(container);
}
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<Router />
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
