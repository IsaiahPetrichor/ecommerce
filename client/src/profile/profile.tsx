import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../utils/user-context';

export default function Profile() {
	const context = useContext(UserContext);
	const navigate = useNavigate();

	const signOut = () => {
		context.updateUser(false, '', '');
		navigate('/');
	};

	return (
		<>
			<h2>Profile</h2>
			<button onClick={signOut}>Sign Out</button>
		</>
	);
}
