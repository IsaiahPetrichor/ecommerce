import { Outlet } from 'react-router-dom';
import './App.css';
import UserContext from './utils/user-context';
import Header from './header';
import { useState } from 'react';
import Footer from './footer';

function App() {
	const [first, setFirst] = useState('');
	const [userId, setUserId] = useState('');

	const userState = {
		user_id: userId,
		first_name: first,
		updateUser: (id: string, newFirst: string) => {
			setUserId(id);
			setFirst(newFirst);
		},
	};

	return (
		<UserContext.Provider value={userState}>
			<Header />
			<Outlet />
			<Footer />
		</UserContext.Provider>
	);
}

export default App;
