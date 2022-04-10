import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './submenus.css';
import './address-book.css';
import './popup.css';
import { getJwtToken } from '../utils/util';

interface Address {
	id: string;
	line1: string;
	line2: string;
	city: string;
	postal: string;
	country: string;
}

const AddressBook: FC = () => {
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [addAddress, setAddAddress] = useState(false);

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
			.then((json) => setAddresses(json));
	}, [jwtToken]);

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
						<h3>Address {address.city}</h3>
					</div>
				))}

				<button className="add-address" onClick={() => setAddAddress(true)}>
					<p>
						<i className="bx bx-plus bx-flashing add-card-plus"></i>
					</p>
					ADD NEW ADDRESS
				</button>
			</div>
		</main>
	);
};

export default AddressBook;
