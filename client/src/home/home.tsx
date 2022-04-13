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
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
					veniam vitae placeat officia unde molestias fugiat repudiandae ea quod
					neque sit recusandae tempora quam, nisi autem iure soluta ullam ipsum?
				</p>
			</section>
		</main>
	);
};

export default Home;
