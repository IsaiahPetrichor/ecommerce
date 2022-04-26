import React, { FC, useEffect, useState } from 'react';
import { getJwtToken } from '../utils/util';
import NewProduct from './new-product';
import EditProduct from './edit-product';

const Admin: FC = () => {
	const [auth, setAuth] = useState(false);

	const [newProduct, setNewProduct] = useState(false);
	const [editProduct, setEditProduct] = useState(false);

	const jwtToken = getJwtToken();

	useEffect(() => {
		if (!jwtToken) return;

		fetch('/api/users', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwtToken}`,
			},
		})
			.then((res) => res.json())
			.then((json) => {
				setAuth(json.admin);
			});
	}, [jwtToken]);

	return (
		<main className="admin-page">
			{auth ? (
				<>
					<button onClick={() => setNewProduct(!newProduct)}>
						Add Product
					</button>
					<button onClick={() => setEditProduct(!editProduct)}>
						Edit Product
					</button>
					{newProduct && <NewProduct props={{ setNewProduct }} />}
					{editProduct && <EditProduct props={{ setEditProduct }} />}
				</>
			) : (
				<h2 className="error">Error: you do not have access to this page!</h2>
			)}
		</main>
	);
};

export default Admin;
