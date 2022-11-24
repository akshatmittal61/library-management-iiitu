import axios from "axios";
import { useState } from "react";

export const useContextData = () => {
	// Loading State
	const [isLoading, setIsLoading] = useState(false);

	// Global Authentication State
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Axios Instance Configurations
	const axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_BACKEND_URL,
		headers: {
			"x-auth-token": localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
	});

	// Media Breakpoints
	const mediaQuerySm = window.matchMedia("(max-width: 672px)");
	const mediaQueryMd = window.matchMedia("(max-width: 880px)");
	const mediaQueryLg = window.matchMedia("(min-width: 880px)");
	const breakpoint = (device) => {
		if (device === "mobile") return mediaQuerySm.matches;
		else if (device === "tab") return mediaQueryMd.matches;
		else return mediaQueryLg.matches;
	};
	mediaQuerySm.addListener(breakpoint);
	mediaQueryMd.addListener(breakpoint);
	mediaQueryLg.addListener(breakpoint);

	return {
		breakpoint,
		isLoading,
		setIsLoading,
        isAuthenticated,
        setIsAuthenticated,
		axiosInstance,
	};
};
