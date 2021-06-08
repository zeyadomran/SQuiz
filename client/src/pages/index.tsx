import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import Hero from "../components/Hero";
import { useAuth } from "../utils/useIsAuth";
import withApollo from "../utils/withApollo";

const Index: React.FC = () => {
	useAuth();
	return (
		<>
			<Head>
				<title>SQuiz</title>
			</Head>
			<Flex h={"100vh"} direction="column" justify="space-between">
				<Header />
				<Hero />
				<Footer />
			</Flex>
		</>
	);
};

export default withApollo({ ssr: false })(Index);
