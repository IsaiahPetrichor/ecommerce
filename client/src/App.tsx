import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './header';

let loggedIn: boolean = false;

function App() {
	return (
		<>
			<Header loggedIn={loggedIn} />
			<Outlet />
		</>
	);
}

export default App;
