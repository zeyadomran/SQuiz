import { Flex, Stack } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import Leaderboard from "../components/Leaderboard";
import PrivateScores from "../components/PrivateScores";
import { useIsAuth } from "../utils/useIsAuth";
import withApollo from "../utils/withApollo";

const Dashboard: React.FC = () => {
	useIsAuth();
	return (
		<>
			<Head>
				<title>Dashboard</title>
			</Head>
			<Flex h={"100vh"} direction="column" justify="space-between">
				<Header />
				<Stack mx="auto" spacing={5} direction={{ base: "column", md: "row" }}>
					<PrivateScores />
					<Leaderboard />
				</Stack>
				<Footer />
			</Flex>
		</>
	);
};

export default withApollo({ ssr: false })(Dashboard);
