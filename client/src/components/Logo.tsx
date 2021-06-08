import { Icon } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Squiz from "../resources/squiz-logo.svg";

const Logo: React.FC = () => {
	return (
		<Link href="/">
			<Icon
				cursor="pointer"
				w={["80px", "85px", "90px", "95px"]}
				h={["35px", "40px", "45px", "50px"]}
				as={Squiz}
			/>
		</Link>
	);
};

export default Logo;
