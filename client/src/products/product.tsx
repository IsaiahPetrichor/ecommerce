import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getImage } from '../utils/util';
import Pricing from './pricing';
import './product.css';

interface Product_type {
	id: string;
	name: string;
	description: string;
	category_id: string;
	price: string;
	sku: string;
	created_on: string;
}

interface Category_type {
	id: string;
	name: string;
	description: string;
}

const Product: FC = () => {
	const [product, setProduct] = useState<Product_type>({
		id: '',
		name: '',
		description: '',
		category_id: '',
		price: '',
		sku: '',
		created_on: '',
	});
	const [img, setImg] = useState('loading.avif');
	const [category, setCategory] = useState<Category_type>();

	let params = useParams();

	useEffect(() => {
		fetch(`/api/products/${params.productId}`)
			.then((res) => res.json())
			.then((json) => {
				setProduct(json);
				setImg(`${getImage(json.name)}.avif`);
				fetch(`/api/categories/${json.category_id}`)
					.then((res) => res.json())
					.then((json) => setCategory(json));
			})
			.catch((err) => console.log(err));
	}, [params.productId]);

	return (
		<main className="product">
			<button onClick={() => window.history.back()} id="back-arrow">
				<i className="bx bx-arrow-back"></i>
			</button>
			<h2>{product.name}</h2>
			<hr />
			<div className="product-flex">
				<div className="product-info">
					<div
						className="img"
						style={{
							backgroundImage: `url('/assets/${img}')`,
						}}></div>
					<p className="sku">{product.sku}</p>
					<p className="category">Category: {category?.name}</p>
					<hr className="description-hr" />
					<p className="description">{product.description}</p>
				</div>
				<Pricing product={product} />
			</div>
		</main>
	);
};

export default Product;
