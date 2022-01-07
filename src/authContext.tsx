import {createContext, ReactNode, useContext, useState} from 'react';

export type User = {
	email?: string
}

type authContextType = {
	user: User;
	login: (user: User) => void;
  refreshAuth: () => boolean;
	logout: () => void;
	isAuthenticated: boolean;
};

const authContextDefaultValues: authContextType = {
	user: {},
	login: () => {},
  refreshAuth: () => false,
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
    if (typeof window !== "undefined") {
      localStorage.setItem('email', user.email as string);
    }
	};

  const refreshAuth = (): boolean => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem('email');
      if (email) {
        login({email: email});
        return true;
      }
    }
    return false;
  };

	const logout = () => {
		setAuthentication(false);
		setUser({});
    if (typeof window !== "undefined") {
      localStorage.removeItem('email');
    }
	};

	const value = {
		user,
		login,
    refreshAuth: refreshAuth,
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
