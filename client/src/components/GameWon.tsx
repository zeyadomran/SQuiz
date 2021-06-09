import {
	Button,
	Heading,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface Props {
	score: number;
}

const GameWon: React.FC<Props> = ({ score }) => {
	const { onClose } = useDisclosure();
	const router = useRouter();

	return (
		<Modal
			isOpen={true}
			size="sm"
			motionPreset="slideInBottom"
			onClose={onClose}
			isCentered
		>
			<ModalOverlay />
			<ModalContent bg="purple.700">
				<ModalHeader textAlign="center" as={Heading} color="#0FD9D8">
					You Won!
				</ModalHeader>
				<ModalBody>
					<Heading as="h4" color="#0FD9D8">
						Score: {score}
					</Heading>
				</ModalBody>
				<ModalFooter>
					<Button
						p={4}
						bg={"purple.800"}
						size={"md"}
						color="white"
						_active={{ border: "none" }}
						_focus={{ border: "none" }}
						_hover={{ bg: "purple.900" }}
						onClick={() => {
							onClose();
							router.push("/dashboard");
						}}
					>
						Back to Dashboard
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
export default GameWon;
