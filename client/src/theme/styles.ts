import { Styles } from "@chakra-ui/theme-tools";

export const styles: Styles = {
	global: (props: any) => ({
		"html, #__next": {
			height: "100%",
		},
		"#__next": {
			display: "flex",
			flexDirection: "column",
			bg: "purple.600",
			color: "white",
			minHeight: "100%",
			lineHeight: "base",
		},
		body: {
			bg: "purple.600",
		},
		html: {
			scrollBehavior: "smooth",
		},
		".body": {
			overflowY: "scroll",
			overflowX: "hidden",
			bg: "purple.600",
			color: "white",
		},
	}),
};
