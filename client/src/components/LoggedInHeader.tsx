import { Box, Flex, HStack } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";
import CTA from "./CTA";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

export const Header = () => {
	const router = useRouter();
	const { data, loading } = useMeQuery({
		skip: isServer(),
	});

	let body = null;
	if (loading) {
	} else if (!data?.me) {
	} else {
		body = (
			<Box as="header" h={"70px"} p={4} bg="purple.600">
				<Flex
					w={["95%", "90%", "85%", "80%"]}
					mx="auto"
					justify="space-between"
				>
					<Flex as="nav" justify="flex-start" align="center">
						<Logo />
					</Flex>
					<CTA to="/play">Play</CTA>
					<HStack spacing={[4, 6, 8, 10]}>
						<Profile username={data.me.username} />
						<CTA to="/play">Play</CTA>
					</HStack>
				</Flex>
			</Box>
		);
	}
	return body;
};
