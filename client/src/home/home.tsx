import { FC, useContext } from 'react';
import UserContext from '../utils/user-context';
import './home.css';

const Home: FC = () => {
	const context = useContext(UserContext);

	return (
		<main className="home">
			<div className="hero">
				{context.first_name !== '' ? (
					<h2 className="greeting">
						Welcome {context.first_name}, to Petrichor Coffee!
					</h2>
				) : (
					<h2 className="greeting">Welcome to Petrichor Coffee!</h2>
				)}
			</div>
			<section className="about">
				<h2>About Us</h2>
				<p>
					Our company was created in the Pacific Northwest in 2022. We work with
					independent fair-trade farmers in Africa and South America to grow the
					highest quality beans, roasted to perfection, and delivered to your
					door.
				</p>
			</section>
		</main>
	);
};

export default Home;
