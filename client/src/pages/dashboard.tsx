import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useIsAuth } from "../utils/useIsAuth";
import withApollo from "../utils/withApollo";

const Index: React.FC = () => {
	useIsAuth();
	return (
		<>
			<Head>
				<title>Dashboard</title>
			</Head>
			<Flex h={"100vh"} direction="column" justify="space-between">
				<Header />
				<Footer />
			</Flex>
		</>
	);
};

export default withApollo({ ssr: false })(Index);
