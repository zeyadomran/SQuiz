import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { useAuth } from "../utils/useIsAuth";
import withApollo from "../utils/withApollo";

const ForgotPassword: React.FC = () => {
	useAuth();
	return (
		<>
			<Head>
				<title>Forgot Password</title>
			</Head>
			<Flex h={"100vh"} direction="column" justify="space-between">
				<Header />
				<ForgotPasswordForm />
				<Footer />
			</Flex>
		</>
	);
};

export default withApollo({ ssr: false })(ForgotPassword);
