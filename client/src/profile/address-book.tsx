import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getJwtToken } from '../utils/util';
import { AddAddress, DeleteAddress, EditAddress } from './address-actions';
import './submenus.css';
import './address-book.css';

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

const AddressBook: FC = () => {
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [selectedAddress, setSelectedAddress] = useState({
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
	const [addAddress, setAddAddress] = useState(false);
	const [editAddress, setEditAddress] = useState(false);
	const [deleteAddress, setDeleteAddress] = useState(false);

	const navigate = useNavigate();

	const jwtToken = getJwtToken();
	if (!jwtToken) navigate('/login');

	useEffect(() => {
		fetch('/api/user_address', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
		})
			.then((res) => res.json())
			.then((json) => {
				setAddresses(json);
			});
	}, [jwtToken, addAddress, deleteAddress, editAddress]);

	return (
		<main className="sub-user">
			<Link to="/profile" className="back-arrow">
				<i className="bx bx-arrow-back"></i>
			</Link>
			<h2 className="address-title">Addresses on File</h2>
			<hr />
			{addresses.length < 1 && <p>No addresses on file</p>}
			<div className="address-list">
				{addresses.map((address) => (
					<div className="address" key={address.id}>
						<h3>
							{address.address_name}
							{address.is_default && (
								<span>
									{' '}
									- <span className="default-address">Default</span>
								</span>
							)}
						</h3>
						<p className="address-names">
							{address.first_name} {address.last_name}
						</p>
						<p>{address.line_1}</p>
						<p>{address.line_2}</p>
						<p>
							{address.city}, {address.state} {address.postal}
						</p>
						<div className="address-buttons">
							<button
								onClick={() => {
									setEditAddress(true);
									setSelectedAddress({
										id: address.id,
										address_name: address.address_name,
										first_name: address.first_name,
										last_name: address.last_name,
										line_1: address.line_1,
										line_2: address.line_2,
										city: address.city,
										state: address.state,
										postal: address.postal,
										is_default: address.is_default,
									});
								}}>
								Edit
							</button>
							<button
								onClick={() => {
									setDeleteAddress(true);
									setSelectedAddress({
										id: address.id,
										address_name: address.address_name,
										first_name: address.first_name,
										last_name: address.last_name,
										line_1: address.line_1,
										line_2: address.line_2,
										city: address.city,
										state: address.state,
										postal: address.postal,
										is_default: address.is_default,
									});
								}}>
								Remove
							</button>
						</div>
					</div>
				))}

				<button className="add-address" onClick={() => setAddAddress(true)}>
					<p>
						<i className="bx bx-plus bx-flashing add-card-plus"></i>
					</p>
					ADD NEW ADDRESS
				</button>
			</div>
			{addAddress && <AddAddress props={{ setAddAddress }} />}
			{editAddress && (
				<EditAddress
					props={{ setEditAddress, selectedAddress, setSelectedAddress }}
				/>
			)}
			{deleteAddress && (
				<DeleteAddress
					props={{
						setDeleteAddress,
						selectedAddress: selectedAddress.id,
						setSelectedAddress,
					}}
				/>
			)}
		</main>
	);
};

export default AddressBook;
