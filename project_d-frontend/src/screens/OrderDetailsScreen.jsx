import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetailsScreen = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const res = await fetch(`http://localhost:5000/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        const data = await res.json();
        setOrder(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Order Details</h2>

      <p><b>Order ID:</b> {order._id}</p>
      <p><b>Status:</b> {order.status}</p>
      <p><b>Total:</b> ₹{order.totalPrice}</p>

      <h3>Shipping</h3>
      <p>{order.shippingAddress.name}</p>
      <p>{order.shippingAddress.address}</p>
      <p>{order.shippingAddress.city}</p>
      <p>{order.shippingAddress.postal}</p>

      <h3>Items</h3>
      {order.cartItems.map((item, i) => (
        <p key={i}>
          {item.name} × {item.qty} = ₹{item.price * item.qty}
        </p>
      ))}
    </div>
  );
};

export default OrderDetailsScreen;