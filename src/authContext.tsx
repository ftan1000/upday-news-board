import {ReactNode, createContext, useContext, useState} from 'react';

export type User = {
	email?: string
}

type authContextType = {
	user: {};
	login: (user: User) => void;
	logout: () => void;
};

const authContextDefaultValues: authContextType = {
	user: {},
	login: (User) => {},
	logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
	return useContext(AuthContext);
}

type Props = {
	children: ReactNode;
};

export function AuthProvider({ children }: Props) {
	const [user, setUser] = useState<User>({});

	const login = (user: User) => {
		setUser( { email: user.email});
	};

	const logout = () => {
		setUser({});
	};

	const value = {
		user,
		login,
		logout,
	};

	return (
		<>
			<AuthContext.Provider value={value}>
				{children}
			</AuthContext.Provider>
		</>
	);
}