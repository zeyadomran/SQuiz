import { ColorMode, extendTheme } from "@chakra-ui/react";
import { styles } from "./styles";
import { breakpoints } from "./breakpoints";

interface ChakraConfig {
	initialColorMode: ColorMode;
	useSystemColorMode: boolean;
}

const config: ChakraConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

const fonts = {
	heading: "Bangers, sans-serif",
	body: "'Open Sans', sans-serif",
};

const theme = extendTheme({
	styles,
	fonts,
	breakpoints,
	config,
});

export default theme;
