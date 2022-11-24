import { createContext } from "react";

const GlobalContext = createContext({
	breakpoint: () => {},
	isLoading: "",
	setIsLoading: () => {},
	isAuthenticated: "",
	setIsAuthenticated: () => {},
	axiosInstance: undefined,
});

export default GlobalContext;
