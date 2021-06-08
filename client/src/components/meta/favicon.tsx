import { Head } from "next/document";

export const Favicon: React.FC = () => (
	<Head>
		<link
			rel="apple-touch-icon"
			sizes="180x180"
			href="images/apple-touch-icon.png"
		/>
		<link
			rel="icon"
			type="image/png"
			sizes="32x32"
			href="images/favicon-32x32.png"
		/>
		<link
			rel="icon"
			type="image/png"
			sizes="16x16"
			href="images/favicon-16x16.png"
		/>
		<link rel="manifest" href="images/site.webmanifest" />
		<link rel="mask-icon" href="images/safari-pinned-tab.svg" color="#41108e" />
		<meta name="msapplication-TileColor" content="#41108e" />
		<meta name="theme-color" content="#41108e" />
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
			href="https://fonts.googleapis.com/css2?family=Bangers&family=Open+Sans&display=swap"
			rel="stylesheet"
		/>
	</Head>
);
