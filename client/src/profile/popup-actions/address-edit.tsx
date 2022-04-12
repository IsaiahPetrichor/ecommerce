import React, { FC, useState } from 'react';
import { getJwtToken } from '../../utils/util';
import '../address-book.css';
import '../submenus.css';
import './popup.css';

interface Address {
	id: string;
	address_name: string;
	first_name: string;
	last_name: string;
	line_1: string;
	line_2: string;
	city: string;
	state: string;
	postal: string;
	is_default: boolean;
}

// Edit Component

type EditType = {
	setEditAddress: React.Dispatch<React.SetStateAction<boolean>>;
	selectedAddress: Address;
	setSelectedAddress: React.Dispatch<React.SetStateAction<Address>>;
};

interface EditProps {
	props: EditType;
}

const EditAddress: FC<EditProps> = ({ props }) => {
	const [error, setError] = useState('');

	const [first, setFirst] = useState(props.selectedAddress.first_name);
	const [last, setLast] = useState(props.selectedAddress.last_name);
	const [line1, setLine1] = useState(props.selectedAddress.line_1);
	const [line2, setLine2] = useState(props.selectedAddress.line_2);
	const [city, setCity] = useState(props.selectedAddress.city);
	const [state, setState] = useState(props.selectedAddress.state);
	const [postal, setPostal] = useState(props.selectedAddress.postal);
	const [addressName, setAddressName] = useState(
		props.selectedAddress.address_name
	);
	const [isDefault, setIsDefault] = useState(props.selectedAddress.is_default);

	const jwtToken = getJwtToken();

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		const url = `/api/user_address/${props.selectedAddress.id}`;
		fetch(url, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({
				first_name: first,
				last_name: last,
				line_1: line1,
				line_2: line2,
				city,
				state,
				postal,
				address_name: addressName,
				is_default: isDefault,
			}),
		}).then((response) => {
			if ([401, 403, 500].includes(response.status)) {
				setError('Server Error...');
			} else {
				props.setEditAddress(false);
			}
		});
	};

	const handleChange = () => {
		setIsDefault(!isDefault);
	};

	return (
		<div className="background">
			<div className="popup edit-card-popup">
				<h2>Edit Card</h2>
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
					<div id="address-details">
						<label className="address-name">
							Save As:
							<input
								aria-label="Address Name"
								name="AddressName"
								type="text"
								value={addressName}
								onChange={(e) => {
									setAddressName(e.currentTarget.value);
									setError('');
								}}
								required
							/>
						</label>
						<label className="is-default-input">
							<input
								aria-label="Make Default"
								className="is-default-input"
								name="MakeDefault"
								type="checkbox"
								checked={isDefault}
								onChange={handleChange}
							/>
							default?
						</label>
					</div>
					<div className="buttons">
						<button type="submit">Save</button>
						<button
							onClick={() => {
								props.setEditAddress(false);
								props.setSelectedAddress({
									id: '',
									address_name: '',
									first_name: '',
									last_name: '',
									line_1: '',
									line_2: '',
									city: '',
									state: '',
									postal: '',
									is_default: false,
								});
								setError('');
							}}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditAddress;
