import * as React from 'react';
import {useAuth} from '../src/authContext';
import Link from 'next/link';

const Header = () => {

	const {user, logout} = useAuth();

	return (
		<header>
			{user && user.email ? (
				<>
					Welcome {user.email}
					{' '}
					<button onClick={logout}>Logout</button>
				</>
			) : (
				<div>
					<Link href='/login'>
						<a>Please login</a>
					</Link>
				</div>
			)
			}
		</header>
	)
}

export default Header;