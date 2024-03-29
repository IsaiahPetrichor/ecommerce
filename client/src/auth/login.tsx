import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../utils/user-context';
import './login.css';
import { getJwtToken, setJwtToken } from '../utils/util';

interface Product {
  product_id: string;
  quantity: number;
}

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { state } = useLocation();
  const path = useRef(state ? state.from.pathname : '/');

  let navigate = useNavigate();
  const context = useContext(UserContext);

  let jwtToken = getJwtToken();

  useEffect(() => {
    if (jwtToken) navigate(path.current, { replace: true });
  }, [jwtToken, navigate]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const url = '/api/login/';
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === 'string') {
          setError(data);
        } else {
          setError('');
          setJwtToken(data.jwt_token);
          context.updateUser(data.user_id, data.first_name, data.admin);

          const jwtToken = getJwtToken();
          let cart;

          if (sessionStorage.getItem('petrichor-cart'))
            cart = sessionStorage.getItem('petrichor-cart');

          if (cart) {
            JSON.parse(cart).forEach((product: Product) =>
              fetch('/api/cart', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'content-type': 'application/json',
                  Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({
                  product_id: product.product_id,
                  quantity: product.quantity,
                }),
              })
            );
          }
          navigate(path.current, { replace: true });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <main className="login">
      <h2>Login</h2>
      <hr />
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="email"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="password"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p className="login-register">
        <button
          type="button"
          onClick={() => navigate("/sign-up", { state: state ? state : null })}
        >
          Don't have an account? Sign Up here!
        </button>
      </p>
    </main>
  );
};

export default Login;
