import { FC, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../utils/user-context';
import './submenus.css';

interface Payment {
	id: string;
	user_id: string;
	type: string;
	provider: string;
	card_number: number;
	expires: string;
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
					console.log(data);
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
			<h2>Your Payment Options</h2>
			<hr />
			{payments.length === 0 && <p>No payment options on file.</p>}

			{payments.map(({ id, type }) => (
				<p key={id}>
					payment id: {type} - {id}
				</p>
			))}
		</main>
	);
};

export default Payments;
