import React, { FC, useState } from 'react';
import { getJwtToken, verifyCard } from '../utils/util';
import './card-actions.css';

// Add Component

type AddType = {
	setAddCard: React.Dispatch<React.SetStateAction<boolean>>;
};

interface AddProps {
	props: AddType;
}

export const AddCard: FC<AddProps> = ({ props }) => {
	const jwtToken = getJwtToken();

	const [error, setError] = useState('');

	const [cardName, setCardName] = useState('');
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
		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({
				card_name: cardName,
				card_number: cardNumber,
				type: type,
				provider: 'visa',
				expiration: expiration,
			}),
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
					<button type="submit">Submit</button>
					<button onClick={handleCancel}>Cancel</button>
				</form>
			</div>
		</div>
	);
};

// Delete Component

type DeleteType = {
	setDeleteCard: React.Dispatch<React.SetStateAction<boolean>>;
	selectedCard: string;
	setSelectedCard: React.Dispatch<React.SetStateAction<string>>;
};

interface DeleteProps {
	props: DeleteType;
}

export const DeleteCard: FC<DeleteProps> = ({ props }) => {
	const [error, setError] = useState('');

	const jwtToken = getJwtToken();

	const handleDelete = () => {
		const url = `/api/user_payment/${props.selectedCard}`;
		const options = {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
		};

		fetch(url, options).then((response) => {
			if ([500, 403, 401].includes(response.status)) {
				setError('Server Error...');
			} else {
				setError('');
				props.setSelectedCard('');
				props.setDeleteCard(false);
			}
		});
	};

	return (
		<div className="background">
			<div className="popup delete-card-popup">
				<p className="warning">Are you sure you want to delete this card?</p>
				{error && <p className="error">Error: {error}</p>}
				<button onClick={handleDelete}>Yes</button>
				<button
					onClick={() => {
						props.setDeleteCard(false);
						props.setSelectedCard('');
					}}>
					No
				</button>
			</div>
		</div>
	);
};

// Edit Component

type EditType = {
	setEditCard: React.Dispatch<React.SetStateAction<boolean>>;
};

interface EditProps {
	props: EditType;
}

export const EditCard: FC<EditProps> = ({ props }) => {
	return (
		<div className="background">
			<div className="popup edit-card-popup">
				<h2>Edit Card</h2>
				<button>Save</button>
				<button onClick={() => props.setEditCard(false)}>Cancel</button>
			</div>
		</div>
	);
};