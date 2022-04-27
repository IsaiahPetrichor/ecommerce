import React, { FC, useEffect, useState } from 'react';

interface editProductProps {
	setEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

type props = {
	props: editProductProps;
};

interface Product {
	id: string;
	name: string;
	description: string;
	sku: string;
	category: string;
	price: string;
}

const EditProduct: FC<props> = ({ props }) => {
	const [products, setProducts] = useState<Product[]>([]);

	const [selectedProduct, setSelectedProduct] = useState({
		id: '',
		name: '',
		description: '',
		sku: '',
		category: '',
		price: '',
	});
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [sku, setSku] = useState('');
	const [category, setCategory] = useState('');
	const [price, setPrice] = useState('');

	useEffect(() => {
		fetch('/api/products')
			.then((res) => res.json())
			.then((json) => {
				setProducts(json.products);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const product = products.find(id === e.currentTarget.value);
		setSelectedProduct();

		setName();
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
	};

	return (
		<div className="background">
			<div className="popup admin-popup">
				<form onSubmit={handleSubmit}>
					<label>
						Product:
						<select onChange={handleChange}>
							<option value="">--Choose Product--</option>
							{products.map((product) => (
								<option key={product.id} value={product.id}>
									{product.name}
								</option>
							))}
						</select>
					</label>
					<div className="buttons">
						<button type="submit">Submit</button>
						<button onClick={() => props.setEditProduct(false)}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProduct;
