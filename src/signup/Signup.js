// Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css"; // Import the external CSS file

const Signup = () => {
  const navigate = useNavigate(); // Get the navigate function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [poste, setPoste] = useState("");
  const [grade, setGrade] = useState("");
  const [image, setImage] = useState("");
  const handleSignup = async () => {
    if (!email || !password || !username || !fullname ||!phone || !poste||!grade ) {
      alert("All fields are required");
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      alert(
        "Password must be at least 8 characters long and include at least one uppercase letter and one digit."
      );
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username, fullname, phone,poste,grade,image }),
      });
      const data = await response.json();
      if (response.status === 400) {
        alert("User already exists");
      } else {
        // Redirect to login page after successful signup
        window.location.href = "/"; // Replace '/login' with your actual login route
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
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
      <input
        className="input-field"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Full Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
       <input
        className="input-field"
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
        <input
        className="input-field"
        type="text"
        placeholder="Image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <select
        className="input-field"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      >
        <option value="">Select grade</option>
        <option value="Ingénieur Principal">Ingénieur Principal</option>
        <option value="Ingénieur Major">Ingénieur Major</option>
        <option value="Technicien">Technicien</option>
      </select>
      <select
        className="input-field"
        value={poste}
        onChange={(e) => setPoste(e.target.value)}
      >
        <option value="">Select poste</option>
        <option value="Architecte Logiciel">Architecte Logiciel</option>
        <option value="Analyste Fonctionnel">Analyste Fonctionnel</option>
        <option value="Chef de Mission">Chef de Mission</option>
        <option value="Chef de Projet">Chef de Projet</option>
        <option value="Développeur">Développeur</option>
        <option value="Testeur">Testeur</option>
        <option value="Maintenance Applicative et Spécialiste en Gestion de Projet">Maintenance Applicative et Spécialiste en Gestion de Projet</option>
      </select>

     
      <button className="signup-button" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
};

export default Signup;
