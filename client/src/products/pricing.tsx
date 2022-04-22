import { FC, useState } from 'react';
import './product.css';

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
	const product = prop.product;

	const handleAdd = () => {
		return;
	};

	return (
		<div className="pricing">
			<h3>
				Price: {'$'}
				{product.price}
			</h3>
			{quantity < 1 && <p className="error">Quantity must be greater than 0</p>}
			<p>
				Quantity:{' '}
				<input
					aria-label="Quantity Input"
					id="quantity"
					name="Quantity"
					type="number"
					min={1}
					value={quantity}
					onChange={(e) => setQuantity(Number(e.target.value))}
				/>
			</p>
			<button className="add-cart" onClick={handleAdd}>
				Add to Cart
			</button>
		</div>
	);
};

export default Pricing;
