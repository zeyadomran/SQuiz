import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
	Router.events.on("routeChangeStart", () => NProgress.start());
	Router.events.on("routeChangeComplete", () => NProgress.done());
	Router.events.on("routeChangeError", () => NProgress.done());
	return (
		<ChakraProvider resetCSS theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
export default MyApp;
