import { useApolloClient } from "@apollo/client";
import {
	Button,
	Popover,
	PopoverTrigger,
	Portal,
	PopoverContent,
	PopoverBody,
	Stack,
} from "@chakra-ui/react";
import React from "react";
import {
	useLogoutMutation,
	useTogglePrivateMutation,
} from "../generated/graphql";

interface ProfileProps {
	username: string;
	isPrivate: boolean;
}

const Profile: React.FC<ProfileProps> = ({ username, isPrivate }) => {
	const [logout, { loading: logoutFetching }] = useLogoutMutation();
	const [togglePrivate, { loading: privateFetching }] =
		useTogglePrivateMutation({
			update: (cache) => {
				cache.evict({ fieldName: "leaderboard:[]" });
			},
		});
	const apolloClient = useApolloClient();
	let privateMsg = null;

	if (!isPrivate) privateMsg = "Switch to Private";
	else privateMsg = "Switch to Public";

	return (
		<Popover>
			<PopoverTrigger>
				<Button
					p={4}
					bg={"purple.700"}
					size={"md"}
					_active={{ border: "none" }}
					_focus={{ border: "none" }}
					_hover={{ bg: "purple.900" }}
				>
					{username}
				</Button>
			</PopoverTrigger>
			<Portal>
				<PopoverContent bg={"purple.700"} _focus={{ border: "none" }}>
					<PopoverBody>
						<Stack spacing={5} p={4}>
							<Button
								onClick={async () => {
									await logout();
									await apolloClient.resetStore();
								}}
								isLoading={logoutFetching}
								bg="purple.600"
								_active={{ border: "none" }}
								_focus={{ border: "none" }}
								_hover={{ bg: "purple.800" }}
								color="white"
							>
								Logout
							</Button>
							<Button
								onClick={async () => {
									await togglePrivate();
									await apolloClient.resetStore();
								}}
								isLoading={privateFetching}
								bg="purple.600"
								_active={{ border: "none" }}
								_focus={{ border: "none" }}
								_hover={{ bg: "purple.800" }}
								color="white"
							>
								{privateMsg}
							</Button>
						</Stack>
					</PopoverBody>
				</PopoverContent>
			</Portal>
		</Popover>
	);
};

export default Profile;
