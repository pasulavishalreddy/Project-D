import { useState } from "react";
import OrdersScreen from "./OrdersScreen";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const LoginScreen = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

const submitHandler = async (e) => {
    e.preventDefault();
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ SAVE TOKEN + USER
      localStorage.setItem("userInfo", JSON.stringify(data));
localStorage.setItem("token", data.token);
console.log("🔐 TOKEN SAVED");
      alert("Login successful ✅");
const guestCart = localStorage.getItem("cart_guest"); 
console.log("🛒 GUEST CART:", guestCart);
      
if (guestCart) { try { const parsedGuestCart = JSON.parse(guestCart); 
  console.log( "🛒 PARSED GUEST CART:", parsedGuestCart );

const mergeProducts = parsedGuestCart.map( 
  (item) => ({ 
  productId: item._id,
   quantity: item.qty, 
  }) ); 
console.log( 
  "📦 CART TO MERGE:", 
  mergeProducts
 );

  const mergeResponse = await fetch( "http://localhost:5000/cart/merge", 
    { method: "POST",
       headers: { "Content-Type": "application/json", 
        Authorization: `Bearer ${data.token}`, 
      }, 
      
      body: JSON.stringify({
         products: mergeProducts, 
        }),
       }
       );

       const mergeData = await mergeResponse.json();
        console.log( 
          "🔄 MERGE RESPONSE:", 
          mergeData
         );

         if (mergeResponse.ok) { 
          console.log( "✅ GUEST CART MERGED INTO DATABASE" ); 
          localStorage.removeItem( "cart_guest" ); 
          console.log( "🗑️ GUEST CART REMOVED FROM LOCAL STORAGE" ); 
        } else {
           console.error( "❌ CART MERGE FAILED:", mergeData );
            }
} catch (mergeError) { 
  console.error( "❌ CART MERGE ERROR:", 
    mergeError 
  );
}
}else { 
  console.log( "ℹ️ NO GUEST CART FOUND" ); 
}

window.location.href = "/";
    } catch (error) {
      console.error("Login Error",error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
<span onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</span>
        <br /><br />
        <button type="submit">Login</button>
        <p>
  New user? <a href="/register">Register here</a>
</p>
      </form>
    </div>
  );
};

export default LoginScreen;