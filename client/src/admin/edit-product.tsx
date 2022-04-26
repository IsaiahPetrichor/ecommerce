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
}

const EditProduct: FC<props> = ({ props }) => {
	const [products, setProducts] = useState<Product[]>([]);

	const [selectedProduct, setSelectedProduct] = useState('');
	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
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

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
	};

	return (
		<div className="background">
			<div className="popup">
				<form onSubmit={handleSubmit}>
					<label>
						Product:
						<select />
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
