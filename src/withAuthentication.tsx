import { useRouter } from "next/router";
import type { FC } from "react";
import {useAuth} from './authContext';

type withAuthenticationFn = (Component: FC) => FC;

const withAuthentication: withAuthenticationFn = (Component) => {
	const Authenticated: FC = (props): JSX.Element | null => {
		const { isAuthenticated } = useAuth();

		if (typeof window !== "undefined") {
			const router = useRouter();
			if (!isAuthenticated) router.push("/login");
		}

		return isAuthenticated ? <Component {...props} /> : null;
	};

	return Authenticated;
};

export default withAuthentication;