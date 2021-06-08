import { ColorMode, extendTheme } from "@chakra-ui/react";
import { styles } from "./styles";
import { breakpoints } from "./breakpoints";

interface ChakraConfig {
	initialColorMode: ColorMode;
	useSystemColorMode: boolean;
}

const config: ChakraConfig = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

const fonts = {
	heading: "Poppins, sans-serif",
	body: "Roboto, sans-serif",
};

const theme = extendTheme({
	styles,
	fonts,
	breakpoints,
	config,
});

export default theme;
