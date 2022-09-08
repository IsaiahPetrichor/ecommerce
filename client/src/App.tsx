import { Outlet } from 'react-router-dom';
import './App.css';
import UserContext from './utils/user-context';
import Header from './header';
import { useState } from 'react';
import Footer from './footer';

function App() {
  const [first, setFirst] = useState('');
  const [userId, setUserId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userState = {
    user_id: userId,
    first_name: first,
    admin: isAdmin,
    updateUser: (id: string, newFirst: string, is_admin: boolean) => {
      setUserId(id);
      setFirst(newFirst);
      setIsAdmin(is_admin);
    },
  };

  return (
    <UserContext.Provider value={userState}>
      <Header />
      <Outlet />
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
