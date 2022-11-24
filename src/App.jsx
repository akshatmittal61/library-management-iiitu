import React from "react";
import { Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.scss";
import { useContextData } from "./context/useContext";
import GlobalContext from "./context/GlobalContext";
import routes from "./routes";

const Wrapper = () => {
	AOS.init();
	return (
		<>
			<Routes>
				{routes.map((route, index) => {
					return (
						<Route
							key={index}
							path={route.path}
							element={route.component}
						/>
					);
				})}
			</Routes>
		</>
	);
};

const App = () => {
	const context = useContextData();
	return (
		<GlobalContext.Provider value={context}>
			<Wrapper />
		</GlobalContext.Provider>
	);
};

export default App;
