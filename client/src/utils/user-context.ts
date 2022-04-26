import { createContext } from 'react';

const UserContext = createContext({
	user_id: '',
	first_name: '',
	admin: false,
	updateUser: (id: string, newFirst: string, isAdmin: boolean) => {},
});

export default UserContext;
