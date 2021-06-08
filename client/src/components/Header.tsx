import { Box, Flex, HStack } from "@chakra-ui/layout";
import React from "react";
import Logo from "./Logo";
import CTA from "./CTA";
import NavLink from "./NavLink";

export const Header = () => {
	return (
		<Box as="header" h={"70px"} p={4} bg="purple.600">
			<Flex w={["95%", "90%", "85%", "80%"]} mx="auto" justify="space-between">
				<Flex as="nav" justify="flex-start" align="center">
					<Logo />
				</Flex>
				<HStack spacing={[4, 6, 8, 10]}>
					<NavLink to="/login">Login</NavLink>
					<CTA to="/signup">Signup</CTA>
				</HStack>
			</Flex>
		</Box>
	);
};
