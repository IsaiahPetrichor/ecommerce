import { createContext } from 'react';

const UserContext = createContext({
	user: false,
	firstName: '',
	jwt: '',
	updateUser: (loggedIn: boolean, newFirst: string, newJWT: string) => {},
});

export default UserContext;
