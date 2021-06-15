import { Center, Flex, Icon, Spinner, Stack } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import Squiz from "../resources/squiz-logo.svg";
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
				<Stack p={4} h={"100vh"} w="100vw" textAlign="center">
					<Icon
						mx="auto"
						w={["200px", "220px", "240px", "250px"]}
						h={["100px", "120px", "140px", "160px"]}
						as={Squiz}
					/>
					<Game questions={data.questions} />
				</Stack>
			)}
		</>
	);
};

export default withApollo({ ssr: false })(Play);
