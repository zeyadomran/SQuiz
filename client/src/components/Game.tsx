import { Box, Button, Heading, Icon, Stack } from "@chakra-ui/react";
import React from "react";
import { Question } from "../generated/graphql";
import { useGameState } from "../utils/useGameState";
import Squiz from "../resources/squiz-logo.svg";
import QuestionBody from "./Question";
import GameWon from "./GameWon";
import GameLost from "./GameLost";
import Link from "next/link";
import Timer from "./Timer";

const Game: React.FC<any> = ({ questions }: { questions: Question[] }) => {
	const [state, dispatch] = useGameState(questions);
	const [timeLeft, setTimeLeft] = React.useState(300);
	const [gameOver, setGameOver] = React.useState(0);
	const [question, setQuestion] = React.useState(state.questions[state.count]);

	return (
		<>
			<Box h="100vh" w="100vw" overflowY="scroll" border="10px solid #0FD9D8">
				{gameOver === 2 && <GameWon score={6 * state.hints * state.score} />}
				{gameOver === 1 && <GameLost score={state.score} />}
				{gameOver === 0 && (
					<>
						<Icon
							mx="auto"
							w={["200px", "220px", "240px", "250px"]}
							h={["100px", "120px", "140px", "160px"]}
							as={Squiz}
						/>
						<Stack spacing={[2, 4, 6, 8]} align="center">
							<Timer
								timeLeft={timeLeft}
								setTimeLeft={setTimeLeft}
								setGameOver={setGameOver}
							/>
							<QuestionBody
								dispatch={() => {
									if (state.count === 9) {
										setGameOver(2);
									}
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
							<Heading as="h4">Score: {state.score}</Heading>
							<Heading as="h4">
								Question {state.count + 1}/{questions.length}
							</Heading>
						</Stack>
					</>
				)}
			</Box>
		</>
	);
};

export default Game;
