import { Heading } from "@chakra-ui/react";
import React from "react";
import useSound from "use-sound";
interface TimerProps {
	gameOver: number;
	timeLeft: number;
	setTimeLeft: (newTime: number) => void;
	setGameOver: (state: number) => void;
}

const Timer: React.FC<TimerProps> = ({
	gameOver,
	timeLeft,
	setTimeLeft,
	setGameOver,
}) => {
	const [play, { stop }] = useSound("sounds/timeRunningOut.mp3", {
		volume: 0.25,
	});

	React.useEffect(() => {
		return () => {
			stop();
		};
	}, []);

	React.useEffect(() => {
		if (gameOver === 0) {
			setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
		}
		if (timeLeft === 10) {
			console.log(timeLeft);
			play();
		}
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
