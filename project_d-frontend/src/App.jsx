import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Header from "./components/Header/Header.jsx";
import CheckoutScreen from "./components/CheckoutScreen/CheckoutScreen.jsx";
import OrdersScreen from "./screens/OrdersScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import { useEffect, useState } from "react";
import RegisterScreen from "./screens/RegisterScreen";
import Wishlist from "./screens/wishlistScreen.jsx";
import Profile from "./Pages/Profile.jsx";
import PromoBanner from "./components/LandingPage/PromoBanner.jsx";
import LandingPageHome from "./components/LandingPage/LandingPageHome.jsx";
import CategoryScreen from "./screens/CategoryScreen.jsx";

function App() {
  const storedUser = localStorage.getItem("userInfo");

let userInfo = null;
try {
  userInfo = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  console.error("Invalid JSON in userInfo:", error);
  // localStorage.removeItem("userInfo"); // clean bad data
}

const user = userInfo?.user;
const userId = user?._id;

// const [cart, setCart] = useState(() => {
//   const storedUser = localStorage.getItem("userInfo");
//   let user = null;
//   try {
//     user = storedUser ? JSON.parse(storedUser) : null;
//   } catch {
//     localStorage.removeItem("userInfo");
//   }

//   const key = `cart_${user?._id || "guest"}`;
//   const savedCart = localStorage.getItem(key);

//   try {
//     return savedCart ? JSON.parse(savedCart) : [];
//   } catch {
//     localStorage.removeItem(key);
//     return [];
//   }
// });

const [cart, setCart] = useState([]);
const [cartLoading, setCartLoading] = useState(true);

useEffect(() => {
  const loadCart = async () => {
    try {
      // =========================
      // GUEST USER
      // =========================
      if (!userId) {
        console.log(
  "📥 READING GUEST CART:",
  localStorage.getItem("cart_guest")
);
        const guestCart = localStorage.getItem("cart_guest");
        setCart(
          guestCart
            ? JSON.parse(guestCart)
            : []
        );

        setCartLoading(false);
        return;
      }
      // =========================
      // LOGGED-IN USER
      // ========================
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user cart");
      }

      const data = await response.json();
      console.log("USER CART FROM DATABASE:", data);
      // Convert backend cart format
      // into the format your CartScreen already uses
      const formattedCart =
        data.cart?.products?.map((item) => ({
          ...item.product,
          qty: item.quantity,
        })) || [];

      setCart(formattedCart);
      setCartLoading(false);
    } catch (error) {
      console.error("LOAD CART ERROR:", error);
      setCart([]);
      setCartLoading(false);
    }
  };
  loadCart();
}, [userId]);


// useEffect(() => {
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   // const key = `cart_${userInfo?._id || "guest"}`;
//    const key = `cart_${userInfo.user._id || "guest"}`;
//   localStorage.setItem(key, JSON.stringify(cart)); // ✅ correct
// }, [cart]);

useEffect(() => {

  console.log("📤 CART SAVE EFFECT:", {
    userId,
    cart,
    cartLoading,
    localStorageCart:
      localStorage.getItem("cart_guest")
  });

  if (!userId && !cartLoading) {
    localStorage.setItem(
      "cart_guest",
      JSON.stringify(cart)
    );
  }
}, [cart, userId, cartLoading]);

 // ✅ ADD TO CART

// const addToCart = (product) => {
//     const exist = cart?.find((item) => item._id === product._id);
//     if (exist) {
//       setCart(
//         cart.map((item) =>
//           item._id === product._id
//             ? { ...item, qty: item.qty + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, qty: 1 }]);
//     }
//   };

const addToCart = async (product) => {
  // ==================================
  // GUEST CART
  // ==================================
  //   console.log("🟢 ADD TO CART CLICKED");
  // console.log("Product:", product);
  // console.log("Product ID:", product?._id);
  // console.log("User ID:", userId);
  // console.log("Token:", localStorage.getItem("token"));
  if (!userId) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        );
      }

      return [
        
        {
          ...product,
          qty: 1,
        },
        ...prevCart,
      ];
    });
    return;
  }
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/cart",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add product to cart");
    }
    const data = await response.json()
    // console.log("CART UPDATED IN DATABASE:", data);
    console.log("📦 FULL CART RESPONSE:", JSON.stringify(data, null, 2));
    console.log("🛒 PRODUCTS FROM BACKEND:", data.cart?.products);
    // Update frontend from backend response
    // const formattedCart =
    //   data.cart?.products?.map((item) => ({
    //     ...item.product,
    //     qty: item.quantity,
    //   })) || [];

