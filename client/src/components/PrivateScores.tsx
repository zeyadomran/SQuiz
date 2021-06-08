import {
	Box,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { formatDate } from "../utils/formatDate";
import { isServer } from "../utils/isServer";

const PrivateScores: React.FC = () => {
	const { data } = useMeQuery({
		skip: isServer(),
	});
	return (
		<Box
			w={{ base: "sm", md: "md" }}
			p={8}
			rounded={"lg"}
			h={{ base: "2xs", md: "md" }}
			overflowY="scroll"
			bg={"purple.700"}
		>
			<Heading as="h1" size="2xl" mb="10px" color="#0FD9D8">
				Your Scores
			</Heading>
			<Table size="sm" variant="simple">
				<Thead>
					<Tr>
						<Th fontFamily="Open Sans" fontSize="14px" color="#0FD9D8">
							Score
						</Th>
						<Th fontFamily="Open Sans" fontSize="14px" color="#0FD9D8">
							Date
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data?.me?.scores.map((score, i) => (
						<Tr key={i}>
							<Td>{score.score}</Td>
							<Td>{formatDate(score.createdAt)}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
};

export default PrivateScores;
