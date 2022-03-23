import { createContext } from 'react';

const UserContext = createContext({
	user_id: '',
	firstName: '',
	jwt: '',
	updateUser: (id: string, newFirst: string, newJWT: string) => {},
});

export default UserContext;
