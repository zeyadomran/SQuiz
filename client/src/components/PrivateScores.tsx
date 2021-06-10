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
			w={["xs", "sm", "md"]}
			p={8}
			rounded={"lg"}
			h={["2xs", "xs", "md"]}
			overflowY="scroll"
			bg={"purple.700"}
		>
			<Heading as="h1" size="2xl" mb="10px" color="#0FD9D8">
				Your Scores
			</Heading>
			<Table size="sm" variant="simple">
				<Thead>
					<Tr>
						<Th fontFamily="Open Sans" fontSize="12px" color="#0FD9D8">
							Score
						</Th>
						<Th fontFamily="Open Sans" fontSize="12px" color="#0FD9D8">
							Date
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data?.me?.scores?.map((_, i, arr) => (
						<Tr key={i}>
							<Td fontFamily="Open Sans" fontSize="12px">
								{arr[arr.length - i - 1].score}
							</Td>
							<Td fontFamily="Open Sans" fontSize="12px">
								{formatDate(arr[arr.length - i - 1].createdAt)}
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
};

export default PrivateScores;
