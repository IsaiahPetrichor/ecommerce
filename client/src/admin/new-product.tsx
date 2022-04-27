import React, { FC, useState, useEffect } from 'react';
import { getJwtToken } from '../utils/util';
import './admin.css';

interface newProductProps {
	setNewProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

type props = {
	props: newProductProps;
};

interface Category {
	id: string;
	name: string;
	description: string;
}

const NewProduct: FC<props> = ({ props }) => {
	const [categories, setCategories] = useState<Category[]>([]);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [sku, setSku] = useState('');
	const [category, setCategory] = useState('');
	const [price, setPrice] = useState('');

	const jwtToken = getJwtToken();

	useEffect(() => {
		fetch('/api/products')
			.then((res) => res.json())
			.then((json) => {
				setCategories(json.categories);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const body = JSON.stringify({
			name,
			description,
			sku,
			category_id: category,
			price,
		});

		fetch('/api/products', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
			body: body,
		}).then((res) => {
			if (res.status !== 201) console.log('Error...');
		});
	};

	return (
		<div className="background">
			<div className="popup admin-popup">
				<h2>Add Product</h2>
				<hr />
				<form onSubmit={handleSubmit}>
					<label>
						Name:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.currentTarget.value)}
							required
						/>
					</label>
					<label>
						Description:
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.currentTarget.value)}
							required
						/>
					</label>
					<label>
						SKU:
						<input
							type="text"
							value={sku}
							onChange={(e) => setSku(e.currentTarget.value)}
							required
						/>
					</label>
					<label>
						Category:
						<select
							onChange={(e) => setCategory(e.currentTarget.value)}
							required>
							<option value="">--Choose Category--</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</label>
					<label>
						Price:
						<input
							type="text"
							value={price}
							onChange={(e) => setPrice(e.currentTarget.value)}
							required
						/>
					</label>
					<div className="buttons">
						<button type="submit">Submit</button>
						<button onClick={() => props.setNewProduct(false)}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewProduct;
