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
import router from "next/router";
import React from "react";
import {
	MeDocument,
	MeQuery,
	useResetPasswordMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface FormProps {
	token: any;
}

const ResetPasswordForm: React.FC<FormProps> = ({ token }) => {
	const [resetPassword] = useResetPasswordMutation();
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
				Reset Password
			</Heading>
			<Formik
				initialValues={{ password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await resetPassword({
						variables: {
							token,
							password: values.password,
						},
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: "Query",
									me: data?.resetPassword.user,
								},
							});
						},
					});
					if (response.data?.resetPassword.errors) {
						setErrors(toErrorMap(response.data.resetPassword.errors));
					} else if (response.data?.resetPassword.user) {
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
						<Field name="password">
							{({ field, form }: any) => (
								<FormControl mb={5} isInvalid={!!form.errors.password}>
									<FormLabel htmlFor="password">Your New Password</FormLabel>
									<Input
										{...field}
										type="password"
										id="password"
										placeholder="Password"
									/>
									{form.errors.password &&
										form.errors.password.map((err: any, i: any) => (
											<FormErrorMessage key={i} fontWeight="bold">
												{err}
											</FormErrorMessage>
										))}
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

export default ResetPasswordForm;
