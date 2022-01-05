import * as React from 'react';
import {useAuth} from '../src/authContext';
import {AppBar} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {AccountCircle} from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Link from 'next/link';
import {BoardList} from '../src/types';

type HeaderProps = {
	title?: string;
	boardId?: string;
	displayBreadcrumbs?: boolean;
};

const Header = (props: HeaderProps) => {

	const {user, logout, isAuthenticated} = useAuth();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<header>
			<Box>
				<AppBar>
					<Toolbar>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							UPDAY News
						</Typography>
						{isAuthenticated && (
							<div>
								{user.email}
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={logout}>Logout</MenuItem>
								</Menu>
							</div>
						)
						}
					</Toolbar>
				</AppBar>

				{props.displayBreadcrumbs && (
					<h1 data-testid="breadcrumbs">
						<Link href="/" data-testid="breadcrumb-home">
							<a>Boards</a>
						</Link>

						{ props.boardId && (
							<>
								{' '}>{' '}
								<Link href={'/board/' + props.boardId} data-testid="breadcrumb-board">
									<a>{BoardList[props.boardId]}</a>
								</Link>
							</>
						)}

						{ props.title && (
							<>
								{' '}>{' '}
								<em data-testid="breadcrumb-home">{props.title}</em>
							</>
						)}
					</h1>
				)}

			</Box>
		</header>
	)
}

Header.defaultProps = {
	displayBreadcrumbs: true
};

export default Header;