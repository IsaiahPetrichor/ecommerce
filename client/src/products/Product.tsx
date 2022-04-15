import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Product: FC = () => {
	let params = useParams();
	return (
		<main>
			<h2>Product {params.productId}</h2>
		</main>
	);
};

export default Product;
