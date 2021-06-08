import { Box, Container, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import Logo from "./Logo";
import SocialButton from "./SocialButton";

export const Footer: React.FC = () => {
	return (
		<Box as="footer" bg={"purple.700"} flexShrink={0}>
			<Container
				as={Stack}
				maxW={"7xl"}
				py={4}
				direction={{ base: "column", md: "row" }}
				spacing={4}
				justify={{ base: "center", md: "space-between" }}
				align={{ base: "center", md: "center" }}
			>
				<Logo />
				<Text>Made by Zeyad Omran & Mahmoud Abdelaty</Text>
				<SocialButton
					label={"Github"}
					href={"https://github.com/zeyadomran/SQuiz"}
				>
					<Icon as={FaGithub} />
				</SocialButton>
			</Container>
		</Box>
	);
};
