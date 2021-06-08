import { mode, Styles } from "@chakra-ui/theme-tools";

export const styles: Styles = {
	global: (props: any) => ({
		"html, #__next": {
			height: "100%",
		},
		"#__next": {
			display: "flex",
			flexDirection: "column",
			minHeight: "100%",
			color: mode("black.800", "white.100")(props),
			bg: mode("white.200", "black.700")(props),
			lineHeight: "base",
		},
		body: {
			color: mode("black.800", "white.100")(props),
			bg: mode("white.200", "black.700")(props),
		},
		html: {
			scrollBehavior: "smooth",
		},
		".body": {
			overflowY: "scroll",
		},
	}),
};
