import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useIsAuth = () => {
	const { data, loading } = useMeQuery();
	const router = useRouter();
	useEffect(() => {
		if (!loading && !data?.me) {
			router.replace("/login?next=" + router.pathname);
		}
	}, [loading, data, router]);
};

export const useAuth = () => {
	const { data, loading } = useMeQuery();
	const router = useRouter();
	useEffect(() => {
		if (!loading && data?.me) {
			router.replace("/dashboard");
		}
	}, [loading, data, router]);
};
