import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"; // Import the external CSS file

const Login = () => {
  const navigate = useNavigate(); // Get the navigate function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("API Response Data:", data); // Log the response data to see its structure and contents

      if (response.status === 400) {
        alert("User not found or incorrect password");
      } else {
        if (data.user.role === "responsable") {
          console.log("Login successful for employeur. Redirecting to the employeur home page.");
          localStorage.setItem("user", JSON.stringify(data.user)); // Save the user data in localStorage
          await navigate("/home");
        } else {
          console.log("Login successful for regular user. Redirecting to the home page.");
          localStorage.setItem("user", JSON.stringify(data.user)); // Save the user data in localStorage
          await navigate("/homeemp");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        className="input-field"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
