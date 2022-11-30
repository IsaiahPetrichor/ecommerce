import { FC, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getImage, getJwtToken, sessionCart } from '../utils/util';
import './cart.css';

interface Product {
  id: string;
  name: string;
  sku: string;
  category_id: string;
  price: number;
}

interface CartItem {
  // user_id is optional to allow guest checkout
  user_id?: string;
  product_id: string;
  quantity: number;
}

const Cart: FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  let total = 0;

  // only used to re-render when item is removed from cart
  const [selected, setSelected] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  // get JWT from session storage
  const jwtToken = getJwtToken();

  useEffect(() => {
    const fetchProduct = async () => {
      await fetch('/api/products')
        .then((res) => res.json())
        .then((json) => setProducts(json.products));

      if (jwtToken) {
        // Logged in cart
        fetch('/api/cart', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            setCart(json);
          });
      } else {
        // Guest cart
        setCart(JSON.parse(sessionStorage.getItem('petrichor-cart') || '[]'));
      }
    };

    fetchProduct();
  }, [jwtToken, selected]);

  const updateTotal = (price: number, quantity: number) => {
    const currentTotal = total + price * quantity;
    total = Number(currentTotal.toFixed(2));
  };

  const handleRemove = (product_id: string) => {
    setSelected(product_id);

    if (jwtToken) {
      // Logged in remove
      fetch(`/api/cart/${product_id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      }).then((res) => {
        if (res.status !== 204) return console.log('Error, not removed...');
        setSelected('');
      });
    } else {
      // Guest remove
      sessionCart.removeItem(product_id);
    }
  };

  const handleCheckout = () => {
    if (!jwtToken) return navigate('/login', { state: { from: location } });
    // double check to make sure cart is populated
    if (cart.length > 0) {
      // set session storage to hold cart info to make checkout
      // implementaion simpler & prevent unwanted changes after
      // checkout button is pressed
      sessionStorage.setItem('checkout-cart', JSON.stringify({ cart, total }));
      // send user to the checkout page
      navigate('/checkout');
    }
  };

  return (
    <main className="cart">
      <h2>Shopping Cart ({cart.length})</h2>
      <hr />
      {cart.length < 1 && (
        <div>
          <h3>you have no items in your cart.</h3>
          <Link to="/products">*Check out our amazing products!*</Link>
        </div>
      )}
      {cart.length > 0 && products.length > 0 && (
        <div className="cart-flex">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.product_id}>
                {products.map((product) => {
                  if (product.id === item.product_id) {
                    updateTotal(product.price, item.quantity);
                    return (
                      <div key={product.id} className="cart-item">
                        <div className="cart-item-content">
                          <div
                            className="cart-img"
                            style={{
                              backgroundImage: `url('/assets/${getImage(
                                product.name
                              )}.avif')`,
                            }}
                          ></div>
                          <div>
                            <Link to={`/products/${item.product_id}`}>
                              <h3>{product.name}</h3>
                            </Link>
                            <p className="sku">{product.sku}</p>
                            <p className="price">&#x24;{product.price}</p>
                          </div>
                        </div>
                        <div>
                          <p className="quantity">Quantity: {item.quantity}</p>
                          <button
                            className="remove-button"
                            onClick={() => {
                              handleRemove(product.id);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  } else return null;
                })}
              </div>
            ))}
          </div>
          <div className="cart-checkout">
            <h3>Checkout</h3>
            <hr className="checkout-hr" />
            <p>Total: &#x24;{total}</p>
            <button onClick={handleCheckout}>
              Checkout <i className="bx bx-right-arrow"></i>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
