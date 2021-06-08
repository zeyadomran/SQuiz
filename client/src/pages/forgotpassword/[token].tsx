import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import ResetPasswordForm from "../../components/ResetPasswordForm";
import { useAuth } from "../../utils/useIsAuth";
import withApollo from "../../utils/withApollo";

const ForgotPassword: React.FC = () => {
	const router = useRouter();
	const { token } = router.query;
	useAuth();

	return (
		<>
			<Head>
				<title>Reset Password</title>
			</Head>
			<Flex h={"100vh"} direction="column" justify="space-between">
				<Header />
				<ResetPasswordForm token={token} />
				<Footer />
			</Flex>
		</>
	);
};

export default withApollo({ ssr: false })(ForgotPassword);
