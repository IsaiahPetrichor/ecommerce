import { Outlet } from 'react-router-dom';
import './App.css';
import UserContext from './utils/user-context';
import Header from './header';
import { useState } from 'react';

function App() {
	const [user, setUser] = useState(false);
	const [first, setFirst] = useState('');
	const [jwt, setJwt] = useState('');

	const userState = {
		user: user,
		firstName: first,
		jwt: jwt,
		updateUser: (loggedIn: boolean, newFirst: string, newJWT: string) => {
			setUser(loggedIn);
			setFirst(newFirst);
			setJwt(newJWT);
		},
	};

	return (
		<UserContext.Provider value={userState}>
			<Header />
			<Outlet />
		</UserContext.Provider>
	);
}

export default App;
