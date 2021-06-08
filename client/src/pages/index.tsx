import React from "react";
import { Header } from "../components/Header";
import Hero from "../components/Hero";
import { useAuth } from "../utils/useIsAuth";
import withApollo from "../utils/withApollo";

const Index: React.FC = () => {
	useAuth();
	return (
		<div style={{ height: "100vh" }}>
			<Header />
			<Hero />
		</div>
	);
};

export default withApollo({ ssr: false })(Index);
