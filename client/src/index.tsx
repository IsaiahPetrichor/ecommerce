import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Cart from './order/cart';
import Products from './products/products';
import Product from './products/product';
import Profile from './profile/profile';
import Admin from './admin/admin';
import Login from './auth/login';
import Signup from './auth/signup';
import Home from './home/home';
import EditUser from './profile/editUser';
import Orders from './profile/orders';
import Payments from './profile/payments';
import AddressBook from './profile/address-book';
import Checkout from './order/checkout';
import Thanks from './order/thanks';
import NotFound from './404';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Home />} />
					<Route path="products" element={<Products />} />
					<Route path="cart" element={<Cart />} />
					<Route path="checkout" element={<Checkout />} />
					<Route path="thanks" element={<Thanks />} />
					<Route path="profile" element={<Profile />} />
					<Route path="admin" element={<Admin />} />
					<Route path="login" element={<Login />} />
					<Route path="sign-up" element={<Signup />} />
					<Route path="profile/edit-user" element={<EditUser />} />
					<Route path="profile/orders" element={<Orders />} />
					<Route path="profile/payments" element={<Payments />} />
					<Route path="profile/addresses" element={<AddressBook />} />
					<Route path="products/:productId" element={<Product />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
