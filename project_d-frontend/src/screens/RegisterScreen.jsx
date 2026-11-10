import { useState } from "react";

const RegisterScreen = () => {
  const [name, setName] = useState(""); // optional
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Register failed");
        return;
      }else{
        
      // ✅ Save user
      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Registered successfully ✅");

      // redirect to home or login
      window.location.href = "/login";
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>

      <form onSubmit={submitHandler}>
        {/* NAME */}
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        {/* PASSWORD */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", paddingRight: "40px" }}
          />

          <button
            type="button" // 🔥 important
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              border: "none",
              background: "none",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterScreen;