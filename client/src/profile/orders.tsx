import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJwtToken } from '../utils/util';
import './submenus.css';

const Orders: FC = () => {
	const [orders, setOrders] = useState([]);

	const jwtToken = getJwtToken();

	useEffect(() => {
		fetch('/api/orders', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
		})
			.then((res) => res.json())
			.then((json) => {
				setOrders(json);
			});
	}, [jwtToken]);

	return (
		<main className="sub-user">
			<Link to="/profile" id="back-arrow">
				<i className="bx bx-arrow-back"></i>
			</Link>
			<h2 className="title">Past Orders</h2>
			<p>View your past orders or cancel current ones.</p>
			<hr />
			{orders.length === 0 && <p>No orders on record.</p>}
		</main>
	);
};

export default Orders;
