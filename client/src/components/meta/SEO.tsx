import Head from "next/head";
import { useRouter } from "next/router";

const SEO: React.FC = () => (
	<Head>
		<meta charSet="UTF-8" />
		<meta name="author" content="Zeyad Oman" />
		<meta name="keywords" content="SQuiz, InfoSec, Game, Quiz, Interactive" />
		<meta
			name="description"
			content="Do you think you can get the high score in this game? Register now and test your Information Security & Privacy knowledge and compete for the high score!"
		/>
		<meta property="og:title" content="SQuiz" />
		<meta
			property="og:description"
			content="Do you think you can get the high score in this game? Register now and test your Information Security & Privacy knowledge and compete for the high score!"
		/>
		<meta property="og:image" content="/images/cover.png" />
		<meta name="twitter:card" content="/images/cover.png" />
		<meta property="og:url" content="https://squiz.zeyadomran.com/" />
		<meta property="og:site_name" content="SQuiz" />
		<meta name="twitter:image:alt" content="SQuiz Logo" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link
			rel="canonical"
			href={`https://squiz.zeyadomran.com${useRouter().pathname}`}
		/>
	</Head>
);

export default SEO;
