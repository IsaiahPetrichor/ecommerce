import { FC, useState } from 'react';
import { getJwtToken, sessionCart } from '../utils/util';
import './product.css';
import './pricing.css';

type Product = {
	id: string;
	name: string;
	description: string;
	category_id: string;
	price: string;
	sku: string;
	created_on: string;
};

interface ProductProps {
	product: Product;
}

const Pricing: FC<ProductProps> = (prop) => {
	const [quantity, setQuantity] = useState(1);
	const [notice, setNotice] = useState('');
	const product = prop.product;

	// Check for JWT in session storage
	const jwtToken = getJwtToken();

	const handleAdd = () => {
		if (jwtToken) {
			// if logged in, add to cart database
			fetch('/api/cart', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'content-type': 'application/json',
					Authorization: `Bearer ${jwtToken}`,
				},
				body: JSON.stringify({
					product_id: product.id,
					quantity,
				}),
			}).then((res) => {
				if (res.status === 201) return setNotice('Item Added to Cart!');
			});
		} else {
			// guest session storage cart
			sessionCart.addItem(product.id, quantity);
			setNotice('Item Added to Cart!');
		}
	};

	return (
		<div className="pricing">
			<hr className="left-hr" />
			<h3>
				Price: {'$'}
				{product.price}
			</h3>
			{quantity < 1 && <p className="error">Quantity must be greater than 0</p>}
			{notice && <p className="notice">{notice}</p>}
			<p>
				Quantity:{' '}
				<input
					aria-label="Quantity Input"
					id="quantity"
					name="Quantity"
					type="number"
					min={1}
					value={quantity}
					onChange={(e) => {
						setNotice('');
						setQuantity(Number(e.target.value));
					}}
				/>
			</p>
			<button className="add-cart" onClick={handleAdd}>
				Add to Cart
			</button>
		</div>
	);
};

export default Pricing;
