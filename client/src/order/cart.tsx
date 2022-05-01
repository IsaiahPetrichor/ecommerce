import { FC, useEffect, useState } from 'react';
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
	}, [jwtToken]);

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
						<Link to={`/products/${item.product_id}`} key={item.product_id}>
							{products.map((product) => {
								if (product.id === item.product_id) {
									return (
										<div key={product.id}>
											<h3>{product.name}</h3>
											<p>{product.sku}</p>
											<p>{product.price}</p>
											<p>{item.quantity}</p>
										</div>
									);
								}
							})}
						</Link>
					))}
				</>
			)}
		</main>
	);
};

export default Cart;
