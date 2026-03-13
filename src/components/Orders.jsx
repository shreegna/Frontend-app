import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Orders.css";

function Orders() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/orders/${user.email}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <div className="orders-box">
        <h2>My Orders 📦</h2>

        {orders &&
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order.orderDate}</h3>

              <ol className="order-items">
                {order.items.map((item) => (
                  <li key={item._id}>
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>Total: ₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ol>

              <h4 className="order-value">
                Order Value: ₹{order.orderValue}
              </h4>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Orders;