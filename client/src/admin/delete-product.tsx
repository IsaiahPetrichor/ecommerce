import { FC, useEffect, useState } from 'react';
import { getJwtToken } from '../utils/util';

interface deleteProductProps {
	setDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

type props = {
	props: deleteProductProps;
};

interface Product {
	id: string;
	name: string;
	description: string;
	sku: string;
	category_id: string;
	price: string;
}

const DeleteProduct: FC<props> = ({ props }) => {
	const [products, setProducts] = useState<Product[]>([]);

	const [selected, setSelected] = useState('');

	const jwtToken = getJwtToken();

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
		setSelected(e.currentTarget.value);
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		fetch(`/api/products/${selected}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
		}).then((res) => {
			if (res.status === 204) {
				props.setDeleteProduct(false);
				return console.log('Deleted...');
			}
			console.log('Failure...');
		});
	};

	return (
		<div className="background">
			<div className="popup admin-popup">
				<h2>Delete Product</h2>
				<hr />
				<form onSubmit={handleSubmit}>
					<label>
						Product:
						<select onChange={handleChange}>
							<option value={''}>--Select Product--</option>
							{products.map((product) => (
								<option key={product.id} value={product.id}>
									{product.name}
								</option>
							))}
						</select>
					</label>
					<div className="buttons">
						<button type="submit">Submit</button>
						<button onClick={() => props.setDeleteProduct(false)}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DeleteProduct;
