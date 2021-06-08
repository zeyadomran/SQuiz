import { Button, VisuallyHidden } from "@chakra-ui/react";
import React from "react";

interface SocialButtonProps {
	children: React.ReactNode;
	label: string;
	href: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
	children,
	label,
	href,
}) => {
	return (
		<Button
			bg={"purple.500"}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			as={"a"}
			target={"_blank"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: "purple.800",
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</Button>
	);
};

export default SocialButton;
