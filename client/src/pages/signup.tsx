import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import SignupForm from "../components/SignupForm";
import { useAuth } from "../utils/useIsAuth";
import withApollo from "../utils/withApollo";

const Signup: React.FC = () => {
	useAuth();
	return (
		<>
			<Head>
				<title>Signup</title>
			</Head>
			<Flex h={"100vh"} direction="column" justify="space-between">
				<Header />
				<SignupForm />
				<Footer />
			</Flex>
		</>
	);
};

export default withApollo({ ssr: false })(Signup);
