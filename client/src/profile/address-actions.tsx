import React, { FC, useState } from 'react';
import { getJwtToken } from '../utils/util';
import './submenus.css';
import './popup.css';
import { useNavigate } from 'react-router-dom';

type AddType = {
	setAddAddress: React.Dispatch<React.SetStateAction<boolean>>;
};

interface AddProps {
	props: AddType;
}

export const AddAddress: FC<AddProps> = ({ props }) => {
	const [error, setError] = useState('');

	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [line1, setLine1] = useState('');
	const [line2, setLine2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [postal, setPostal] = useState('');
	const [country, setCountry] = useState('');
	const [addressName, setAddressName] = useState('');
	const [isDefault, setIsDefault] = useState(false);

	const navigate = useNavigate();
	const jwtToken = getJwtToken();

	if (!jwtToken) navigate('/login');

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (error) return;
	};

	const handleCancel = (e: React.SyntheticEvent) => {
		e.preventDefault();

		setError('');
		setFirst('');
		setLast('');
		setLine1('');
		setLine2('');
		setCity('');
		setState('');
		setPostal('');
		setCountry('');
		setAddressName('');
		props.setAddAddress(false);
	};

	const handleChange = () => {
		setIsDefault(!isDefault);
	};

	return (
		<div className="background">
			<div className="popup">
				<h2>Add Address</h2>
				<hr />
				{error && <p className="error">Error: {error}</p>}
				<form onSubmit={handleSubmit}>
					<label htmlFor="first-name">First Name: </label>
					<input
						aria-label="First Name"
						id="first-name"
						name="FirstName"
						type="text"
						value={first}
						onChange={(e) => {
							setFirst(e.currentTarget.value);
							setError('');
						}}
						required
					/>
					<label htmlFor="last-name">Last Name: </label>
					<input
						aria-label="Last Name"
						id="last-name"
						name="LastName"
						type="text"
						value={last}
						onChange={(e) => {
							setLast(e.currentTarget.value);
							setError('');
						}}
						required
					/>
					<label htmlFor="line-1">Street Address: </label>
					<input
						aria-label="Address"
						id="line-1"
						name="Address1"
						type="text"
						value={line1}
						onChange={(e) => {
							setLine1(e.currentTarget.value);
							setError('');
						}}
						required
					/>
					<label htmlFor="line-2">Address 2: </label>
					<input
						aria-label="Address"
						id="line-2"
						name="Address2"
						type="text"
						value={line2}
						onChange={(e) => {
							setLine2(e.currentTarget.value);
							setError('');
						}}
					/>
					<label htmlFor="city">City: </label>
					<input
						aria-label="City"
						id="city"
						name="City"
						type="text"
						value={city}
						onChange={(e) => {
							setCity(e.currentTarget.value);
							setError('');
						}}
						required
					/>
					<label htmlFor="state">State: </label>
					<input
						aria-label="State"
						id="state"
						name="State"
						type="text"
						value={state}
						onChange={(e) => {
							setState(e.currentTarget.value);
							setError('');
						}}
						required
					/>
					<label htmlFor="postal">ZIP Code: </label>
					<input
						aria-label="Zip / Postal Code"
						id="postal"
						name="ZipCode"
						type="text"
						value={postal}
						onChange={(e) => {
							setPostal(e.currentTarget.value);
							setError('');
						}}
						required
					/>
					<div className="address-details">
						<label className="address-name" htmlFor="address-name">
							Save As:
						</label>
						<input
							aria-label="Address Name"
							id="address-name"
							name="AddressName"
							type="text"
							value={addressName}
							onChange={(e) => {
								setAddressName(e.currentTarget.value);
								setError('');
							}}
							required
						/>
						<label className="is-default-input" htmlFor="default">
							default?
						</label>
						<input
							aria-label="Make Default"
							id="default"
							className="is-default-input"
							name="MakeDefault"
							type="checkbox"
							checked={isDefault}
							onChange={handleChange}
						/>
					</div>
					<div className="buttons">
						<button type="submit">Submit</button>
						<button onClick={handleCancel}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};
