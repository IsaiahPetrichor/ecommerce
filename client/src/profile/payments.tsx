import { FC, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../utils/user-context';
import { displayCard, capitalize } from '../utils/util';
import './submenus.css';

interface Payment {
	id: string;
	user_id: string;
	type: string;
	provider: string;
	card_number: number;
	expires: string;
	card_name: string;
}

const Payments: FC = () => {
	const [payments, setPayments] = useState<Payment[]>([]);

	const context = useContext(UserContext);

	useEffect(() => {
		async function getUserPayments() {
			const userPayments = await fetch(
				`http://localhost:5000/api/user_payment/${context.user_id}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'content-type': 'application/json',
						jwt_token: context.jwt,
					},
				}
			)
				.then((response) => response.json())
				.then((data) => {
					return data;
				})
				.catch((err) => {
					console.log(err.message);
				});

			setPayments(userPayments);
		}

		getUserPayments();
	}, [context]);

	return (
		<main className="sub-user">
			<Link to="/profile" className="back-arrow">
				<i className="bx bx-arrow-back"></i>
			</Link>
			<h2 className="payments-title">Payment Options</h2>
			<p>Add payment options or edit existing ones.</p>
			<hr />
			{payments.length === 0 && <p>No payment options on file.</p>}
			<div className="payments-list">
				{payments.map((payment) => (
					<div className="payment-option" key={payment.id}>
						<h3>{payment.card_name}</h3>
						<p className="payment-type">
							{capitalize(payment.provider)} {capitalize(payment.type)}
						</p>
						<p className="card-number">{displayCard(payment.card_number)}</p>
						<div className="card-buttons">
							<button className="edit-card">Edit</button>
							<button className="remove-card">Remove</button>
						</div>
					</div>
				))}

				<button className="add-card">
					<p>
						<i className="bx bx-plus bx-flashing add-card-plus"></i>
					</p>
					ADD NEW CARD
				</button>
			</div>
		</main>
	);
};

export default Payments;
