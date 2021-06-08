import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../utils/useIsAuth";
import withApollo from "../utils/withApollo";

const Login: React.FC = () => {
	useAuth();
	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<Flex h={"100vh"} direction="column" justify="space-between">
				<Header />
				<LoginForm />
				<Footer />
			</Flex>
		</>
	);
};

export default withApollo({ ssr: false })(Login);
