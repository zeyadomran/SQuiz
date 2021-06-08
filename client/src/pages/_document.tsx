import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../theme/theme";
import React from "react";

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					{/* Make Color mode to persists when you refresh the page. */}
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
