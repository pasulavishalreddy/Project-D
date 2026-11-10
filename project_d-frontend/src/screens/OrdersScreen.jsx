import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const OrdersScreen = () => {
const [orders, setOrders] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const res = await fetch("http://localhost:5000/orders/my", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);
  return(
    <div>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid", margin: "10px" }}>
          <p>Total: ₹{order.totalPrice}</p>
          {order.cartItems.map((item, i) =>(
            <p key={i}>
              {item.name} × {item.qty}
            </p>
          ))}
          <button onClick={() => navigate(`/orders/${order._id}`)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};
export default OrdersScreen;