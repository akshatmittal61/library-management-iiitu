import React, { useContext } from "react";
import Button from "../../components/Button/Button";
import GlobalContext from "../../context/GlobalContext";
import "./home.scss";

const Home = () => {
	const { isLoading, setIsLoading } = useContext(GlobalContext);
	return (
		<main className="home">
			<Button
				text={isLoading ? "Loading..." : "Click me"}
				onClick={() => setIsLoading(!isLoading)}
			/>
		</main>
	);
};

export default Home;