// const formattedCart =
//   data.products?.map((item) => ({
//     ...item.product,
//     qty: item.quantity,
//   })) || [];

//     setCart(formattedCart);

const formattedCart =
  data.cart?.products?.map((item) => ({
    ...item.product,
    qty: item.quantity,
  })) || [];

console.log(
  "🛒 FORMATTED CART:",
  formattedCart
);

setCart(formattedCart);
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
  }
};

  // const removeFromCart = (id) => {
  //   setCart((prevCart) =>
  //     prevCart.filter((item) => item._id !== id)
  //   );
  // };

  const removeFromCart = async (id) => {
  // ==============================
  // GUEST USER
  // ==============================
  if (!userId) {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== id)
    );

    return;
  }

  // ==============================
  // LOGGED-IN USER
  // ==============================
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/cart/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("🗑️ CART DELETE RESPONSE:", data);

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to remove product from cart"
      );
    }

    // ==============================
    // UPDATE UI IMMEDIATELY
    // ==============================
    const formattedCart =
      data.cart?.products?.map((item) => ({
        ...item.product,
        qty: item.quantity,
      })) || [];

    setCart(formattedCart);

  } catch (error) {
    console.error("❌ REMOVE FROM CART ERROR:", error);
  }
};

  // ✅ DECREASE QTY

  // const decreaseQty = (id) => {
  //   setCart((prevCart) =>
  //     prevCart
  //       .map((item) => {
  //         if (!item) return item; // safety

  //         if (item._id === id) {
  //           return { ...item, qty: item.qty - 1 };
  //         }
  //         return item;
  //       })
  //       .filter((item) => item && item.qty > 0)
  //   );
  // };

  const decreaseQty = async (id) => {

  // ==================================
  // GUEST USER
  // ==================================

  if (!userId) {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item._id === id) {
            return {
              ...item,
              qty: item.qty - 1,
            };
          }

          return item;
        })
        .filter((item) => item.qty > 0)
    );

    return;
  }


  // ==================================
  // LOGGED-IN USER
  // ==================================

  try {
    const token = localStorage.getItem("token");

    // Find the product currently in React cart
    const currentItem = cart.find(
      (item) => item._id === id
    );

    if (!currentItem) {
      return;
    }

    // Calculate new quantity
    const newQuantity = currentItem.qty - 1;


    // ==================================
    // If quantity becomes 0
    // remove product completely
    // ==================================

    if (newQuantity <= 0) {

      const response = await fetch(
        `http://localhost:5000/cart/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to remove product"
        );
      }

      const formattedCart =
        data.cart?.products?.map((item) => ({
          ...item.product,
          qty: item.quantity,
        })) || [];

      setCart(formattedCart);

      return;
    }


    // ==================================
    // Quantity is still greater than 0
    // ==================================

    const response = await fetch(
      `http://localhost:5000/cart/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          quantity: newQuantity,
        }),
      }
    );

    const data = await response.json();
    console.log("🛒 UPDATED CART:", data);
    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update cart"
      );
    }


    // Convert backend cart
    // to frontend cart format

    const formattedCart =
      data.cart?.products?.map((item) => ({
        ...item.product,
        qty: item.quantity,
      })) || [];


    // Update UI with database response

    setCart(formattedCart);

  } catch (error) {

    console.error(
      "❌ DECREASE CART ERROR:",
      error
    );

  }
};

  return (
    <Router>
      <Header cart={cart} /> {/* ✅ GLOBAL HEADER */}
      <Routes>
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />}/>
        {/* <Route
          path="/"
          element={<HomeScreen addToCart={addToCart} />}
        /> */}
<Route path="/wishlist" element={<Wishlist />} />
        <Route
          path="/product/:id"
          element={<ProductScreen addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartScreen
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              decreaseQty={decreaseQty}
            />
          }
        />
        <Route
          path="/checkout"
          element={<CheckoutScreen cart={cart} setCart={setCart} />}
        />
        <Route path="/orders" element={<OrdersScreen/>}/>
        <Route path="/orders/:id" element={<OrderDetailsScreen />} />
        <Route path="/profile" element={<Profile/>}/>
        {/* <Route path="/" element={<LandingPageHome />}/> */}
        <Route path="/" element={<LandingPageHome  addToCart={addToCart}/>}/>
        <Route path="/men" element={<CategoryScreen addToCart={addToCart}/>}/>
      </Routes>
    </Router>
  );
}

export default App;