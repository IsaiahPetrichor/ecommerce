import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
	const [img, setImg] = useState('loading.png');
	const [category, setCategory] = useState<Category_type>();

	let params = useParams();

	useEffect(() => {
		fetch(`/api/products/${params.productId}`)
			.then((res) => res.json())
			.then((json) => {
				setProduct(json);
				setImg(`${json.id}.png`);
				fetch(`/api/categories/${json.category_id}`)
					.then((res) => res.json())
					.then((json) => setCategory(json));
			})
			.catch((err) => console.log(err));
	}, [params.productId]);

	return (
		<main className="product">
			<Link to={'/products'} className="back-arrow">
				<i className="bx bx-arrow-back"></i>
			</Link>
			<h2>{product.name}</h2>
			<hr />
			<div className="product-flex">
				<div className="product-info">
					<div
						className="img"
						style={{
							backgroundImage: `url('/assets/${img}')`,
						}}></div>
					<p className="category">{category?.name}</p>
					<p>{product.sku}</p>
					<p className="description">{product.description}</p>
				</div>
				<Pricing product={product} />
			</div>
		</main>
	);
};

export default Product;
