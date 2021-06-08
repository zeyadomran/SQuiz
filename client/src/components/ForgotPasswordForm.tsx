import {
	Alert,
	AlertIcon,
	Box,
	Button,
	CloseButton,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useForgotPasswordMutation } from "../generated/graphql";

const LoginForm: React.FC = () => {
	const [forgotPassword] = useForgotPasswordMutation();
	const [success, setSuccess] = React.useState(false);

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
				Forgot Password
			</Heading>
			{success && (
				<Alert status="success" bg={"green.500"} mb={5}>
					<AlertIcon color="green.800" />
					An email was sent to you!
					<CloseButton
						position="absolute"
						right="8px"
						top="8px"
						onClick={() => setSuccess(false)}
					/>
				</Alert>
			)}
			<Formik
				initialValues={{ email: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await forgotPassword({
						variables: values,
					});
					if (response.data?.forgotPassword) {
						setSuccess(true);
					}
				}}
			>
				{(props) => (
					<Form>
						<Field name="email">
							{({ field, form }: any) => (
								<FormControl mb={5} isInvalid={!!form.errors.email}>
									<FormLabel htmlFor="email">Your Email</FormLabel>
									<Input {...field} id="email" placeholder="email" />
									<FormErrorMessage fontWeight="bold">
										{form.errors.email}
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

export default LoginForm;
