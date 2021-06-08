import { Box, Flex, HStack } from "@chakra-ui/layout";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import CTA from "./CTA";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Profile from "./Profile";

export const Header = () => {
	const { data, loading } = useMeQuery({
		skip: isServer(),
	});

	let body = null;
	if (loading) {
	} else if (!data?.me) {
		body = (
			<HStack spacing={[4, 6, 8, 10]}>
				<NavLink to="/login">Login</NavLink>
				<CTA to="/signup">Signup</CTA>
			</HStack>
		);
	} else {
		body = (
			<HStack spacing={[4, 6, 8, 10]}>
				<Profile
					username={data.me.username}
					isPrivate={data.me.private || false}
				/>
				<CTA to="/play">Play</CTA>
			</HStack>
		);
	}
	return (
		<Box as="header" h={"70px"} p={4} bg="purple.600">
			<Flex w={["95%", "90%", "85%", "80%"]} mx="auto" justify="space-between">
				<Flex as="nav" justify="flex-start" align="center">
					<Logo />
				</Flex>
				{body}
			</Flex>
		</Box>
	);
};
