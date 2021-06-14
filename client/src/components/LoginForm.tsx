import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const LoginForm: React.FC = () => {
	const router = useRouter();
	const [login] = useLoginMutation();

	return (
		<Box
			w={{ base: "xs", md: "md" }}
			p={8}
			mx="auto"
			rounded={"lg"}
			bg={"purple.700"}
			textAlign="center"
		>
			<Heading as="h1" size="3xl" mb="10px" color="#0FD9D8">
				Login
			</Heading>
			<Formik
				initialValues={{ usernameOrEmail: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await login({
						variables: {
							data: values,
						},
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: "Query",
									me: data?.login.user,
								},
							});
						},
					});
					if (response.data?.login.errors) {
						setErrors(toErrorMap(response.data.login.errors));
					} else if (response.data?.login.user) {
						if (typeof router.query.next === "string") {
							router.push(router.query.next);
						} else {
							router.push("/dashboard");
						}
					}
				}}
			>
				{(props) => (
					<Form>
						<Field name="usernameOrEmail">
							{({ field, form }: any) => (
								<FormControl mb={5} isInvalid={!!form.errors.usernameOrEmail}>
									<FormLabel htmlFor="usernameOrEmail">
										Your username or email
									</FormLabel>
									<Input
										{...field}
										id="usernameOrEmail"
										placeholder="Username or Email"
									/>
									<FormErrorMessage fontWeight="bold">
										{form.errors.usernameOrEmail}
									</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="password">
							{({ field, form }: any) => (
								<FormControl mb={5} isInvalid={!!form.errors.password}>
									<FormLabel htmlFor="password">Password</FormLabel>
									<Input
										{...field}
										type="password"
										id="password"
										placeholder="Password"
									/>
									<FormErrorMessage fontWeight="bold">
										{form.errors.password}
									</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Button
							bg={"#0FD9D8"}
							color="#1e1e1e"
							px={6}
							fontSize="14px"
							fontWeight="500"
							_hover={{
								bg: "#fefefe",
							}}
							isDisabled={props.isSubmitting}
							isLoading={props.isSubmitting}
							type="submit"
						>
							Submit
						</Button>
						<Link href="/forgotpassword">
							<Text
								color="purple.300"
								mt="5px"
								size="xs"
								cursor="pointer"
								_hover={{ color: "purple.500" }}
							>
								Forgot Password?
							</Text>
						</Link>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default LoginForm;
