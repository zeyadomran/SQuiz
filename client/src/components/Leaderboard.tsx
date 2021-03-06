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
import { useLeaderboardQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const Leaderboard: React.FC = () => {
	const { data } = useLeaderboardQuery({
		skip: isServer(),
	});
	return (
		<Box
			w={["xs", "sm", "md"]}
			h={["2xs", "xs", "md"]}
			overflowY="scroll"
			overflowX="hidden"
			p={8}
			rounded={"lg"}
			bg={"purple.700"}
		>
			<Heading as="h1" size="2xl" mb="10px" color="#0FD9D8">
				Top 25 Scores
			</Heading>
			<Table size="sm" variant="simple">
				<Thead>
					<Tr>
						<Th fontFamily="Open Sans" fontSize="12px" color="#0FD9D8">
							#
						</Th>
						<Th fontFamily="Open Sans" fontSize="12px" color="#0FD9D8">
							username
						</Th>
						<Th fontFamily="Open Sans" fontSize="12px" color="#0FD9D8">
							Score
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data?.leaderBoard?.map((score, i) => (
						<Tr key={score.id}>
							<Td fontFamily="Open Sans" fontSize="12px">
								{i + 1}
							</Td>
							<Td fontFamily="Open Sans" fontSize="12px">
								{score.username}
							</Td>
							<Td fontFamily="Open Sans" fontSize="12px">
								{score.score}
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
};

export default Leaderboard;
