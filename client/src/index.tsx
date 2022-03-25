import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Cart from './order/cart';
import Products from './products/products';
import Profile from './profile/profile';
import Login from './auth/login';
import Signup from './auth/signup';
import Home from './home/home';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Home />} />
					<Route path="products" element={<Products />} />
					<Route path="cart" element={<Cart />} />
					<Route path="profile" element={<Profile />} />
					<Route path="login" element={<Login />} />
					<Route path="sign-up" element={<Signup />} />
					<Route
						path="*"
						element={
							<main style={{ padding: '1rem' }}>
								<h2>404: This page doesn't exist</h2>
							</main>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
