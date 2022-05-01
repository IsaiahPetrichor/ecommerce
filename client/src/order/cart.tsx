import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJwtToken } from '../utils/util';
import './cart.css';

interface Product {
	id: string;
	name: string;
	sku: string;
	category_id: string;
	price: number;
}

interface CartItem {
	user_id: string;
	product_id: string;
	quantity: number;
}

const Cart: FC = () => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [products, setProducts] = useState<Product[]>([]);

	const [selected, setSelected] = useState('');

	const jwtToken = getJwtToken();

	useEffect(() => {
		fetch('/api/cart', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
		})
			.then((res) => res.json())
			.then((json) => {
				setCart(json);
			});

		fetch('/api/products')
			.then((res) => res.json())
			.then((json) => setProducts(json.products));
	}, [jwtToken, selected]);

	const handleRemove = (product_id: string) => {
		setSelected(product_id);

		fetch(`/api/cart/${product_id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
		}).then((res) => {
			if (res.status !== 204) return console.log('Error, not removed...');
			setSelected('');
		});
	};

	return (
		<main className="cart">
			<h2>Shopping Cart ({cart.length})</h2>
			<hr />
			{cart.length < 1 && (
				<div>
					<h3>you have no items in your cart.</h3>
				</div>
			)}
			{cart.length > 0 && (
				<>
					{cart.map((item) => (
						<>
							{products.map((product) => {
								if (product.id === item.product_id) {
									return (
										<div key={product.id} className="cart-item">
											<div>
												<Link to={`/products/${item.product_id}`}>
													<h3>{product.name}</h3>
												</Link>
												<p>{product.sku}</p>
												<p className="price">{product.price}</p>
											</div>
											<div>
												<p className="quantity">Quantity: {item.quantity}</p>
												<button
													className="remove-button"
													onClick={() => {
														handleRemove(product.id);
													}}>
													Remove
												</button>
											</div>
										</div>
									);
								} else return <></>;
							})}
						</>
					))}
				</>
			)}
		</main>
	);
};

export default Cart;
