import { Button } from "@chakra-ui/button";
import NextLink from "next/link";
import React from "react";
interface CTAProps {
	children?: string;
	to: string;
}

const CTA: React.FC<CTAProps> = ({ children, to, ...rest }) => {
	return (
		<NextLink href={to}>
			<Button
				position="relative"
				display="block"
				size="md"
				textAlign="center"
				background="#0FD9D8"
				color="purple.900"
				fontSize="14px"
				textTransform="uppercase"
				fontWeight="500"
				p="15px 20px"
				outline="none"
				borderRadius={"5px"}
				_focus={{ border: "none" }}
				_hover={{
					_after: {
						borderColor: "#FEFEFE",
					},
					bg: "#FEFEFE",
				}}
				_after={{
					content: '""',
					position: "absolute",
					top: "4px",
					left: "4px",
					right: "-4px",
					bottom: "-4px",
					display: "block",
					border: " 1px solid #0FD9D8",
					borderRadius: "5px",
				}}
				_active={{
					top: "4px",
					left: "4px",
					_after: {
						right: 0,
						bottom: 0,
					},
				}}
			>
				{children}
			</Button>
		</NextLink>
	);
};

export default CTA;
