import { Box, Flex, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import Game from "../components/Game";
import { Header } from "../components/Header";
import { useQuestionsQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useIsAuth } from "../utils/useIsAuth";
import withApollo from "../utils/withApollo";

const Play: React.FC = () => {
	const { data } = useQuestionsQuery({
		skip: isServer(),
		notifyOnNetworkStatusChange: true,
	});
	useIsAuth();

	return (
		<>
			<Head>
				<title>Play</title>
			</Head>
			{!data || !data.questions ? (
				<Flex h={"100vh"} direction="column" justify="space-between">
					<Header />
					<Spinner
						mx="auto"
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="purple.400"
						size="xl"
					/>
					<Footer />
				</Flex>
			) : (
				<Box h={"100vh"} textAlign="center">
					<Game questions={data.questions} />
				</Box>
			)}
		</>
	);
};

export default withApollo({ ssr: false })(Play);
