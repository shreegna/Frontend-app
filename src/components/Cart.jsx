import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";

function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();

  const increment = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      })
    );
  };

  const decrement = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id === id && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    if (user?.email) {
      const url = `${API_URL}/orders`;
      const order = {
        email: user.email,
        items: cart,
        orderValue: orderValue,
        orderDate: Date.now(),
      };

      const response = await axios.post(url, order, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setCart([]);
      Navigate("/orders");
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-box">
        <h2>My Cart 🛒</h2>

        <ol className="cart-list">
          {cart &&
            cart.map((item) => (
              <li key={item._id} className="cart-item">
                <span className="item-name">{item.name}</span>

                <span className="item-price">₹{item.price}</span>

                <div className="quantity-controls">
                  <button onClick={() => decrement(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increment(item._id)}>+</button>
                </div>

                <span className="item-total">
                  ₹{item.quantity * item.price}
                </span>
              </li>
            ))}
        </ol>

        <p className="order-value">
          <strong>Total: ₹{orderValue}</strong>
        </p>

        {user?.email ? (
          <button className="order-btn" onClick={placeOrder}>
            Place Order
          </button>
        ) : (
          <button className="order-btn" onClick={() => Navigate("/login")}>
            Login to Order
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;