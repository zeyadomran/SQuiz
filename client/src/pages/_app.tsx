import { Box, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import React from "react";
import SEO from "../components/meta/SEO";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
	Router.events.on("routeChangeStart", () => NProgress.start());
	Router.events.on("routeChangeComplete", () => NProgress.done());
	Router.events.on("routeChangeError", () => NProgress.done());
	return (
		<>
			<SEO />
			<ChakraProvider resetCSS theme={theme}>
				<Box overflowX="hidden" maxW="100vw" maxH="100vh">
					<Component {...pageProps} />
				</Box>
			</ChakraProvider>
		</>
	);
}
export default MyApp;
