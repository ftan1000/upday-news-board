import { useRouter } from "next/router";
import { useEffect } from "react";
import type { FC } from "react";
import {useAuth} from './authContext';

type withAuthenticationFn = (Component: FC) => FC;

const withAuthentication: withAuthenticationFn = (Component) => {
	const Authenticated: FC = (): JSX.Element | null => {
		const { user } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!user || !user.email) router.push("/login");
		});

		return user && user.email ? <Component /> : null;
	};

	return Authenticated;
};

export default withAuthentication;