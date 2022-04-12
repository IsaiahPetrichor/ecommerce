import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJwtToken } from '../../utils/util';
import '../submenus.css';
import './popup.css';
import '../address-book.css';

// Add Component

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
	const [addressName, setAddressName] = useState('');
	const [isDefault, setIsDefault] = useState(false);

	const navigate = useNavigate();
	const jwtToken = getJwtToken();

	if (!jwtToken) navigate('/login');

	const wipeData = () => {
		setError('');
		setFirst('');
		setLast('');
		setLine1('');
		setLine2('');
		setCity('');
		setState('');
		setPostal('');
		setAddressName('');
		setIsDefault(false);
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (error) return;

		const options: RequestInit = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({
				address_name: addressName,
				first_name: first,
				last_name: last,
				line_1: line1,
				line_2: line2,
				city: city,
				state: state,
				postal: postal,
				is_default: isDefault,
			}),
		};

		fetch('/api/user_address', options)
			.then((res) => res.json())
			.then((json) => {
				wipeData();
				props.setAddAddress(false);
			})
			.catch((err) => setError(err.message));
	};

	const handleCancel = (e: React.SyntheticEvent) => {
		e.preventDefault();

		wipeData();
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
						<button type="submit">Submit</button>
						<button onClick={handleCancel}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

// Address Interface

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

export const EditAddress: FC<EditProps> = ({ props }) => {
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
					<div className="address-details">
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

// Delete Component

type DeleteType = {
	setDeleteAddress: React.Dispatch<React.SetStateAction<boolean>>;
	selectedAddress: string;
	setSelectedAddress: React.Dispatch<React.SetStateAction<Address>>;
};

interface DeleteProps {
	props: DeleteType;
}

export const DeleteAddress: FC<DeleteProps> = ({ props }) => {
	const [error, setError] = useState('');
	const jwtToken = getJwtToken();

	const handleDelete = (e: React.SyntheticEvent) => {
		const url = `/api/user_address/${props.selectedAddress}`;

		fetch(url, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
		}).then((res) => {
			if ([500, 403, 401].includes(res.status)) {
				setError('Server Error...');
			} else {
				setError('');
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
				props.setDeleteAddress(false);
			}
		});
	};

	return (
		<div className="background">
			<div className="popup delete-card-popup">
				<p className="warning">Are you sure you want to delete this card?</p>
				{error && <p className="error">Error: {error}</p>}
				<div className="buttons">
					<button onClick={handleDelete}>Yes</button>
					<button
						onClick={() => {
							props.setDeleteAddress(false);
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
						No
					</button>
				</div>
			</div>
		</div>
	);
};
