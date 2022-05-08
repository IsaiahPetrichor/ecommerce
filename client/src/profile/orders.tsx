import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJwtToken } from '../utils/util';
import './submenus.css';
import './orders.css';

interface Order {
	id: string;
	payment_status: string;
	total: string;
	date: string;
}

const Orders: FC = () => {
	const [orders, setOrders] = useState<Order[]>([]);

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
			{orders.length > 0 && (
				<div className="orders-list">
					{orders.map((order) => (
						<div className="order-item">
							<h3>Order ID: {order.id}</h3>
							<hr />
							<p>Total: {order.total}</p>
							<p>Payment Status: {order.payment_status}</p>
							<p>Order Date: {order.date.slice(0, 10)}</p>
						</div>
					))}
				</div>
			)}
		</main>
	);
};

export default Orders;
