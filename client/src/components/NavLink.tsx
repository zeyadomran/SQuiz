import { Button } from "@chakra-ui/button";
import NextLink from "next/link";
import React from "react";
interface NavLinkProps {
	children?: string;
	to: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, to, ...rest }) => {
	return (
		<NextLink href={to}>
			<Button
				bg="transparent"
				textTransform="uppercase"
				_active={{ border: "none" }}
				_focus={{ border: "none" }}
				_hover={{ bg: "transparent", color: "#0FD9D8" }}
				color="white"
			>
				{children}
			</Button>
		</NextLink>
	);
};

export default NavLink;
