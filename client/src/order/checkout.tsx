import { FC, useEffect, useState } from 'react';
import { getJwtToken } from '../utils/util';
import './checkout.css';

const Checkout: FC = () => {
	const cart = JSON.parse(sessionStorage.getItem('checkout-cart') || '[]');

	const [addresses, setAddresses] = useState([]);
	const [payments, setPayments] = useState([]);

	const jwtToken = getJwtToken();

	useEffect(() => {
		if (jwtToken) {
			// if logged in, get all address and payment options on file.
		}
		// if user is logged out they will need to enter all info manually.
	}, [jwtToken]);

	return (
		<main className="checkout">
			<h2 className="title">Checkout</h2>
			<p className="sidenote">
				Reminder: this is a developer project. No payment will actually be taken
				and no products will actually be shipped. You may use real info as it is
				encrypted (but it serves no purpose).
			</p>
			<hr />
			<div className="invoice">
				<h3>Invoice:</h3>
				<p className="checkout-total">Total: &#x24;{cart.total}</p>
			</div>
			<div className="checkout-address">
				<h3>Shipping Address</h3>
				<hr />
			</div>
			<div className="checkout-payment">
				<h3>Payment Method</h3>
				<hr />
			</div>
		</main>
	);
};

export default Checkout;
