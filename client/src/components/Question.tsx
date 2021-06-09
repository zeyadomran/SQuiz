import { Alert, AlertIcon, Box, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Question } from "../generated/graphql";
import GameButton from "./GameButton";

interface GameButtonProps {
	question: Question;
	dispatch: () => void;
	wrong: () => void;
}

const QuestionBody: React.FC<GameButtonProps> = ({
	question,
	dispatch,
	wrong,
}) => {
	const [success, setSuccess] = React.useState(0);
	const [disabled, setDisabled] = React.useState(false);

	const onPress = (isCorrect: boolean) => {
		setDisabled(true);
		if (isCorrect) {
			setSuccess(2);
			setTimeout(() => dispatch(), 1000);
		} else {
			setSuccess(1);
			setTimeout(() => wrong(), 1000);
		}
	};

	React.useEffect(() => {
		setSuccess(0);
		setDisabled(false);
	}, [question]);

	return (
		<>
			{success === 2 && (
				<Alert
					status="success"
					bg={"green.500"}
					m={0}
					position="absolute"
					top="0"
					left="0"
				>
					<AlertIcon color="green.800" />
					Correct!
				</Alert>
			)}
			{success === 1 && (
				<Alert
					status="error"
					bg={"red.500"}
					m={0}
					position="absolute"
					left="0"
					top="0"
				>
					<AlertIcon color="red.700" />
					Wrong!
				</Alert>
			)}
			<Heading
				textAlign="center"
				as="h1"
				fontSize={["3xl", "4xl", "5xl", "6xl"]}
			>
				{question.title}
			</Heading>
			<Box px={[20, 40, 60]}>
				<SimpleGrid
					columns={{ base: 1, md: 2 }}
					columnGap={"80px"}
					rowGap={"20px"}
				>
					{question.answers.map((a, i) => (
						<GameButton
							key={i}
							onPress={() => onPress(a.isCorrect)}
							id={question.id}
							isCorrect={a.isCorrect}
							isDisabled={disabled}
						>
							{a.title}
						</GameButton>
					))}
				</SimpleGrid>
			</Box>
		</>
	);
};

export default QuestionBody;
