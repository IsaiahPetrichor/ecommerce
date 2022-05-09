import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './products.css';

interface Product {
	id: string;
	name: string;
	price: number;
	category_id: string;
}

interface Category {
	id: string;
	name: string;
	description: string;
}

const Products: FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);

	const [lowHigh, setLowHigh] = useState(true);
	const [highLow, setHighLow] = useState(false);

	useEffect(() => {
		fetch('/api/products')
			.then((res) => res.json())
			.then((json) => {
				setProducts(
					json.products.sort((a: Product, b: Product) => {
						return a.price - b.price;
					})
				);
				setCategories(json.categories);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleLowHigh = () => {
		setLowHigh(!lowHigh);
		if (highLow) setHighLow(false);

		const productArr = [...products];
		setProducts(
			productArr.sort((a, b) => {
				return a.price - b.price;
			})
		);
	};

	const handleHighLow = () => {
		setHighLow(!highLow);
		if (lowHigh) setLowHigh(false);

		const productArr = [...products];
		setProducts(
			productArr.sort((a, b) => {
				return b.price - a.price;
			})
		);
	};

	return (
		<main className="products">
			<div className="filters">
				<hr className="right-hr" />
				<div id="filter-menu">
					<div className="filter-header">
						<h2 className="filter-title">Filters</h2>
						<button>Clear</button>
					</div>
					<hr />
					<label className="checkbox">
						Sort by price (low to high):
						<input type="checkbox" checked={lowHigh} onChange={handleLowHigh} />
					</label>
					<label className="checkbox">
						Sort by price (high to low):
						<input type="checkbox" checked={highLow} onChange={handleHighLow} />
					</label>
				</div>
			</div>
			<div className="products-list">
				{products.map((product) => {
					return (
						<Link to={product.id} className="list-product" key={product.id}>
							<div
								className="list-product-img"
								style={{
									backgroundImage: `url('/assets/${product.id}.png')`,
								}}></div>
							<h2>{product.name}</h2>
							<h3>
								{'$'}
								{product.price}
							</h3>
						</Link>
					);
				})}
			</div>
		</main>
	);
};

export default Products;
