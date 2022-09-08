import { FC, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import UserContext from './utils/user-context';
import { getJwtToken } from './utils/util';

const Header: FC = () => {
  const context = useContext(UserContext);

  const jwtToken = getJwtToken();

  useEffect(() => {
    if (jwtToken) {
      fetch('/api/users', {
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((res) => res.json())
        .then((json) =>
          context.updateUser(json.user_id, json.first_name, json.admin)
        );
    }
  }, [jwtToken, context]);

  return (
    <header>
      <h1>Petrichor Coffee</h1>
      <nav>
        <Link to="/">
          <i className="bx bxs-home-alt-2"></i>
          <span>Home</span>
        </Link>
        <Link to="/products">
          <i className="bx bxs-shopping-bag-alt"></i>
          <span>Products</span>
        </Link>
        <Link to="/cart">
          <i className="bx bxs-cart"></i>
          <span>Cart</span>
        </Link>
        {context.admin && (
          <Link to="/admin">
            <i className="bx bxs-cog"></i>
            <span>Admin</span>
          </Link>
        )}
        {context.user_id ? (
          <Link to="/profile">
            <i className="bx bxs-user-circle"></i>
            <span>{context.first_name}</span>
          </Link>
        ) : (
          <Link to="/login">
            <i className="bx bxs-log-in-circle"></i>
            <span>Login</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
