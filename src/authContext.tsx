import {createContext, ReactNode, useContext, useState} from 'react';

export type User = {
	email?: string
}

type authContextType = {
	user: User;
	login: (user: User) => void;
	logout: () => void;
	isAuthenticated: boolean;
};

const authContextDefaultValues: authContextType = {
	user: {},
	login: () => {},
	logout: () => {},
	isAuthenticated: false,
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
	return useContext(AuthContext);
}

type Props = {
	children: ReactNode;
};

export function AuthProvider({children}: Props) {
	const [user, setUser] = useState<User>({});
	const [isAuthenticated, setAuthentication] = useState(false);

	const login = (user: User) => {
		setAuthentication(true);
		setUser({email: user.email});
	};

	const logout = () => {
		setAuthentication(false);
		setUser({});
	};

	const value = {
		user,
		login,
		logout,
		isAuthenticated,
	};

	return (
		<>
			<AuthContext.Provider value={value}>
				{children}
			</AuthContext.Provider>
		</>
	);
}