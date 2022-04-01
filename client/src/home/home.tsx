import { FC, useContext } from 'react';
import UserContext from '../utils/user-context';

const Home: FC = () => {
	const context = useContext(UserContext);

	return (
		<>
			<h2>Home</h2>
			{context.first_name !== '' ? (
				<p>Welcome {context.first_name}!</p>
			) : (
				<p>Welcome!</p>
			)}
		</>
	);
};

export default Home;
