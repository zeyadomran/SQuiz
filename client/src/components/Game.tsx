import { Box, Button, Heading, Icon, Stack } from "@chakra-ui/react";
import React from "react";
import { Question } from "../generated/graphql";
import { useGameState } from "../utils/useGameState";
import Squiz from "../resources/squiz-logo.svg";
import QuestionBody from "./Question";
import GameWon from "./GameWon";
import GameLost from "./GameLost";
import Link from "next/link";

const Game: React.FC<any> = ({ questions }: { questions: Question[] }) => {
	const [state, dispatch] = useGameState(questions);
	const [gameOver, setGameOver] = React.useState(0);
	const [question, setQuestion] = React.useState(state.questions[state.count]);

	React.useEffect(() => {
		if (state.count === 10) {
			setGameOver(2);
		}
	}, [question]);

	return (
		<>
			<Box h="100vh" w="100vw" overflowY="scroll" border="10px solid #0FD9D8">
				{gameOver === 2 && <GameWon score={6 * state.hints * state.score} />}
				{gameOver === 1 && <GameLost score={state.score} />}
				<Icon
					mx="auto"
					w={["200px", "220px", "240px", "250px"]}
					h={["140px", "160px", "180px", "200px"]}
					as={Squiz}
				/>
				<Stack spacing={[4, 6, 8, 10]} align="center">
					<QuestionBody
						dispatch={() => {
							dispatch({ type: "nextQuestion" });
							setQuestion(state.questions[state.count]);
						}}
						wrong={() => setGameOver(1)}
						question={question}
					/>
					<Link href="/dashboard">
						<Button
							p={4}
							bg={"purple.800"}
							size={"lg"}
							color="white"
							_active={{ border: "none" }}
							_focus={{ border: "none" }}
							_hover={{ bg: "purple.900" }}
						>
							Quit Game
						</Button>
					</Link>
					<Heading as="h3">Score: {state.score}</Heading>
					<Heading as="h3">
						Question {state.count + 1}/{questions.length}
					</Heading>
				</Stack>
			</Box>
		</>
	);
};

export default Game;
