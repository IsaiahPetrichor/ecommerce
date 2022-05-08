import React, { FC, useState } from 'react';
import { getJwtToken, verifyCard } from '../../utils/util';
import '../submenus.css';
import './popup.css';

// Add Component

type AddType = {
	setAddCard: React.Dispatch<React.SetStateAction<boolean>>;
};

interface AddProps {
	props: AddType;
}

const AddCard: FC<AddProps> = ({ props }) => {
	const jwtToken = getJwtToken();

	const [error, setError] = useState('');

	const [cardName, setCardName] = useState('');
	const [fullName, setFullName] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [type, setType] = useState('');
	const [expiration, setExpiration] = useState('');

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (error !== '') return;

		if (!verifyCard(cardNumber)) {
			setError('Invalid Card Number');
			return;
		}

		const url = '/api/user_payment/';
		const options: RequestInit = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({
				card_name: cardName,
				full_name: fullName,
				card_number: cardNumber,
				type: type,
				provider: 'visa',
				expiration: expiration,
			}),
			credentials: 'include',
		};

		fetch(url, options)
			.then((response) => {
				if ([401, 403, 500].includes(response.status)) {
					setError('Auth Failure');
				} else {
					props.setAddCard(false);
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const handleCancel = () => {
		setError('');
		setCardName('');
		setFullName('');
		setCardNumber('');
		setType('');
		setExpiration('');
		props.setAddCard(false);
	};

	return (
		<div className="background">
			<div className="popup add-card-popup">
				<h2>New Card</h2>
				<hr />
				{error && <p>Error: {error}</p>}
				<form onSubmit={handleSubmit}>
					<label htmlFor="card-name">Card Name: </label>
					<input
						id="card-name"
						type="text"
						value={cardName}
						onChange={(e) => {
							setCardName(e.currentTarget.value);
							setError('');
						}}
						required
					/>
					<label htmlFor="card-number">Card Number: </label>
					<input
						id="card-number"
						type="text"
						value={cardNumber}
						onChange={(e) => {
							setCardNumber(e.currentTarget.value);
							setError('');
						}}
						required
					/>
					<label htmlFor="full-name">Name On Card: </label>
					<input
						id="full-name"
						type="text"
						value={fullName}
						onChange={(e) => {
							setFullName(e.currentTarget.value);
							setError('');
						}}
						required
					/>
					<label htmlFor="card-type">Card Type: </label>
					<select
						id="card-type"
						name="card-type"
						onChange={(e) => {
							setType(e.currentTarget.value);
							setError('');
						}}
						required>
						<option value="">Select a type...</option>
						<option value="credit">Credit</option>
						<option value="debit">Debit</option>
						<option value="gift-card">Gift Card</option>
					</select>
					<label htmlFor="card-expiration">Expiration: </label>
					<input
						id="card-expiration"
						type="text"
						value={expiration}
						onChange={(e) => {
							setExpiration(e.currentTarget.value);
							setError('');
						}}
						required
					/>
					<div className="buttons">
						<button type="submit">Submit</button>
						<button onClick={handleCancel}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddCard;
