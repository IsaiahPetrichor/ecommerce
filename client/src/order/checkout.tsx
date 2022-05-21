import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJwtToken, sessionCart } from '../utils/util';
import './checkout.css';

interface CartItem {
	user_id?: string;
	product_id: string;
	quantity: number;
}

interface Address {
	id: string;
	address_name: string;
	first_name: string;
	last_name: string;
	line_1: string;
	line_2: string;
	city: string;
	state: string;
	postal: string;
	is_default: boolean;
}

interface Payment {
	id: string;
	user_id: string;
	card_name: string;
	full_name: string;
	card_number: number;
	type: string;
	provider: string;
	expires: string;
}

const Checkout: FC = () => {
	const navigate = useNavigate();

	const stringCart = sessionStorage.getItem('checkout-cart');

	let cart: any;

	if (stringCart) {
		cart = JSON.parse(stringCart);
	}

	if (!cart) navigate('/cart');

	// logged in address options
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [selectedAddress, setSelectedAddress] = useState('');

	// logged in payment options
	const [payments, setPayments] = useState<Payment[]>([]);
	const [selectedPayment, setSelectedPayment] = useState('');

	// state to hold form entry errors
	const [error, setError] = useState('');

	// address form state
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [line1, setLine1] = useState('');
	const [line2, setLine2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [postal, setPostal] = useState('');

	// payment form state
	const [cardName, setCardName] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [type, setType] = useState('');
	const [expiration, setExpiration] = useState('');
	const [cvv, setCvv] = useState('');

	const jwtToken = getJwtToken();

	useEffect(() => {
		if (jwtToken) {
			// if logged in, get all address and payment options on file.
			fetch('/api/user_address', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'content-type': 'application/json',
					Authorization: `Bearer ${jwtToken}`,
				},
			})
				.then((res) => res.json())
				.then((json) => setAddresses(json));

			fetch('/api/user_payment', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'content-type': 'application/json',
					Authorization: `Bearer ${jwtToken}`,
				},
			})
				.then((res) => res.json())
				.then((json) => setPayments(json));
		}
		// if user is logged out they will need to enter all info manually.
	}, [jwtToken]);

	const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedAddress(e.currentTarget.value);

		const currentAddress = addresses.find(
			(address) => address.id === e.currentTarget.value
		);

		if (currentAddress) {
			setFirst(currentAddress.first_name);
			setLast(currentAddress.last_name);
			setLine1(currentAddress.line_1);
			setLine2(currentAddress.line_2);
			setCity(currentAddress.city);
			setState(currentAddress.state);
			setPostal(currentAddress.postal);
		} else {
			setFirst('');
			setLast('');
			setLine1('');
			setLine2('');
			setCity('');
			setState('');
			setPostal('');
		}
	};

	const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedPayment(e.currentTarget.value);

		const currentPayment = payments.find(
			(payment) => payment.id === e.currentTarget.value
		);

		if (currentPayment) {
			setCardName(currentPayment.full_name);
			setCardNumber(currentPayment.card_number.toString());
			setType(currentPayment.type);
			setExpiration(currentPayment.expires);
		} else {
			setCardName('');
			setCardNumber('');
			setType('');
			setExpiration('');
			setCvv('');
		}
	};

	const handleCheckoutSubmit = () => {
		let checkoutError = '';

		[first, last, line1, city, state, postal].forEach((input) => {
			if (!input) {
				return (checkoutError = 'Address inputs cannot be empty!');
			}
		});
		if (checkoutError) return setError(checkoutError);

		[cardName, cardNumber, type, expiration, cvv].forEach((input) => {
			if (!input) {
				return (checkoutError = 'Payment inputs cannot be empty!');
			}
		});
		if (checkoutError) return setError(checkoutError);

		fetch('/api/orders', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({
				payment_id: selectedPayment,
				total: cart.total,
				address_id: selectedAddress,
			}),
		})
			.then((res) => {
				if (res.status === 201) {
					return res.json();
				}

				setError('Order could not be processed!');
			})
			.then((json) => {
				fetch('/api/order_items', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'content-type': 'application/json',
						Authorization: `Bearer ${jwtToken}`,
					},
					body: JSON.stringify({
						order: json,
						products: cart.cart,
					}),
				}).then((res) => {
					if (res.status === 201) {
						fetch('/api/cart', {
							method: 'DELETE',
							headers: {
								Accept: 'application/json',
								'content-type': 'application/json',
								Authorization: `Bearer ${jwtToken}`,
							},
						});
						sessionCart.clearCarts();
						return navigate('/thanks');
					}
					setError('Order could not be processed!');
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

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
				{cart.cart.map((item: CartItem) => (
					<div className="cart-item" key={item.product_id}>
						<p>Product ID: {item.product_id}</p>
						<p>Quantity: {item.quantity}</p>
					</div>
				))}
				<p className="checkout-total">Total: &#x24;{cart.total}</p>
			</div>
			{error && <p className="error">Error: {error}</p>}
			<div className="checkout-address">
				<h3>Shipping Address</h3>
				<hr />
				<form className="address-form">
					{jwtToken && (
						<>
							<label>
								Address:
								<select onChange={handleAddressChange}>
									<option value={''}>-- Select an Address --</option>
									{addresses.map((address) => (
										<option value={address.id} key={address.id}>
											{address.address_name}
										</option>
									))}
								</select>
							</label>
							<label>
								First Name:
								<input
									aria-label="First Name"
									name="given-name"
									type="text"
									value={first}
									onChange={(e) => {
										setFirst(e.currentTarget.value);
										setError('');
									}}
									required
								/>
							</label>
							<label>
								Last Name:
								<input
									aria-label="Last Name"
									name="family-name"
									type="text"
									value={last}
									onChange={(e) => {
										setLast(e.currentTarget.value);
										setError('');
									}}
									required
								/>
							</label>
							<label>
								Street Address:
								<input
									aria-label="Address Line One"
									name="address-line1"
									type="text"
									value={line1}
									onChange={(e) => {
										setLine1(e.currentTarget.value);
										setError('');
									}}
									required
								/>
							</label>
							<label>
								Line 2:
								<input
									aria-label="Address Line Two"
									name="address-line2"
									type="text"
									value={line2}
									onChange={(e) => {
										setLine2(e.currentTarget.value);
										setError('');
									}}
								/>
							</label>
							<label>
								City:
								<input
									aria-label="City"
									name="address-city"
									type="text"
									value={city}
									onChange={(e) => {
										setCity(e.currentTarget.value);
										setError('');
									}}
									required
								/>
							</label>
							<label>
								State:
								<input
									aria-label="State"
									name="address-state"
									type="text"
									value={state}
									onChange={(e) => {
										setState(e.currentTarget.value);
										setError('');
									}}
									required
								/>
							</label>
							<label>
								Postal:
								<input
									aria-label="Zip / Postal Code"
									name="postal-code"
									type="text"
									value={postal}
									onChange={(e) => {
										setPostal(e.currentTarget.value);
										setError('');
									}}
									required
								/>
							</label>
						</>
					)}
				</form>
			</div>
			<div className="checkout-payment">
				<h3>Payment Method</h3>
				<hr />
				<form className="payment-form">
					{jwtToken && (
						<>
							<label>
								Payment Method:
								<select onChange={handlePaymentChange}>
									<option value={''}>-- Select a Payment Method --</option>
									{payments.map((payment) => (
										<option value={payment.id} key={payment.id}>
											{payment.card_name}
										</option>
									))}
								</select>
							</label>
							<label>
								Name On Card:
								<input
									type="text"
									name="cc-name"
									value={cardName}
									onChange={(e) => {
										setCardName(e.currentTarget.value);
										setError('');
									}}
									required
								/>
							</label>
							<label>
								Card Number:
								<input
									type="text"
									name="cc-number"
									value={cardNumber}
									onChange={(e) => {
										setCardNumber(e.currentTarget.value);
										setError('');
									}}
									required
								/>
							</label>
							<label>
								Type:
								<select
									value={type}
									name="card-type"
									onChange={(e) => {
										setType(e.currentTarget.value);
										setError('');
									}}
									required>
									<option value="">Select a type...</option>
									<option value="credit">Credit</option>
									<option value="debit">Debit</option>
									<option value="gift-card">Gift Card</option>
								</select>
							</label>
							<label>
								Expiration:
								<input
									type="text"
									name="cc-exp"
									value={expiration}
									onChange={(e) => {
										setExpiration(e.currentTarget.value);
										setError('');
									}}
									required
								/>
							</label>
							<label>
								CVV:
								<input
									type="text"
									name="cc-csc"
									value={cvv}
									onChange={(e) => {
										setCvv(e.currentTarget.value);
										setError('');
									}}
									required
								/>
							</label>
						</>
					)}
				</form>
			</div>
			<div className="checkout-button">
				<button onClick={handleCheckoutSubmit}>Checkout</button>
			</div>
		</main>
	);
};

export default Checkout;
