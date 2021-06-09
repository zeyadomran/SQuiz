import { Button } from "@chakra-ui/button";
import React from "react";

interface GameButtonProps {
	isCorrect: boolean;
	isDisabled: boolean;
	id: string;
	onPress: () => void;
}

const GameButton: React.FC<GameButtonProps> = ({
	children,
	isCorrect,
	id,
	onPress,
	isDisabled,
}) => {
	const [color, setColor] = React.useState("#0FD9D8");

	React.useEffect(() => {
		setColor("#0FD9D8");
	}, [id]);

	return (
		<Button
			isDisabled={isDisabled}
			textAlign="center"
			size={"lg"}
			background={color}
			color="purple.900"
			fontSize="20px"
			textTransform="uppercase"
			fontWeight="black"
			px={5}
			py={2}
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
				border: `1px solid ${color}`,
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
			onClick={() => {
				if (isCorrect) {
					setColor("green.300");
				} else {
					setColor("red.300");
				}
				onPress();
			}}
		>
			{children}
		</Button>
	);
};

export default GameButton;
