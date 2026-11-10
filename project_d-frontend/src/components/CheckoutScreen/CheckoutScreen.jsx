import { useState } from "react";
import "./CheckoutScreen.css";
import { useNavigate } from "react-router-dom";

const CheckoutScreen = ({ cart,setCart } ) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    postal: "",
  });
console.log("CHECKOUT CART DETAILS:", JSON.stringify(cart, null, 2));
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const openRazorpay = (paymentOrder) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));  
  const options = {
    key: paymentOrder.keyId,
    amount: paymentOrder.amount,
    currency: paymentOrder.currency,
    name: "Velora",
    description: "Purchase from Velora",
    order_id: paymentOrder.orderId,
handler: async (paymentResponse) => {
  try {
    console.log("RAZORPAY RESPONSE:", paymentResponse);

    // Verify payment and save order in MongoDB
    const verifyResponse = await fetch(
      "http://localhost:5000/payments/verify-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
        body: JSON.stringify({
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          cartItems: cart.map((item) => ({
            _id: item._id,
            qty: item.qty,
          })),
          shippingAddress: form,
        }),
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyResponse.ok) {
      throw new Error(verifyData.message || "Payment verification failed");
    }

    console.log("ORDER SAVED:", verifyData.order);

    // Clear MongoDB cart
    const clearResponse = await fetch(
      "http://localhost:5000/clear",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      }
    );

    if (!clearResponse.ok) {
      throw new Error("Order saved, but cart clearing failed");
    }

    // Clear frontend cart
    setCart([]);
    // localStorage.removeItem("cart");

    alert("Payment successful! Your order has been saved.");

    navigate("/orders");
  } catch (error) {
    console.error("PAYMENT ERROR:", error);
    alert(error.message);
  }
},
  };
  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
 const placeOrder = async () => {
 const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!form.name || !form.address || !form.city || !form.postal) {
    alert("Please fill all fields");
    return;
  }
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }
  console.log("📦 Sending Order:", { cart, form, totalPrice });
  try {
    const response = await fetch("http://localhost:5000/payments/create-order", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
         Authorization: `Bearer ${userInfo?.token}`
      },
     body: JSON.stringify({
     cartItems: cart.map((item) => ({
    _id: item._id,
    qty: item.qty,
  })),
  shippingAddress: form,
}),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Order saving failed");
    }
   console.log("Razorpay order created:", data);
if (!window.Razorpay) {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.onload = () => openRazorpay(data);
  script.onerror = () => alert("Failed to load Razorpay Checkout");
  document.body.appendChild(script);}
// } else {
//   openRazorpay(data);
// }
// console.log("Order Success:", data);
    // alert("Order Placed Successfully!");
    // setCart([]);
    // navigate("/orders");
    // Clear cart from MongoDB
// const clearResponse = await fetch(
//   "http://localhost:5000/cart/clear",
//   {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${userInfo?.token}`,
//     },
//   }
// );
// if (!clearResponse.ok) {
//   throw new Error("Payment successful, but cart clearing failed");
// }
// // Clear frontend cart
setCart([]);
// localStorage.removeItem("cart");
alert("Payment successful! Your order has been saved.");
navigate("/orders");
   }catch (error) {
    console.error("Order Error:", error);
    alert(error.message)
  }
};
  return (
    <div className="checkout">
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Shipping Details</h2>
          <input name="name" placeholder="Name" onChange={handleChange}  />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="postal" placeholder="Postal Code" onChange={handleChange} />
        </div>
        {/* SUMMARY */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <p>Total: ₹{totalPrice}</p>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;