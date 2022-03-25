import { FC } from 'react';
import { Link } from 'react-router-dom';
import './submenus.css';

const Payments: FC = () => {
	return (
		<main className="sub-user">
			<Link to="/profile" className="back-arrow">
				<i className="bx bx-arrow-back"></i>
			</Link>
		</main>
	);
};

export default Payments;
