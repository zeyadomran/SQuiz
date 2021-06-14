import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const SignupForm: React.FC = () => {
	const router = useRouter();
	const [signup] = useRegisterMutation();

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
				Signup
			</Heading>
			<Formik
				initialValues={{ email: "", username: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await signup({
						variables: {
							data: values,
						},
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: "Query",
									me: data?.register.user,
								},
							});
						},
					});
					if (response.data?.register.errors) {
						setErrors(toErrorMap(response.data.register.errors));
					} else if (response.data?.register.user) {
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
						<Field name="email">
							{({ field, form }: any) => (
								<FormControl mb={5} isInvalid={!!form.errors.email}>
									<FormLabel htmlFor="email">Your email</FormLabel>
									<Input
										{...field}
										type="email"
										id="email"
										placeholder="Email"
									/>
									<FormErrorMessage fontWeight="bold">
										{form.errors.email}
									</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="username">
							{({ field, form }: any) => (
								<FormControl mb={5} isInvalid={!!form.errors.username}>
									<FormLabel htmlFor="username">Your username</FormLabel>
									<Input {...field} id="username" placeholder="Username" />
									<FormErrorMessage fontWeight="bold">
										{form.errors.username}
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
										placeholder="password"
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
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default SignupForm;
