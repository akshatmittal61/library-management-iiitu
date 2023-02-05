import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import GlobalContext from "../../context/GlobalContext";
import { bg1, bg2, bg3, bg4, bg5 } from "../../images";
import { random } from "../../utils";
import "./home.scss";

const Home = () => {
	const { isAuthenticated } = useContext(GlobalContext);
	const [backImg, setBackImg] = useState(bg1);
	useEffect(() => {
		const backgrounds = [bg1, bg2, bg3, bg4, bg5];
		setInterval(() => {
			setBackImg(backgrounds[random(0, backgrounds.length - 1)]);
		}, 2500);
	}, []);

	return (
		<main className="home">
			<section
				className="home-hero"
				style={{
					backgroundImage: `url(${backImg})`,
				}}
			>
				<h1>Kitaab</h1>
				<span>Library Management System, IIIT Una</span>
				<div className="home-hero-btns">
					<Button
						text="Read More"
						link="/about"
						variant="outlined"
						size="large"
						icon="arrow_forward"
					/>
					{isAuthenticated ? (
						<Button
							text="Dashboard"
							link="/dashboard"
							size="large"
						/>
					) : (
						<Button text="Login" link="/login" size="large" />
					)}
				</div>
			</section>
		</main>
	);
};

export default Home;
