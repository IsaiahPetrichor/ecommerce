import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './header';

function App() {
	return (
		<>
			<Header></Header>
			<Outlet></Outlet>
		</>
	);
}

export default App;
