import { createContext } from 'react';

const UserContext = createContext({
	user_id: '',
	first_name: '',
	updateUser: (id: string, newFirst: string) => {},
});

export default UserContext;
