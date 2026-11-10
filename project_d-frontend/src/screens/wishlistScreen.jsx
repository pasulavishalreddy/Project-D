import { useEffect, useState } from "react";
const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.user?._id;
  const token = localStorage.getItem("token");
  const fetchWishlist = async () => {
    try {
      const res = await fetch(`http://localhost:5000/wishlist/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setItems(data.products || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  // ✅ Load data on first render
  useEffect(() => {
    if (userId) {
      fetchWishlist();
    }
  }, [userId]);
  // ✅ Remove item
//   const handleRemove = async (productId) => {
//     try {
//        console.log("Removing:", {
//       userId,
//       productId,
//     });
//       const res = await fetch("http://localhost:5000/wishlist/remove", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // 🔥 IMPORTANT
//         },
//         body: JSON.stringify({
//           userId,
//           productId,
//         }),
//       });

//  if (!res.ok) {
//       const errorText = await res.text();

//       console.error("DELETE FAILED:", res.status, errorText);

//       return;
//     }

//       const data = await res.json();

//       if (data.success) {
//         // ✅ STEP 1: Instantly update UI (no delay)
//         setItems((prevItems) =>
//           prevItems.filter((item) => item._id !== productId)
//         );
//         // ✅ STEP 2: Sync again with backend (fix stale data issue)
//       }
//     } catch (err) {
//       console.error("Remove wishlist Error:", error);
//     }
//   };
const handleRemove = async (productId) => {
  try {
    console.log("🗑️ REMOVE CLICKED");
    console.log("User ID:", userId);
    console.log("Removing product:", productId);
    const res = await fetch("http://localhost:5000/wishlist/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        productId,
      }),
    });
const data = await res.json();
console.log("remove resposnse",data)
 console.log("📊 STATUS:", res.status);
    if (!res.ok) {
      // const errorText = await res.text();
      console.error("Remove failed:", data.message);
      return;
    }
    // const data = await res.json();
    // console.log("Remove response:", data);
    setItems((prevItems) =>{
       const updatedItems =  prevItems.filter(
        (item) => item._id.toString() !== productId.toString()
      )
        return updatedItems;}
    );
    
  } catch (error) {
    console.error("Remove wishlist error:", error);
  }
};
  return (
    <div style={{ padding: "20px" }}>
      <h2>My Wishlist</h2>
      {items.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        items.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button
              onClick={() => handleRemove(item._id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;