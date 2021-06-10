import { Heading } from "@chakra-ui/react";
import React from "react";

interface TimerProps {
	timeLeft: number;
	setTimeLeft: (newTime: number) => void;
	setGameOver: (state: number) => void;
}

const Timer: React.FC<TimerProps> = ({
	timeLeft,
	setTimeLeft,
	setGameOver,
}) => {
	React.useEffect(() => {
		setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
		if (timeLeft === 0) {
			setGameOver(1);
		}
	}, [timeLeft]);

	return (
		<Heading as="h6" color={timeLeft < 30 ? "red.500" : ""}>
			Time Left: {timeLeft}
		</Heading>
	);
};

export default Timer;
